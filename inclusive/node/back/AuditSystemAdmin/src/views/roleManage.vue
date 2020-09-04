<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="form.roleName" placeholder="角色名称"></el-input>
        <el-input prefix-icon="el-icon-search" v-model="form.roleKey" placeholder="权限字符"></el-input>
        <el-select clearable v-model="form.status" placeholder="角色状态">
          <el-option v-for="item in $store.state.option.jsztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <div class="time_msg">注册时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="Time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
      </div>
    </div>

    <div class="form_btn">
      <el-button icon="el-icon-plus" type="primary" @click="addRoles()">添加角色</el-button>
    </div>
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="tableData">
        <vxe-table-column field="roleId" title="角色编号"></vxe-table-column>
        <vxe-table-column field="roleName" title="角色名称"></vxe-table-column>
        <vxe-table-column field="roleKey" title="权限字符"></vxe-table-column>
        <vxe-table-column field="roleSort" title="显示顺序"></vxe-table-column>
        <vxe-table-column field="remark" title="备注"></vxe-table-column>
        <vxe-table-column title="创建时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="statusStr" title="状态"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">编辑</vxe-button>
            <vxe-button type="text" @click="deleteData(row)">删除</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background :current-page.sync="page5.currentPage" :page-size.sync="page5.pageSize"
        :total="page5.totalResult" @page-change="handlePageChange2" v-if="page5.totalResult>0"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="25%">
      <div class="dia_form" v-if="dialogVisible">
        <el-form ref="closedialogRole" :rules="rules" :model="addform" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addform.roleName"></el-input>
          </el-form-item>
          <el-form-item label="权限字符" prop="roleKey">
            <el-input v-model="addform.roleKey"></el-input>
          </el-form-item>
          <el-form-item label="角色顺序" prop="roleSort">
            <el-input v-model="addform.roleSort"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left" label="账号状态:">
            <el-switch v-model="addform.status" :active-value="0" :inactive-value="1"
              :active-text="addform.status===0?'启用':'禁用'" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item style="text-align:left" label="备注:">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addform.remark"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left" label="菜单权限:">
            <el-tree :props="{label:'menuName',children:'children'}"
              :data="$store.state.sysCodegetCode.sysMenugetSelectMenu[0].children" @check-change="getCheckedNodes"
              show-checkbox node-key="menuId" ref="tree" render-after-expand highlight-current
              v-model="addform.menuIds">
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('closedialogRole')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 账号管理
import Api from "@/api/api.js";

export default {
  data() {
    return {
      Time: "",
      form: {
        roleName: "",
        roleKey: "",
        roleSort: "",
        remark: "",
        startTime: "",
        endTime: "",
        status: "",
        statusStr: "",
      },
      addform: {
        menuIds: '',
        remark: " ",
        roleId:'',
        roleKey: null,
        roleName: null,
        roleSort: 1,
        status: 0,
      },
      title: "",
      rules: {
        roleName: [{ required: true, message: "请输角色名称", trigger: "blur" }],
      },
      departsList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      countStatus: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      allAlign: null,
      tableData: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      dialogVisible: false,
      addVisible: false,
      deleteVisible: false,
    };
  },
  created() {
    this.ajaxTable();
    // this.text()
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
    getTime() {
      if(this.Time!==null){
        this.form.startTime = this.Time[0]/ 1000;
        this.form.endTime = this.Time[1]/ 1000;
      }
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    search() {
      this.page5.currentPage=1
      this.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      let content = {
        ...this.form,
      };
      let pager = {
        pageSize: this.page5.pageSize,
        currentPage: this.page5.currentPage,
      };
      let params = {
        content,
        pager,
      };
      this.$store.commit("loadingChange", true);
      Api.sysRolegetPageRole(params).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
          this.form.startTime=''
          this.form.endTime=''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    diaPage(row) {
      this.title = "编辑角色";
      let query = {
        roleId: row.roleId,
      };
      this.dialogVisible = !this.dialogVisible;
      Api.sysRolegetRole(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
         let editFrom=res.content
         console.log(editFrom)
         if(res.content.menuIds!==null){
            let newArr=res.content.menuIds.split(',')
            for(let i = 0; i < newArr.length; i++){
              newArr[i] = Number(newArr[i]);
            }
            this.$nextTick(() => {
  　　         this.$refs.tree.setCheckedKeys(newArr);//获取已经设置的资源后渲染

            });
          editFrom.menuIds=newArr
         }
          console.log(editFrom)
          this.addform = JSON.parse(JSON.stringify(editFrom));
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addRoles() {
      this.title = "添加角色";
      this.dialogVisible = !this.dialogVisible;
      this.addform = {
        menuIds: '',
        remark: " ",
        roleKey: null,
        roleName: null,
        roleSort: null,
        status: 0,
      };
    },
    closedialogRole() {
      this.$refs["closedialogRole"].resetFields();
    },
    sure(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = !this.dialogVisible;
          this.$store.commit("loadingChange", true);
          if (this.addform.roleId) {
            let params={...this.addform}
            Api.sysRoleUpdateRole(params).then((res) => {
              this.$store.commit("loadingChange", false);
              if (res.code == 0) {
                vm.dialogVisible = false;
                vm.page5.pageSize = this.page5.pageSize;
                vm.page5.currentPage = this.page5.currentPage;
                vm.ajaxTable();
                this.$message.success(res.msg)
              } else {
                vm.$message.error(res.msg);
              }
            });
          } else {
            let params = JSON.parse(JSON.stringify(this.addform));
            this.$store.commit("loadingChange", true);
            Api.sysRolesaveRole(params).then((res) => {
              this.$store.commit("loadingChange", false);
              if (res.code == 0) {
                vm.dialogVisible = false;
                vm.page5.pageSize = 10;
                vm.page5.currentPage = 1;
                vm.ajaxTable();
              } else {
                vm.$message.error(res.msg);
              }
            });
          }
        }
      });
    },
    deleteData(row) {
      // this.deleteVisible=!this.deleteVisible
      this.$confirm("此操作将永久删除" + row.roleName + ", 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        let query = {
          roleId: row.roleId,
        };
        this.$store.commit("loadingChange", true);
        Api.sysRoledeleteRole(query).then((res) => {
          this.$store.commit("loadingChange", false);
          if (res.code == 0) {
            let vm = this;
            vm.page5.pageSize = this.page5.pageSize;
            vm.page5.currentPage = this.page5.currentPage;
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
  height: 150px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
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
  height: 40px;
  display: flex;
  color: #fff;
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
.dia_form {
  width: 100%;
  // height: 400px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .el-input {
    width: 300px;
  }
}
// .el-textarea {
//   min-width: 700px;
// }
/deep/.el-textarea__inner {
  height: 80px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>