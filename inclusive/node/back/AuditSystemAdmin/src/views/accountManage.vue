<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="searchParams.userName" placeholder="账号" style="margin:0 10px;">
        </el-input>
        <el-input prefix-icon="el-icon-search" v-model="searchParams.nickName" placeholder="姓名" style="margin:0 10px;">
        </el-input>
        <el-input prefix-icon="el-icon-search" v-model="searchParams.phoneNumber" placeholder="手机号码"
          style="margin:0 10px;"></el-input>
        <el-select clearable v-model="searchParams.deptId" placeholder="部门" style="margin:0 10px;">
          <el-option v-for="item in $store.state.option.sysDeptgetPageDept" :key="item.deptId" :label="item.deptName"
            :value="item.deptId"></el-option>
        </el-select>
        <el-select clearable v-model="searchParams.status" placeholder="账号状态" style="margin:0 10px;">
          <el-option v-for="item in $store.state.option.zhztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>

        </el-select>
      </div>
      <div class="head_time">
        <div class="time_msg">创建时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="times" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search()">查询</el-button>
        <el-button class="time_btn" type="danger" @click="exportAccount()">导出</el-button>
      </div>
    </div>
    <div class="form_btn">
      <el-button icon="el-icon-plus" type="primary" @click="addAcount()">添加账号</el-button>
    </div>
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="tableData">
        <!-- <vxe-table-column field="id" title="ID"></vxe-table-column> -->
        <vxe-table-column field="userName" title="账号"></vxe-table-column>
        <vxe-table-column field="nickName" title="姓名"></vxe-table-column>
        <vxe-table-column field="deptNames" title="部门"></vxe-table-column>
        <vxe-table-column field="phoneNumber" title="联系电话"></vxe-table-column>
        <vxe-table-column field="roleNames" title="角色"></vxe-table-column>
        <vxe-table-column field="remark" title="备注"></vxe-table-column>
        <vxe-table-column field="statusStr" title="账号状态"></vxe-table-column>
        <vxe-table-column title="创建时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">编辑</vxe-button>
            <vxe-button type="text" @click="deleteData(row)">删除</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager @page-change="handlePageChange2" background v-if="page5.totalResult>0"
        :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize" :total="page5.totalResult"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="45%">
      <div class="dia_main">
        <div class="main_item">
          <el-form :rules="rules" :model="form" ref="closedialogAccount" v-if="dialogVisible">
            <el-form-item label="账号:" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="nickName">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="main_item">
          <el-form :rules="rules" :model="form" v-if="dialogVisible">
            <el-form-item prop="deptIds" label="所属部门">
              <el-select clearable v-model="form.deptIds" placeholder="请选择">
                <el-option v-for="item in $store.state.option.sysDeptgetPageDept" :key="item.deptId"
                  :label="item.deptName" :value="item.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="dia_role">
        <el-form :rules="rules" :model="form" v-if="dialogVisible">
          <el-form-item label="角色:" class="role_radio" prop="roleIds">
            <el-select clearable v-model="form.roleIds" multiple placeholder="请选择" style="width:260px;">
              <el-option v-for="item in $store.state.sysCodegetCode.AllRole" :key="item.value" :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
            <!-- <el-radio-group v-model="form.roleIds">
              <el-radio label="1">管理员</el-radio>
              <el-radio label="2">运营</el-radio>
              <el-radio label="3">贷款管理</el-radio>
              <el-radio label="4">机构管理员</el-radio>
              <el-radio label="5">子机构用户</el-radio>
              <el-radio label="6">领导</el-radio>
              <el-radio label="7">领导</el-radio>
            </el-radio-group> -->
          </el-form-item>
          <el-form-item style="display:flex;justify-content:flex-start;width:100%;" label="备注:" >
            <el-input type="textarea" class="textarea_text" :rows="3" placeholder="请输入内容" style="width:260px;padding-left:10px;"
              v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item style="display:flex;justify-content:flex-start" label="账号状态:">
            <el-switch v-model="form.status" :active-value="0" :inactive-value="1"
              :active-text="form.status===0?'启用':'禁用'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDia('closedialogAccount')">取 消</el-button>
        <el-button type="primary" @click="sure('closedialogAccount')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";
