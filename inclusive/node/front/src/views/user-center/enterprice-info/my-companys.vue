<template>
  <div class="company">
    <div class="company-item" @mouseenter="moveIn(index)" @mouseleave="MoveOut" v-for="(item,index) in companyList">
      <div class="item-info">
        <div class="left">
          <div class="i-flag" v-if='!item.isDefault'>主企业</div>
          <div class="i-name">{{ item.companyName }}</div>
          <Icon type="ios-checkmark-circle" class="c-img" v-show='item.authenticationStatus == 1'/>
          <Icon type="md-information-circle" class="c-img-no" v-show='item.authenticationStatus == 0'/>
          <i class='iconfont icon-cuowu fail-icon' v-show='item.authenticationStatus == -1'/>
          <span class="status">{{ item.authenticationStatusStr }}</span>
        </div>
        <div class="right">
          <!--                v-show='item.authenticationStatus != -1 && item.authenticationStatus != 0'-->
          <div class="btns btn-act" @click="isAnth('zh',item.authenticationStatus)">账号管理</div>
          <!--                v-show='item.authenticationStatus != -1 && item.authenticationStatus != 0'-->
          <div class="btns btn-edit" @click="isAnth('dk',item.authenticationStatus,item)">修改贷款需求</div>
          <!--                v-show='item.authenticationStatus && item.authenticationStatus != -1 && item.authenticationStatus != 0'-->
          <div class="btns btn-one" @click="isAnth('yj',item.authenticationStatus,item.id)">一键贷款</div>
          <div class="btns btn-act" @click="viewFailReason(item)"
               v-show='item.authenticationStatus == -1 && item.authenticationStatus != 0'>查看失败原因
          </div>
        </div>
      </div>
      <div class="loan-info">
        <span class="l-i-tips" v-if="item.loanMoney && item.loanCycleStr">我的贷款需求：</span>
        <span class="l-i-money" v-if="item.loanMoney && item.loanCycleStr">{{ item.loanMoney }}</span>
        <span class="l-i-tips" v-if="item.loanMoney && item.loanCycleStr">元</span>
        <span class="l-i-tips" v-if="item.loanMoney && item.loanCycleStr"
              style="margin-left:62px;">贷款周期：{{ item.loanCycleStr }}个月</span>
        <span v-show="index == current && isMove" class="l-i-change" @click="setMainCamp(item.id)">设为主企业</span>
      </div>
      <!--          <div class="loan-info" v-if="item.authenticationStatus != 0 && item.authenticationStatus != -1">-->
      <!--              <div class="no-finsh" @click="addCompany(item,'complete')">资料待完善</div>-->
      <!--          </div>-->
    </div>
    <div class="add-comp">
      <div class="add-info" @click="addCompany">
        <Icon type="md-add-circle" class="add-btn"/>
        <span>添加企业</span>
      </div>
    </div>
    <Modal v-model="showtips" class-name="tips-com" :closable='false'>
      <div slot="header" style="text-align:center;">提示</div>
      <p>{{ tipsTitle }}</p>
      <div slot="footer" class="footer">
        <div class="btns btn-cancel" @click="showtips=false">取消</div>
        <div class="btns btn-check" @click="checked">确定</div>
      </div>
    </Modal>
    <Modal v-model="showtip" class-name="tips-com" :closable='false'>
      <div slot="header" style="text-align:center;">提示</div>
      <p>{{ tipsContent }}</p>
      <div slot="footer" class="footer">
        <!--        <div class="btns btn-cancel" @click="showtips=false">取消</div>-->
        <div class="btns btn-check" @click="showtip=false">确定</div>
      </div>
    </Modal>
    <!--查看认证失败原因弹框-->
    <mask-layer class='reason-mask' :show='reasonMask.show' title-name='' box-width='550px'
                @close="handleClickMask(false)">
      <template slot='content'>
        <p class='icon-box'><i class='iconfont icon-cuowu'></i></p>
        <div class='reason-content'>
          <p>非常抱歉，您提交的资料认证失败，失败原因为：</p>
          <p v-for='(item,index) in reasonMask.reasonMsgArr' :key='index'>{{ index + 1 + '、' + item }}；</p>
        </div>
        <div class="btns btn-one" @click="handleClickMask(true)">重新认证</div>
      </template>
    </mask-layer>
  </div>
