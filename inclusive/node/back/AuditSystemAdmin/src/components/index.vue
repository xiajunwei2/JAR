<template>
  <div class="indexMue-con">
    <el-container style="height:100%">
      <el-aside
        :class="[$store.state.isCollapse?'one':'two']"
        style="height:100%;background-color:#fff;"
      >
        <indexMue></indexMue>
      </el-aside>
      <el-main class="indexMue-con-el-main">
        <el-container class="indexMue-con-el-container">
          <el-header style="border:1px solid #ccc;background:#fff;" class="header">
            <indexMueheader></indexMueheader>
          </el-header>
          <el-main class="indexMue-con-el-container-main">
            <el-Scrollbar style="height:100%;">
              <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
                <router-view
                  class="indexMue-con-router-view"
                  v-loading="$store.state.loading"
                  element-loading-text="数据拼命处理中,请稍后..."
                />
              </transition>
            </el-Scrollbar>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import indexMue from "@/components/indexMue.vue";
import indexMueheader from "@/components/indexMueheader.vue";
export default {
  name: "indexMue-con",
  components: {
    indexMue,
    indexMueheader,
  }, 
  data() {
    return { 
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.header{
  height: 60px !important;
}
.one {
  width: 64px !important;
}
.two {
  width: 200px !important;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
::v-deep.el-scrollbar__wrap {
  overflow-x: hidden;
}
.indexMue-con {
  height: 100%;
  .indexMue-con-el-main {
    padding: 0;
  }
  .indexMue-con-el-container-main {
    padding: 20px 20px;
    background-color: #eff3f9;
    height: calc(100vh - 80px);
  }
  .el-container .indexMue-con-el-container {
    height: calc(100vh - 80px);
    overflow-x: hidden;
    background-color: #eff3f9;
    box-sizing: border-box;
  }
  .indexMue-con-router-view {
    overflow: hidden;
    // height: calc(100vh - 180px);
  }
}
</style>
