<template>
  <div class="step-wrapper" style='padding:30px;'>
    <div class='step-item' :class='{active:current>=index}' v-for='(step,index) in data' :key='step.name'>
      <span class='step-tail' v-if='index>0' :style="{width:index===3?'130px':'120px'}"></span><div class='step-title'>
        <p class='step-icon' style="position:relative;z-index:1;">
          <img :src="step.src" alt="">
        </p>
        <p class='name' style="font-size:15px;font-family:Source Han Sans CN;">{{index+1}}.{{step.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'mySteps',
  props:{
    data:{
      type:Array,
      required:true
    },
    current:{
      default:0
    }
  }
}
</script>

<style lang='less' scoped>
.step-wrapper{
  display:flex;
  border-bottom: 1px solid @border-color;
}
.step-item{
  margin-right:100px;
  position: relative;
}
.step-item.active{
  .step-icon{
    background:linear-gradient(0deg,@redGFrom 0%,@redGTo 100%);
  }
  .name{
    color:rgba(214,53,46,1);
  }
  .step-tail{
    background:@redColor;
  }
}
.step-title{
  text-align: center;
  display:inline-block;
  color:#000;
  font-size: 16px;
  .name{
    font-family:Source Han Sans CN;
    font-weight:lighter;
    color:rgba(196,193,193,1);
  }
}
.step-icon{
  display: inline-block;
  width:57px;
  height:57px;
  line-height: 57px;
  text-align: center;
  margin-bottom:20px;
  background:linear-gradient(0deg,@greyGFrom 0%,@greyGTo 100%);
  border-radius: 50%;
}
.step-tail{
  transition: all .3s ease-out;
  position: absolute;
  left:-110px;
  top:30px;
  width:120px;
  height:3px;
  background:rgba(178,176,176,1);
}
</style>