</template>

<script>
import {COM_SERVICE as http} from "@/api/request.js";

export default {
  data() {
    return {
      tipsContent: '',
      isMove: false,
      current: null,
      showtips: false,
      showtip: false,
      tipsTitle: '您还没有完善您的融资需求，是否立刻去完善',
      companyList: [], // 企业列表数据
      currCompany: {id: 1},
      reasonMask: {
        show: false,
        companyId: '',
        reasonMsgArr: []
      }
    }
  },
  created() {
    this.getCompanyList();
  },
  methods: {
    isAnth(type, statu, item) {
      if (type == 'zh') {
        if (statu !== -1 && statu !== 0) {
          this.$router.push({name: 'accounts'})
        } else {
          this.showtip = true
          this.tipsContent = '企业未认证成功，请等待认证成功！'
        }
      }
      if (type == 'dk') {
        if (statu !== -1 && statu !== 0) {
          this.addCompany(item, 'complete')
        } else {
          this.showtip = true
          this.tipsContent = '企业未认证成功，请等待认证成功！'
        }
      }
      if (type == 'yj') {
        if (statu == 1) {
          this.$router.push({name: "loan-matching", query: {companyId: item}})
        } else {
          this.showtip = true
          this.tipsContent = '企业未认证成功或为完善贷款需求！'
        }
      }
    },
    setMainCamp(id) {
      let params = {companyId: id}
      http.post('/sysCompany/setMainCompany', params, 'nauth')
        .then(res => {
          if (res.code == 0) {
            this.getCompanyList()
          }
        }).catch(res => {
      })
    },
    moveIn(index) {
      this.current = index
      this.isMove = true
    },
    MoveOut() {
      this.current = null
      this.isMove = false
    },
    // 获取我的企业列表数据
    getCompanyList() {
      let params = {userId: this.$store.state.user.myBaseInfo.userId}
      http.post('/sysCompany/getCompanyByUserId', params, 'nauth')
        .then(res => {
          if (res.code == 0) {
            this.companyList = res.content || [];
          }
        }).catch(res => {
      })

    },
    // 添加企业或完善资料
    addCompany(data, type) {
      if (type && type == 'complete') {
        // 完善
        this.$router.push({name: 'my-enterprice-info', query: {id: data.id}})
      } else {
        this.$router.push({name: 'add-company'})
      }
    },
    oneLoant(item) {
      this.currCompany = item;
      this.showtips = true;
    },
    checked() {
      // this.$router.push({name:'add-company',params:{companyId:this.currCompany.id}})
      this.showtips = false;
      // 处理modal组件bug，如果在modal组件没完全销毁，就跳转，会产生页面overflow:hidden
      setTimeout(() => {
        this.$router.push({name: 'add-company'})
      }, 100)
    },
    // 查看认证失败原因
    viewFailReason(data) {
      http.post('/sysCompany/getCertificationResult', {authenticationNo: data.authenticationNo}, 'nauth')
        .then(res => {
          if (res.code == 0 && res.content) {
            let reasonArr = [];
            if (res.content.length) {
              res.content.forEach(item => {
                reasonArr.push(item.disableReason);
              })
            }
            this.reasonMask.show = true;
            this.reasonMask.companyId = data.id;
            this.reasonMask.reasonMsgArr = reasonArr;
          }
        })
    },
    // 查看认证失败原因弹框事件
    handleClickMask(bool) {
      if (bool) {
        this.$router.push({name: 'add-company', query: {type: 'certificate', id: this.reasonMask.companyId}});
      } else {
        this.reasonMask.show = false;
      }
    }
  },
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
}

.add-comp {
  width: 100%;
  height: 166px;
  background-color: white;
  //position: relative;
  //top: -10px;
}

