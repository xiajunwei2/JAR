<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="account" placeholder="菜单名称"></el-input>
        <el-select clearable v-model="departs" placeholder="菜单状态">
          <el-option v-for="item in $store.state.option.cdztOption" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="time_btn" type="primary" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchclear">重置</el-button>
      </div>
    </div>
    <el-button class="time_btn" type="primary" @click="addmue1" style="width:120px;margin:10px">新增菜单</el-button>
    <div class="account_form">
      <vxe-table class="form_table" border align="center" resizable
        :tree-config="{children: 'childMenuList', accordion: true}" show-header-overflow show-overflow
        highlight-hover-row ref="xTree" :data="tableData">
        <vxe-table-column field="menuName" title="菜单名称" tree-node></vxe-table-column>
        <vxe-table-column field="icon" title="图标"></vxe-table-column>
        <vxe-table-column field="path" title="路由地址"></vxe-table-column>
        <vxe-table-column title="是否为外链">
          <template v-slot="{ row }">
            <template>
              <div v-if="row.isFrame==0">是</div>
              <div v-if="row.isFrame==1">否</div>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column title="菜单类型">
          <template v-slot="{ row }">
            <template>
              <div v-if="row.menuType=='M'">目录</div>
              <div v-if="row.menuType=='C'">菜单</div>
              <div v-if="row.menuType=='F'">按钮</div>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="orderNum" title="排序"></vxe-table-column>
        <vxe-table-column field="perms" title="权限标示"></vxe-table-column>
        <vxe-table-column field="component" title="组件路由"></vxe-table-column>
        <vxe-table-column title="菜单状态">
          <template v-slot="{ row }">
            <template>
              <div v-if="row.status==0">启用</div>
              <div v-if="row.status==1">停用</div>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column title="展示状态">
          <template v-slot="{ row }">
            <template>
              <div v-if="row.visible==0">显示</div>
              <div v-if="row.visible==1">隐藏</div>
            </template>
          </template>
        </vxe-table-column>
        <!-- <vxe-table-column title="创建时间">
          <template v-slot="{ row }">
            <span v-if="row.createdTime">{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column> -->
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="addmue(row)">新增</vxe-button>
            <vxe-button type="text" @click="editmue(row)">编辑</vxe-button>
            <!-- <vxe-button type="text" status="danger" @click="deleteData(row)">删除</vxe-button> -->
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-dialog :visible.sync="Newtree" :title="titleModal" @close="closecdgldialog" width="600px">
      <el-row>
        <el-card style=" color: #000;margin-top:-15px;" shadow="hover">
          <el-form label-width="80px" class="demo-ruleForm" :model="form" ref="form" :rules="rules" v-if="Newtree">
            <el-form-item label="上级菜单" prop="parentId">
              <!-- <el-tree :props="{label:'menuName',children:'childMenuList'}"
                :data="$store.state.sysCodegetCode.sysMenugetSelectMenu" @check-change="getCheckedNodes" show-checkbox
                node-key="menuId" ref="tree" render-after-expand highlight-current v-model="form.menuIds">
              </el-tree> -->
              <el-cascader style="width:100%;" v-model="form.parentId" :options="tableData" clearable
                :props="{children:'childMenuList',label:'menuName',value:'menuId',checkStrictly: true}"></el-cascader>
            </el-form-item>
            <el-form-item label="菜单名称" prop="menuName"
              v-if="form.menuType=='M'||form.menuType=='C'||form.menuType=='F'">
              <el-input style="width: 100%;margin-right: 5px;" clearable v-model="form.menuName" placeholder="请输入菜单名称">
              </el-input>
            </el-form-item>
            <el-form-item label="菜单图标">
              <!-- <el-input v-model="form.icon" placeholder="请输入菜单图标"></el-input> -->
              <el-select default-first-option v-model="form.icon" placeholder="请选择菜单类型" filterable clearable
                style="width:100%;">
                <el-option label="" value="">请选择菜单图标</el-option>
                <el-option v-for="item in icon" :key="item" :label="item" :value="item"><i :class="item"> {{item}}</i>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单类型">
              <el-select default-first-option v-model="form.menuType" placeholder="请选择菜单类型" clearable
                style="width:100%;">
                <el-option label="" value="">请选择菜单类型</el-option>
                <el-option v-for="item in meunTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组件路径" prop="component">
              <el-input style="width: 100%;margin-right: 5px;" clearable v-model="form.component"
                placeholder="请输入组件路径，如：/home"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序">
              <el-input v-model.number="form.orderNum" placeholder="请输入菜单排序" type="number"></el-input>
            </el-form-item>
            <el-form-item label="菜单标识">
              <el-input v-model.trim="form.perms" placeholder="请输入菜单菜单标识"></el-input>
            </el-form-item>
            <el-form-item label="是否外链">
              <div style="text-align:left;">
                <el-switch v-model="form.isFrame" active-color="#dd6161" :active-value="0" :inactive-value="1">
                </el-switch>
              </div>
            </el-form-item>
            <el-form-item label="是否显示">
              <div style="text-align:left;">
                <el-switch v-model="form.visible" active-color="#dd6161" :active-value="0" :inactive-value="1">
                </el-switch>
              </div>
            </el-form-item>
            <el-form-item label="是否启用">
              <div style="text-align:left;">
                <el-switch v-model="form.status" active-color="#dd6161" :active-value="0" :inactive-value="1">
                </el-switch>
              </div>
            </el-form-item>
            <el-row type="flex" justify="center" style="margin-bottom: 10px;">
              <el-button type="success" @click="newItemSure('form')" style="width:120px;">确认保存</el-button>
              <!-- <el-button type="info" @click="CansclnewItemAll('numberValidateForm')" icon="el-icon-circle-close">重置</el-button> -->
              <el-button type="danger" @click="CansclnewItem('form')" style="width:120px;">取消</el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";
// 账号管理
export default {
  data() {
    return {
      value: [],
      addtype: 1,
      icon: [
        "el-icon-platform-eleme",
        "el-icon-eleme",
        "el-icon-delete-solid",
        "el-icon-delete",
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-user",
        "el-icon-phone",
        "el-icon-phone-outline",
        "el-icon-more",
        "el-icon-more-outline",
        "el-icon-star-on",
        "el-icon-star-off",
        "el-icon-s-goods ",
        "el-icon-goods ",
        "el-icon-warning ",
        "el-icon-warning-outline ",
        "el-icon-question ",
        "el-icon-info ",
        "el-icon-remove ",
        "el-icon-circle-plus ",
        "el-icon-success ",
        "el-icon-error ",
        "el-icon-zoom-in               ",
        "el-icon-zoom-out              ",
        "el-icon-remove-outline        ",
        "el-icon-circle-plus-outline   ",
        "el-icon-circle-check          ",
        "el-icon-circle-close          ",
        "el-icon-s-help                ",
        "el-icon-help                  ",
        "el-icon-minus                 ",
        "el-icon-plus                  ",
        "el-icon-check                 ",
        "el-icon-close                 ",
        "el-icon-picture               ",
        "el-icon-picture-outline       ",
        "el-icon-picture-outline-round ",
        "el-icon-upload                ",
        "el-icon-upload2               ",
        "el-icon-download              ",
        "el-icon-camera-solid          ",
        "el-icon-camera                ",
        "el-icon-video-camera-solid    ",
        "el-icon-video-camera          ",
        "el-icon-message-solid         ",
        "el-icon-bell                  ",
        "el-icon-s-cooperation         ",
        "el-icon-s-order               ",
        "el-icon-s-platform            ",
        "el-icon-s-fold                ",
        "el-icon-s-unfold              ",
        "el-icon-s-operation           ",
        "el-icon-s-promotion           ",
        "el-icon-s-home                ",
        "el-icon-s-release             ",
        "el-icon-s-ticket              ",
        "el-icon-s-management          ",
        "el-icon-s-open                ",
        "el-icon-s-shop                ",
        "el-icon-s-marketing           ",
        "el-icon-s-flag                ",
        "el-icon-s-comment             ",
        "el-icon-s-finance             ",
        "el-icon-s-claim               ",
        "el-icon-s-custom              ",
        "el-icon-s-opportunity         ",
        "el-icon-s-data                ",
        "el-icon-s-check               ",
        "el-icon-s-grid                ",
        "el-icon-menu                  ",
        "el-icon-share                 ",
        "el-icon-d-caret               ",
        "el-icon-caret-left            ",
        "el-icon-caret-right           ",
        "el-icon-caret-bottom          ",
        "el-icon-caret-top             ",
        "el-icon-bottom-left           ",
        "el-icon-bottom-right          ",
        "el-icon-back                  ",
        "el-icon-right                 ",
        "el-icon-bottom                ",
        "el-icon-top                   ",
        "el-icon-top-left              ",
        "el-icon-top-right             ",
        "el-icon-arrow-left            ",
        "el-icon-arrow-right           ",
        "el-icon-arrow-down            ",
        "el-icon-arrow-up              ",
        "el-icon-d-arrow-left          ",
        "el-icon-d-arrow-right         ",
        "el-icon-video-pause           ",
        "el-icon-video-play            ",
        "el-icon-refresh               ",
        "el-icon-refresh-right         ",
        "el-icon-refresh-left          ",
        "el-icon-finished              ",
        "el-icon-sort                  ",
        "el-icon-sort-up               ",
        "el-icon-sort-down             ",
        "el-icon-rank                  ",
        "el-icon-view                  ",
        "el-icon-c-scale-to-original   ",
        "el-icon-date                  ",
        "el-icon-edit                  ",
        "el-icon-edit-outline          ",
        "el-icon-folder                ",
        "el-icon-folder-opened         ",
        "el-icon-folder-add            ",
        "el-icon-folder-remove         ",
        "el-icon-folder-delete         ",
        "el-icon-folder-checked        ",
        "el-icon-tickets               ",
        "el-icon-document-remove       ",
        "el-icon-document-delete       ",
        "el-icon-document-copy         ",
        "el-icon-document-checked      ",
        "el-icon-document              ",
        "el-icon-document-add          ",
        "el-icon-printer               ",
        "el-icon-paperclip             ",
        "el-icon-takeaway-box          ",
        "el-icon-search                ",
        "el-icon-monitor               ",
        "el-icon-attract               ",
        "el-icon-mobile                ",
        "el-icon-scissors              ",
        "el-icon-umbrella              ",
        "el-icon-headset               ",
        "el-icon-brush                 ",
        "el-icon-mouse                 ",
        "el-icon-coordinate            ",
        "el-icon-magic-stick           ",
        "el-icon-reading               ",
        "el-icon-data-line             ",
        "el-icon-data-board            ",
        "el-icon-pie-chart             ",
        "el-icon-data-analysis         ",
        "el-icon-collection-tag        ",
        "el-icon-film                  ",
        "el-icon-suitcase              ",
        "el-icon-suitcase-1            ",
        "el-icon-receiving             ",
        "el-icon-collection            ",
        "el-icon-files                 ",
        "el-icon-notebook-1            ",
        "el-icon-notebook-2            ",
        "el-icon-toilet-paper          ",
        "el-icon-office-building       ",
        "el-icon-school                ",
        "el-icon-table-lamp            ",
        "el-icon-house                 ",
        "el-icon-no-smoking            ",
        "el-icon-smoking               ",
        "el-icon-shopping-cart-full    ",
        "el-icon-shopping-cart-1       ",
        "el-icon-shopping-cart-2       ",
        "el-icon-shopping-bag-1        ",
        "el-icon-shopping-bag-2        ",
        "el-icon-sold-out              ",
        "el-icon-sell                  ",
        "el-icon-present               ",
        "el-icon-box                   ",
        "el-icon-bank-card             ",
        "el-icon-money                 ",
        "el-icon-coin                  ",
        "el-icon-wallet                ",
        "el-icon-discount              ",
        "el-icon-price-tag             ",
        "el-icon-news                  ",
        "el-icon-guide                 ",
        "el-icon-male                  ",
        "el-icon-female                ",
        "el-icon-thumb                 ",
        "el-icon-cpu                   ",
        "el-icon-link                  ",
        "el-icon-connection            ",
        "el-icon-open                  ",
        "el-icon-turn-off              ",
        "el-icon-set-up                ",
        "el-icon-chat-round            ",
        "el-icon-chat-line-round       ",
        "el-icon-chat-square           ",
        "el-icon-chat-dot-round        ",
        "el-icon-chat-dot-square       ",
        "el-icon-chat-line-square      ",
        "el-icon-message               ",
        "el-icon-postcard              ",
        "el-icon-position              ",
        "el-icon-turn-off-microphone   ",
        "el-icon-microphone            ",
        "el-icon-close-notification    ",
        "el-icon-bangzhu               ",
        "el-icon-time                  ",
        "el-icon-odometer              ",
        "el-icon-crop                  ",
        "el-icon-aim                   ",
        "el-icon-switch-button         ",
        "el-icon-full-screen           ",
        "el-icon-copy-document         ",
        "el-icon-mic                   ",
        "el-icon-stopwatch             ",
        "el-icon-medal-1               ",
        "el-icon-medal                 ",
        "el-icon-trophy                ",
        "el-icon-trophy-1              ",
        "el-icon-first-aid-kit         ",
        "el-icon-discover              ",
        "el-icon-place                 ",
        "el-icon-location              ",
        "el-icon-location-outline      ",
        "el-icon-location-information  ",
        "el-icon-add-location          ",
        "el-icon-delete-location       ",
        "el-icon-map-location          ",
        "el-icon-alarm-clock           ",
        "el-icon-timer                 ",
        "el-icon-watch-1               ",
        "el-icon-watch                 ",
        "el-icon-lock                  ",
        "el-icon-unlock                ",
        "el-icon-key                   ",
        "el-icon-service               ",
        "el-icon-mobile-phone          ",
        "el-icon-bicycle               ",
        "el-icon-truck                 ",
        "el-icon-ship                  ",
        "el-icon-basketball            ",
        "el-icon-football              ",
        "el-icon-soccer                ",
        "el-icon-baseball              ",
        "el-icon-wind-power            ",
        "el-icon-light-rain            ",
        "el-icon-lightning             ",
        "el-icon-heavy-rain            ",
        "el-icon-sunrise               ",
        "el-icon-sunrise-1             ",
        "el-icon-sunset                ",
        "el-icon-sunny                 ",
        "el-icon-cloudy                ",
        "el-icon-partly-cloudy         ",
        "el-icon-cloudy-and-sunny      ",
        "el-icon-moon                  ",
        "el-icon-moon-night            ",
        "el-icon-dish                  ",
        "el-icon-dish-1                ",
        "el-icon-food                  ",
        "el-icon-chicken               ",
        "el-icon-fork-spoon            ",
        "el-icon-knife-fork            ",
        "el-icon-burger                ",
        "el-icon-tableware             ",
        "el-icon-sugar                 ",
        "el-icon-dessert               ",
        "el-icon-ice-cream             ",
        "el-icon-hot-water             ",
        "el-icon-water-cup             ",
        "el-icon-coffee-cup            ",
        "el-icon-cold-drink            ",
        "el-icon-goblet                ",
        "el-icon-goblet-full           ",
        "el-icon-goblet-square         ",
        "el-icon-goblet-square-full    ",
        "el-icon-refrigerator          ",
        "el-icon-grape                 ",
        "el-icon-watermelon            ",
        "el-icon-cherry                ",
        "el-icon-apple                 ",
        "el-icon-pear                  ",
        "el-icon-orange                ",
        "el-icon-coffee                ",
        "el-icon-ice-tea               ",
        "el-icon-ice-drink             ",
        "el-icon-milk-tea              ",
        "el-icon-potato-strips         ",
        "el-icon-lollipop              ",
        "el-icon-ice-cream-square      ",
        "el-icon-ice-cream-round       ",
      ],
      tableData: [],
      allAlign: null,
      form: {
        parentId: "",
        menuType: "C",
        icon: "",
        menuName: "",
        orderNum: "",
        isFrame: "",
        path: "",
        component: "",
        perms: "",
        visible: "",
        status: "",
      },
      Newtree: false,
      titleModal: "",
      account: "",
      departs: "",
      departsList: [
        {
          value: "1",
          label: "1",
        },
      ],
      rules: {
        index: [{ required: true, message: "请输入菜单排序", trigger: "blur" }],
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        router: [
          { required: true, message: "请输入路由地址", trigger: "blur" },
        ],
      },
      meunTypes:[
        {label:'目录',value:'M'},
        {label:'菜单',value:'C'},
        {label:'按钮',value:'F'},
      ]
    };
  },
  created() {
    this.ajaxTable();
  },
  methods: {
    getCheckedNodes(res,check){
      if(check){
        let ref=this.$refs.tree.getCheckedKeys()
        let str=''
        str=ref.join(',')
        this.addform.menuIds=str
      }
    },
    addmue1() {
      this.Newtree = !this.Newtree;
      this.titleModal = "新增";
      this.addtype = 1;
      this. form={
        parentId: "",
        menuType: "C",
        icon: "",
        menuName: "",
        orderNum: "",
        isFrame: "",
        path: "",
        component: "",
        perms: "",
        visible: "",
        status: "",
      }
    },
    addmue(row) {
      this.addtype = 1;
      this.Newtree = true;
      let vm = this;
      setTimeout(()=>{
        vm.$refs["form"].resetFields();
      },100)
      this.form.parentId = row.menuId;
      this.titleModal = `【${row.menuName}】新增`;
    },
    editmue(row) {
      this.addtype = 2;
      let query = {
        menuId: row.menuId,
      };
      if (row.menuId) {
        this.$store.commit("loadingChange", true);
        Api.sysMenugetGetMenu(query).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            this.Newtree = !this.Newtree;
            this.form = JSON.parse(JSON.stringify(res.content));
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$message.error("菜单信息不全！");
      }
    },
    search() {
      let vm = this;
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      let query = {
        menuName: this.account,
        status: this.departs,
      };
      this.$store.commit("loadingChange", true);
      Api.sysMenugetManageMenu(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    searchclear() {
      this.account = "";
      this.departs = "";
      this.ajaxTable();
    },
    closecdgldialog() {
      this.$refs["form"].resetFields();
    },
    diaPage() {
      this.dialogVisible = !this.dialogVisible;
    },
    newItemSure(forms) {
      let query = JSON.stringify(this.form);
      query = JSON.parse(query);
      this.$store.commit("loadingChange", true);
      if (this.addtype == 2) {
        //修改
        Api.sysMenuupdateMenu(query).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            this.$refs[forms].resetFields();
            this.Newtree = false;
            this.account = "";
            this.departs = "";
            this.ajaxTable();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        query.parentId = Array.isArray(query.parentId)?query.parentId[query.parentId.length-1]:query.parentId
        //新增
        Api.sysMenusaveMenu(query).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            this.$refs[forms].resetFields();
            this.Newtree = false;
            this.account = "";
            this.departs = "";
            this.$store.dispatch("sysMenugetSelectMenu"); //获取所有菜单列表
            this.ajaxTable();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
      
    },
    CansclnewItem(forms) {
      // this.$refs[form].resetFields();
      this.$refs[forms].resetFields();
      this.Newtree = !this.Newtree;
    },
    deleteData(row) {
      // this.deleteVisible=!this.deleteVisible
      this.$confirm(
        "此操作将永久删除菜单：" + row.name + ", 是否继续?",
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
        this.$store.commit("loadingChange", true);
        Api.getCompany(vm.$route.query.id).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            this.account = "";
            this.departs = "";
            this.ajaxTable();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: column;
}
.account_head {
  height: 60px;
  background-color: #fff;
  padding: 20px 30px;
  .head_search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .time_msg {
      margin-right: 15px;
      margin-left: 15px;
    }
    .time_btn {
      margin-left: 25px;
      width: 120px;
    }
    .el-input {
      width: 250px;
      // align-items: center;
      margin-right: 25px;
    }
  }
  .head_time {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    align-items: center;
  }
}
.form_btn {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #333;
  cursor: pointer;
  margin-bottom: 15px;
  margin-top: 25px;
}
.account_form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  box-sizing: border-box;
  padding: 15px;
  .form_table {
    width: 100%;
    margin-bottom: 15px;
    box-sizing: border-box;
    .table_todo {
      display: flex;
      justify-content: space-between;
      span {
        margin: 0 10px;
      }
    }
  }
}
.dia_main {
  display: flex;
  width: 100%;
  height: 200px;
  div {
    flex: 1;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .el-input {
    width: 70%;
    padding: 0;
  }
}
.dia_role {
  display: flex;
  // justify-content: flex-start;
  // flex-wrap: wrap;
  // align-items: center;
  box-sizing: border-box;
  padding-left: 40px;
  .el-form-item__content {
    display: flex;
    justify-content: flex-start;
  }
  .role_radio {
    display: flex;
    justify-content: flex-start;
  }
}
.form_todo {
  span {
    margin: 0 10px;
  }
}
/deep/.el-textarea__inner {
  height: 100px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>