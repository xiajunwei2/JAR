<template>
  <div class="indexMue">
    <el-menu router unique-opened :default-active="$store.state.nowMue" class="el-menu-vertical-demo" text-color="#000"
      @select="handleSelect" :collapse="$store.state.isCollapse" active-text-color="#000">
      <el-menu-item index="/adminIndex">首页</el-menu-item>
      <el-submenu :index="index+' '" v-for="(item,index) in $store.state.sysCodegetCode.leftListMenu.slice(1)" :key="index" router>
        <template slot="title">
          <i :class="item.icon?item.icon:'el-icon-location'"></i>
          <span>{{item.menuName}}</span>
        </template>
        <el-menu-item-group v-if="item.childMenuList">
          <el-menu-item :index="sitem.component" v-for="(sitem,index) in item.childMenuList" :key="index">{{sitem.menuName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "indexMue",
  data() {
    return {
      dmuedata: "/adminIndex",
      isCollapse: false,
      menuList: [
        {
          title: "贷款管理",
          path: "",
          items: [
            {
              title: "全部贷款",
              path: "/LoanManage",
            },
            {
              title: "等待审核",
              path: "/Moderated",
            },
            {
              title: "等待受理",
              path: "/Acceptance",
            },
            {
              title: "等待授信",
              path: "/Credit",
            },
            {
              title: "等待放款",
              path: "/WaitingForLoan",
            },
            {
              title: "成功放款记录",
              path: "/SuccessfulLoan",
            }
          ],
        },
        {
          title: "数据中心",
          path: "",
          items: [
            {
              title: "数据报表",
              path: "/dataReport",
            },
          ],
        },
        {
          title: "机构管理",
          path: "",
          items: [
            {
              title: "机构列表",
              path: "/mechanismList",
            },
            {
              title: "金融产品管理",
              path: "/financialProduct",
            },
            {
              title: "产品分类管理",
              path: "/productCategory",
            },
          ],
        },
        {
          title: "企业管理",
          path: "",
          items: [
            {
              title: "企业列表",
              path: "/companyList",
            },
          ],
        },
        {
          title: "用户管理",
          path: "",
          items: [
            {
              title: "用户列表",
              path: "/userList",
            },
          ],
        },
        {
          title: "机构",
          path: "",
          items: [
            {
              title: "首页(机构)",
              path: "/index",
            },
            {
              title: "数据中心(机构)",
              path: "/indexMechanism",
            },
          ],
        },
        {
          title: "系统设置",
          path: "",
          items: [
            {
              title: "账号管理",
              path: "/accountManage",
            },
            {
              title: "角色管理",
              path: "/roleManage",
            },
            {
              title: "部门管理",
              path: "/departManage",
            },
            {
              title: "操作日志",
              path: "/logs",
            },
            {
              title: "菜单管理",
              path: "/systemManage",
            },
            {
              title: "岗位管理",
              path: "/workManage",
            },
          ],
        },
      ],
    };
  },
  watch: {
    "$store.state.isCollapse": function () {
      this.isCollapse = this.$store.state.isCollapse;
    },
    $route(to, form) { 
      let vm = this;
      let arr = "/" + to.path.split("/")[1]; 
      this.activeLeftMenu = arr;
      this.$store.commit("nowMueChange", arr);
    },
  }, 
  methods: {
    //侧边栏菜单
    handleSelect(key, keyPath) { 
      let arr = "/" + key.split("/")[1]; 
      this.activeLeftMenu = arr;
      this.$store.commit("nowMueChange", arr);
    }, 
  },
};
</script>
<style lang="less"  >
.indexMue{
  /deep/ .el-submenu__title{
    padding-left:0px !important;
  }
}
.el-menu-vertical-demo {
  background-color: #fff;
  font-size: 18px;
  .el-menu-item{
    font-size: 16px;
    padding-left:20px !important;
  }
  & .is-active:not(.el-submenu) {
    background-color: red;
    font-size: 16px;
  }
  & > li {
    background-color: #fff;
    font-size: 18px;

    .el-submenu__title {
      background-color: #fff;
      font-size: 16px;
      padding-left:0px !important;
    }

    & > ul {
      background-color: #fff;
      font-size: 18px;

      & > li {
        background-color: #fff;
        font-size: 18px;

        .el-submenu__title {
          background-color: #fff;
          font-size: 16px;
        }

        & > ul {
          background-color: #fff;
          font-size: 16px;

          & > li {
            background-color: #fff;
            font-size: 16px;
          }

          & > .is-active {
            background-color: red;
            font-size: 16px;
          }

          & > .is-opened {
            background-color: #fff;
            font-size: 16px;
          }
        }
      }

      & > .is-active {
        background-color: red;
        font-size: 18px;
      }
      .el-menu-item{
        font-size: 16px;
        padding-left:40px !important;
      }
      .el-menu-item .is-active {
        background-color: red;
        font-size: 16px;
      }
      & > .is-opened {
        background-color: #fff;
        font-size: 18px;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        outline: 0;
        background-color: red;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.indexMue {
}
</style>
