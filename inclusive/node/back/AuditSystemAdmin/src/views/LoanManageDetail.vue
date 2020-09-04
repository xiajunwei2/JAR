<template>
  <div class="LoanManageDetail">
    <div class="LoanManageDetail-header">
      <div class="LoanManageDetail-header-item">
        <step :stepInfo="stepInfo"></step>
      </div>
      <div class="LoanManageDetail-header-btn">
        <el-row :gutter="10">
          <el-col :span="4">
            当前状态：
            <span style="font-weight: 600;">{{statue.statusStr}}</span>
          </el-col>
          <el-col :span="4" v-if="statue.status>=6">
            原因：
            <span style="font-weight: 600;color:red;">{{statue.remark}}</span>
          </el-col>
          <el-col :span="4" v-if="statue.status!=9">
            <template>
              <div v-if="statue.status==0">
                <el-button type="danger" @click="msgBox(0)">通过审核</el-button>
                <el-button type="info" @click="refuseBox(0)">拒绝</el-button>
              </div>
              <div v-if="statue.status==1">
                <el-button type="danger" @click="msgBox(1)">同意受理</el-button>
                <el-button type="info" @click="refuseBox(1)">拒绝</el-button>
              </div>
              <div v-if="statue.status==2">
                <el-button type="danger" @click="msgBox(2)">同意授信</el-button>
                <el-button type="info" @click="refuseBox(2)">拒绝</el-button>
              </div>
              <div v-if="statue.status==3">
                <el-button type="danger" @click="msgBox(3)">放款</el-button>
                <el-button type="info" @click="refuseBox(3)">拒绝</el-button>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="LoanManageDetail-content">
      <el-tabs v-model="activeName1" @tab-click="handleClick">
        <el-tab-pane label="申请人信息" name="first">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">申请企业</div>
                <div class="item-content">{{form.companyName}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">申请人姓名</div>
                <div class="item-content">{{form.workerName}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人手机</div>
                <div class="item-content">{{form.phoneNumber}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人身份证</div>
                <div class="item-content">{{form.idCard}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">社会信用代码</div>
                <div class="item-content">{{form.businessLicense}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">营业执照</div>
                <div class="item-content">{{form.businessLicensePhotos}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">行业类型</div>
                <div class="item-content">{{form.industryTypeStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">经营范围</div>
                <div class="item-content">{{form.busRange}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">人员规模</div>
                <div class="item-content">{{form.staffCountStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业注册地</div>
                <div class="item-content">{{form.egisterAddressStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业经营地</div>
                <div class="item-content">{{form.businessAddressStr}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业经营资料" name="second">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">经营年限</div>
                <div class="item-content">{{form.busYearsStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">近一年度营业额</div>
                <div class="item-content">{{form.lastTurnover}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">固定资产净值</div>
                <div class="item-content">{{form.fixAsset}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">近一年实缴税额</div>
                <div class="item-content">{{form.lastTaxAmount}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">总资产</div>
                <div class="item-content">{{form.asset}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">总负债</div>
                <div class="item-content">{{form.liabilities}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">资产负债率</div>
                <div class="item-content">{{form.debtRatio}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">流动比率</div>
                <div class="item-content">{{form.currentRatio}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">速动比率</div>
                <div class="item-content">{{form.quickRatio}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">现金比率</div>
                <div class="item-content">{{form.cashRatio}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业资质" name="third">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">是否为政府采购供应商</div>
                <div class="item-content item_content">
                  <div class="item_img" v-for="(item,index) in 2" :key="index">
                    <img v-if="form.qyxyFileNode" src="" alt="">
                  </div>
                  <div class="item_text"></div>
                  {{form.qyxyFile}}
                </div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">是否有抵押物</div>
                <div class="item-content">
                  <div style="height:150px">
                    {{form.hasMortgageStr}}
                  </div>
                </div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">有否有企业信用评价等级证书</div>
                <div class="item-content item_content">
                  <div class="item_img">
                    <img v-if="form.qyxyFileNode" src="" alt="">
                  </div>
                  <div class="item_text"></div>
                  {{form.qyxyFile}}
                </div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">有否有纳税信用等级证书</div>
                <div class="item-content item_content">
                  <div class="item_img">
                    <img v-if="form.qyxyFileNode" src="" alt="">
                  </div>
                  <div class="item_text"></div>
                  {{form.qyxyFile}}
                </div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">是否为高新技术认定企业</div>
                <div class="item-content item_content">
                  <div class="item_img">
                    <img v-if="form.qyxyFileNode" src="" alt="">
                  </div>
                  <div class="item_text"></div>
                  {{form.qyxyFile}}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他材料" name="fourth">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">申请企业</div>
                <div class="item-content">{{form.companyName}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">申请人姓名</div>
                <div class="item-content">{{form.workerName}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人手机</div>
                <div class="item-content">{{form.phoneNumber}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人身份证</div>
                <div class="item-content">{{form.idCard}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">社会信用代码</div>
                <div class="item-content">{{form.businessLicense}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">营业执照</div>
                <div class="item-content">{{form.businessLicensePhotos}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">行业类型</div>
                <div class="item-content">{{form.industryTypeStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">经营范围</div>
                <div class="item-content">{{form.busRange}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">人员规模</div>
                <div class="item-content">{{form.staffCountStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业注册地</div>
                <div class="item-content">{{form.egisterAddressStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业经营地</div>
                <div class="item-content">{{form.businessAddressStr}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 同意对话框 -->
    <el-dialog title="提示" :visible.sync="msgVisible" width="300px">
      <span>是否{{msgTitle}}</span>
      <span slot="footer" class="dialog-footer">
        <div style="text-align:center !important;">
          <el-button @click="msgVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="msgVisible = false;sure()" size="mini">确 定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 拒绝对话框 -->
    <el-dialog :title="refuseMsg" :visible.sync="refuseVisible" width="30%">
      <el-row :gutter="0" style="width:100%;">
        <el-input type="textarea" class="reason" :rows="3" placeholder="请输入拒绝内容" v-model="refuseText"></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="refuseVisible = true;sure()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 受理对话框 -->
    <el-dialog title="提示" :visible.sync="loanVisible" width="30%">
      <div>选择受理贷款的分支机构:</div>
      <el-select clearable v-model="value" placeholder="请选择">
        <el-option v-for="item in departsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loanVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="loanVisible = false;sure()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import step from "@/components/step.vue";
import Api from "@/api/api.js";
export default {
  name: "LoanManageDetail",
  components: {
    step,
  },
  data() {
    return {
      departsList: [],
      form: {},
      refuseVisible: false,
      msgVisible: false,
      refuseMsg: null,
      value: null,
      refuseText: null,
      loanVisible: false,
      msgTitle: "",
      stepInfo: {
         list: [
        //   {
        //     status: "操作人：9099999",
        //     statusTime: "2019-11-8 12:12:12",
        //     now: "提交申请",
        //   },
        //   {
        //     status: "操作人：9099999",
        //     statusTime: "2019-11-8 12:12:12",
        //     now: "审核通过",
        //   },
        //   { status: "", statusTime: "", now: "同意受理" },
        //   { status: "", statusTime: "", now: "授信成功" },
        //   { status: "", statusTime: "", now: "放款成功" },
        ],
        // step: 2,
      },
      activeName1: "first",
      statue: {
        status:0,
        statusStr:"待受理"
      },
    };
  },
  mounted() {
    let vm = this;
    vm.getDeatilInfo();
    vm.getDeatilBaseInfo();
  },
  methods: {
    sure() {
      let vm = this;
      let query = {};
      if (this.refuseVisible) {
        let status = this.statue.status+5;
        query = {
          userId:this.$store.state.userInfor.userId,
          id: Number(this.$route.query.id),
          remark: this.refuseText,
          approveStatus: status,
        };
        this.refuseVisible = false;
      } else {
        let status = this.statue.status+1;
        query = {
          userId:this.$store.state.userInfor.userId,
          id: Number(this.$route.query.id),
          remark: "",
          approveStatus: status,
        };
      }
      this.$store.commit("loadingChange", true);
      Api.loanInfoapprove(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.getDeatilInfo();
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    agree() {
      this.loanVisible = !this.loanVisible;
    },
    msgBox(id) {
      let vm = this;

      this.msgVisible = !this.msgVisible;
      let msgTitles = ['确定审核通过？','确定通过受理?','确定通过授信？','确定放款？'];
      this.msgTitle = msgTitles[id]?msgTitles[id]:''
    },
    refuseBox(id) {
      this.refuseVisible = true;
      this.refuseMsg = "请填写拒绝的原因";
    },
    //h获取切换表格数据
    getDeatilBaseInfo() {
      let vm = this;
      this.$store.commit("loadingChange", true);
      let query = {
        id: this.$route.query.id,
        companyId: this.$route.query.companyId,
      }; 
      Api.loanInfoMaterialgetLoanMaterial(query).then((res) => {
        this.$store.commit("loadingChange", false); 
        if (res.code == 0) {
          vm.form = res.content;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //h获取订单数据 
    getDeatilInfo() {
      let vm = this;
      let id = this.$route.query.id;
      this.$store.commit("loadingChange", true);
      Api.approveGetLoanApproveStatus({id:id}).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          this.stepInfo.list=res.content.slice(0,5)
          if(res.content && res.content.length>0){
            // 取出最后一个状态
            this.statue = res.content.slice(-1)[0];
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getdepartsList(){

    }
  },
};
</script>
<style lang="less"  >
//  .el-tabs__item .is-active {
//   color: red!important;
// }
// .el-tabs__active-bar {
//   background-color: red!important;
// }
</style>
<style lang="less" scoped>
.LoanManageDetail {
  .LoanManageDetail-header {
    background-color: #fff;
    height: 22vh;
    .LoanManageDetail-header-item {
      text-align: left;
      height: 17vh;
    }
    .LoanManageDetail-header-btn {
      height: 5vh;
      border-top: 1px solid #eee;
      .el-row {
        height: 5vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
  .LoanManageDetail-content {
    margin-top: 10px;
    padding: 20px;
    background-color: #fff;
    height: 60vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .meg-table {
    border: 1px solid #93c9ff;
    border-bottom: none;
    border-radius: 4px;
    overflow: hidden;

    .item-row {
      display: flex;
      border-bottom: 1px solid #93c9ff;
    }

    .items {
      flex: 1;
      display: flex;

      .item-title {
        width: 240px;
        background: #deefff;
        display: flex;
        align-items: center;
        padding: 8px 10px;
        border-right: 1px solid #93c9ff;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }

      .border-left {
        border-left: 1px solid #93c9ff;
      }

      .item-content {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 8px 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .item_content {
    display: flex;
    justify-content: flex-start;
    .item_img {
      margin-right: 20px;
      width: 200px;
      height: 150px;
      background-color: #93c9ff;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
