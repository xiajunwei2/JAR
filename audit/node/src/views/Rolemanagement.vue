<template>
  <div class="usermanage">
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="el-icon-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-button icon="el-icon-edit" :disabled="editFlag" @click="editEvent()">修改</vxe-button>
        <vxe-button icon="el-icon-delete" :disabled="deleteFlag" @click="del()">删除</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table @cell-click="cellClickEvent" border show-overflow ref="xTable" @checkbox-all="selectAllEvent"
      class="my_table_insert" :data="tableData" @checkbox-change="selectChangeEvent" align="center">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="roleId" title="用户编号"></vxe-table-column>
      <vxe-table-column field="roleName" title="角色名称"></vxe-table-column>
      <vxe-table-column field="roleKey" title="权限字符"></vxe-table-column>
      <vxe-table-column title="状态" field="sta">
        <template v-slot="{ row }">
          <vxe-switch v-model="row.status" :on-value="0" :off-value="1"></vxe-switch>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="创建时间">
        <template v-slot="{row}">
          {{row.createdTime|datetimeformat('YYYY-MM-dd')}}
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="180" show-overflow>
        <template v-slot="{ row }">
          <!-- <vxe-button type="text" icon="fa fa-edit" @click="rightsrow(row)">权限</vxe-button> -->
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)">修改</vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="del(row)">删除</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-pager class="vxe_pager" border size="medium" :loading="loading2" background :current-page="pager.currentPage"
      :page-size="pager.pageSize" :total="pager.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']" @page-change="handlePageChange2">
    </vxe-pager>
    <!-- 新增角色 -->
    <el-dialog width="35%" :visible.sync="Newtree" :title="titleModal" style="color: #000000;" :show-close="false">
      <div class="dia_line"></div>
      <div class="dia_main">
        <el-form :model="accUserDto" :rules="rules" ref="numberValidateForm" label-width="100px"
          class="demo-ruleForm add_role">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="accUserDto.roleName"></el-input>
          </el-form-item>
          <el-form-item label="权限字符" prop="name">
            <el-input v-model="accUserDto.roleKey"></el-input>
          </el-form-item>
          <el-form-item label="角色状态" prop="name" style="text-align:left;" v-if="NewtreeSatute!=3">
            <el-radio v-model="accUserDto.status" label="0">启用</el-radio>
            <el-radio v-model="accUserDto.status" label="1">停用</el-radio>
          </el-form-item>
          <el-form-item label="权限范围" prop="name" style="text-align:left;">
            <el-select v-model="accUserDto.operateRange" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CansclnewItem('numberValidateForm')">取 消</el-button>
        <el-button type="primary" @click="newItemSure('numberValidateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Api from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      currItem:'',
      checkList:[],
      Newtree: false,
      lookStatue: false,
      titleModal: "",
      NewtreeSatute: 1, //1新增 2 修改 3分配权限
      sexList: [],
      loading2: false,
       options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '部分'
        }],
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      accUserDto: {
        roleId:'',
        roleName:'',
        roleKey:'',
        status: "",
        operateRange: "",
      },
      rules:{}
    };
  },
  created() {
    this.findList2();
  },
  computed: {
    editFlag: function () {
      if (this.checkList.length == 1) {
        return false;
      } else {
        return true;
      }
    },
    deleteFlag: function () {
      if (this.checkList.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async cellClickEvent({row,column}){
     if(column.property=='sta'){
         let id={
            roleId:row.roleId
          }
          const res=await this.$http.post('/auditsystem/sysRole/getRole',id)
          console.log(res)
          res.content.status=String(res.content.status)
          if(res.content.status==1){
            res.content.status='0'
          }
         else if(res.content.status==0){
            res.content.status='1'
          }
          this.accUserDto=res.content
          // return
          let params={...this.accUserDto}
         this.$http.post('/auditsystem/sysRole/saveOrUpdateRole',params).then(res=>{
          if(res.code==0){
          this.$message.success('修改成功')
               this.accUserDto= {
                roleId:'',
                phoneNumber:'',
                nickName:'',
                userName: "",
                roleIds: "",
                status: "",
              },
            this.findList2()
            }else{
              this.$message.success(res.msg)
          }
        })
     }
    },
    selectChangeEvent({ records }) {
      console.log(records)
      if(records.length==0){
      this.currItem=''
        this.checkList = [];
      }
      if(records.length>0){
        this.currItem=records[0]
        this.checkList = records;
      }
    },
    selectAllEvent({ checked, records }) {
      this.checkList = records;
    },
    rightsrow(row){
      this.NewtreeSatute=3
      this.Newtree=true
    },
    newItemSure(formName) {
      let vm = this;
      let params={...this.accUserDto}
      console.log(params)
      // return
      this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.accUserDto.roleId) {
              //编辑
              this.$http.post('/auditsystem/sysRole/saveOrUpdateRole',params).then(res=>{
                if(res.code==0){
                  this.$message.success('角色修改成功')
                  this.accUserDto={
                    roleId:'',
                    roleName:'',
                    roleKey:'',
                    status: "",
                    operateRange: "",
                  },
                  this.Newtree=false
                  this.findList2()
                }else{
                  this.$message.error(res.msg)
                }
              })
            } else {
              //新建
              this.$http.post('/auditsystem/sysRole/saveOrUpdateRole',params).then(res=>{
                console.log(this.accUserDto)
                if(res.code==0){
                  this.$message.success('角色添加成功')
                  this.accUserDto={
                      roleId:'',
                      roleName:'',
                      roleKey:'',
                      status: "",
                      operateRange: "",
                   },
                  this.Newtree=false
                  this.findList2()
                }else{
                  this.$message.error(res.msg)
                }
              })
            }
          }
       })
    },
    findList2() {
      let params={
        content:this.accUserDto,
        pager:{
          pageSize:this.pager.pageSize,
          currentPage:this.pager.currentPage
        }
      }
      console.log(params)
      this.$http.post('/auditsystem/sysRole/getPageRole',params).then(res=>{
        if(res.code==0){
          console.log(res)
          this.tableData=res.content.list
          this.pager.totalResult=res.content.pager.totalCount
          // this.pager.currentPage=1
          this.pager.pageSize=10
        }
      })
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.pager.currentPage = currentPage;
      this.pager.pageSize = pageSize;
      this.findList2();
    },
    editEvent(row) {
      console.log(row)
      if(row){
        this.currItem=row
      }
      let params={
        roleId:this.currItem.roleId
      }
      this.$http.post('/auditsystem/sysRole/getRole',params).then(res=>{
        if(res.code==0){
          console.log(res)
          res.content.status=String(res.content.status)
          res.content.operateRange=String(res.content.operateRange)
          this.accUserDto=res.content
    
        }
      })
      this.Newtree = true;
      this.titleModal = "修改角色";
      this.NewtreeSatute = 2;
    },
    del(row) {
      console.log(row);
      if(row){
        this.currItem=row
      }
      let params={
        roleId:this.currItem.roleId
      }
      this.$confirm(
        "此操作将永久删除---" + this.currItem.roleName + "---, 是否继续?",
        "永久删除",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
         this.$http.post('/auditsystem/sysRole/deleteRole',params).then(res=>{
           if(res.code==0){
             this.$message.success('删除成功')
             this.checkList=[]
             this.findList2()
           }else{
             this.$message.success(res.msg)
           }
         })
      });
    },
    CansclnewItem(name) {
      this.accUserDto={
        roleId:'',
        roleName:'',
        roleKey:'',
        status: "",
        operateRange: "",
      },
      this.Newtree = false;
    },
    insertEvent() {
      this.Newtree = true;
      this.titleModal = "添加角色";
      this.NewtreeSatute = 1;
    },
  },
};
</script>

<style lang="less" scoped>
.usermanage {
  .my_table_insert .vxe-body--row.is--new {
    background-color: #f1fdf1;
  }
}
.dia_line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
.add_role {
  width: 100%;
  margin-top: 25px;
}
.vxe_pager {
  margin-top: 30px;
}
</style>
