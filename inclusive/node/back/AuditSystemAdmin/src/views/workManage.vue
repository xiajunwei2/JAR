<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="form.postCode" placeholder="岗位编码"></el-input>
        <el-input prefix-icon="el-icon-search" v-model="form.postName" placeholder="岗位名称"></el-input>
        <el-select clearable v-model="form.status" placeholder="岗位状态">
          <el-option v-for="item in $store.state.option.gwztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="reload">重置</el-button>
      </div>
    </div>
    <el-row type="flex" justify="flex-start" style="margin:10px 0;">
      <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button type="success" :disabled="editFlag" icon="el-icon-edit" @click="editPage">修改</el-button>
      <el-button type="danger" :disabled="deleteFlag" icon="el-icon-delete" @click="deleteDataAll">删除</el-button>
      <el-button type="warning" icon="el-icon-download" @click="exportData">导出</el-button>
    </el-row>
    <div class="account_form">
      <vxe-table class="form_table" border ref="xTableworkManage" @checkbox-change="selectChangeEvent"
        @checkbox-all="selectAllEvent" align="center" resizable :tree-config="{children: 'children'}" :data="tableData">
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column field="postCode" title="岗位编号" tree-node></vxe-table-column>
        <vxe-table-column field="postName" title="岗位名称"></vxe-table-column>
        <vxe-table-column field="postSort" title="岗位排序"></vxe-table-column>
        <vxe-table-column field="statusStr" title="状态"></vxe-table-column>
        <vxe-table-column title="时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.dacreatedTimete).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="editPage(row)">编辑</vxe-button>
            <vxe-button type="text" @click="deleteData(row)">删除</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" @page-change="handlePageChange2" :total="page5.totalResult"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- 添加对话框 -->
    <el-dialog :title="title" :visible.sync="addVisible" width="30%" @close="closecdgldialogworkMang">
      <div class="dia_main">
        <el-form :rules="rules" :model="form" ref="closecdgldialogworkMang" v-if="addVisible">
          <el-form-item label="岗位名称:" prop="postName">
            <el-input v-model="form.postName"></el-input>
          </el-form-item>
          <el-form-item label="岗位编码:" prop="postCode">
            <el-input v-model="form.postCode"></el-input>
          </el-form-item>
          <el-form-item label="岗位顺序:" prop="postSort">
            <el-input-number v-model="form.postSort" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="岗位状态:">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd('closecdgldialogworkMang')">确 定</el-button>
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
      editId:'',
      checkList: [],
      checkItem: {},
      account: "",
      name: "",
      phoneNum: "",
      departs: "",
      status: "",
      times: "",
      title: "",
      tableData: [],
      allAlign: null,
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      addVisible: false,
      editVisible: false,
      form: {
        postCode: null,
        postId: null,
        postName: null,
        postSort: null,
        status: '',
        statusStr: null,
      },
      rules: {
        postName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" },
        ],
        postCode: [
          { required: true, message: "请输入岗位编码", trigger: "blur" },
        ],
        postSort: [{ required: true, message: "排序", trigger: "change" }],
      },
    };
  },
  created() {
    let vm = this;
    this.ajaxTable();
  },
  methods: { 
    search() {
      let vm = this;
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage = 1;
      this.ajaxTable();
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      let query = {
        content: {
          postCode: this.form.postCode,
          postName: this.form.postName,
          status: this.form.status,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysPostgetPagePost(query).then((res) => {
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
    reload() {
      this.ajaxTable();
    },
    deleteDataAll() {
      let vm = this;
      let data = this.$refs.xTableworkManage.getCheckboxRecords();
      let id = [];
      let name = [];
      for (const item of data) {
        id.push(item.postId);
        name.push(item.postName);
      }
      name = name.join("，");
      id=id.join(',')
      vm.$confirm("此操作将永久删除岗位：" + name + ", 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        this.$store.commit("loadingChange", true);
        Api.sysPostdeletePost({postIds:id}).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            vm.page5.pageSize = this.page5.pageSize;
            vm.page5.currentPage = this.page5.currentPage;
            vm.ajaxTable();
          } else {
            vm.$message.error(res.msg);
          }
        });
      });
    },
    exportData() {
      let vm=this
      let query = {
        content: {
          postCode: this.form.postCode?this.form.postCode:'',
          postName: this.form.postName?this.form.postName:'',
          status: this.form.status?this.form.status:'',
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysPostExportPagePost(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          var a = document.createElement("a");
          a.setAttribute("href", res.content);
          a.setAttribute("target", "_target");
          a.setAttribute("style", "display:none");
          a.setAttribute("id", "startTelMedicine");
          // 防止反复添加
          if (document.getElementById("startTelMedicine")) {
            document.body.removeChild(
              document.getElementById("startTelMedicine")
            );
          }
          document.body.appendChild(a);
          a.click();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    editPage(row) {
      this.title = "编辑岗位";
      // this.addVisible=!this.addVisible
      // this.editId=row.postId
      if(row.postId){
        this.editId=row.postId
      }
      let query = {
        postId: this.editId,
      };
      Api.sysPostgetGetPost(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          this.form = JSON.parse(JSON.stringify(res.content));
          this.addVisible = !this.addVisible;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    sureAdd(formName) {
      let vm = this;
      let params={
        ...this.form
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //编辑
          this.$store.commit("loadingChange", true);
          Api.sysPostsaveOrUpdatePost(params).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
               this.form= {
                postCode: null,
                postId: null,
                postName: null,
                postSort: '',
                status: '',
                statusStr: null,
              },
              vm.page5.pageSize = this.page5.pageSize;
              vm.page5.currentPage = this.page5.currentPage;
              vm.ajaxTable();
              this.addVisible = false;
              this.$message.success(res.msg)
            } else {
              vm.$message.error(res.msg);
            }
          });
        }
      });
    },
    closecdgldialogworkMang() {
      this.$refs["closecdgldialogworkMang"].resetFields();
    },
    add() {
      this.title = "添加岗位";
      this.form= {
        createdTime: null,
        postCode: null,
        postId: null,
        postName: null,
        postSort: null,
        status: 0,
        statusStr: null,
      }
      this.addVisible = !this.addVisible;

    },
    reset() {
      this.account = "";
      this.name = "";
      this.departs = "";
      this.ajaxTable();
    },
    deleteData(row) {
      // this.deleteVisible=!this.deleteVisible
      let vm = this;
      let query = {
        postIds: row.postId,
      };
      this.$confirm(
        "此操作将永久删除岗位：" + row.postName + ", 是否继续?",
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
        this.$store.commit("loadingChange", true);
        Api.sysPostdeletePost(query).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            vm.page5.pageSize = this.page5.pageSize;
            vm.page5.currentPage = this.page5.currentPage;
            vm.ajaxTable();
          } else {
            vm.$message.error(res.msg);
          }
        });
      });
    },
    selectChangeEvent({ records }) {
      console.log(records)
      this.editId=records[0].postId
      this.checkList = records;
    },
    selectAllEvent({ checked, records }) {
      this.checkList = records;
    },
  },
  computed: {
    editFlag: function () {
      if (this.checkList.length == 1) {
        return false;
      } else {
        return true;
      }
    },
    deleteFlag: function () {
      if (this.checkList.length > 0) {
        return false;
      } else {
        return true;
      }
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
  height: 60px;
  background-color: #fff;
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
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #333;
  cursor: pointer;
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
  flex-direction: column;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  padding: 0 20px;
  .el-input {
    width: 75%;
    padding: 0;
  }
  .el-textarea {
    width: 75%;
    margin-left: 20px;
  }
}
.form_todo {
  span {
    margin: 0 10px;
  }
}

/deep/.el-textarea__inner {
  height: 100px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.vxe-pager .vxe-pager--jump .vxe-pager--goto {
  width: 60px;
  height: 30px;
}
</style>