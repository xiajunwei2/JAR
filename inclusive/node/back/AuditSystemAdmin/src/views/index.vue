<template>
  <div class="index">
    <el-row type="flex" class="index-header" justify="space-between" align="center">
      <el-col :span="3">
        <div class="headerTitle">
          <div class="headerline"></div>
          <div class="headerTitle-tetx">数据统计</div>
        </div>
      </el-col>
      <el-col :span="21" style="text-align:right;align-self: center;margin:0 10px;">
        <el-select clearable v-model="value1" placeholder="金融机构">
          <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id"></el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="searchAll">查询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="6" class="cont" type="flex" style="margin:0 10px 0 0;">
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">注册企业</div>
          <div class="cunt-item-count">{{headerData.companyCount}}
            <!-- <vuecountto :startVal="startVal" :endVal="headerData.companyCount" :duration="0">
              </vuecountto> -->
          </div>
          <div class="cunt-item-uni">家</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">贷款申请</div>
          <div class="cunt-item-count">{{headerData.loanApplyCount}}
            <!-- <vuecountto :startVal="startVal" :endVal="headerData.loanApplyCount" :duration="0">
              </vuecountto> -->
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">待审核</div>
          <div class="cunt-item-count">{{headerData.approveCount}}
            <!-- <vuecountto :startVal="startVal" :endVal="headerData.approveCount" :duration="0">
              </vuecountto> -->
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">待受理</div>
          <div class="cunt-item-count">{{headerData.acceptanceCount}}
            <!-- <vuecountto :startVal="startVal" :endVal="headerData.acceptanceCount" :duration="0">
              </vuecountto> -->
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">待放款</div>
          <div class="cunt-item-count">{{headerData.makeLoanCount}}
            <!-- <vuecountto :startVal="startVal" :endVal="headerData.makeLoanCount" :duration="0">
              </vuecountto> -->
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">放款成功</div>
          <div class="cunt-item-count">{{headerData.loanSuccessCount}}
            <!-- <vuecountto :startVal="headerData.loanSuccessCount" :endVal="headerData.loanSuccessCount" :duration="0">
              </vuecountto> -->
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">放款总额</div>
          <div class="cunt-item-count">{{headerData.loanMoney}}
            <!-- <vuecountto :startVal="headerData.loanMoney" :endVal="headerData.loanMoney" :duration="0">
            </vuecountto> -->
          </div>
          <div class="cunt-item-uni">万元</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="index-head-two">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">贷款趋势图</div>
      </div>
      <el-select clearable v-model="value2" placeholder="金融机构">
        <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
          :value="item.id"></el-option>
      </el-select>
      <el-button type="danger" style="margin:0 10px;" @click="searchAllnext">查询</el-button>
    </el-row>
    <div id="indexrightOptions1" style="background:#fff;width:100%;height:30vh"></div>
    <el-row style="background:#fff;padding:0 30px;margin-top:10px;" class="table_tabs">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">订单操作</div>
      </div>
      <vxe-radio-group v-model="selectTab" @change="Tablefirst()" style="marfin-left:10px">
        <vxe-radio-button class="table_btns" :label="0" content="全部贷款"></vxe-radio-button>
        <vxe-radio-button class="table_btns" :label="1" content="待审核"></vxe-radio-button>
        <vxe-radio-button class="table_btns" :label="2" content="待受理"></vxe-radio-button>
      </vxe-radio-group>
    </el-row>
    <el-row style="background:#fff;padding:30px 30px;">
      <div style="background:#fff;padding:0 30px;">
        <vxe-table border :sync-resize="selectTab" :data="tableData" align="center">
          <vxe-table-column type="seq" width="单号"></vxe-table-column>
          <vxe-table-column field="name" title="企业名称"></vxe-table-column>
          <vxe-table-column field="sex" title="贷款类型"></vxe-table-column>
          <vxe-table-column field="address" title="贷款金额(万元)" show-overflow></vxe-table-column>
          <vxe-table-column field="address" title="申请时间" show-overflow>
            <template v-slot="{ row }">
              <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="address" title="操作人" show-overflow></vxe-table-column>
          <vxe-table-column field="address" title="状态" show-overflow></vxe-table-column>
          <vxe-table-column width="300" title="操作" class="table_todo">
            <template v-slot="{ row }">
              <vxe-button type="text" @click="todetai(row)">查看详情</vxe-button>
              <template>
                <vxe-button type="text">通过审核</vxe-button>
                <vxe-button type="text">拒绝</vxe-button>
              </template>
              <template>
                <vxe-button type="text">同意受理</vxe-button>
                <vxe-button type="text">拒绝</vxe-button>
              </template>
              <template>
                <vxe-button type="text">同意授信</vxe-button>
                <vxe-button type="text">拒绝</vxe-button>
              </template>
              <template>
                <vxe-button type="text">已经放款</vxe-button>
                <vxe-button type="text">未放款</vxe-button>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
        <vxe-pager background v-if="page5.totalResult>0" @page-change="handlePageChange2"
          :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize" :total="page5.totalResult"
          :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
        </vxe-pager>
      </div>
    </el-row>
  </div>
