<template>
  <div class="index">
    <el-row type="flex" class="index-header" justify="space-between" align="center">
      <el-col :span="3">
        <div class="headerTitle">
          <div class="headerline"></div>
          <div class="headerTitle-tetx">数据统计</div>
        </div>
      </el-col>
      <el-col :span="21" style="text-align:right;align-self: center;margin: 10px;">
        <el-select clearable v-model="value1" placeholder="金融机构">
          <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="searchAll">查询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="cont" type="flex" style="margin:10px 10px 0 0;">
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">注册企业</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.companyCount" :duration="0">
              {{headerData.companyCount}}</span>
          </div>
          <div class="cunt-item-uni">家</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">贷款申请</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.loanApplyCount" :duration="0">
              {{headerData.loanApplyCount}}</span>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">待审核</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.approveCount" :duration="0">
              {{headerData.approveCount}}</span>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">待受理</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.acceptanceCount" :duration="0">
              {{headerData.acceptanceCount}}</span>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">待放款</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.makeLoanCount" :duration="0">
              {{headerData.makeLoanCount}}</span>
          </div>
          <div class="cunt-item-uni">万元</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">放款成功</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.loanSuccessCount" :duration="0">
              {{headerData.loanSuccessCount}}</span>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">放款总额</div>
          <div class="cunt-item-count">
            <span :startVal="startVal" :endVal="headerData.loanMoney" :duration="0">{{headerData.loanMoney}}
            </span>
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
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="danger" style="margin:0 10px;" @click="getEchartone">查询</el-button>
    </el-row>
    <div id="rightOptions1" style="background:#fff;width:100%;height:30vh"></div>
    <el-row :gutter="6" class="rate">
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">
            <div></div>
            <div>|</div>贷款类型占比
            <el-select clearable v-model="value3" @change="getEcharttwo()"
              style="width:50%;position: absolute;right:5px;" placeholder="金融机构">
              <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id"
                :label="item.companyName" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div id="rightOptions2" style="background:#fff;width:100%;height:30vh"></div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">
            <div>|</div>金融机构占比
          </div>
          <div id="rightOptions3" style="background:#fff;width:100%;height:30vh"></div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">
            <div>|</div>贷款企业区域占比
          </div>
          <div id="rightOptions4" style="background:#fff;width:100%;height:30vh"></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="index-head-tree">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">动态数据</div>
      </div>
      <div class="headerTitle-mounth">
        <el-radio-group v-model="radio4" @change="DataChangeDTSJ">
          <template v-for="(item,index) in $store.state.cycle">
            <el-radio-button :label="item.value" :key="index">{{item.label}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <div class="headerTitle-select">
        <el-select clearable v-model="value" placeholder="金融机构">
          <el-option v-for="item in  $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="searchfinnal">查询</el-button>
      </div>
    </el-row>
    <el-row :gutter="6" class="cont" type="flex" style="margin:0 10px 30px 0;">
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">新增注册企业</div>
          <div class="cunt-item-count">
            <vuecountto :startVal="startVal" :endVal="headerDatafooter.companyCount" :duration="10">
              {{headerDatafooter.companyCount}}</vuecountto>
          </div>
          <div class="cunt-item-uni">家</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">新增贷款申请</div>
          <div class="cunt-item-count">
            <vuecountto :startVal="startVal" :endVal="headerDatafooter.applyLoan" :duration="10">
              {{headerDatafooter.applyLoan}}</vuecountto>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">新增金融产品</div>
          <div class="cunt-item-count">
            <vuecountto :startVal="startVal" :endVal="headerDatafooter.product" :duration="10">
              {{headerDatafooter.product}}</vuecountto>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">放款成功</div>
          <div class="cunt-item-count">
            <vuecountto :startVal="startVal" :endVal="headerDatafooter.loanSuccess" :duration="10">
              {{headerDatafooter.loanSuccess}}</vuecountto>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
      <el-col>
        <div class="cunt-item">
          <div class="cunt-item-name">放款金额</div>
          <div class="cunt-item-count">
            <vuecountto :startVal="startVal" :endVal="headerDatafooter.loanMoney" :duration="10">
              {{headerDatafooter.loanMoney}}</vuecountto>
          </div>
          <div class="cunt-item-uni">笔</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="index-head-tree">
      <div class="headerTitle">
        <div class="headerline"></div>
        <div class="headerTitle-tetx">企业贷款金额排行</div>
      </div>
      <div class="headerTitle-mounth">
        <el-radio-group v-model="radio5">
          <template v-for="(item,index) in $store.state.cycle">
            <el-radio-button :label="item.value" :key="index">{{item.label}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <div class="headerTitle-select">
        <el-select clearable v-model="value6" placeholder="金融机构">
          <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="danger" style="margin:0 10px;" @click="searchyearTable">查询</el-button>
        <el-button type="danger" style="margin:0 10px;" @click="searchyearDownload">导出</el-button>
      </div>
    </el-row>
    <el-row style="background:#fff;padding:5px 30px;justify-content: flex-start;padding-bottom:50px;">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row align="center" :data="tableData">
        <vxe-table-column type="seq" title="贷款产品排行" width="120"></vxe-table-column>
        <vxe-table-column field="companyName" title="产品名称"></vxe-table-column>
        <vxe-table-column field="loanCount" title="申请贷款数量（笔）"></vxe-table-column>
        <vxe-table-column field="loanSuccessCount" title="贷款成功（笔）"></vxe-table-column>
        <vxe-table-column field="loanMoneyTotal" title="成功贷款总额（万元）"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">查看详情</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background border v-if="tablePage2.totalResult>tablePage2.pageSize" size="medium"
        :current-page="tablePage2.currentPage" :page-size="tablePage2.pageSize" :total="tablePage2.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange2"></vxe-pager>
    </el-row>
  </div>
</template>

<script>
// 首页

import Api from "@/api/api.js";
import EchartsLine from "@/components/EchartsLine.vue";
import EchartsPie from "@/components/EchartsPie.vue";
import vuecountto from "vue-count-to";
export default {
  name: "index",
  components: {
    EchartsLine,
    EchartsPie,
    vuecountto,
  },
  data() {
    return {
      TimeDymData: {
        weekInfo: {},
        monthInfo: {},
        quarterlyInfo: {},
        yearInfo: {},
      },
      headerData: {
        companyCount: 0,
        loanApplyCount: 0,
        approveCount: 0,
        acceptanceCount: 0,
        makeLoanCount: 0,
        loanSuccessCount: 0,
        loanMoney: 0,
      },
      headerDatafooter: {
        company: 0,
        applyLoan: 0,
        product: 0,
        loanSuccess: 0,
        loanMoney: 0,
      },
      value6: null,
      startVal: 0,
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      allAlign: null,
      tableData: [],
      radio1: "",
      value1: "",
      value2: "",
      value3: "",
      value: "",
      radio4: 1,
      value4: null,
      radio5: 1,
      value5: "",
      loading2: "",
    };
  },
  mounted() {
    if(sessionStorage.getItem('login')=='false'){
      this.$router.push({path:'/login'})
      return ;
    }
    this.$store.commit("loadingChange", false);
    let vm = this;
    vm.searchAll();
    vm.searchfinnal();
    vm.getEchartone();
    vm.searchyearTable();
    vm.getEcharttwo();
    vm.getEcharttree();
    vm.getEchartfour();
  },
  methods: {
    getEchartfour() {
      let vm = this;
      Api.sysCompanygetCompanyArea().then((res) => {
        if (res.code == 0) {
          let chartsDataX = [];
          let chartsData = [];
          let chartsDataAll = [];
          let resData1 = res.content;
          let data = [];
          for (let iterator of resData1) {
            if (iterator.percentage != "null" && iterator.percentage.length) {
              iterator.percentage = Number(iterator.percentage);
              chartsDataX.push(iterator.areaName);
              chartsData.push(iterator.percentage);
              let obj = {
                value: iterator.percentage,
                name: iterator.areaName,
              };
              chartsDataAll.push(obj);
            } else {
              chartsData.push(0);
              chartsDataX.push(iterator.areaName);
              let obj = {
                value: 0,
                name: iterator.areaName,
              };
              chartsDataAll.push(obj);
            }
          }
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
          let myChart4 = this.$echarts.init(
            document.getElementById("rightOptions4")
          );

          let option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: chartsDataX,
            },
            series: [
              {
                label: {
                  position: "inner",
                },
                itemStyle: {
                  normal: {
                    color: function (params) {
                      return colorList[params.dataIndex];
                    },
                  },
                },
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: chartsDataAll,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };
          myChart4.setOption(option);
          window.addEventListener("resize", () => {
            myChart4.resize();
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getEcharttree() {
      let vm = this;
      Api.sysCompanygetMechanismPercentage().then((res) => {
        let chartsDataX = [];
        let chartsData = [];
        let chartsDataAll = [];
        let resData1 = res.content;
        let data = [];
        for (let iterator of resData1) {
          if (iterator.percentage != "null" && iterator.percentage.length) {
            iterator.percentage = Number(iterator.percentage);
            chartsDataX.push(iterator.mechanismId);
            chartsData.push(iterator.percentage);
            let obj = {
              value: iterator.percentage,
              name: iterator.mechanismName,
            };
            chartsDataAll.push(obj);
          } else {
            chartsData.push(0);
            chartsDataX.push(iterator.mechanismId);
            let obj = {
              value: 0,
              name: iterator.mechanismId,
            };
            chartsDataAll.push(obj);
          }
        }
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
        let myChart3 = this.$echarts.init(
          document.getElementById("rightOptions3")
        );

        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: chartsDataX,
          },
          series: [
            {
              label: {
                position: "inner",
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colorList[params.dataIndex];
                  },
                },
              },
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: chartsDataAll,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart3.setOption(option);
        window.addEventListener("resize", () => {
          myChart3.resize();
        });
      });
    },
    getEcharttwo() {
      let vm = this;
      let query = {
        mechanismIds: this.value3,
      };
      Api.loanInfogetProportionLoanTypes(query).then((res) => {
        let chartsDataX = [];
        let chartsData = [];
        let chartsDataAll = [];
        let resData1 = res.content;
        let data = [];
        for (let iterator of resData1) {
          if (iterator.value != "null" && iterator.value.length) {
            iterator.value = Number(iterator.value);
            chartsDataX.push(iterator.code);
            chartsData.push(iterator.value);
            let obj = {
              value: iterator.value,
              name: iterator.code,
            };
            chartsDataAll.push(obj);
          } else {
            chartsData.push(0);
            chartsDataX.push(iterator.code);
            let obj = {
              value: 0,
              name: iterator.code,
            };
            chartsDataAll.push(obj);
          }
        }
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
        let myChart2 = this.$echarts.init(
          document.getElementById("rightOptions2")
        );

        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: chartsDataX,
          },
          series: [
            {
              label: {
                position: "inner",
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colorList[params.dataIndex];
                  },
                },
              },
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: chartsDataAll,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart2.setOption(option);
        window.addEventListener("resize", () => {
          myChart2.resize();
        });
      });
    },
    DataChangeDTSJ() {
      let vm = this;
      if (this.radio4 == 0) {
        vm.headerDatafooter.companyCount = this.TimeDymData.weekInfo.company;
        vm.headerDatafooter.applyLoan = this.TimeDymData.weekInfo.applyLoan;
        vm.headerDatafooter.product = this.TimeDymData.weekInfo.product;
        vm.headerDatafooter.loanSuccess = this.TimeDymData.weekInfo.loanSuccess;
        vm.headerDatafooter.loanMoney = this.TimeDymData.weekInfo.loanMoney;
      }
      if (this.radio4 == 1) {
        vm.headerDatafooter.companyCount = this.TimeDymData.monthInfo.company;
        vm.headerDatafooter.applyLoan = this.TimeDymData.monthInfo.applyLoan;
        vm.headerDatafooter.product = this.TimeDymData.monthInfo.product;
        vm.headerDatafooter.loanSuccess = this.TimeDymData.monthInfo.loanSuccess;
        vm.headerDatafooter.loanMoney = this.TimeDymData.monthInfo.loanMoney;
      }
      if (this.radio4 == 2) {
        vm.headerDatafooter.companyCount = this.TimeDymData.quarterlyInfo.company;
        vm.headerDatafooter.applyLoan = this.TimeDymData.quarterlyInfo.applyLoan;
        vm.headerDatafooter.product = this.TimeDymData.quarterlyInfo.product;
        vm.headerDatafooter.loanSuccess = this.TimeDymData.quarterlyInfo.loanSuccess;
        vm.headerDatafooter.loanMoney = this.TimeDymData.quarterlyInfo.loanMoney;
      }
      if (this.radio4 == 3) {
        vm.headerDatafooter.companyCount = this.TimeDymData.yearInfo.company;
        vm.headerDatafooter.applyLoan = this.TimeDymData.yearInfo.applyLoan;
        vm.headerDatafooter.product = this.TimeDymData.yearInfo.product;
        vm.headerDatafooter.loanSuccess = this.TimeDymData.yearInfo.loanSuccess;
        vm.headerDatafooter.loanMoney = this.TimeDymData.yearInfo.loanMoney;
      }
    },
    //动态数据
    searchfinnal() {
      let vm = this;
      let query = {
        mechanismIds: this.value1,
      };
      Api.homePagegetDynamicData(query).then((res) => {
        if (res.code == 0) {
          // vm.TimeDymData = res.content;
          let data = res.content;
          for (let iterator of data.weekInfo) {

            if (iterator.value != "null" && iterator.value) {
              vm.TimeDymData.weekInfo[iterator.code] = Number(iterator.value);
            } else {
              vm.TimeDymData.weekInfo[iterator.code] = 0;
            }
          }
          for (let iterator of data.monthInfo) {
            if (iterator.value != "null" && iterator.value) {
              vm.TimeDymData.monthInfo[iterator.code] = Number(iterator.value);
            } else {
              vm.TimeDymData.monthInfo[iterator.code] = 0;
            }
          }
          for (let iterator of data.quarterlyInfo) {
            if (iterator.value != "null" && iterator.value) {
              vm.TimeDymData.quarterlyInfo[iterator.code] = Number(
                iterator.value
              );
            } else {
              vm.TimeDymData.quarterlyInfo[iterator.code] = 0;
            }
          }
          for (let iterator of data.yearInfo) {
            if (iterator.value != "null" && iterator.value) {
              vm.TimeDymData.yearInfo[iterator.code] = Number(iterator.value);
            } else {
              vm.TimeDymData.yearInfo[iterator.code] = 0;
            }
          }
          vm.DataChangeDTSJ();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    diaPage(row) {
      this.$router.push({
        name: "SuccessfulLoan",
      });
    },
    //贷款趋势图
    searchAll() {
      let vm = this;
      let query = {
        mechanismIds: this.value2,
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
    getEchartone() {
      let vm = this;
      let query = {
        mechanismIds: this.value3,
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
          let myChart1 = this.$echarts.init(
            document.getElementById("rightOptions1")
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

          myChart1.setOption(option);
          window.addEventListener("resize", () => {
            myChart1.resize();
          });
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    searchyearTable() {
      let vm = this;
      let params = {
        content: {
          mechanism: this.value6,
          cycle: this.radio5,
        },
        pager: {
          pageSize: vm.tablePage2.pageSize,
          currentPage: vm.tablePage2.currentPage,
        },
      };
      Api.loanInfogetCompanyLoanInfo(params).then((res) => {
        if (res.code == 0) {
          vm.tableData = res.content.list;
          this.tablePage2.totalResult = res.content.pager.totalCount;
          this.tablePage2.currentPage = res.content.pager.currentPage;
          this.tablePage2.pageSize = res.content.pager.pageSize;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    searchyearDownload() {
      let vm = this;
      let params = {
        content: {
          mechanism: this.value5,
          cycle: this.radio5,
        },
        pager: {
          pageSize: vm.tablePage2.pageSize,
          currentPage: vm.tablePage2.currentPage,
        },
      };
      Api.getCompany5(params).then((res) => {
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
    handlePageChange2({ currentPage, pageSize }) {
      this.tablePage2.currentPage = currentPage;
      this.tablePage2.pageSize = pageSize;
      this.searchyearTable();
    },
  },
};
</script>

<style lang="less" scoped>
* {
  font-size: 16px;
}
.el-col-24 {
  padding-left: 3px !important;
  padding-right: 3px !important;
}
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
  .index-head-two {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
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
      height: 130px;
      border: 1px solid #eff3f9;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .cunt-item-name {
        text-align: left;
        margin-left: 20px;
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
        margin-right: 20px;
      }
    }
  }
}
.vxe-pager {
  text-align: left;
  margin: 20px 0;
}
</style>
