<template>
  <div class="index">
    <div class="account_head">
      <div class="head_search">
        <el-input prefix-icon="el-icon-search" v-model="content.productName" placeholder="请输入产品名称"
          style="margin:0 10px ;"></el-input>
        <el-select clearable v-model="content.mechanism" placeholder="所属机构" style="margin:0 10px ;">
          <el-option v-for="item in departsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select clearable v-model="content.loanType" placeholder="贷款类型" style="margin:0 10px ;">
          <el-option v-for="item in departsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select clearable v-model="content.loanCycle" placeholder="贷款周期" style="margin:0 10px ;">
          <el-option v-for="item in departsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="head_time">
        <div style="margin:0 10px;">
          <div class="time_msg" style="display:inline;">贷款金额：</div>
          <el-input-number v-model="content.loanMoneyDown" label="最低金额"></el-input-number> ---
          <el-input-number v-model="content.loanMoneyUp" label="最高金额"></el-input-number>/万元
        </div>
        <div class="time_msg">上架时间:</div>
        <el-date-picker @change="getTime()" value-format="timestamp" v-model="times" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button class="time_btn" type="danger" @click="search">查询</el-button>
        <el-button class="time_btn" type="danger" @click="searchDownload">导出</el-button>
      </div>
    </div>
    <div class="account_form">
      <vxe-table border show-header-overflow show-overflow highlight-hover-row class="form_table" align="center"
        :data="tableData">
        <vxe-table-column field="id" title="产品ID"></vxe-table-column>
        <vxe-table-column field="productName" title="产品名称"></vxe-table-column>
        <vxe-table-column field="mechanismName" title="所属机构"></vxe-table-column>
        <vxe-table-column field="loanTypeStr" title="贷款类型"></vxe-table-column>
        <vxe-table-column field="loanMoneyUp" title="贷款金额上限(万元)"></vxe-table-column>
        <vxe-table-column field="loanCycleDown" title="贷款周期（月）"></vxe-table-column>
        <vxe-table-column title="创建时间">
          <template v-slot="{ row }">
            <span>{{$moment(row.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="statusStr" title="状态"></vxe-table-column>
        <vxe-table-column width="200" title="操作" class="table_todo">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="reviewProduct(row,1)">审核</vxe-button>
            <vxe-button type="text" @click="topPage(row,2)">查看</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager @page-change="handlePageChange2" background v-if="pager.totalResult>0"
        :current-page.sync="pager.currentPage" :page-size.sync="pager.pageSize" :total="pager.totalResult"
        :layouts="['Total','PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump','Sizes']">
      </vxe-pager>
    </div>
    <el-dialog title="提示" :visible.sync="msgVisible" width="30%">
      <span>是否同意审核？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">审核通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api/api.js";

// 金融产品
export default {
  data() {
    return {
      times: "",
      flag: true,
      msgVisible:false,
      reviewId:'',
      departsList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      allAlign: null,
      tableData: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      },
      content: {
        productName: "",
        mechanism: "",
        loanType: "",
        status: 2,
        loanCycle: "",
        loanMoneyUp:0,
        loanMoneyDown: 0,
        createdTimeUp: "",
        createdTimeDown: "",
      },
      rules: {
        count: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        part: [{ required: true, message: "所属部门", trigger: "blur" }],
        role: [{ required: true, message: "角色属性", trigger: "change" }],
      },
    };
  },
  created() {
    this.ajaxTable()
  },
  methods: {
    getTime() {
      this.content.createdTimeUp = this.times[0]/1000;
      this.content.createdTimeDown = this.times[1]/1000;
    },
    handlePageChange2({ currentPage, pageSize }) {
      this.pager.currentPage = currentPage;
      this.pager.pageSize = pageSize;
      this.ajaxTable();
    },
    reviewProduct(row){
      this.reviewId=row.id
      this.msgVisible=!this.msgVisible
    },
    ok(){
      this.msgVisible=false
      Api.productInfoApprove({id:this.reviewId}).then(res=>{
        if(res.code==0){
          this.$message.success(res.msg)
          this.ajaxTable()
        }else{
          this.$message.success(res.msg)
        }
      })
    },
    search() {
      let vm = this;
      vm.pager.pageSize = this.pager.pageSize;
      vm.pager.currentPage = 1;
      vm.ajaxTable();
    },
    ajaxTable() {
      let vm = this;
      vm.getTime();
      this.$store.commit("loadingChange", true);
      let query = {
        content: this.content,
        pager: {
          pageSize: vm.pager.pageSize,
          currentPage: vm.pager.currentPage,
        },
      };
      Api.productInfoproductInfoList(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          vm.tableData = res.content.list;
          vm.pager.totalResult = res.content.pager.totalCount;
          vm.pager.currentPage = res.content.pager.currentPage;
          this.content.createdTimeUp=''
          this.content.createdTimeDown=''
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    topPage(row) {
      this.$router.push({
        name: "addProducts",
        params: {
          flag:true,
          id: row.id,
        },
      });
    },
    searchDownload() {
      let params = {
          productName: this.content.productName,
          mechanism: this.content.mechanism,
          loanType: this.content.loanType,
          status: this.content.status,
          loanCycle: this.content.loanCycle,
          loanMoneyUp: this.content.loanMoneyUp,
          loanMoneyDown: this.content.loanMoneyDown,
          createdTimeUp: this.content.createdTimeUp,
          createdTimeDown: this.content.createdTimeDown,
        pager: {
          pageSize: vm.pager.pageSize,
          currentPage: vm.pager.currentPage,
        },
      };
      this.$store.commit("loadingChange", true);
      Api.getCompany(params).then((res) => {
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
    addProducts() {
      this.$router.push({ path: "/addProducts" });
    },
    addProductssh() {
      this.$router.push({ name: "ProductsManage" });
    },
    putShell(row) {
      this.$confirm("是否通过?", "通过提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        this.$store.commit("loadingChange", true);
        Api.productInfoapprove(row.id).then((res) => {
          this.$store.commit("loadingChange", fasle);
          if (res.code == 0) {
            let vm = this;
            vm.pager.pageSize = this.pager.pageSize;
            vm.pager.currentPage = this.pageSize.currentPage;
            vm.ajaxTable();
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
.el-textarea__inner {
  height: 100px;
}
</style>