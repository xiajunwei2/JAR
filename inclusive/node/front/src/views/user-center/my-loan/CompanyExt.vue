<template>
  <div class="info">
      <table class="table" border>
          <tr>
              <td class="title">是否为政府采购供应商</td>
              <td class="ctx">
                  <span>{{data.purchaserStr}}</span>
                  <img :src="item.value" alt="" class="ctx-img" v-for='(item,index) in data.purchaserFileNode' :key='index' @click="showImg">
                  <div class="btn-tips" v-show='data.purchaserFileNode && data.purchaserFileNode.length'>点击图片查看</div>
              </td>
          </tr>
          <tr><td class="title">是否有抵押物</td><td class="ctx">{{data.hasMortgageStr}}<span v-show='data.hasMortgage'>（价值预估{{data.mortgageValue}}万元）</span></td></tr>
          <tr>
              <td class="title">有否有企业信用评价等级证书</td>
              <td class="ctx">
                  <span>{{data.qyxyGradeStr}}</span>
                  <img :src="item.value" alt="" class="ctx-img" v-for='(item,index) in data.qyxyFileNode' :key='index' @click="showImg">
                  <div class="btn-tips" v-show='data.qyxyFileNode && data.qyxyFileNode.length'>点击图片查看</div>
              </td>
           </tr>
          <tr>
              <td class="title">有否有纳税信用等级证书</td>
              <td class="ctx">
                  <span>{{data.taxCreditStr}}</span>
                  <img :src="item.value" alt="" class="ctx-img" v-for='(item,index) in data.taxFileNode' :key='index' @click="showImg">
                  <div class="btn-tips" v-show='data.taxFileNode && data.taxFileNode.length'>点击图片查看</div>
              </td>
            </tr>
          <tr>
              <td class="title">是否为高新技术认定企业</td>
              <td class="ctx">
                  <span>{{data.highTechStr}}</span>
                  <img :src="item.value" alt="" class="ctx-img" v-for='(item,index) in data.highFileNode' :key='index' @click="showImg">
                  <div class="btn-tips" v-show='data.highFileNode && data.highFileNode.length'>点击图片查看</div>
              </td>
           </tr>
      </table>
    <Modal v-model="imgshow" class-name="vertical-center-modal" :closable="false">
        <img :src="imgsrc" alt="" class="doc" :style="{width:width,height:height}">
        <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
export default {
    props:['data'],
    data() {
        return {
            imgshow:false,
            imgsrc:'',
            width:'',
            height:''
        }
    },
    methods: {
        showImg(e){
            this.imgsrc = e.target.src;
            this.imgshow = true;
            this.width = e.target.width<520 ? '100%':e.target.width+'px';
            this.height = 'auto';
        }
    },
}
</script>
<style lang="less" scoped>
.info{
    padding:25px 32px;
    .table{
        border:1px solid #E6E6E6;
        td{
            height:55px;
            line-height:55px;
        }
        .title{
            padding:0 30px;
            width:270px;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:300;
            color:rgba(85,85,85,1);
        }
        .ctx{
            padding:15px 35px;
            // padding-left:35px;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:300;
            color:rgba(153,153,153,1);
            span.tips{
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:300;
                color:rgba(47,163,245,1);
                text-decoration: underline;
                cursor: pointer;
            }
            .ctx-img{
                width:123px;
                height:92px;
                vertical-align: text-top;
                margin:0 20px;
            }
            .btn-tips{
                display:inline-block;
                width:103px;
                height:29px;
                line-height:29px;
                text-align:center;
                background:rgba(245,245,250,1);
                font-size:14px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(194,194,194,1);
                vertical-align: bottom;
                cursor: pointer;
            }
        }
    }
}
/deep/ .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    padding:0;
    .doc{
        width:100%;
        height:300px;
    }
    .ivu-modal-body{
        padding:0;
    }
    .ivu-modal-footer{
        display:none;
    }
    .ivu-modal{
        top: 0;
    }
}
</style>