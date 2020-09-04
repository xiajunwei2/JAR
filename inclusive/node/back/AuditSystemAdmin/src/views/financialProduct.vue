+<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="productName" placeholder="请输入产品名称" style="margin:0 10px ;">
        </el-input>
        <el-select clearable v-model="mechanism" placeholder="所属机构" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id"></el-option>
        </el-select>
        <el-select clearable v-model="loanType" placeholder="贷款类型" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.getAllType" :key="item.id" :label="item.type" :value="item.id">
          </el-option>
        </el-select>
        <el-select clearable v-model="status" placeholder="产品状态" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.sysCodegetCode.CPZTSatue" :key="item.value" :label="item.value"
            :value="item.code"></el-option>
        </el-select>
        <el-select clearable v-model="loanCycle" placeholder="贷款周期" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.sysCodegetCode.DKZQSatue" :key="item.value" :label="item.value"
            :value="item.code"></el-option>
        </el-select>
      </div>
      <div class="head_time">
        <div style="margin:0 10px;">
          <div class="time_msg" style="display:inline;">贷款金额：</div>
          <el-input-number v-model="loanMoneyDown" label="最低金额"></el-input-number> ---
          <el-input-number v-model="loanMoneyUp" label="最高金额"></el-input-number>/万元
        </div>
        <div class="time_msg">上架时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="Times" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchDownload">导出</el-button>
      </div>
    </div>
    <el-row type="flex" justify="flex-start" style="margin:10px 0;">
      <el-button icon="el-icon-plus" type="primary" @click="addProducts()">添加产品</el-button>
      <el-button icon="el-icon-plus" type="primary" @click="addProductssh()">产品审核</el-button>

    </el-row>
    <div class="account_form">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row class="form_table" align="center"
        :data="tableData">
        <vxe-table-column field="id" title="产品ID"></vxe-table-column>
        <vxe-table-column field="productName" title="产品名称"></vxe-table-column>
        <vxe-table-column field="mechanismName" title="所属机构"></vxe-table-column>
        <vxe-table-column field="loanTypeStr" title="贷款类型"></vxe-table-column>
        <vxe-table-column field="loanMoneyUp" title="贷款金额上限(万元)"></vxe-table-column>
        <vxe-table-column title="贷款周期（月）">
          <template v-slot="{ row }">
            <span>{{row.loanCycleDown===row.loanCycleUp? row.loanCycleDown:row.loanCycleDown+'-'+row.loanCycleUp }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="创建时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="statusStr" title="状态"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo" align="left">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="topPage(row,1)">查看</vxe-button>
            <vxe-button type="text" @click="topPage(row,2)">编辑</vxe-button>
            <vxe-button type="text" @click="putShell(row)" v-if="row.status==1">上架</vxe-button>
            <vxe-button type="text" @click="putShell(row)" v-if="row.status==0">下架</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" @page-change="handlePageChange2"
        :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize" :total="page5.totalResult"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api.js";

// 金融产品
export default {
  data() {
    return {
      num: 0,
      productName: "",
      mechanism: "",
      loanType: "",
      status: "",
      loanCycle: "",
      loanMoneyUp: null,
      loanMoneyDown: null,
      Times: [],
      createdTimeUp: "",
      createdTimeDown: "",
      flag: true,
      allAlign: null,
      tableData: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.ajaxTable();
  },
  methods: {
    getTime() {
      if(this.Times!==null){
       this.createdTimeDown = this.Times[0] / 1000;
       this.createdTimeUp = this.Times[1] / 1000;
      }
      if(this.Times===null){
        this.createdTimeUp=''
        this.createdTimeDown=''
      }
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    search() {
      this.page5.currentPage=1
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      vm.getTime();
      this.$store.commit("loadingChange", true);
      let query = {
        content: {
          productName: vm.productName,
          mechanism: vm.mechanism,
          loanType: vm.loanType,
          status: vm.status,
          loanCycle: vm.loanCycle,
          loanMoneyUp: vm.loanMoneyUp,
          loanMoneyDown: vm.loanMoneyDown,
          createdTimeUp: vm.createdTimeUp,
          createdTimeDown: vm.createdTimeDown,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      Api.productInfoproductInfoList(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
          // this.createdTimeUp = ''
          // this.createdTimeDown = ''
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    searchDownload() {
      let params = {
        content: {
          productName: this.productName,
          mechanism: this.mechanism,
          loanType: this.loanType,
          status: this.status,
          loanCycle: this.loanCycle,
          loanMoneyUp: this.loanMoneyUp,
          loanMoneyDown: this.loanMoneyDown,
          createdTimeUp: this.createdTimeUp,
          createdTimeDown: this.createdTimeDown,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.productInfoexportProductInfoList(params).then((res) => {
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
    addProducts() {
      this.$router.push({ name: "addProducts" });
    },
    addProductssh() {
      this.$router.push({ name: "ProductsManage" });
    },
    topPage(item, id) {
      if (id == 1) {
        let query = { ...item };
        query.flag = true;
        this.$router.push({ name: "addProducts", params: query });
      }
      if (id == 2) {
        let query = { ...item };
        query.flag = false;
        this.$router.push({ name: "addProducts", params: query });
      }
    },
    putShell(row) {
      let vm = this;
      let query = {
        id: row.id,
        status: row.status,
      };
      if (row.status == 1) {
        this.$confirm("是否上架?", "上架", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }).then(() => {
          this.$store.commit("loadingChange", true);
          Api.productInfooperate(query).then((res) => {
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
      }
      if (row.status == 0) {
        vm.$confirm("是否下架?", "下架", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }).then(() => {
          this.$store.commit("loadingChange", true);
          Api.productInfooperate(query).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
              vm.page5.pageSize = this.page5.pageSize;
              vm.page5.currentPage = this.page5.currentPage;
              vm.ajaxTable();
            } else {
              this.$message.error(res.msg);
            }
          });
        });
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