<template>
  <div class="radio-list">
    <div
       v-for="(item, index) in options"
       :key="index"
       class="radio-item"
       :class='{active:selectedValue==item.value}'
       :style="{'text-align':align}"
       @click='getValue(item)'
    >
      {{item.label}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'myRadio',
  data () {
    return {
      selectedValue: ''
    }
  },
  props: {
    value:[String,Number],
    title: String,
    options: [String, Array],
    align:{
      type:String,
      default:'left'
    }
  },
  watch: {
    value:{
      handler:function(val){
        this.selectedValue = val;
      },
      immediate:true
    }
  },
  methods:{
    getValue(item){
      this.selectedValue = item.value
      this.$emit('input', this.selectedValue);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.radio-list {
  display:flex;
  width:100%;
}
.radio-item{
  cursor: pointer;
  border-radius: @border-radius-sm;
  background:@text-color-disable;
  border:1px solid @border-color;
  padding:10px;
  flex:1;
  color:@text-color;
  &.active{
    border-color:@redColor;
    background:#fff;
    color:@redColor;
  }
  &:not(:last-child){
    margin-right:10px;
  }
}

</style>
