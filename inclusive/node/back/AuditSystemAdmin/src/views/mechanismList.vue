<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="companyName" placeholder="请输入机构名称" style="margin:0 10px ;">
        </el-input>
        <el-select clearable v-model="type" placeholder="机构类型" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.JGLX" :key="item.code" :label="item.value" :value="item.code">
          </el-option>
        </el-select>
        <el-select clearable v-model="companyStatus" placeholder="机构状态" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.jgztOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-select clearable v-model="grade" placeholder="机构等级" style="margin:0 10px ;">
          <el-option v-for="item in $store.state.option.jgdjOption" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="head_time">
        <div class="time_msg">注册时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchDownload">导出</el-button>
      </div>
    </div>
    <div class="form_btn">
      <el-button icon="el-icon-plus" type="primary" @click="addMechanAll()">添加机构</el-button>
    </div>
    <div class="account_form">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row class="form_table" align="center"
        :data="tableData">
        <vxe-table-column field="id" title="机构ID"></vxe-table-column>
        <vxe-table-column title="机构名称" show-overflow="tooltip" align="left">
          <template v-slot="{ row }">
            <span v-if="row.companyLogo">
              <img :src="row.companyLogo" style="width:45px;height:45px;vertical-align: middle;margin-right:10px;">
            </span>
            <span v-if="!row.companyLogo">
              <img src="row.companyLogo"
                style="width:45px;height:45px;vertical-align: middle;margin-right:10px;opacity:0;">
            </span>
            <span>{{row.companyName}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="typeStr" title="机构类型"></vxe-table-column>
        <vxe-table-column title="注册时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="companyStatusStr" title="当前状态"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="addMechan(row)">编辑</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" :total="page5.totalResult" @page-change="handlePageChange1"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <!-- 添加对话框 -->
    <el-dialog :title="title" :visible.sync="addVisible" width="30%" top="5vh" @close="closecdgldialogmechain">
      <div class="form_main">
        <el-form :rules="rules" :model="form" ref="closecdgldialogmechainData" class="demo-ruleForm">
          <el-form-item label="机构名称:" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="上级机构:">
            <el-select clearable v-model="form.parentId" placeholder="请选择">
              <el-option v-for="item in  $store.state.sysCodegetCode.AllMechanism" :key="item.value"
                :label="item.companyName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构类型:" prop="type">
            <el-select clearable v-model="form.type" placeholder="请选择">
              <el-option v-for="item in $store.state.option.JGLX" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传logo:">
            <div class="logo_img">
              <div class="img_box">
                <img :src="form.companyLogo.value" alt />
              </div>
              <el-upload :headers="headers" :on-error="uoLoadError" :show-file-list="false" :on-success="upLoadSuccess"
                class="upload-demo" :show-file-lis="false" :action="upLoadUrl">
                <div class="upload_btn">上传</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="注册地址:" prop="registerAddress">
            <el-select clearable v-model="form.registerAddress" placeholder="请选择">
              <el-option v-for="item in $store.state.option.ZCDZ" :key="item.value" :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经营地址:" prop="businessAddress">
            <el-select clearable v-model="form.businessAddress" placeholder="请选择">
              <el-option v-for="item in $store.state.option.JYDZ" :key="item.value" :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人:" prop="contact">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="contactMobile">
            <el-input v-model="form.contactMobile"></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码:" prop="businessLicense">
            <el-input v-model="form.businessLicense"></el-input>
          </el-form-item>
          <!-- <el-form-item style="text-align:left" label="受理权限:" prop="name">
            <el-radio-group v-model="form.radio">
              <el-radio label="1">一级机构受理</el-radio>
              <el-radio label="2">二级机构受理</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item style="text-align:left" label="账号状态:" prop="companyStatus">
            <el-switch v-model="form.companyStatus" :active-text="form.companyStatus==0?'启用':'禁用'" :active-value="0"
              :inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure('closecdgldialogmechainData')">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";

// 机构列表
export default {
  data() {
    return {
      upLoadUrl:'/inclusive/loanInfoMaterial/uploadFile',
      title: "",
      imgUrlL:'',
      companyName: "",
      type: "",
      grade: "",
      companyStatus:'',
      time: null,
      createdTimeUP: "",
      createdTimeDown: "",
      allAlign: null,
      tableData: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      addVisible: false,
      form: {
        id: '',
        companyName: "",
        parentId: "",
        type: "",
        companyLogo: {
          code: "",
          value: "",
        },
        registerAddress: '',
        businessAddress: '',
        companyStatus: 0,
        contact: "",
        contactMobile: "",
        businessLicense: "",
      },
      rules: {
        companyName: [{ required: true, message: "请输机构名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择机构类型", trigger: "change" },
        ],
        registerAddress: [
          { required: true, message: "请选择注册地址", trigger: "change" },
        ],
        businessAddress: [
          { required: true, message: "请选择经营地址", trigger: "change" },
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        contactMobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        businessLicense: [
          { required: true, message: "请输入社会信用代码", trigger: "blur" },
        ],
      }
    };
  },
  created() {
    this.ajaxTable();
    console.log(this.$store.state.option.JGLX)
    // this.getMechanList()
  },
  computed: {
    headers:function(){
      return {'Authorization':'Bearer '+this.$store.state.token}
    }
  },
  methods: {
    getTime() {
      this.createdTimeDown = this.time[0] / 1000;
      this.createdTimeUP = this.time[1] / 1000;
    },
    upLoadSuccess(res, file, filelist) {
      console.log(res)
      this.form.companyLogo.value=res.content.value
      this.form.companyLogo.code=res.content.code
    },
    uoLoadError(res) {
      console.log(res)
    },
    handlePageChange1({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    search() {
      let vm = this;
      vm.page5.pageSize = this.page5.pageSize;
      vm.page5.currentPage = 1;
      this.ajaxTable();
    },
    addSure(formName) {
      let vm = this;
      let params={
        ...this.form
      }
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit("loadingChange", true);
          if (vm.form.id) {
            //编辑
            Api.sysCompanyaddOrUpdateCompany(params).then((res) => {
              this.$store.commit("loadingChange", false);
              if (res.code == 0) {
                vm.addVisible = false;
                vm.page5.pageSize = this.page5.pageSize;
                vm.page5.currentPage = this.page5.currentPage;
                vm.ajaxTable();
              } else {
                vm.$message.error(res.msg);
              }
            });
          } else {
            //添加
            Api.sysCompanyaddOrUpdateCompany(params).then((res) => {
              this.$store.commit("loadingChange", false);
              if (res.code == 0) {
                vm.page5.pageSize = this.page5.pageSize;
                vm.page5.currentPage = this.page5.currentPage;
                vm.ajaxTable();
                vm.addVisible = false;
              } else {
                vm.$message.error(res.msg);
              }
            });
          }
        }
      });
    },
    ajaxTable() {
      let vm = this;
      let query = {
        content: {
          companyName: vm.companyName,
          type: vm.type,
          companyStatus: vm.companyStatus,
          grade: vm.grade,
          createdTimeUP: vm.createdTimeUP,
          createdTimeDown: vm.createdTimeDown,
        },
        pager: {
          pageSize: this.page5.pageSize,
          currentPage: this.page5.currentPage,
        },
      };
      Api.sysCompanygetMechanismList(query).then((res) => {
        if (res.code == 0) {
          console.log(res)
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
          this.createdTimeDown=''
          this.createdTimeUP=''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    searchDownload() {
      let vm = this;
      let params = {
        content: {
          companyName: this.companyName,
          type: this.type,
          companyStatus: this.companyStatus,
          grade: this.grade,
          createdTimeUP: this.createdTimeUP,
          createdTimeDown: this.createdTimeDown,
        },
        pager: {
          pageSize: vm.page5.pageSize,
          currentPage: vm.page5.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.sysCompanyexportMechanismList(params).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          var a = document.createElement("a");
          a.setAttribute("href", res.content);
          a.setAttribute("target", "_target");
          a.setAttribute("style", "display:none");
          a.setAttribute("id", "startTelMedicine");
          // 防止反复添加
          if (document.getElementById("startTelMedicine")) {
            document.body.removeChild(
              document.getElementById("startTelMedicine")
            );
          }
          document.body.appendChild(a);
          a.click();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    editPage() {
      this.editVisible = !this.editVisible;
    },
    addMechanAll() {
      this.title = "新增机构";
      this.addVisible = true;
      this.form={
        id: null,
        companyName: null,
        parentId: null,
        type:null ,
        companyLogo: {
          code: null,
          value:null ,
        },
        registerAddress: null,
        businessAddress:null ,
        companyStatus: 0,
        contact:null ,
        contactMobile: null,
        businessLicense: null,
      }
    },
    closecdgldialogmechain() {
      console.log(this.$refs["closecdgldialogmechainData"]);
      this.$refs["closecdgldialogmechainData"].resetFields();
    },
    addMechan(row) {
      let vm = this;
      this.title = "编辑机构";
      let query = {
        id: row.id,
      };
      Api.sysCompanygetMechanismDetail(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          this.addVisible = true;
           res.content.registerAddress=String(res.content.registerAddress)
           res.content.businessAddress=String(res.content.businessAddress)
          this.form = JSON.parse(JSON.stringify(res.content));
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    // getMechanList(){
    //   Api.sysCompanygetFirstGradeMechanism().then(res=>{
    //     if(res.code==0){
    //       console.log(res)
    //     }
    //   })
    // }
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
  padding: 20px 30px;
  .head_search {
    display: flex;
    justify-content: flex-start;
    .el-input {
      width: 250px;
      // align-items: center;
    }
  }
  .head_time {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    align-items: center;
    .time_msg {
      margin-right: 15px;
    }
    .time_btn {
      margin-left: 25px;
      width: 120px;
    }
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
.form_main {
  display: flex;
  text-align: right;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 10px;
  .el-input {
    width: 72%;
  }
  .el-select {
    width: 72%;
  }
  .logo_img {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    margin-left: 55px;
    .img_box {
      display: block;
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      margin-left: 85px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .upload_btn {
      margin-top: 70px;
      height: 30px;
      width: 100px;
      line-height: 30px;
      text-align: center;
      background-color: #e4e4e4;
      color: #858585;
      border-radius: 8px;
      cursor: pointer;
      margin-left: 15px;
    }
  }
}
</style>
