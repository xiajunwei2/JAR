<template>
  <div class="index">
    <div class="form_btn">
      <el-button icon="el-icon-plus" type="primary" @click="addPart()">添加部门</el-button>
    </div>
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="tableData">
        <vxe-table-column field="deptId" title="部门编号"></vxe-table-column>
        <vxe-table-column field="deptName" title="部门名称"></vxe-table-column>
        <vxe-table-column field="orderNum" title="排序"></vxe-table-column>
        <vxe-table-column field="remark" title="备注"></vxe-table-column>
        <vxe-table-column title="创建时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="statusStr" title="状态"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">编辑</vxe-button>
            <vxe-button type="text" @click="deleteData(row)">删除</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" :total="page5.totalResult" @page-change="handlePageChange2"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="25%" @close="closedialogbmkl">
      <div class="dia_form">
        <el-form ref="closedialogbmkl" :rules="rules" :model="form" label-width="80px" v-if="dialogVisible">
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="form.deptName"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left" label="上级部门">
            <el-select clearable v-model="form.parentId" placeholder="请选择">
              <el-option v-for="item in $store.state.option.sysDeptgetPageDept" :key="item.deptId"
                :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align:left" label="备注:">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left" label="账号状态:">
            <el-switch v-model="form.status" :active-value="0" :inactive-value="1"
              :active-text="form.status===0?'启用':'禁用'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closedialogbmkl('closedialogbmkl')">取 消</el-button>
        <el-button type="primary" @click="sureDepart('closedialogbmkl')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";
// 账号管理
export default {
  data() {
    return {
      title: "",
      allAlign: null,
      tableData: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      dialogVisible: false,
      addVisible: false,
      deleteVisible: false,
      form: {
        deptName: "",
        parentId: "",
        remark: "",
        status: 0,
      },
      rules: {
        deptName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.ajaxTable();
  },
  methods: {
    closedialogbmkl() {
      this.$refs["closedialogbmkl"].resetFields();
      this.dialogVisible = false;
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    diaPage(row) {
      this.title = "编辑部门";
      let query = {
        deptId: row.deptId,
      };
      Api.sysDeptgetGetDept(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          // res.content.deptId=Number(res.content.deptId)
          this.form = JSON.parse(JSON.stringify(res.content));
          this.dialogVisible = !this.dialogVisible;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    sureDepart(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = this.form;
          this.$store.commit("loadingChange", true);
          Api.sysDeptSaveOrUpdateDept(query).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
              vm.dialogVisible = false;
              vm.page5.currentPage = 1;
              vm.page5.pageSize = 10;
              vm.ajaxTable();
            } else {
              vm.$message.error(res.msg);
            }
          });
        }
      });
    },
    ajaxTable() {
      let vm = this;
      let params = {
        content: {
          deptName: "",
          status: "",
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysDeptgetPageDept(params).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addPart() {
      this.title = "添加部门";
      this.dialogVisible = !this.dialogVisible;
      this.form={
        deptName: "",
        parentId: "",
        remark: "",
        status: 0,
      }
    },
    deleteData(row) {
      let vm = this;
      // this.deleteVisible=!this.deleteVisible
      this.$confirm("此操作将永久删除" + row.deptName + ", 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        this.$store.commit("loadingChange", true);
        let query = {
          deptId: row.deptId,
        };
        Api.sysDeptdeleteDept(query).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            vm.page5.currentPage = this.page5.currentPage;
            vm.page5.pageSize = this.page5.pageSize;
            vm.ajaxTable();
          } else {
            vm.$message.error(res.msg);
          }
        });
      });
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
  height: 150px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  .head_search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .time_msg {
      margin-right: 15px;
      margin-left: 15px;
    }
    .time_btn {
      margin-left: 25px;
      width: 120px;
    }
    .el-input {
      width: 250px;
      // align-items: center;
      margin-right: 25px;
    }
  }
  .head_time {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    align-items: center;
  }
}
.form_btn {
  height: 40px;
  display: flex;
  color: #fff;
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
.dia_form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 100%;
  }
}

/deep/.el-textarea__inner {
  height: 100px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>