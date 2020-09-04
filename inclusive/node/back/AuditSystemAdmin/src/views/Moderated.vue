<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="companyName" placeholder="企业名称" style="margin:0 10px;">
        </el-input>
        <el-input prefix-icon="el-icon-search" v-model="loanNum" placeholder="贷款单号" style="margin:0 10px;"></el-input>
        <el-select clearable v-model="loanType" placeholder="贷款类型" style="margin:0 10px;">
          <el-option v-for="item in departsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div style="margin:0 10px;">
          <div class="time_msg" style="display:inline;">贷款金额：</div>
          <el-input-number v-model="loanMoneyUp" label="最低金额" :min="0"></el-input-number> ---
          <el-input-number v-model="loanMoneyDown" label="最高金额" :min="0"></el-input-number>/万元
        </div>
      </div>
      <div class="head_time">
        <el-select clearable v-model="mechanism" placeholder="贷款机构" style="margin:0 10px;">
          <el-option v-for="item in $store.state.option.JGLX" :key="item.id" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
        <div class="time_msg">申请时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="applyTime" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchfinnalDown">导出</el-button>
      </div>
    </div>
    <!-- <el-row type="flex" justify="flex-start" style="padding:10px 30px;margin-top:10px;background:#fff;">
      <vxe-radio-group v-model="selectTab" @change="getCurrentTabs">
        <vxe-radio-button :label="0" content="全部贷款"></vxe-radio-button>
        <vxe-radio-button :label="1" content="待审核"></vxe-radio-button>
        <vxe-radio-button :label="2" content="待受理"></vxe-radio-button>
        <vxe-radio-button :label="3" content="待授信"></vxe-radio-button>
        <vxe-radio-button :label="4" content="待放款"></vxe-radio-button>
        <vxe-radio-button :label="5" content="放款成功"></vxe-radio-button>
      </vxe-radio-group>
    </el-row> -->
    <div style="background:#fff;padding:0 30px;" v-loading="loading">
      <vxe-table border :sync-resize="selectTab" :data="tableData" align="center">
        <vxe-table-column field="loanNum" title="单号"></vxe-table-column>
        <vxe-table-column field="companyName" title="企业名称" show-overflow="tooltip"></vxe-table-column>
        <vxe-table-column field="loanTypeStr" title="贷款类型" show-overflow="tooltip"></vxe-table-column>
        <vxe-table-column field="loanMoney" title="贷款金额(万元)" show-overflow></vxe-table-column>
        <vxe-table-column field="applyTime" title="申请时间" show-overflow>
          <template v-slot="{ row }">
            <span>{{$moment(row.applyTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="workerName" title="操作人" show-overflow></vxe-table-column>
        <vxe-table-column field="approveStatusStr" title="状态" show-overflow></vxe-table-column>
        <vxe-table-column width="300" title="操作" class="table_todo" align="left">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="todetai(row)">查看详情</vxe-button>
            <template v-if="row.approveStatus==0">
              <vxe-button type="text" @click="msgBox(row,0,1)">通过审核</vxe-button>
              <vxe-button type="text" @click="refuseBox(row,0,5)">拒审</vxe-button>
            </template>
            <template v-if="row.approveStatus==1">
              <vxe-button type="text" @click="msgBox(row,1,2)">同意受理</vxe-button>
              <vxe-button type="text" @click="refuseBox(row,1,6)">拒绝</vxe-button>
            </template>
            <template v-if="row.approveStatus==2">
              <vxe-button type="text" @click="msgBox(row,2,3)">同意授信</vxe-button>
              <vxe-button type="text" @click="refuseBox(row,2,7)">拒绝</vxe-button>
            </template>
            <template v-if="row.approveStatus==3">
              <vxe-button type="text" @click="msgBox(row,3,4)">已经放款</vxe-button>
              <vxe-button type="text" @click="refuseBox(row,3,8)">未放款</vxe-button>
            </template>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div style="height:20px;backgroundColor:#fff"></div>
    <vxe-pager style="background:#fff;padding:0 30px;" background @page-change="handlePageChange1"
      v-if="page5.totalResult>0" :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize"
      :total="page5.totalResult"
      :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']"></vxe-pager>
    <div style="height:20px;backgroundColor:#fff"></div>
    <!-- 同意对话框 -->
    <el-dialog title="提示" :visible.sync="msgVisible" width="300px">
      <span>是否{{msgTitle}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgVisible = false">取 消</el-button>
        <el-button type="primary" @click="msgVisible = false;ok()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拒绝对话框 -->
    <el-dialog :title="refuseMsg" :visible.sync="refuseVisible" width="350px">
      <!-- <input class="reason" type="text" v-model="refuseText" /> -->
      <el-row :gutter="0" style="width:100%;">
        <el-input type="textarea" style="width:100%;" :rows="6" placeholder="请输入拒绝内容" v-model="refuseText"></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </span>
    </el-dialog>
    <!--受理对话框 -->
    <el-dialog title="提示" :visible.sync="loanVisible" width="300px">
      <div>选择受理贷款的分支机构:</div>
      <el-select clearable v-model="value" placeholder="请选择">
        <el-option v-for="item in departsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loanVisible = false">取 消</el-button>
        <el-button type="primary" @click="loanVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 产品分类
import Api from "@/api/api.js";
export default {
  data() {
    return {
      row: null,
      NeuxStatues: null,
      nowTableIndex: null,
      companyName: "",
      loanNum: "",
      loanType: "",
      mechanism: "",
      loanMoneyUp: null,
      loanMoneyDown: null,
      applyTime: "",
      applyTimeUp: "",
      applyTimeDown: "",
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      value: "",
      refuseText: "",
      msgVisible: false,
      refuseVisible: false,
      loanVisible: false,
      selectTab: 0,
      name: "",
      departsList: [
        {
          value: 0,
          label: "信用贷",
        },
        {
          value: 1,
          label: "抵押贷",
        },
      ],
      approveStatus: 0,
      tableData: [],
      msgTitle: "",
      refuseMsg: "",
      loading: false,
      userId: "",
    };
  },
  created() {
    let vm = this;
    this.getProdList();
    vm.userId = vm.$store.state.userInfor.userId;
  },
  methods: {
    getTime() {
      this.applyTimeUp = this.applyTime[0] / 1000;
      this.applyTimeDown = this.applyTime[1] / 1000;
    },
    handlePageChange1({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.getProdList();
    },
    todetai(row) { 
      this.$router.push({
        name: "LoanManageDetail",
        query: {
          id: row.id,
          companyId: row.companyId,
        },
      });
    },
    agree(row, id, nowTableIndex) {
      this.row = JSON.parse(JSON.stringify(row));
      this.loanVisible = !this.loanVisible;
      this.nowTableIndex = nowTableIndex;
    },
    ok() {
      let vm = this;
      vm.$store.commit("loadingChange", true);
      let query = {
        userId: vm.userId,
        id: vm.row.id,
        remark: vm.refuseText,
        approveStatus: this.nowTableIndex,
      };
      if (this.nowTableIndex==1||this.nowTableIndex==2||this.nowTableIndex==3||this.nowTableIndex==4) {
         delete query.remark
      }
      Api.loanInfoapprove(query).then((res) => {
        vm.refuseVisible = false;
        vm.loanVisible = false;
        vm.msgVisible = false;
        vm.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.page5.currentPage = this.page5.currentPage;
          vm.page5.pageSize = this.page5.pageSize;
          vm.getProdList();
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    msgBox(row, id, nowTableIndex) {
      this.nowTableIndex = nowTableIndex;
      let vm = this;
      this.row = JSON.parse(JSON.stringify(row));
      this.msgVisible = !this.msgVisible;
      if (id == 0) {
        this.msgTitle = "确定审核通过？";
      }
      if (id == 2) {
        this.msgTitle = "确定同意授信？";
      }
      if (id == 3) {
        this.msgTitle = "确定放款？";
      }
    },
    refuseBox(row, id, nowTableIndex) {
      this.nowTableIndex = nowTableIndex;
      let vm = this;
      this.row = JSON.parse(JSON.stringify(row));
      this.refuseVisible = !this.refuseVisible;
      if (id == 0) {
        this.refuseMsg = "请填写拒绝审核的原因";
      }
      if (id == 2) {
        this.refuseMsg = "请填写拒绝授信的原因";
      }
      if (id == 3) {
        this.refuseMsg = "请填写拒绝放款的原因";
      }
    },
    searchfinnalDown() {
      let vm = this;
      let params = {
        content: {
          companyName: this.companyName,
          loanNum: this.loanNum,
          loanType: this.loanType,
          approveStatus: this.approveStatus,
          mechanism: this.mechanism,
          loanMoneyUp: this.loanMoneyUp,
          loanMoneyDown: this.loanMoneyDown,
          applyTimeUp: this.applyTimeUp,
          applyTimeDown: this.applyTimeDown,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      Api.loanInfoexportLoanInfoList(params).then((res) => {
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
    getCurrentTabs(id) {
      let vm = this;
      vm.page5.currentPage = this.page5.currentPage;
      this.approveStatus = id.label;
      this.getProdList();
    },
    searchTime() {
      this.$store.commit("loadingChange", true);
      Api.getCompany().then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getProdList() {
      // 参数
      let params = {
        content: {
          companyName: this.companyName,
          loanNum: this.loanNum,
          loanType: this.loanType,
          approveStatus: this.approveStatus,
          mechanism: this.mechanism,
          loanMoneyUp: this.loanMoneyUp,
          loanMoneyDown: this.loanMoneyDown,
          applyTimeUp:
            this.applyTime && this.applyTime.length > 0
              ? this.applyTime[0]
              : "",
          applyTimeDown:
            this.applyTime && this.applyTime.length > 0
              ? this.applyTime[1]
              : "",
        },
        pager: {
          pageSize: this.page5.pageSize,
          currentPage: this.page5.currentPage,
        },
      };
      this.loading = true;
      this.$store.commit("loadingChange", true);
      Api.loanInfoloanInfoList(params).then((res) => {
        this.$store.commit("loadingChange", false);
        this.loading = false;
        if (res.code == 0) {
          console.log(res);
          this.tableData = res.content.list;
          this.page5.currentPage = res.content.pager.currentPage;
          this.page5.pageSize = res.content.pager.pageSize;
          this.page5.totalResult = res.content.pager.totalCount;
          this.applyTimeUp=''
          this.applyTimeDown=''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    search() {
      this.page5.currentPage = 1;
      this.getProdList();
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
::v-deep.account_form {
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
.vxe-pager {
  text-align: left;
}
.reason {
  width: 70%;
  outline: none;
  border: 1px solid #ccc;
}
</style>