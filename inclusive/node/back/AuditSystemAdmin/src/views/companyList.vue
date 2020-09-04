<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="companyName" placeholder="企业名称" style="margin:0 10px ;">
        </el-input>
        <el-select clearable v-model="registerAddress" placeholder="注册地址" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.sysCodegetCode.ZCDZSatue" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-input prefix-icon="el-icon-search" v-model="managerName" placeholder="管理员姓名" style="margin:0 10px ;">
        </el-input>
        <el-input prefix-icon="el-icon-search" v-model="managerNumber" placeholder="管理员手机号码" style="margin:0 10px ;">
        </el-input>
        <el-select clearable v-model="authenticationStatus" placeholder="认证状态" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.rzztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="head_time">
        <el-select clearable v-model="status" placeholder="企业启用状态" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.qyqyztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <div class="time_msg">注册时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchDownload">导出</el-button>
      </div>
    </div>
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="tableData">
        <vxe-table-column field="id" title="企业ID"></vxe-table-column>
        <vxe-table-column field="companyName" title="企业名称"></vxe-table-column>
        <vxe-table-column field="registerAddress" title="注册地址"></vxe-table-column>
        <vxe-table-column field="managerName" title="管理员姓名"></vxe-table-column>
        <vxe-table-column field="managerNumber" title="管理员手机"></vxe-table-column>
        <vxe-table-column title="注册时间">
          <template v-slot="{row}">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="认证状态">
          <template v-slot="{row}">
            <span>{{row.authenticationStatus==0?'已认证':'未认证'}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="启用状态">
          <template v-slot="{row}">
            <span>{{row.status==0?'启用':'禁用'}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">详情页</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" :total="page5.totalResult" @page-change="handlePageChange2"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- //对话框 -->
    <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="45%" :show-close="false">
      <div class="dia_main">
        <div>
          <el-form :rules="rules" v-if="dialogVisible">
            <el-form-item label="账号:" prop="count">
              <el-input v-model="form.count"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-form :rules="rules">
            <el-form-item label="所属部门:" prop="part">
              <el-input v-model="form.part"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="dia_role">
        <el-form :rules="rules">
          <el-form-item label="角色:" class="role_radio" prop="role">
            <el-radio-group v-model="form.radio">
              <el-radio label="1">管理员</el-radio>
              <el-radio label="2">运营</el-radio>
              <el-radio label="3">贷款管理</el-radio>
              <el-radio label="4">机构管理员</el-radio>
              <el-radio label="5">子机构用户</el-radio>
              <el-radio label="6">领导</el-radio>
              <el-radio label="7">领导</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="display:flex;justify-content:flex-start" label="备注:">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea"></el-input>
          </el-form-item>
          <el-form-item style="display:flex;justify-content:flex-start" label="账号状态:">
            <el-switch v-model="form.status" :active-text="form.status==false?'禁用':'启用'" active-color="#13ce66"
              inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";
// 企业列表
export default {
  data() {
    return {
      companyName: "",
      registerAddress: "",
      managerName: "",
      managerNumber: "",
      createdTimeDown: "",
      createdTimeUp: "",
      authenticationStatus: "",
      status: "",
      allAlign: null,
      tableData: [],
      time: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      dialogVisible: false,
      form: {
        count: "",
        name: "",
        password: "",
        part: "",
        phone: "",
        radio: "",
        textarea: "",
        status: false,
      },
      rules: {
        count: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        part: [{ required: true, message: "所属部门", trigger: "blur" }],
        role: [{ required: true, message: "角色属性", trigger: "change" }],
      },
    };
  },
  created() {
    this.ajaxTable();
  },
  methods: {
    getTime() {
      this.createdTimeUp = this.time[0] / 1000;
      this.createdTimeDown = this.time[1] / 1000;
    },
    search() {
      let vm = this;
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage = 1;
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      vm.getTime();
      this.$store.commit("loadingChange", true);
      let query = {
        content: {
          companyName: vm.companyName,
          registerAddress: vm.registerAddress,
          managerName: vm.managerName,
          managerNumber: vm.managerNumber,
          createdTimeUp: vm.createdTimeUp,
          createdTimeDown: vm.createdTimeDown,
          authenticationStatus: vm.authenticationStatus,
          status: vm.status,
        },
        pager: {
          pageSize: this.page5.pageSize,
          currentPage: this.page5.currentPage,
        },
      };
      Api.sysCompanygetCompanyList(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
          this.createdTimeDown=''
          this.createdTimeUp=''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    searchDownload() {
      let vm = this;
      let params = {
        content: {
          companyName: vm.companyName,
          registerAddress: vm.registerAddress,
          managerName: vm.managerName,
          managerNumber: vm.managerNumber,
          createdTimeUp: vm.createdTimeUp,
          createdTimeDown: vm.createdTimeDown,
          authenticationStatus: vm.authenticationStatus,
          status: vm.status,
        },
        pager: {
          pageSize: this.page5.pageSize,
          currentPage: this.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysCompanyexportCompanyList(params).then((res) => {
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
    diaPage(row) {
      this.$router.push({
        name: "companyListDetail",
        query: {
          id: row.id,
          companyId: row.companyId,
        },
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
  width: 100%;
  height: 200px;
  div {
    flex: 1;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .el-input {
    width: 70%;
    padding: 0;
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