<template>
  <div class="enterpriceinfo-wrapper">
    <set-title title-name='企业信息'></set-title>
    <div class="form-container">
      <div class='form-box'>
        <div class="form-item">
          <span class='form-item-label inner-label'>企业名称</span>
          <my-input class='form-item-input' v-model="formInfo.name" placeholder="请输入企业名称" :max-length='11' style="color:#C2C2C2;"  >
          </my-input>
        </div>
        <div class="form-item">
          <span class='form-item-label inner-label'>注册地址</span>
          <Select size='large' v-model='formInfo.regProvince' class='jq-select' style='width:50%;margin-right:14px;color:#C2C2C2;font-size:14px;'>
            <Option v-for='ad in addressLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
          </Select>
          <Select size='large' v-model='formInfo.regCounty' class='jq-select' style='width:50%;color:#C2C2C2;font-size:14px;'>
            <Option v-for='ad in subAddLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
          </Select>
        </div>
        <div class="form-item">
          <span class='form-item-label inner-label'>经营地址</span>
          <Select size='large' v-model='formInfo.busProvince' class='jq-select' style='width:50%;margin-right:14px;color:#C2C2C2;font-size:14px;'>
            <Option v-for='ad in addressLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
          </Select>
          <Select size='large' v-model='formInfo.busCounty' class='jq-select' style='width:50%;color:#C2C2C2;font-size:14px;'>
            <Option v-for='ad in subAddLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
          </Select>
        </div>
        <div class="form-item padding-tb-xl" style='margin-left:80px;'>
          <Button class='jq-btn-red' style='width:100px;' @on-click='save'>保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCode from '_c_/get-code.vue'
export default {
  components:{
    getCode
  },
  computed:{
    addressLists(){
      return this.$store.state.addressLists
    },
    subAddLists(){
      return this.$store.state.subAddLists
    }
  },
  data(){
    return {
      viewInfo:true,
      formInfo: {
        name:'',
        regProvince:'',
        regCounty:'',
        busProvince:'',
        busCounty:''
      },
    }
  },
  mounted(){
    this.$api.common.getBuss().then(res=>{
      if(!res.err){
        this.formInfo = res.data
      }
    })
  },
  methods:{
    save(){
      this.$api.common.updateBuss(this.formInfo)
      .then(res=>{
        if(!res.err){
          this.$alert.success('修改成功')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.inner-label{
  width:90px !important;
}
.form-container{
  margin:30px;
  .form-item-label{
    color:#555;
    font-size:16px;
    font-family:Adobe Heiti Std;
  }
  /deep/ .input-box{
     .input-style{
       color:#C2C2C2;
       padding:5px 15px;
     }
  }
  /deep/ .ivu-select-large{
       .ivu-select-selection{
         height:35px;
        .ivu-select-selected-value{
            height:35px;
            line-height:35px;
        }
       }
  }
}
.other-link{
  display: flex;
  justify-content: space-between;
  padding:0 6px;
  .forget{
    color: #666;
    font-size: 12px;
    border-bottom: 1px solid @border-color;
    padding-bottom: 1px;
    &:hover{
      color: @redColor;
      border-color:@redColor;
    }
  }
  .register{
    color: @redColor;
    font-size: 12px;
  }
}
.get-code{
  cursor: pointer;
  position:absolute;
  right:7px;
  top:9px;
  z-index:+1;
  color:@redColor;
}
.user-protocal{
  cursor: pointer;
  color: #8c989f;
  &:hover{
    color:@redColor;
  }
}
</style>