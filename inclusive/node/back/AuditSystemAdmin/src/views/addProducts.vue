<template>
  <div class="index">
    <div class="index_title">{{title}}</div>
    <div class="index_form">
      <el-form :disabled="this.$route.params.flag" ref="addProducts" :model="ruleForm" :rules="rules"
        label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="ruleForm.productName" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item prop="mechanism" label="金融机构">
          <el-select clearable v-model="ruleForm.mechanism" placeholder="请选择">
            <el-option v-for="item in $store.state.sysCodegetCode.AllMechanism" :key="item.id" :label="item.companyName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="loanType" label="贷款类型">
          <el-select clearable v-model="ruleForm.loanType" placeholder="请选择">
            <el-option v-for="item in $store.state.getAllType" :key="item.id" :label="item.type" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="贷款利率" prop="loanRate">
          <el-input v-model="ruleForm.loanRate" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="贷款金额" prop="loanMoneyUp">
          <el-input-number @blur="minNums" v-model="ruleForm.loanMoneyDown" :min="0" label="最低金额"></el-input-number> ---
          <el-input-number v-model="ruleForm.loanMoneyUp" :min="0" label="最高金额"></el-input-number>万元
        </el-form-item>
        <el-form-item prop="loanCycleUp" label="贷款周期">
          <el-input-number v-model="ruleForm.loanCycleDown" :min="0" label="贷款周期下限"></el-input-number> ---
          <el-input-number v-model="ruleForm.loanCycleUp" :min="0" label="贷款周期上限"></el-input-number>个月
          <!-- <el-select clearable v-model="ruleForm.timeList" placeholder="请选择">
            <el-option v-for="item in $store.state.sysCodegetCode.DKZQSatue" :key="item.value" :label="item.value"
              :value="item.code"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="抵押率" prop="mortmortgageRategageRate">
          <el-input v-model="ruleForm.mortgageRate" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="产品简介" prop="introduce">
          <el-input type="textarea" :rows="4" v-model="ruleForm.introduce" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="申请对象" prop="applicants">
          <el-input type="textarea" :rows="4" v-model="ruleForm.applicants" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="申请要求">
          <el-input type="textarea" :rows="4" v-model="ruleForm.requirements" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="资料清单">
          <el-input type="textarea" :rows="4" v-model="ruleForm.information" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item v-if="!$route.params.flag">
          <el-button type="danger" @click="save('addProducts')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api.js";
export default {
  data() {
    return {
      flag: false,
      title: "添加产品",
      ruleForm: {
        id: "",
        productName: "",
        mechanism: "",
        loanType: "",
        loanRate: "",
        loanMoneyDown: null,
        loanMoneyUp: null,
        loanCycleUp: "",
        loanCycleDown: "",
        mortgageRate: "",
        introduce: "",
        applicants: "",
        information: "",
        requirements: "",
      },
      rules: {
        loanType: [
          { required: true, message: "请选择贷款类型", trigger: "change" },
        ],
        loanMoneyUp: [
          {
            required: true,
            message: "请填写贷款金额",
            trigger: "blur",
          },
        ],
        loanCycleUp: [
          { required: true, message: "请选择贷款周期", trigger: "change" },
        ],
        mortgageRate: [
          { required: true, message: "请填写活动形式", trigger: "blur" },
        ],
        Introduction: [
          { required: true, message: "请填写活动形式", trigger: "blur" },
        ],
        item: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      console.log("");
      let query = {
        id: this.$route.params.id,
      };
      this.$store.commit("loadingChange", true);
      Api.productInfogetProductInfoDetail(query).then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          if (!this.$route.params.flag) {
            this.title = "《 " + res.content.productName + " 》编辑";
          } else {
            this.title = "《 " + res.content.productName + " 》详情页";
          }
          this.ruleForm = res.content;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  methods: {
    minNums(){
      if(this.ruleForm.loanMoneyDown<0||this.ruleForm.loanMoneyUp<0){
        this.$message.error('贷款不能为负数!')
        this.ruleForm.loanMoneyDown=0
        this.ruleForm.loanMoneyUp=0
      }
    },
    save(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = this.ruleForm;
          this.$store.commit("loadingChange", true);
          Api.productInfoaddOrUpdateProductInfo(query).then((res) => {
            this.$store.commit("loadingChange", false);
            if (res.code == 0) {
              this.$refs[formName].resetFields()
              if(this.$route.params){
                this.$message.success('产品修改成功')
                vm.$router.push({
                  name: "financialProduct",
                });
              }
              if(!this.this.$route.params){
                this.$message.success('产品添加成功')
                vm.$router.push({
                  name: "financialProduct",
                });
              }
            } else {
              this.$message.error(res.msg);
            }
          });
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
  text-align: left;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 40px;
  .index_title {
    font-size: 24px;
    height: 80px;
    line-height: 80px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  .index_form {
    display: flex;
    flex-direction: column;
    .el-input {
      width: 400px;
    }
    .el-select {
      width: 400px;
    }
    .el-textarea {
      width: 400px;
    }
  }
}
</style>