//.company-item:hover{
//  border: 1px dashed #BFBFBF;
//}
.company {
  .company-item {
    height: 166px;
    background: rgba(255, 255, 255, 1);
    padding: 44px 30px;
    margin-bottom: 10px;

    .item-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .i-flag {
          width: 66px;
          height: 29px;
          line-height: 29px;
          background: rgba(250, 74, 69, 1);
          color: #fff;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          text-align: center;
          margin-right: 15px;
        }

        .i-name {
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-right: 15px;
        }

        .c-img {
          width: 16px;
          height: 20px;
          color: #5CC508;
          font-size: 22px;
          margin: 0 15px 0 0;
        }

        .c-img-no {
          width: 16px;
          height: 20px;
          color: #B3B0A9;
          font-size: 22px;
          margin: 0 15px 0 0;
        }

        .status {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }

        .fail-icon {
          font-size: 17px;
          font-weight: bold;
          margin-right: 8px;
          color: rgba(241, 79, 74, 1);
        }
      }

      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .btns {
          height: 40px;
          line-height: 40px;
          border: 2px solid rgba(204, 204, 204, 1);
          padding: 0px 15px;
          margin-left: 15px;
          cursor: pointer;
        }

        .btn-act {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
        }

        .btn-edit {
          border: 2px solid rgba(241, 79, 74, 1);
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(241, 79, 74, 1);
        }

        .btn-one {
          border: 2px solid rgba(204, 204, 204, 0);
          background: rgba(241, 79, 74, 1);
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .loan-info {
      margin-top: 25px;

      .l-i-tips {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
      }

      .l-i-money {
        color: #D6352E;
        font-size: 20px;
      }

      .l-i-change {
        color: #D6352E;
        font-size: 16px;
        float: right;
        cursor: pointer;
      }

      .no-finsh {
        margin-top: -15px;
        width: 123px;
        height: 33px;
        line-height: 33px;
        background: rgba(245, 245, 245, 1);
        padding: 0 15px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(191, 191, 191, 1);
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .line {
    height: 11px;
    background: #f5f5fa;
  }

  .checking {
    border: 0.05vw dashed rgba(191, 191, 191, 1);
    padding: 29px 22px;
    margin: 18px 24px 0px;
  }

  .checked {
    padding: 29px 22px;
    margin: 18px 24px 0px;
  }

  .add-info {
    margin: 0 24px;
    position: relative;
    top: 40px;
    height: 77px;
    line-height: 77px;
    text-align: center;
    background: rgba(242, 242, 242, 1);
    cursor: pointer;

    .add-btn {
      width: 22px;
      height: 23px;
      font-size: 20px;
      color: #C1B7B7;
      cursor: pointer;
    }

    span {
      cursor: pointer;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }

  /deep/ .reason-mask .mask-box {
    .mask-title {
      border-bottom: none;
    }

    .mask-content {
      width: 100%;
      padding: 40px;
      text-align: center;
    }

    .icon-box {
      text-align: center;
      margin: 20px 0 30px;
    }

    .iconfont.icon-cuowu {
      font-size: 56px;
      color: rgba(241, 79, 74, 1);
    }

    .reason-content {
      text-align: left;
      line-height: 30px;
    }

    .btn-one {
      width: 163px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      //padding:0px 15px;
      cursor: pointer;
      border: 2px solid rgba(204, 204, 204, 0);
      background: rgba(241, 79, 74, 1);
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 30px auto 0;
    }
  }
}
</style>
<style lang="less">
.tips-com {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal-header {
    border: none;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .ivu-modal-body {
    width: 524px;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      text-align: center;
    }
  }

  .ivu-modal {
    top: 0;
    background: rgba(255, 255, 255, 1);
  }

  .ivu-modal-footer {
    border: none;

    .footer {
      display: flex;
      justify-content: space-around;
      padding-bottom: 15px;

      .btns {
        width: 124px;
        height: 42px;
        line-height: 42px;
        border: 2px solid rgba(241, 79, 74, 1);
        text-align: center;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(241, 79, 74, 1);
        cursor: pointer;
      }

      .btn-check {
        background: rgba(241, 79, 74, 1);
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