</template>

<script>
// 首页
import vuecountto from "vue-count-to";
import Api from "@/api/api.js";
import EchartsLine from "@/components/EchartsLine.vue";
import EchartsPie from "@/components/EchartsPie.vue";
export default {
  name: "index",
  components: {
    EchartsLine,
    EchartsPie,
    vuecountto,
  },
  data() {
    return {
      headerData: {
        companyCount: 0,
        loanApplyCount: 0,
        approveCount: 0,
        acceptanceCount: 0,
        makeLoanCount: 0,
        loanSuccessCount: 0,
        loanMoney: 0,
      },
      loading2: false,
      selectTab: 0,
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      allAlign: null,
      tableData: [],
      radio1: "",
      rightOptions1: {
        chartsId: "rightOptions1",
        title: "",
        yAxis: "",
        chartsDataX: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        chartsData: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      rightOptions2: {
        chartsId: "rightOptions1",
        title: "",
        yAxis: "",
        chartsDataX: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        chartsData: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      EchartsPie1: {
        chartsId: "EchartsPie1",
        title: "",
        yAxis: "",
        chartsDataX: ["已审核", "待审核"],
        chartsData: [
          { value: 335, name: "已审核" },
          { value: 310, name: "待审核" },
        ],
      },
      num: 1,
      EchartsPie2: {
        chartsId: "EchartsPie2",
        title: "",
        yAxis: "",
        chartsDataX: ["已审核", "待审核"],
        chartsData: [
          { value: 335, name: "已审核" },
          { value: 310, name: "待审核" },
        ],
      },
      EchartsPie3: {
        chartsId: "EchartsPie3",
        title: "",
        yAxis: "",
        chartsDataX: ["已审核", "待审核"],
        chartsData: [
          { value: 335, name: "已审核" },
          { value: 310, name: "待审核" },
        ],
      },
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
      startVal: 0,
      value1: "",
      value2: "",
      value3: "",
      radio4: "",
      value4: "",
      radio5: "",
      value5: "",
    };
  },
  mounted() {
    let vm = this;
    vm.searchAll();
    vm.searchAllnext();
    vm.Tablefirst();
    // vm.searchfinnal();
    // vm.searchyear();
    // vm.searchyearDownload();
    // vm.handlePageChange2();
  },
  methods: {
    Tablefirst(id) {
      let vm = this;
      this.num = id; 
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage = this.page5.currentPage;
      this.ajaxTableList();
    },
    ajaxTableList() {
      let vm = this;
      let query = {
        content: {
          approveStatus: this.num,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.loanInfogetPageApproveOrder(query).then((res) => {
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

    searchAll() {
      let vm = this;
      let query = {
        mechanismIds: this.value1,
      };
      Api.homePagegetDataStatistics(query).then((res) => {
        if (res.code == 0) {
          vm.headerData.companyCount = res.content.companyCount;
          vm.headerData.loanApplyCount = res.content.loanApplyCount;
          vm.headerData.approveCount = res.content.approveCount;
          vm.headerData.acceptanceCount = res.content.acceptanceCount;
          vm.headerData.makeLoanCount = res.content.makeLoanCount;
          vm.headerData.loanSuccessCount = res.content.loanSuccessCount;
          vm.headerData.loanMoney = res.content.loanMoney;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    searchAllnext() {
      let query = {
        mechanismIds: this.value2,
      };
      Api.loanInfogetLoanTrends(query).then((res) => {
        if (res.code == 0) {
          let chartsDataX = [];
          let chartsData = [];
          let resData1 = res.content.loanApplyInfos;
          let data1 = [],
            data2 = [],
            data3 = [];
          let resData2 = res.content.loanMoneyInfos;
          let resData3 = res.content.loanSuccessInfos;
          for (let iterator of resData1) {
            chartsDataX.push(iterator.code);
            if (iterator.value != "null" && iterator.value.length) {
              let count = Number(iterator.value);
              data1.push(count);
            } else {
              data1.push(0);
            }
          }
          for (let iterator of resData2) {
            if (iterator.value != "null" && iterator.value.length) {
              let count = Number(iterator.value);
              data2.push(count);
            } else {
              data2.push(0);
            }
          }
          for (let iterator of resData3) {
            if (iterator.value != "null" && iterator.value.length) {
              let count = Number(iterator.value);
              data3.push(count);
            } else {
              data3.push(0);
            }
          }
          chartsData.push(data1);
          chartsData.push(data2);
          chartsData.push(data3);
          var colorList = [
            "#0090ff",
            "#06d3c4",
            "#ffbc32",
            "#2ccc44",
            "#ff3976",
            "#6173d6",
            "#914ce5",
            "#42b1cc",
            "#ff55ac",
            "#0090ff",
            "#06d3c4",
            "#ffbc32",
            "#2ccc44",
            "#ff3976",
            "#6173d6",
            "#914ce5",
            "#42b1cc",
            "#ff55ac",
            "#0090ff",
            "#06d3c4",
            "#ffbc32",
            "#2ccc44",
            "#ff3976",
            "#6173d6",
            "#914ce5",
            "#42b1cc",
            "#ff55ac",
            "#0090ff",
            "#06d3c4",
            "#ffbc32",
            "#2ccc44",
            "#ff3976",
            "#6173d6",
            "#914ce5",
            "#42b1cc",
          ];

          let vm = this;
          let indexmyChart1 = this.$echarts.init(
            document.getElementById("indexrightOptions1")
          );

          let option = {
            legend: {
              data: ["贷款申请（笔）", "放款成功（笔）", "放款金额（百万元）"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: chartsDataX,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "贷款申请（笔）",
                type: "line",
                stack: "总量",
                data: chartsData[0],
              },
              {
                name: "放款成功（笔）",
                type: "line",
                stack: "总量",
                data: chartsData[1],
              },
              {
                name: "放款金额（百万元）",
                type: "line",
                stack: "总量",
                data: chartsData[2],
              },
            ],
          };

          indexmyChart1.setOption(option);
          window.addEventListener("resize", () => {
            indexmyChart1.resize();
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable2();
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .index-header {
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
      position: absolute;
      left: 200px;
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
  .index-head-two {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
  .index-header-two {
    background-color: #fff;
    height: 3vh;
  }
  .rate {
    display: flex;
    .cunt-item {
      border-radius: 10px;
      background-color: #fff;
      margin-top: 10px;
      border: 1px solid #eff3f9;
      .cunt-item-name {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 15px;
        margin-top: 10px;
        height: 60px;
        font-size: 14px;
        div {
          color: red;
          display: inline;
          font-weight: 900;
          // width: 3px;
          margin-right: 15px;
        }
      }
      .EchartsPie {
        height: 25vh;
      }
    }
  }
  .cont {
    height: 12vh;
    .cunt-item {
      border-radius: 10px;
      background-color: #fff;
      margin-top: 10px;
      height: 10vh;
      border: 1px solid #eff3f9;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .cunt-item-name {
        text-align: left;
        margin-left: 5px;
        font-size: 14px;
      }
      .cunt-item-count {
        text-align: center;
        color: red;
        font-size: 28px;
      }
      .cunt-item-uni {
        text-align: right;
        color: #ccc;
        margin-right: 5px;
      }
    }
  }
}
.table_tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  ::v-deep.vxe-radio-button > input:checked + .vxe-radio--label {
    color: #fff;
    background-color: #f44336;
    border: none;
  }
  ::v-deep.vxe-radio-button {
    color: #fff;
    background-color: #353535;
    border: none;
  }
  ::v-deep.vxe-radio-button .vxe-radio--label {
    border: none;
  }
}
</style>
