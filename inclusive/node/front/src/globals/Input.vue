<template>
   <div :class="{'input-box':true,'longer-input-box':searchType == 'text'}">
      <span class='prepend' v-if='prepend'>
         <slot name='prepend'></slot>
      </span>
      <input
         :type="type"
         :style='styles'
         :class="{'input-style':true,'small':size=='small','icon-input':searchType == 'icon','text-input':searchType == 'text','prepend-input':prepend}"
         :disabled='disabled'
         v-model="inputValue"
         :placeholder="placeholder" 
         @input="handleInputEv($event,'input')" 
         @keyup.enter="handleInputEv($event,'enter')" 
         @focus="handleInputEv($event,'focus')"
         @blur="handleInputEv($event,'blur')"
         :maxlength="maxLength"
         :autocomplete="false"
      >
      <i class="iconfont icon-sousuoicon search-icon" v-if="searchType == 'icon'" @click="handleInputEv($event,'enter')" ></i>
      <span class="search-text" v-if="searchType == 'text'" @click="handleInputEv($event,'enter')" >搜索</span>
   </div>
</template>

<script>
export default {
   name:'myInput',
   props:{
      placeholder:{
         type:String,
         default:''
      },
      size:{
         default:''
      },
      searchType:{
         type:String,
         default:''
      },
      value:{
         default:''
      },
      type:{
         type:String,
         default:'text'
      },
      disabled:{
         type:Boolean,
         default:false
      },
      maxLength:Number,
      prepend:{
         default:false
      },
      styles:{
         type:Object,
         default:()=>{
            return {}
         }
      }
   },
   data () {
      return {
         inputValue:'', // input框输入内容
      }
   },
   watch:{
      value:{
         immediate:true,
         handler:function(nval,oval){
            this.inputValue = nval
         }
      }
   },
   methods: {
      // input框各种事件
      handleInputEv(e,type){
         switch(type){
            case 'enter':
               // 回车事件
               this.$emit('on-enter',this.inputValue)
               break;
            case 'focus':
               // 聚焦事件
               this.$emit('on-focus')
               break;
            case 'blur':
               // 失去焦点
               this.$emit('on-blur')
               break;
            case 'input':
               // 输入事件
               this.$emit('input',this.inputValue)
         }
      },
   }
}
</script>

<style lang='less'>
.prepend{
   position:absolute;
   width:38px;
   height:calc(100% - 2px);
   background:#dbdddf;
   top:1px;left:1px;
   display:flex;
   justify-content: center;
   align-items: center;
   border-radius: 5px 0 0 5px;
   border-right: 1px solid @border-color;
}
.input-box{
   position: relative;
   display: inline-block;
   width: 100%;
   &.longer-input-box{
      width: 650px;
   }
   .input-style{
      width: 100%;
      background: #fff;
      border: 1px solid @border-color;
      font-size: 1.4rem;
      box-shadow: none;
      border-radius: 5px;
      outline: none;
      padding: 10px 15px;
      color:#333;
      &.small{
         padding:6px 10px;
      }
      &:hover,&:focus{
         border-color:@redColor;
      }
      // 带搜索图标的input框样式
      &.icon-input{
         padding-right: 36px;
      }
      // 带搜索字体的input框样式
      &.text-input{
         width: 100%;
         padding: 0 20px;
      }
      &.prepend-input{
         padding-left:50px;
      }
      &:disabled{
         cursor: not-allowed;
         background:@text-color-disable;
      }
   }
   // 搜索图标
   .search-icon{
      position: absolute;
      width: 16px;
      top:1px;
      height: calc(100% - 2px);
      line-height: 32px;
      background: #fff;
      right: 16px;
      top:1px;
      cursor: pointer;
   }
   // 搜索字体
   .search-text{
      position: absolute;
      width: 74px;
      height: 100%;
      right: 0;
      top: 0;
      background: @redColor;
      font-size: 1.6rem;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
   }
}
input::-webkit-input-placeholder{
   color: @text-color-placeholder !important;
   font-size:14px;
}

</style>
