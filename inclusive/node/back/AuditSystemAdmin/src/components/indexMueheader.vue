<template>
  <div class="indexMueheader">
    <el-row type="flex" justify="start">
        <div ><i style="cursor: pointer;" @click="isCollapseClick" class="el-icon-s-unfold"></i>｜
        <span style="margin 10px 0;font-size:16px;" >{{$route.meta.title}}</span>
        </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "indexMueheader",
  data() {
    return {
      mue: "首页",
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {
    isCollapseClick(){
      this.$store.commit("isCollapseChange")
    }
  },
};
</script>

<style lang="less" scoped>
.indexMueheader{
  padding: 16px 0 20px; 
  font-size:18px;
  .el-icon-s-unfold{
    font-size:18px;
  }
}
</style>
