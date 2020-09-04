<template>
  <div class="account">
      <div class="a-title">
          重庆旷云信息科技有限公司
      </div>
      <Table :columns="columns" :data="accountList" class="table-box">
          <template slot="action" slot-scope="{row,index}">
              <div class="edit" @click="edit(row)">
                  编辑
              </div>
          </template>
      </Table>
      <div class="btns-box">
          <div class="btns btn-add" @click="add">添加账号</div>
          <div class="btns btn-rela" @click="relat">关联已有账号</div>
      </div>
      <Modal v-model="showtips" class-name="accounttips" :closable='false'>
          <div slot="header" style="text-align:center;">{{tipsTitle}}</div>
          <Form :model="form" ref="form" label-position="top" :rules="rules" style="width:80%;border-top:0.05vw dashed rgba(191,191,191,1);">
            <FormItem label="账号" prop="tel" style="margin-top:15px;">
                <Input v-model="form.tel" placeholder="请输入输入手机号码"></Input>
            </FormItem>
            <FormItem label="姓名" prop="tel">
                <Input v-model="form.tel" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem label="密码" prop="tel">
                <Input v-model="form.tel" placeholder="请输入不少于6位数的字母+数字组合"></Input>
            </FormItem>
            <FormItem label="职务" prop="tel">
                <Select v-model="form.tel" multiple>
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="账号启用状态:" prop="tel">
                <i-switch v-model="form.tel" size="large" true-color="#ff4949" :true-value="1" :false-value="2">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </i-switch>
            </FormItem>
          </Form>
          <div slot="footer" class="footer">
              <div class="btns btn-cancel" @click="showtips=false">取 消</div>
              <div class="btns btn-check" @click="saveAccount">保 存</div>
          </div>
      </Modal>
      <Modal v-model="showrelat" class-name="accounttips" :closable='false'>
          <div slot="header" style="text-align:center;">关联已有账号</div>
          <Form :model="relaFrom" ref="relaFrom" label-position="top" :rules="relatrules" style="width:80%;border-top:0.05vw dashed rgba(191,191,191,1);">
            <FormItem label="请输入您要关联的账号" prop="tel" style="margin-top:15px;">
                <Input v-model="relaFrom.tel" placeholder="请输入已注册用户的手机号码"></Input>
            </FormItem>
          </Form>
          <div slot="footer" class="footer">
              <div class="btns btn-cancel" @click="showrelat=false">取 消</div>
              <div class="btns btn-check" @click="relatAccount">保 存</div>
          </div>
      </Modal>
  </div>
</template>

<script>
export default {
    data() {
        return {
            accountList:[
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
                {id:1,account:'13800138000',name:'唐一仙',role:'管理员',gangwei:'秘书',status:0},
            ],
            columns:[
                {title:'序号',key:'id',align:'center',},
                {title:'账号',key:'account',align:'center',render:(h,data)=>{
                    console.log(data)
                    return h('div',data.row.account.substr(0,3)+'******'+data.row.account.substr(9,12))
                }},
                {title:'姓名',key:'name',align:'center',},
                {title:'角色',key:'role',align:'center',},
                {title:'职务',key:'gangwei',align:'center',},
                {title:'状态',key:'status',align:'center',render:(h,data)=>{
                    console.log(data)
                    return h('div',data.row.status==0?'禁用':'启用')
                }},
                {title:'操作',slot:'action'},
            ],
            showtips:false,
            showrelat:false,
            tipsTitle:'添加账号',
            form:{
                tel:''
            },
            rules:{
                tel:[{required:true,message:'请输入手机号码',trigger:'blur'}]
            },
            relaFrom:{
                tel:''
            },
            relatrules:{
                tel:[{required:true,message:'请输入手机号码',trigger:'blur'}]
            },

        }
    },
    methods: {
        saveAccount(){

        },
        edit(item){
            this.tipsTitle = '编辑账号',
            this.showtips = true;
        },
        add(){
            this.tipsTitle = '添加账号',
            this.showtips = true;
            this.$refs.form.resetFields();
        },
        relat(){
           this.showrelat = true; 
        },
        relatAccount(){

        }
    },
}
</script>
<style lang="less" scoped>
.account{
    padding:0px 31px;
    .a-title{
        margin:29px 0px;
        font-size:22px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
    .table-box{
        .edit{
            cursor: pointer;
        }
    }
    .btns-box{
        display: flex;
        margin:30px 0px;
        .btns{
            min-width:175px;
            height:43px;
            line-height:43px;
            border:2px solid rgba(241,79,74,1);
            padding:0 15px;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(241,79,74,1);
            cursor: pointer;
            text-align: center;
        }
        .btn-add{
            background:rgba(241,79,74,1);
            color:#fff;
            margin-right:30px;
        }
    }
}
</style>
<style lang="less">
.accounttips{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal-header{
        border:none;
        font-size:24px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .ivu-modal-body{
        width:524px;
        min-height:120px;
        display: flex;
        align-items:center;
        justify-content:center;
        p{
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(153,153,153,1);
            text-align:center;
        }
    }
    .ivu-modal{
        top: 0;
        background:rgba(255,255,255,1);
    }
    .ivu-modal-footer{
        border:none;
        .footer{
            display: flex;
            justify-content: space-around;
            padding-bottom:15px;
            .btns{
                width:124px;
                height:42px;
                line-height:42px;
                border:2px solid rgba(241,79,74,1);
                text-align:center;
                font-size:15px;
                font-family:Source Han Sans CN;
                font-weight:500;
                color:rgba(241,79,74,1);
                cursor: pointer;
            }
            .btn-check{
                background:rgba(241,79,74,1);
                font-size:15px;
                font-family:Source Han Sans CN;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
        }
    }
}
</style>