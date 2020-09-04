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
        document.title = "审核系统,后台运行中";
        clearTimeout(titleTime);
      } else {
        document.title = "审核系统";
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
</style>
