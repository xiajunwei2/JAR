<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // 设置title
    let OriginTitile = document.title;
    let titleTime;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        document.title = "普惠金融服务平台,后台运行中";
        clearTimeout(titleTime);
      } else {
        document.title = "普惠金融服务平台";
        titleTime = setTimeout(function () {
          document.title = OriginTitile;
        }, 2000);
      }
    });
    // 首次加载完成后移除动画
    let loadDOM = document.querySelector("#appLoading");
    if (loadDOM) {
      const animationendFunc = function () {
        loadDOM.removeEventListener("animationend", animationendFunc);
        loadDOM.removeEventListener("webkitAnimationEnd", animationendFunc);
        document.body.removeChild(loadDOM);
        loadDOM = null;
      }.bind(this);
      loadDOM.addEventListener("animationend", animationendFunc);
      loadDOM.addEventListener("webkitAnimationEnd", animationendFunc);
      loadDOM.classList.add("removeAnimate");
    }
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  /deep/.vxe-pager .vxe-pager--jump .vxe-pager--goto {
    width: 60px;
    height: 30px;
  }
  /deep/.vxe-button.type--text {
    color: skyblue;
  }
  /deep/.vxe-pager {
    font-size: 14px;
  }
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
.el-scrollbar__wrap {
  overflow-x: auto !important;
}
.el-select-dropdown__list{
  margin: 15px 0px !important;
}
.account_head{
  font-size:14px;
}
.vxe-cell--title{
  font-size:14px;
}
</style>
