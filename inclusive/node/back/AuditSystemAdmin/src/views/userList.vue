<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-select clearable v-model="formSearch.companyType" placeholder="账号类型" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.yhzhlxOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-input prefix-icon="el-icon-search" v-model="formSearch.companyName" placeholder="关联机构名称"
          style="margin:0 10px ;"></el-input>
        <el-input prefix-icon="el-icon-search" v-model="formSearch.userName" placeholder="用户账号" style="margin:0 10px ;">
        </el-input>
        <el-input prefix-icon="el-icon-search" v-model="formSearch.nickName" placeholder="用户姓名" style="margin:0 10px ;">
        </el-input>
        <el-select clearable v-model="formSearch.status" placeholder="账号状态" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.zhztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="head_time">
        <div class="time_msg">注册时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="times" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search()">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchDownload()">导出</el-button>
      </div>
    </div>
    <div class="form_btn">
      <el-button icon="el-icon-plus" type="primary" @click="add()">添加金融机构账号</el-button>
    </div>
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="tableData">
        <vxe-table-column field="id" title="用户ID"></vxe-table-column>
        <vxe-table-column field="companyTypeStr" title="账号类型"></vxe-table-column>
        <vxe-table-column field="userName" title="用户账号"></vxe-table-column>
        <vxe-table-column field="nickName" title="姓名"></vxe-table-column>
        <vxe-table-column field="phoneNumber" title="联系电话"></vxe-table-column>
        <vxe-table-column field="remark" title="备注"></vxe-table-column>
        <vxe-table-column field="createdTime" title="注册时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="statusStr" title="账号状态"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" v-if="row.companyType!=1" style="color:#ccc;">编辑</vxe-button>
            <vxe-button type="text" v-if="row.companyType==1" @click="diaPage(row)">编辑</vxe-button>
            <vxe-button type="text" @click="userdetail(row)">详情页</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" :total="page5.totalResult" @page-change="handlePageChange2"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- //对话框 -->
    <el-dialog :title="title" :visible.sync="jrzhdialog" width="30%" @close="closedialoguserList">
      <div class="dia_main">
        <el-form :model="form" style="width:100%;" :rules="rules" ref="closedialoguserList" label-width="120px"
          class="demo-ruleForm" v-if="jrzhdialog">
          <el-form-item label="关联机构:" prop="companyId">
            <el-select clearable v-model="form.companyId" placeholder="关联机构" style="width:100%">
              <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id"
                :label="item.companyName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色:" prop="name" style="text-align:left">
            {{!getMechan?'机构管理员':'子机构用户'}}
          </el-form-item>
          <el-form-item label="账号:">
            <el-input v-model="form.userName" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="nickName">
            <el-input v-model="form.nickName" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="form.password" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="form.phoneNumber" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="form.remark" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left" label="账号状态:">
            <el-switch v-model="form.status" :active-value="0" :inactive-value="1"
              :active-text="form.status==0?'启用':'禁用'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jrzhdialog = false">取 消</el-button>
        <el-button type="primary" @click="sure('closedialoguserList')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";

// 用户列表
export default {
  data() {
    return {
      meachanFlag:null,
      title: "",
      account: "",
      name: "",
      phoneNum: "",
      departs: "",
      status: "",
      times: [],
      allAlign: null,
      tableData: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      formSearch: {
        companyType: "",
        companyName: "",
        userName: "",
        nickName: "",
        status: "",
        registerTimeDown: "",
        registerTimeUp: "",
      },
      form: {
        id: null,
        companyId:'',
        userName	: "",
        nickName: "",
        password:'',
        status: 0,
        phoneNumber: "",
        remark: "",
      },
      jrzhdialog: false,
      rules: {
        companyId: [{ required: true, message: "请输入账号", trigger: "change" }],
        nickName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        part: [{ required: true, message: "所属部门", trigger: "blur" }],
        role: [{ required: true, message: "角色属性", trigger: "change" }],
      },
    };
  },
  created() {
    this.ajaxTable();
   console.log(this.getMechan)
  },
  computed: {
   getMechan:function(){
      let arr=this.$store.state.sysCodegetCode.AllMechanism
      let flag= arr.some(item=>{
        if(item.id==this.form.id){
            return !item.companyName.indexOf('--')
        }
      })
      return flag
    }
   },
  methods: {
    getTime() {
      this.formSearch.registerTimeDown = this.times[0] / 1000;
      this.formSearch.registerTimeUp = this.times[1] / 1000;
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      let query = {
        content: vm.formSearch,
        pager: {
          pageSize: this.page5.pageSize,
          currentPage: this.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysUsergetUserList(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
          this.formSearch.registerTimeDown=''
          this.formSearch.registerTimeUp=''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    add() {
      this.title = "添加用户";
      this.jrzhdialog = true;
       this.form= {
        id: null,
        companyId:'',
        userName	: "",
        nickName: "",
        password:'',
        status: 0,
        phoneNumber: "",
        remark: "",
      }
    },
    search() {
      let vm = this;
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage =1;
      this.ajaxTable();
    },
    searchDownload() {
      let vm = this;
      let params = {
        content: {
          companyType: this.formSearch.companyType,
          companyName: this.formSearch.companyName,
          userName: this.formSearch.userName,
          nickName: this.formSearch.nickName,
          status: this.formSearch.status,
          registerTimeDown: this.formSearch.registerTimeDown,
          registerTimeUp: this.formSearch.registerTimeUp,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysUserexportUserList(params).then((res) => {
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
    userdetail(row) {
      this.$router.push({
        name: "userListDetail",
        query: {
          id: row.id,
          row: row,
        },
      });
    },
    diaPage(row) {
      this.title = "编辑用户";
      let query = {
        userId: row.id,
      };
      this.$store.commit("loadingChange", true);
      Api.sysUserGetMechanismUserDetail(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          // res.content.deptIds=Number(res.content.deptIds.split(',')[0])
          this.form = JSON.parse(JSON.stringify(res.content));
          this.jrzhdialog = !this.jrzhdialog;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    sure(formName) {
      let vm = this;
      let query = this.form;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit("loadingChange", true);
          Api.sysUseraddOrUpdateMechanismUser(query).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
              vm.page5.pageSize = this.page5.pageSize;
              vm.page5.currentPage = this.page5.curr;
              vm.ajaxTable();
              vm.jrzhdialog = false;
              this.$message.success(res.msg)
            } else {
              vm.$message.error(res.msg);
            }
          });
        }
      });
    },
    closedialoguserList() {
      this.$refs["closedialoguserList"].resetFields();
    }
  }
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
  .el-form {
    flex: 1;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.dia_role {
  display: flex;
  // justify-content: flex-start;
  // flex-wrap: wrap;
  // align-items: center;
  box-sizing: border-box;
  padding-left: 40px;
  .el-form-item__content {
    display: flex;
    justify-content: flex-start;
  }
  .role_radio {
    display: flex;
    justify-content: flex-start;
  }
}
.el-textarea__inner {
  height: 100px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>