<template>
  <div class="zckx">
      <div class="item" v-for="(item,index) in zckxList" :key="index">
          <div class="item-title">关于公开申报2020年第二批工业互联网试点示范项目的通知</div>
          <div class="item-desc">银保监会网站日前发布《中国银保监会办公厅关于进一步做好疫情防控金融服务的通知》（以下简称《通知》）提出，积极帮扶遇困小微企业、个体工、商户，提高小微企业“首贷率”和信用贷款占比，进一步降低小微企业综合融资成本</div>
          <div class="item-btn" @click="look(item)">立即查看</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Zckx',
    data(){
        return {
            zckxList:[
                {
                    title:'关于公开申报2020年第二批工业互联网试点示范项目的通知',
                    desc:'银保监会网站日前发布《中国银保监会办公厅关于进一步做好疫情防控金融服务的通知》（以下简称《通知》）提出，积极帮扶遇困小微企业、个体工、商户，提高小微企业“首贷率”和信用贷款占比，进一步降低小微企业综合融资成本',
                },
                {
                    title:'关于公开申报2020年第二批工业互联网试点示范项目的通知',
                    desc:'银保监会网站日前发布《中国银保监会办公厅关于进一步做好疫情防控金融服务的通知》（以下简称《通知》）提出，积极帮扶遇困小微企业、个体工、商户，提高小微企业“首贷率”和信用贷款占比，进一步降低小微企业综合融资成本',
                },
                {
                    title:'关于公开申报2020年第二批工业互联网试点示范项目的通知',
                    desc:'银保监会网站日前发布《中国银保监会办公厅关于进一步做好疫情防控金融服务的通知》（以下简称《通知》）提出，积极帮扶遇困小微企业、个体工、商户，提高小微企业“首贷率”和信用贷款占比，进一步降低小微企业综合融资成本',
                },
                {
                    title:'关于公开申报2020年第二批工业互联网试点示范项目的通知',
                    desc:'银保监会网站日前发布《中国银保监会办公厅关于进一步做好疫情防控金融服务的通知》（以下简称《通知》）提出，积极帮扶遇困小微企业、个体工、商户，提高小微企业“首贷率”和信用贷款占比，进一步降低小微企业综合融资成本',
                },
            ],
        }
    },
    methods:{
        getZckxList(){

        },
        look(item){
            this.$router.push({path:"/article"})
        }
    }
}
</script>
<style lang="less" scoped>
.zckx{
    display:flex;
    flex-wrap: wrap;
    margin-top: 49px;
    .item:nth-child(2n+2){
        margin-left:65px;
    }
    .item{
        width: 567px;
        background-color: #ffffff;
        border-radius: 10px;
        padding:30px 33px;
        margin-bottom:36px;
        .item-title{
            font-family: SourceHanSansCN-Light;
            font-size: 20px;
            font-weight: bold;
            font-stretch: normal;
            line-height: 27px;
            letter-spacing: 0px;
            color: #333333;
        }
        .item-desc{
            margin-top:26px;
            height: 77px;
            font-family: SourceHanSansCN-Light;
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #999999;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;

        }
        .item-btn{
            margin-top:36px;
            width: 108px;
            height: 32px;
            border-radius: 16px;
            border: solid 1px #e40b02;
            font-family: SourceHanSansCN-Light;
            font-size: 15px;
            font-weight: bold;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #e40b02;
            text-align:center;
            cursor: pointer;
        }
    }
}
</style>