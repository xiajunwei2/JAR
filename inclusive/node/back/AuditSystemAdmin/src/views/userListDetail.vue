<template>
  <div class="userListDetail">
    <el-row class="userListDetail-header">
      <el-col :span="3">
        <div class="headerTitle">
          <div class="headerline"></div>
          <div class="headerTitle-tetx">用户信息</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="userListDetail-header-item">
      <el-col :span="12" :offset="6">
        <img src="../assets/img.png" alt style="position: relative;margin-bottom:30px" />
        <span style="position: absolute;margin-left:13%;cursor:pointer;" @click="resetpassword">重置密码</span>
      </el-col>
      <el-col :span="12" :offset="6">
        <div class="meg-table">
          <div class="item-row">
            <div class="items">
              <div class="item-title">用户账号：</div>
              <div class="item-content">{{$route.query.row.userName}}</div>
            </div>
            <div class="items">
              <div class="item-title">账号类型：</div>
              <div class="item-content">{{$route.query.row.companyTypeStr}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="items">
              <div class="item-title">姓名：</div>
              <div class="item-content">{{$route.query.row.nickName}}</div>
            </div>
            <div class="items">
              <div class="item-title">用户ID：</div>
              <div class="item-content">{{$route.query.row.id}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="items">
              <div class="item-title">联系电话：</div>
              <div class="item-content">{{$route.query.row.phoneNumber}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="items">
              <div class="item-title">创建时间：</div>
              <div
                class="item-content"
              >{{$moment($route.query.row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="items">
              <div class="item-title">最后一次登录时间：</div>
              <div class="item-content">{{$route.query.row.loginDate}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="items">
              <div class="item-title">备注：</div>
              <div class="item-content">{{$route.query.row.remark}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="userListDetail-header" style="margin-top:20px ;" v-if="tableData.length">
      <el-col :span="3">
        <div class="headerTitle">
          <div class="headerline"></div>
          <div class="headerTitle-tetx">关联企业</div>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding:20px ;background:#fff;" v-if="tableData.length">
      <vxe-table
        border
        show-header-overflow
        show-overflow
        highlight-hover-row
        align="center"
        :data="tableData"
      >
        <vxe-table-column type="isAdmin" title="序号" width="60"></vxe-table-column>
        <vxe-table-column field="companyName" title="关联企业"></vxe-table-column>
        <vxe-table-column field="roleName" title="角色"></vxe-table-column>
      </vxe-table>
    </el-row>
  </div>
</template>

<script>
import Api from "@/api/api.js";

export default {
  name: "userListDetail",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {
    getMessage() {
      let query = {
        userId: this.$route.query.id,
      };
      this.$store.commit("loadingChange", true);
      Api.sysUsergetGetUser().then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    resetpassword() {
      this.$prompt("请输入新密码", "重置密码操作", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
      }).then((res) => {
        if (res && res.length > 6) {
          this.$store.commit("loadingChange", true);
          let query = {
            userId: this.$store.state.userinfor.userid,
            password: value,
          };
          Api.sysUserresetPassword(query).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("密码至少6位哦！");
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script> 
<style lang="less" scoped>
.meg-table {
  border: 1px solid #93c9ff;
  border-bottom: none;
  border-radius: 4px;
  overflow: hidden;

  .item-row {
    display: flex;
    border-bottom: 1px solid #93c9ff;
  }

  .items {
    flex: 1;
    display: flex;

    .item-title {
      width: 240px;
      background: #deefff;
      display: flex;
      align-items: center;
      padding: 8px 10px;
      border-right: 1px solid #93c9ff;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }

    .border-left {
      border-left: 1px solid #93c9ff;
    }

    .item-content {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 8px 10px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
  }
}
.userListDetail-header-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;

  padding-bottom: 30px;
}
.userListDetail {
  .userListDetail-header {
    .headerTitle {
      display: flex;
      padding: 30px 0;
    }
    .headerline {
      background-color: red;
      width: 5px;
      margin: 0 15px;
    }
    .headerTitle-tetx {
      margin: 0 10px;
    }
    background-color: #fff;
  }
}
</style>
