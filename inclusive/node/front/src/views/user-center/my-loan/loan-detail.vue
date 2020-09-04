<template>
  <div class="detail">
      <div class="progress">
          <div class="progress-box">
              <div class="box-item active-box" v-for='(item,index) in progressAuditData' :key='index'>
                  <div class="i-itm i-pro"><span class="i-circle"></span></div>
                  <div class="i-itm i-title">{{item.statusStr}}</div>
                  <div class="i-itm i-time">{{$moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
              </div>
          </div>
      </div>
      <div class="status">当前状态：{{progressAuditData.length && progressAuditData[progressAuditData.length - 1].statusStr}}</div>
      <div class="bg"></div>
      <div class="ctx">
          <div class="tabs">
              <div class="tab" :class="{'active':active=='CompanyInfo'}" @click="tabChange('CompanyInfo')">申请人信息</div>
              <div class="tab" :class="{'active':active=='CompanyBase'}" @click="tabChange('CompanyBase')">企业经营资料</div>
              <div class="tab" :class="{'active':active=='CompanyExt'}" @click="tabChange('CompanyExt')">补充资质</div>
          </div>
          <Component :is="active" :data='this.loanDetail'></Component>
      </div>
  </div>
</template>
<script>
import {COM_SERVICE as http} from "@/api/request.js";
export default {
    data() {
        return {
            active:'CompanyInfo',
            companyId:'',
            loanId:'',
            loanDetail:'', // 贷款详情
            progressAuditData:[], // 审核进度
        }
    },
    created(){
      this.$nextTick(()=>{
        document.getElementsByClassName('user-center-right')[0].setAttribute('style', 'background : #ffffff')
      })
        this.companyId = this.$route.query.companyId || '';
        this.loanId = this.$route.query.loanId || '';
        this.getLoanDetail();
        this.getLoanProgressAudit();
    },
    methods: {
        tabChange(index){
            this.active = index;
        },
        // 获取贷款详情
        getLoanDetail(){
            http.post('/loanInfoMaterial/getLoanMaterial',{companyId:this.companyId,id:this.loanId},'nauth')
            .then(res=>{
                if(res.code == 0){
                    this.loanDetail = res && res.content || '';
                }
            })
        },
        // 查询贷款审核进度
        getLoanProgressAudit(){
            http.post('/approve/getLoanApproveStatus',{id:this.loanId},'nauth')
            .then(res=>{
                if(res.code == 0){
                    this.progressAuditData = res.content || [];
                }
            })
        }

    },
    components:{
        CompanyInfo:()=>import('@/views/user-center/my-loan/CompanyInfo.vue'),
        CompanyBase:()=>import('@/views/user-center/my-loan/CompanyBase.vue'),
        CompanyExt:()=>import('@/views/user-center/my-loan/CompanyExt.vue'),
    }
}
</script>
<style lang="less" scoped>
*{
    cursor: default;
}
.detail{
    .progress{
        width:100%;
        height:117px;
        display: flex;
        align-items: center;
        padding:0 23px;
        background:#fff;
        .progress-box{
            width:100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .box-item{
                flex:3;
                display: flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items:center;
                .i-itm{
                    height:15px;
                    margin:5px auto;
                    text-align:center;
                    color:#C2BDBD;
                }
                .i-time{
                    opacity:0;
                }
                .i-pro{
                    width:100%;
                    position: relative;
                    height:20px;
                    display: flex;
                    justify-content:space-between;
                    align-items:center;
                    .i-circle{
                        width:18px;
                        height:15px;
                        background:rgba(245,47,62,0);
                        border-radius:50%;
                        z-index:9;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &::before{
                            content:"";
                            width:9px;
                            height:9px;
                            background:rgba(230,230,230,1);
                            border-radius:50%;
                            z-index:10;
                        }
                    }
                    &::before{
                        content:'';
                        width:50%;
                        height:2px;
                        background:rgba(230,230,230,1);
                        // position: absolute;
                        // left:0px;
                        // top:50%;
                        // transform:translateY(-50%);
                    }
                    &::after{
                        content:'';
                        width:50%;
                        height:2px;
                        background:rgba(230,230,230,1);
                        // position: absolute;
                        // right:0px;
                        // top:50%;
                        // transform:translateY(-50%);
                    }
                }
                .is-wait{
                    &::before{
                        content:'';
                        background:rgba(245,47,62,1);
                    }
                }

                .i-time{
                    padding:0 5px;
                }
            }
            .box-item:nth-child(1),.box-item:last-child{
                flex:2;
            }
            .box-item:nth-child(1) .i-pro{
                &::before{
                    content:'';
                    width:50%;
                    height:2px;
                    background:rgba(245,47,62,0);
                }
            }
            .box-item:last-child .i-pro{
                &::after{
                    content:'';
                    width:50%;
                    height:2px;
                    background:rgba(245,47,62,0);
                }
            }
            .active-box{
                .i-pro{
                    .i-circle{
                        background:rgba(245,47,62,0.5);
                        &::before{
                            background:rgba(245,47,62,1);
                        }
                    }
                    &::before{
                        content:'';
                        background:rgba(245,47,62,1);
                    }
                    &::after{
                        content:'';
                        background:rgba(245,47,62,1);
                    }
                }
                .i-title{
                    font-size:14px;
                    font-family:Source Han Sans CN;
                    font-weight:400;
                    color:rgba(245,47,62,1);
                }
                .i-time{
                    opacity:1;
                }
            }
            // .active-box:last-child{
            //     background:red;
            //     .i-pro{
            //         &::after{
            //             content:'';
            //             // background:rgba(230,230,230,1);
            //             background:red;
            //         }
            //     }
            // }
        }
    }
    .status{
        height:41px;
        line-height:41px;
        text-align:center;
        background:rgba(207,211,217,1);
        font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .bg{
        height:11px;
        background:#f5f5fa;
    }
    .ctx{
        .tabs{
            height:60px;
            display: flex;
            align-items:center;
            border-bottom:1px solid rgba(225,225,230,1);
            .tab{
                padding:0 32px;
                margin:24px 0px;
                font-size:18px;
                font-family:Source Han Sans CN;
                font-weight:500;
                color:rgba(51,51,51,1);
                position: relative;
                cursor: pointer;
                &:hover{
                    &::after{
                        content: "";
                        width:50%;
                        height:2px;
                        background:rgba(245,47,62,1);
                        position: absolute;
                        bottom:-20px;
                        left:50%;
                        transform: translateX(-50%);
                    }
                }
            }
            .active{
                &::after{
                    content: "";
                    width:50%;
                    height:2px;
                    background:rgba(245,47,62,1);
                    position: absolute;
                    bottom:-20px;
                    left:50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
}
</style>
