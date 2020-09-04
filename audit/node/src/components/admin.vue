<template>
  <div class="admin">
    <mue></mue>
    <div>
      <router-view style="overflow: hidden;" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mue from "@/components/mue.vue";

export default {
  name: "admin",
  components: {
    mue,
  },
  created() {},
};
</script>
<style lang="less" scoped>
.admin {
  height: 100vh;
}
</style>