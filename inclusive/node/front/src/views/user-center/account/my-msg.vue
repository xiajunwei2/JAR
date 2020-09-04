<template>
  <div class="account">
      <div class="a-title">
          <span class="line"></span> 我的消息
      </div>
      <Table :columns="columns" :data="accountList" class="table-box" style="width:100%;">
          <template slot="title" slot-scope="{row,index}">
              <div class="edit" @click="$router.push({name:'my-msg-detail'})">
                  {{row.id}} <span class="new" v-if="row.status==1"></span>
              </div>
          </template>
          <template slot="status" slot-scope="{row,index}">
              <div class="edit" v-if="row.status==0">
                  未读
              </div>
              <div class="edit" v-if="row.status==1">
                  已读
              </div>
          </template>
          <template slot="time" slot-scope="{row,index}">
              <div class="edit">
                  2020-08-22
              </div>
          </template>
          <template slot="action" slot-scope="{row,index}">
              <div class="edit">
                  编辑
              </div>
          </template>
      </Table>
      <div class="pages">
          <Page :total="100" show-elevator show-total/>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            accountList:[
                {id:'贷款放款成功',account:'尊敬的用户，恭喜您的企业[重庆况云科技有限公司]在我们平台已经放款成功',name:'唐一仙',role:'管理员',gangwei:'秘书',status:1},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
            ],
            columns:[
                {title:'标题',key:'id',align:'left',width:200,slot:'title'},
                {title:'内容',key:'account',align:'left'},
                {title:'发送时间',key:'name',align:'center',slot:'time',width:200},
                {title:'状态',key:'status',align:'center',slot:'status',width:100},
            ]
        }
    },
}
</script>
<style lang="less" scoped>
.account{
    padding:0px 31px;
    .a-title{
        margin:29px 0px;
        font-size:30px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(51,51,51,1);
        height:33px;
        line-height:33px;
        .line{
            display: inline-block;
            width:6px;
            height:33px;
            background:linear-gradient(-90deg,rgba(243,18,34,1) 0%,rgba(248,67,104,1) 53%,rgba(255,81,47,1) 100%);
            vertical-align:top;
        }
    }
    .table-box{
        .edit{
            cursor: pointer;
            .new{
                display: inline-block;
                width:11px;
                height:11px;
                background:rgba(246,55,55,1);
                border-radius:50%;
                vertical-align: text-top;
            }
        }
    }
    .pages{
        text-align:center;
        padding:15px;
        // #F63737
        /deep/ .ivu-page-item-active{
            background:#F63737;
            border-color: #F63737;
            a{
                color:#fff;
            }
        }
    }
}
</style>