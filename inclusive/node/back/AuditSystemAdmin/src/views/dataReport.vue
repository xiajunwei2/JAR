<template>
  <div class="index">
    <el-row class="index-head-tree">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">月度贷款数据</div>
      </div>
      <div class="headerTitle-select">
        <el-select clearable v-model="mechanismMaster1" placeholder="金融机构" style="margin:0 10px">
          <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="search1( )">查询</el-button>
        <el-button type="danger" style="margin:0 10px;" @click="searchcountDownload1( )">导出</el-button>
      </div>
    </el-row>
    <el-row style="background:#fff;padding:0 30px;">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row align="center" :data="tableData1">
        <vxe-table-column field="month" title="月份"></vxe-table-column>
        <vxe-table-column field="companyCount" title="贷款企业（家）"></vxe-table-column>
        <vxe-table-column field="loanCount" title="申请贷款总数（笔）"></vxe-table-column>
        <vxe-table-column field="loanSuccessCount" title="贷款成功（笔）"></vxe-table-column>
        <vxe-table-column field="loanMoneyTotal" title="放款金额（万元）"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">详情</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager border v-if="tablePage1.totalResult>0" size="medium" :loading="loading2"
        :current-page="tablePage1.currentPage" :page-size="tablePage1.pageSize" :total="tablePage1.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange1"></vxe-pager>
    </el-row>
    <el-row class="index-head-tree">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">贷款产品数据排行</div>
      </div>
      <div class="headerTitle-mounth">
        <el-radio-group v-model="cycle2">
          <template v-for="(item,index) in $store.state.cycle">
            <el-radio-button :label="item.value" :key="index">{{item.label}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <div class="headerTitle-select">
        <el-select clearable v-model="mechanismMaster2" placeholder="金融机构" style="margin:0 10px">
          <el-option v-for="item in  $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="search2( )">查询</el-button>
        <el-button type="danger" style="margin:0 10px;" @click="searchcountDownload2( )">导出</el-button>
      </div>
    </el-row>
    <el-row style="background:#fff;padding:0 30px 30px 30px;">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row align="center" :data="tableData2">
        <vxe-table-column type="seq" title="贷款产品排行" width="120" fixed="left"></vxe-table-column>
        <vxe-table-column field="productName" title="产品名称"></vxe-table-column>
        <vxe-table-column field="loanCount" title="申请贷款数量（笔）"></vxe-table-column>
        <vxe-table-column field="loanSuccessCount" title="贷款成功（笔）"></vxe-table-column>
        <vxe-table-column field="loanMoneyTotal" title="放款金额（万元）"></vxe-table-column>
        <!-- <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">详情</vxe-button>
          </template>
        </vxe-table-column>-->
      </vxe-table>
      <vxe-pager border size="medium" v-if="tablePage2.totalResult>0" :current-page="tablePage2.currentPage"
        :page-size="tablePage2.pageSize" :total="tablePage2.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange2"></vxe-pager>
    </el-row>
    <el-row class="index-head-tree ">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">企业贷款金额排行</div>
      </div>
      <div class="headerTitle-mounth">
        <el-radio-group v-model="cycle3">
          <template v-for="(item,index) in $store.state.cycle">
            <el-radio-button :label="item.value" :key="index">{{item.label}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <div class="headerTitle-select">
        <el-select clearable v-model="mechanismBranch3" placeholder="金融机构">
          <el-option v-for="item in  $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="ajaxTable3( )">查询</el-button>
        <el-button type="danger" style="margin:0 10px;" @click="searchcountDownload3( )">导出</el-button>
      </div>
    </el-row>
    <el-row style="background:#fff;padding:0 30px 30px 30px;">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row align="center" :data="tableData3">
        <vxe-table-column type="seq" title="贷款产品排行" width="120" fixed="left"></vxe-table-column>
        <vxe-table-column field="companyName" title="产品名称"></vxe-table-column>
        <vxe-table-column field="loanCount" title="申请贷款数量（笔）"></vxe-table-column>
        <vxe-table-column field="loanSuccessCount" title="贷款成功（笔）"></vxe-table-column>
        <vxe-table-column field="loanMoneyTotal" title="成功贷款总额（万元）"></vxe-table-column>
        <!-- <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">详情</vxe-button>
          </template>
        </vxe-table-column>-->
      </vxe-table>
      <vxe-pager border v-if="tablePage3.totalResult>0" size="medium" :current-page="tablePage3.currentPage"
        :page-size="tablePage3.pageSize" :total="tablePage3.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange3"></vxe-pager>
    </el-row>
  </div>
</template>

<script>
// 首页
import Api from "@/api/api.js";
import EchartsLine from "@/components/EchartsLine.vue";
import EchartsPie from "@/components/EchartsPie.vue";
export default {
  name: "index",
  components: {
    EchartsLine,
    EchartsPie,
  },
  data() {
    return {
      cycle3: 0,
      cycle2: 0,
      mechanismBranch1: "",
      mechanismMaster1: "",
      mechanismBranch2: "",
      mechanismMaster2: "",
      mechanismBranch3: "",
      mechanismMaster3: "",
      loading2: false,
      tablePage1: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      tablePage3: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      allAlign: null,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      radio1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  mounted() {
    let vm = this;
    vm.ajaxTable1();
    vm.ajaxTable2();
    vm.ajaxTable3();
  },
  methods: {
    handlePageChange1({ currentPage, pageSize }) {
      this.tablePage1.currentPage = currentPage;
      this.tablePage1.pageSize = pageSize;
      this.ajaxTable1();
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.tablePage2.currentPage = currentPage;
      this.tablePage2.pageSize = pageSize;
      this.ajaxTable2();
    },
    diaPage(row) {
      this.$router.push({
        name: "SuccessfulLoan",
      });
    },
    handlePageChange3({ currentPage, pageSize }) {
      this.tablePage3.currentPage = currentPage;
      this.tablePage3.pageSize = pageSize;
      this.ajaxTable3();
    },
    ajaxTable1() {
      let vm = this;
      this.$store.commit("loadingChange", true);
      let query = {
        content: {
          mechanism: this.mechanismMaster1,
        },
        pager: {
          pageSize: vm.tablePage1.pageSize,
          currentPage: vm.tablePage1.currentPage,
        },
      };
      Api.loanInfogetMonthLoanInfo(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData1 = res.content.list;
          vm.tablePage1.totalResult = res.content.pager.totalCount;
          vm.tablePage1.currentPage = res.content.pager.currentPage;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ajaxTable2() {
      let vm = this;
      this.$store.commit("loadingChange", true);
      let query = {
        content: {
          mechanism: this.mechanismMaster2,
          cycle: this.cycle2,
        },
        pager: {
          pageSize: vm.tablePage2.pageSize,
          currentPage: vm.tablePage2.currentPage,
        },
      };
      Api.loanInfogetProductLoanInfo(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData2 = res.content.list;
          vm.tablePage2.totalResult = res.content.pager.totalCount;
          vm.tablePage2.currentPage = res.content.pager.currentPage;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    ajaxTable3() {
      let vm = this;
      let query = {
        content: {
          mechanism: this.mechanismBranch3,
          cycle: this.cycle3,
        },
        pager: {
          pageSize: vm.tablePage3.pageSize,
          currentPage: vm.tablePage3.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.loanInfogetCompanyLoanInfo(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData3 = res.content.list;
          vm.tablePage3.totalResult = res.content.pager.totalCount;
          vm.tablePage3.currentPage = res.content.pager.currentPage;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    searchcountDownload1() {
      let params = {
        content: {
          mechanism: this.mechanismMaster1,
        },
        pager: {
          pageSize: this.tablePage3.pageSize,
          currentPage: this.tablePage3.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.loanInfoexportMonthLoanInfo(params).then((res) => {
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
    searchcountDownload2() {
      let params = {
        content: {
          cycle: this.cycle2,
          mechanism: this.mechanismMaster2,
        },
        pager: {
          pageSize: this.tablePage2.pageSize,
          currentPage: this.tablePage2.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.loanInfoexportProductLoanInfo(params).then((res) => {
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
    searchcountDownload3() {
      let params = {
        content: {
          cycle: this.cycle3,
          mechanism: this.mechanismBranch3,
        },
        pager: {
          pageSize: this.tablePage3.pageSize,
          currentPage: this.tablePage3.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.loanInfoexportCompanyLoanInfo(params).then((res) => {
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
    search1() {
      let vm = this;
      vm.tablePage1.pageSize = this.tablePage1.pageSize;
      vm.tablePage1.currentPage = this.tablePage1.currentPage;
      this.ajaxTable1();
    },
    search2() {
      let vm = this;
      vm.tablePage2.pageSize = this.tablePage2.pageSize;
      vm.tablePage2.currentPage = this.tablePage2.currentPage;
      this.ajaxTable2();
    },
    search3() {
      let vm = this;
      vm.tablePage3.pageSize = this.tablePage3.pageSize;
      vm.tablePage3.currentPage = this.tablePage3.currentPage;
      this.ajaxTable3();
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .index-head-tree {
    margin-top: 10px;
    display: flex;
    position: relative;
    align-items: center;
    .headerTitle-select {
      position: absolute;
      right: 10px;
    }
    .headerTitle-mounth {
      // position: absolute;
      // left: 200px;
      margin-left: 20px;
    }
    .headerTitle {
      display: flex;
      padding: 30px 0;
    }
    .headerline {
      background-color: red;
      width: 5px;
      margin: 0 15px;
    }
    .headerTitle-tetx {
      margin: 0 10px;
    }
    background-color: #fff;
  }
}
.vxe-pager {
  text-align: left;
  margin: 20px 0;
}
</style>