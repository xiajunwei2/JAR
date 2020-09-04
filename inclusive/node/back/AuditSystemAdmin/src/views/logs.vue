<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="operName" placeholder="操作人员" clearable ></el-input>
        <el-input prefix-icon="el-icon-search" v-model="title" placeholder="系统模块"  clearable ></el-input>
        <el-select clearable v-model="status" placeholder="状态">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="异常" :value="1"></el-option>
        </el-select>
        <div class="time_msg">操作时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="Time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
      </div>
    </div>
    <!-- <div class="form_btn" @click="addPart">添加部门</div> -->
    <div class="account_form">
      <vxe-table class="form_table" border show-header-overflow show-overflow highlight-hover-row align="center"
        :data="tableData">
        <vxe-table-column field="businessTypeStr" title="操作类型"></vxe-table-column>
        <vxe-table-column field="requestMethod" title="请求方式"></vxe-table-column>
        <vxe-table-column field="title" title="系统模块"></vxe-table-column>
        <vxe-table-column field="operName" title="操作人员"></vxe-table-column>
        <vxe-table-column field="operIp" title="主机"></vxe-table-column>
        <vxe-table-column field="operLocation" title="操作地点"></vxe-table-column>
        <vxe-table-column title="操作时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.time).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="statusStr" title="状态"></vxe-table-column>
        <!-- <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="diaPage(row)">编辑</vxe-button>
            <vxe-button type="text" @click="deleteData(row)">删除</vxe-button>
          </template>
        </vxe-table-column> -->
      </vxe-table>
      <vxe-pager background v-if="page5.totalResult>0" :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize" :total="page5.totalResult" @page-change="handlePageChange2"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api.js";
// 账号管理
export default {
  data() {
    return {
      title: "",
      allAlign: null,
      tableData: [],
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      Time:[],
      status:'',
      operName:'',
      operTimeUp:'',
      operTimeDown:'',
    };
  },
  created() {
    this.ajaxTable();
  },
  methods: {
    closedialogbmkl() {
      this.$refs["closedialogbmkl"].resetFields();
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.page5.currentPage = currentPage;
      this.page5.pageSize = pageSize;
      this.ajaxTable();
    },
    search(){
      this.page5.currentPage=1;
      this.tableData = [];
      this.ajaxTable()
    },
    getTime(){

    },
    ajaxTable() {
      let vm = this;
      let params = {
        content:{
            title:this.title?this.title:'',
            operName:this.operName?this.operName:'',
            businessType:this.businessType?this.businessType:'',
            status:this.status,
            operTimeUp:this.Time && this.Time.length>0?this.Time[0]/1000:'',
            operTimeDown:this.Time && this.Time.length>0?this.Time[1]/1000:''
        },
        pager:{
              pageSize:this.page5.pageSize,
              currentPage:this.page5.currentPage
        }
      }
      this.$store.commit("loadingChange", true);
      Api.sysOperLog(params).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.page5.totalResult = res.content.pager.totalCount;
          vm.page5.currentPage = res.content.pager.currentPage;
        } else {
          this.$message.error(res.msg);
        }
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
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #66b1ff;
  border-radius: 5px;
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
.dia_form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 100%;
  }
}

/deep/.el-textarea__inner {
  height: 100px;
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>