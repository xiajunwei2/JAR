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
      <vxe-table-column field="taskTypeId" title="任务编号"></vxe-table-column>
      <vxe-table-column field="taskName" title="任务名称"></vxe-table-column>
      <vxe-table-column field="auditor" title="审核员"></vxe-table-column>
      <vxe-table-column title="状态" field="sta">
        <template v-slot="{ row }">
          <vxe-switch @click="statusChange" v-model="row.status" :on-value="0" :off-value="1"></vxe-switch>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="创建时间">
        <template v-slot="{row}">
          {{row.createdTime|datetimeformat('YYYY-MM-dd')}}
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="180" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="detail(row)">详情</vxe-button>
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)">修改</vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="del(row)">删除</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-pager class="vxe_pager" border size="medium" :loading="loading2" background :current-page="pager.currentPage"
      :page-size="pager.pageSize" :total="pager.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']" @page-change="handlePageChange2">
    </vxe-pager>
    <!-- 新增/修改审核任务 -->
    <el-dialog width="35%" :visible.sync="Newtree" :title="titleModal" style="color: #000000;" :show-close="false">
      <div class="dia_line"></div>
      <div class="dia_main">
        <el-form :model="accUserDto" :rules="rules" ref="numberValidateForm" label-width="100px"
          class="demo-ruleForm add_role">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="accUserDto.taskName"></el-input>
          </el-form-item>
          <el-form-item label="审核员" prop="name" style="text-align:left;">
            <el-select v-model="accUserDto.auditor" placeholder="请选择">
              <el-option v-for="item in roleList" :key="item.value" :label="item.nickName" :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务状态" prop="name" style="text-align:left;" v-if="NewtreeSatute!=3">
            <el-radio v-model="accUserDto.status" label="0">启用</el-radio>
            <el-radio v-model="accUserDto.status" label="1">停用</el-radio>
          </el-form-item>
          <el-form-item label="审核字段" prop="name" style="text-align:left;">
            <!-- <el-input v-model="accUserDto.fieldIds"></el-input> -->
            <el-select v-model="accUserDto.fieldIds" multiple placeholder="请选择">
              <el-option v-for="(item,index) in loanTypeList" :key="index+''" :label="item.fieldName"
                :value="item.fieldId">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="权限范围" prop="name" style="text-align:left;">
            <el-select v-model="accUserDto.operateRange" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CansclnewItem('numberValidateForm')">取 消</el-button>
        <el-button type="primary" @click="newItemSure('numberValidateForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="35%" :visible.sync="daiDeatil" :title="titleDetail" style="color: #000000;" :show-close="false">
      <div class="dia_line"></div>
      <div class="dia_title">
        <div style="width:100px;">任务名称:</div>
        <div style="color:#333333;">{{details.taskName}}</div>
      </div>
      <div class="dia_title">
        <div style="width:100px;">审核员:</div>
        <div style="color:#333333;">{{details.auditor}}</div>
      </div>
      <div class="dia_title">
        <div style="width:100px;">状态:</div>
        <div style="color:#333333;">{{details.status==0?'启用':'禁用'}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="daiDeatil=false">取 消</el-button>
        <el-button type="primary" @click="daiDeatil=false">确 定</el-button>
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
      currItem:[],
      checkList:[],
      loanTypeList:[],
      Newtree: false,
      lookStatue: false,
      daiDeatil:false,
      titleModal: "",
      titleDetail:'查看审核任务',
      NewtreeSatute: 1, //1新增 2 修改 3分配权限
      sexList: [],
      loading2: false,
      details:{},
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
      taskName:'',
      accUserDto: {
        taskTypeId:'',
        taskName:'',
        auditor:'',
        status: "",
        fieldIds:''
      },
      rules:{},
      roleList:[]
    };
  },
  created() {
    this.findList2();
    this.getRoleList();
    this.getLoanType()
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
            taskTypeId:row.taskTypeId
          }
          const res=await this.$http.post('/auditsystem/auditTaskType/getTaskType',id)
          console.log(res)
          let fileId=res.content.fieldIds.map(item=>{
            return Number(item.code)
          })
          res.content.status=String(res.content.status)
          res.content.auditor=Number(res.content.auditor)
          this.accUserDto=res.content
          this.accUserDto.fieldIds=fileId
          if(res.content.status==1){
            res.content.status='0'
          }
          else if(res.content.status==0){
            res.content.status='1'
          }
          this.accUserDto=res.content
          // return
          let params={...this.accUserDto}
          params.fieldIds=params.fieldIds.join(',')
         this.$http.post('/auditsystem/auditTaskType/saveOrUpdateTaskType',params).then(res=>{
          if(res.code==0){
          this.$message.success('修改成功')
          this. accUserDto= {
                taskTypeId:'',
                taskName:'',
                auditor:'',
                status: "",
                fieldIds:''
              }
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
        this.currItem=[]
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
    statusChange(){
      console.log(1)
    },
    rightsrow(row){
      this.NewtreeSatute=3
      this.Newtree=true
    },
    getRoleList(){
      this.$http.post('/auditsystem/sysUser/getSelectUser').then(res=>{
        if(res.code==0){
          console.log(res)
          this.roleList=res.content
        }
      })
    },
    getLoanType(){
      this.$http.post('/auditsystem/auditField/getSelectAuditField').then(res=>{
        if(res.code==0){
          console.log(res)
          this.loanTypeList=res.content
        }
      })
    },
    newItemSure(formName) {
      let vm = this;
      let params={...this.accUserDto}
      params.fieldIds=params.fieldIds.join(',')
      console.log(params)
      // return
      this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.accUserDto.taskTypeId) {
              //编辑
              this.$http.post('/auditsystem/auditTaskType/saveOrUpdateTaskType',params).then(res=>{
                if(res.code==0){
                  this.$message.success('角色修改成功')
                  this.accUserDto= {
                    taskTypeId:'',
                    taskName:'',
                    auditor:'',
                    status: "",
                    fieldIds: '',
                  },
                  this.Newtree=false
                  this.findList2()
                }else{
                  this.$message.error(res.msg)
                }
              })
            } else {
              //新建
              this.$http.post('/auditsystem/auditTaskType/saveOrUpdateTaskType',params).then(res=>{
                console.log(this.accUserDto)
                if(res.code==0){
                  this.$message.success('角色添加成功')
                 this.accUserDto= {
                    taskTypeId:'',
                    taskName:'',
                    auditor:'',
                    status: "",
                    fieldIds:'',
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
        content:{
          taskName:this.taskName
        },
        pager:{
          pageSize:this.pager.pageSize,
          currentPage:this.pager.currentPage
        }
      }
      console.log(params)
      this.$http.post('/auditsystem/auditTaskType/getPageTaskType',params).then(res=>{
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
      this.Newtree = true;
      this.NewtreeSatute=2
      if(row){
        this.currItem=row
      }
      let params={
        taskTypeId:this.currItem.taskTypeId
      }
      this.$http.post('/auditsystem/auditTaskType/getTaskType',params).then(res=>{
        if(res.code==0){
          console.log(res)
          let fileId=res.content.fieldIds.map(item=>{
            return Number(item.code)
          })
          console.log(fileId)
          res.content.status=String(res.content.status)
          res.content.auditor=Number(res.content.auditor)
          this.accUserDto=res.content
          this.accUserDto.fieldIds=fileId
        }
      })
      this.titleModal = "修改审核任务";
    },
    detail(row){
      this.daiDeatil=true
      this.details=row
    },
    del(row) {
      console.log(row);
      if(row){
        this.currItem=row
      }
      let params={
        taskTypeId:this.currItem.taskTypeId
      }
      this.$confirm(
        "此操作将永久删除---" + this.currItem.taskName + "---, 是否继续?",
        "永久删除",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
         this.$http.post('/auditsystem/auditTaskType/deleteTaskType',params).then(res=>{
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
    CansclnewItem() {
      this.accUserDto= {
        taskTypeId:'',
        taskName:'',
        auditor:'',
        status: "",
        fieldIds:'',
      }
      this.Newtree = false;
    },
    insertEvent() {
      this.Newtree = true;
      this.NewtreeSatute = 1;
      this.titleModal = "添加审核任务";
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
.dia_title {
  display: flex;
  justify-content: flex-start;
  margin-top: 35px;
  color: #c1c1c1;
}
</style>