export default {
  data() {
    return {
      account: "",
      name: "",
      phoneNum: "",
      departs: "",
      status: "",
      times: "",
      searchParams: {
        companyType: "",
        deptId:'',
        companyName: "",
        userName: "",
        nickName: "",
        status: "",
        phoneNumber: "",
        createdTimeDown: "",
        createdTimeUp: "",
      },
      allAlign: null,
      title: "",
      tableData: [ 
      ],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      dialogVisible: false,
      addVisible: false,
      deleteVisible: false,
      form: {
        userId: "",
        userName: "",
        deptIds: "",
        nickName: "",
        phoneNumber: "",
        password: "",
        roleIds: [],
        remark: "",
        status: 0,
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roleIds: [{ required: true, message: "请选择角色属性", trigger: "change" }],
        deptIds: [{ required: true, message: "请选择所属部门", trigger: "change" }],
      },
    };
  },
  created() {
    this.getCountInfoList();
  },
  methods: {
    getTime() {
      this.searchParams.createdTimeDown = this.times[0] / 1000;
      this.searchParams.createdTimeUp = this.times[1] / 1000;
    },
    handlePageChange2({ currentPage, pageSize }) {
      console.log(1111);
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.getCountInfoList();
    },
    search() {
      let vm = this;
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage = 1;
      this.getCountInfoList();
    },
    getCountInfoList() {
      let vm = this;
      let pager = {
        pageSize: this.page5.pageSize,
        currentPage: this.page5.currentPage,
      };
      let content = {
        ...this.searchParams,
      };
      let params = {
        pager: pager,
        content: content,
      };
      this.$store.commit("loadingChange", true);
      Api.sysUsergetPageAccount(params).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          console.log(res);
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
          this.searchParams.createdTimeDown=''
          this.searchParams.createdTimeUp=''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    closeDia(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false;
    },
    sure(formName) {
      let vm = this;
      let params={
        ...this.form
      }
      console.log(String(params.roleIds.join(',')))
      params.roleIds=String(params.roleIds.join(','))
      console.log(params)
      // return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit("loadingChange", true);
          //编辑
          if (this.form.id) {
            Api.sysUser(params).then((res) => {
              this.$store.commit("loadingChange", false);
              if (res.code == 0) {
                this.dialogVisible = false;
                vm.page5.pageSize = this.page5.pageSize;
                vm.page5.currentPage = this.page5.currentPage;
                vm.getCountInfoList();
              } else {
                vm.$message.error(res.msg);
              }
            });
          } else {
            //新建
            this.$store.commit("loadingChange", true);
            Api.sysUsersaveOrUpdateAccount(params).then((res) => {
              this.$store.commit("loadingChange", false);
              if (res.code == 0) {
                this.dialogVisible = false;
                vm.page5.pageSize = this.page5.pageSize;
                vm.page5.currentPage = this.page5.currentPage;
                vm.getCountInfoList();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        }
      });
    },
    diaPage(row) {
      let query = {
        userId: row.userId,
      };
      this.title = "编辑账号";
      Api.sysUsergetGetUser(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          res.content.deptIds=Number(res.content.deptIds.split(',')[0])
          res.content.roleIds=res.content.roleIds.split(',')
          this.form = JSON.parse(JSON.stringify(res.content));
          this.dialogVisible = !this.dialogVisible;
        } else {
          this.$message.error(res.msg);
        }
      });
    }, 
     
    addAcount() {
      this.title = "添加账号";
      this.form = {
        userId: "",
        userName: "",
        deptIds: '',
        nickName: "",
        phoneNumber: "",
        password: "",
        roleIds: ["3"],
        remark: "",
        status: 0,
      };
      this.dialogVisible = !this.dialogVisible;
    },
    deleteData(row) {
      let vm = this;
      // this.deleteVisible=!this.deleteVisible
      this.$confirm("此操作将永久删除" + row.nickName + ", 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        this.$store.commit("loadingChange", true);
        Api.sysUserdeleteAccount({ userId: row.userId }).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            vm.page5.pageSize = this.page5.pageSize;
            vm.page5.currentPage = this.page5.currentPage;
            vm.getCountInfoList();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    exportAccount(){
      // sysUserexportUserList
      let vm = this;
      let pager = {
        pageSize: this.page5.pageSize,
        currentPage: this.page5.currentPage,
      };
      let content = {
        ...this.searchParams,
      };
      let params = {
        pager: pager,
        content: content,
      };
      Api.sysUserexportUserList(params).then((res) => {
        if (res.code == 0) {
          var a = document.createElement("a");
          a.setAttribute("href", res.content);
          a.setAttribute("target", "_target");
          a.setAttribute("style", "display:none");
          a.setAttribute("id", "startTelMedicinea");
          // 防止反复添加
          if (document.getElementById("startTelMedicinea")) {
            document.body.removeChild(
              document.getElementById("startTelMedicinea")
            );
          }
          document.body.appendChild(a);
          a.click();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
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
.dia_main {
  display: flex;
  width: 100%;
  // height: 200px;
  .main_item {
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: left;
  }
  .el-input {
    width: 260px;
    padding: 0;
  }
  .el-select {
    width: 260px;
    padding: 0;
  }
}
.dia_role {
  display: flex;
  // justify-content: flex-start;
  // flex-wrap: wrap;
  // align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  .el-form-item__content {
    display: flex;
    justify-content: flex-start;
  }
  .role_radio {
    display: flex;
    // justify-content: flex-start;
  }
}

/deep/.el-textarea__inner {
  height: 100px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>