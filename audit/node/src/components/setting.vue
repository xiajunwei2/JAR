<template>
  <div class="setting">
    <el-container>
      <el-aside width="200px" style="height: calc(100vh - 60px);background-color: rgb(84, 92, 100);">
        <el-menu router default-active="usermanage" class="el-menu-vertical-demo" background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="usermanage">
            <i class="el-icon-user"></i>用户管理
          </el-menu-item>
          <el-menu-item index="Rolemanagement">
            <i class="el-icon-s-custom"></i>角色管理
          </el-menu-item>
          <el-menu-item index="AuditManage">
            <i class="el-icon-s-check"></i>审核任务管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mue from "@/components/mue.vue";
export default {
  components: {
    mue,
  },
  name: "setting",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.setting {
  .el-menu-item {
    text-align: left;
  }
}
</style>
