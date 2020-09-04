<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="type" placeholder="分类名称" style="margin:0 10px ;"></el-input>
        <el-select clearable v-model="status" placeholder="分类状态" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.flztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-button class="time_btn" type="danger" style="margin:0 10px ;" @click="search">查询</el-button>
      </div>
    </div>
    <div class="form_btn">
      <el-button icon="el-icon-plus" type="primary" @click="addCategory()">添加分类</el-button>
    </div>
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="FiltertableDataList">
        <vxe-table-column field="id" title="分类ID"></vxe-table-column>
        <vxe-table-column field="type" title="分类名称"></vxe-table-column>
        <vxe-table-column field="sort" title="排序"></vxe-table-column>
        <vxe-table-column title="注册时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="账号状态">
          <template v-slot="{ row }">
            <span v-if="row.status==0">启用</span>
            <span v-if="row.status==1">禁用</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="editPage(row)">编辑</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="tableDataArry.length>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" :total="tableDataArry.length" @page-change="handlePageChange2"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- 添加分类对话框 -->
    <el-dialog :title="title" :visible.sync="addVisible" width="30%" @close="closecdgldiagProduct">
      <div class="dia_main">
        <el-form :rules="rules" :model="form" ref="closecdgldiagProduct" v-if="addVisible" label-width="120px">
          <el-form-item label="分类名称" prop="type">
            <el-input v-model="form.type" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item prop="parentId" label="选择上级分类">
            <el-select clearable v-model="form.parentId" placeholder="请选择">
              <el-option v-for="item in $store.state.getAllType" :key="item.value" :label="item.type" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :min="0" style="width:95%;" label="请填写排序"></el-input-number>
          </el-form-item>
          <el-form-item style="text-align:left" label="分类启用状态:" prop="status">
            <el-switch v-model="form.status" :active-value="0" :inactive-value="1"
              :active-text="form.status==0?'启用':'禁用'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('closecdgldiagProduct')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";
// 产品分类
export default {
  data() {
    return {
      status: "",
      type: "",
      timeList: [],
      allAlign: null,
      FiltertableDataList: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      tableDataArry: [],
      addVisible: false,
      editVisible: false,
      form: {
        id: "",
        parentId: "",
        type: "",
        sort: "",
        status: "",
      },
      title: "",
      rules: {
        type: [
          { required: true, message: "输入分类名称", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请选择排序", trigger: "change" }],
      },
    };
  },
  created() {
    this.ajaxTable();
  },
  methods: {
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      let vm = this;
      this.page5.currentPage = currentPage;
      let starnum = (vm.page5.currentPage - 1) * vm.page5.pageSize;
      let endnum =
        vm.page5.total <= vm.page5.currentPage * vm.page5.pageSize
          ? vm.page5.total
          : vm.page5.currentPage * vm.page5.pageSize;
      // tableDataArry后台返回的所有数据
      //渲染到列表里的数据
      let sliceData = vm.tableDataArry.slice(starnum, endnum);
      this.FiltertableDataList = sliceData;
    },
    search() {
      let vm = this;
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage = 1;
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      this.$store.commit("loadingChange", true);
      let query = {
          type: this.type,
          status: this.status 
      };
      Api.productTypeproductTypeList(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableDataArry = res.content
          // this.splitShortArr()
          let query = {
            currentPage: this.page5.currentPage,
            pageSize: this.page5.pageSize,
          };
          vm.handlePageChange2(query);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    splitShortArr(longArr, row){   // 将longArr 数组转换为2个数据为一组的小数组
      var convertData = [];
      for(var i = 0,len = longArr.length; i < len; i += row){
          var item = longArr.slice(i,i+row);
          this.tableDataArry.push(item);
        };
      return this.tableDataArry;
    },
    sure(formName) {
      let vm = this;
      let query = this.form;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit("loadingChange", true);
          Api.productTypesaveOrUpdateProductType(query).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
              vm.page5.currentPage = this.page5.currentPage;
              vm.page5.pageSize = this.page5.pageSize;
              vm.ajaxTable();
              vm.addVisible = false;
            } else {
              vm.$message.error(res.msg);
            }
          });
        }
      });
    },
    editPage(row) {
      this.title = "编辑分类";
      this.form = JSON.parse(JSON.stringify(row));
      this.addVisible = !this.addVisible;
    },
    closecdgldiagProduct() {
      this.$refs["closecdgldiagProduct"].resetFields();
    },
    addCategory() {
      this.title = "添加分类";
      this.addVisible = !this.addVisible;
      this.form = {
        id: "",
        parentId: "",
        type: "",
        sort: "",
        status: 0,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: column;
}
.account_head {
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px;
  .head_search {
    display: flex;
    justify-content: flex-start;
    .el-input {
      width: 250px;
      // align-items: center;
    }
  }
  .head_time {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    align-items: center;
    .time_msg {
      margin-right: 15px;
    }
    .time_btn {
      margin-left: 25px;
      width: 120px;
    }
  }
}
.form_btn {
  height: 40px;
  color: #fff;
  text-align: left;
  border-radius: 5px;
  margin-bottom: 15px;
  margin-top: 25px;
}
.account_form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  box-sizing: border-box;
  padding: 15px;
  .form_table {
    width: 100%;
    margin-bottom: 15px;
    box-sizing: border-box;
    .table_todo {
      display: flex;
      justify-content: space-between;
      span {
        margin: 0 10px;
      }
    }
  }
}
.dia_main {
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: right;
  .el-input {
    width: 400px;
    padding: 0;
  }
  .el-select {
    width: 400px;
    padding: 0;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>