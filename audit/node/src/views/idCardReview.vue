<template>
  <div class="review">
    <div class="review_left">
      <div class="left_head">
        <div>{{loanItem[0].fieldName}}<span>{{loanItem[0].fieldValue}}</span></div>
        <div class="head_card">注册人身份证号<span>500112452454556</span></div>
      </div>
      <div class="left_body">
        <div class="body_img2"></div>
        <!-- <template>
          <div class="body_img">
            <img src="../assets/loginright.png" alt="">
          </div>
          <div class="body_img">
            <img src="../assets/loginright.png" alt="">
          </div>
        </template> -->
      </div>
    </div>
    <div class="review_right">
      <div class="right_head">
        <div class="right_head_title">审核规范</div>
        <div class="right_head_roules">
          <div>1.图中所有文字及图像信息是否清晰可见</div>
          <div>2.系统注册人姓名与身份证号是否与图中一致</div>
        </div>
      </div>
      <div class="right_body">
        <div class="right_body_title">审核结果</div>
        <div class="right_body_choce" :class="currentIndex==1?'actives':''" @click="choceResult(1)">
          <div class="choce_icon iconfont " :class="currentIndex==1?'icon-icon active':''"></div>
          <div class="choce_text">通过</div>
        </div>
        <div class="right_body_choce" :class="currentIndex==-1?'actives':''" @click="choceResult(-1)">
          <div class="choce_icon iconfont " :class="currentIndex==-1?'icon-icon active':''"></div>
          <div class="choce_text">不通过</div>
        </div>
        <div class="right_body_nopass" :class="flag==true?'disp_block':''" v-if="currentIndex==-1">
          <div class="right_head_title">审核不通过的理由</div>
          <el-input v-model="accUserDto.auditResult"></el-input>
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </div>
        <div class="right_body_bottom">
          <div class="body_bottom_btn" @click="toPage()">审核完毕</div>
          <div class="body_bottom_btn" @click="toIndex()">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	// import Api from '@/api/api.js'
export default {
  data() {
    return {
      currentIndex:1,
      flag:false,
      pass:'',
      nopass:' ',
      loanItem:[],
      accUserDto:{
        taskId:'',
        auditStatus:1,
        auditResult:'',
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    toIndex(){
      this.$router.push({ name: "index"});
    },
    choceResult(id){
        this.currentIndex=id
        this.accUserDto.auditStatus=id
        if(id==-1){
          this.flag=!this.flag
        }
        if(id==1){
          this.flag=!this.flag
        }
    },
    getDetail(){
      let params={
        taskId:this.$route.params.taskId
      }
      this.accUserDto.taskId=this.$route.params.taskId
      this.$http.post('/auditsystem/auditTask/getTask',params).then((res) => {
        if(res.code==0){
          console.log(res)
          this.loanItem=res.content.companyFields
        }else{
          this.$message.error(res.msg)
        }
      });
    },
    loanApply(){
      let params={
       
      }
      // Api.getCompany(params).then((res) => {
      //    if(res.code==0){

      //    }else{
      //      this.$message.error(res.msg)
      //    }
      // });
    }
  }
}
</script>

<style lang="less" scoped>
.review {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f1f6f7;
  height: calc(100vh - 60px);
  .review_left {
    width: 1250px;
    margin-top: 12px;
    margin-left: 17px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    .left_head {
      height: 185px;
      margin-bottom: 20px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding-left: 35px;
      box-sizing: border-box;
      div {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
        span {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(153, 153, 153, 1);
          margin-left: 25px;
        }
      }
      .head_card {
        display: flex;
        justify-content: flex-end;
        margin-right: 100px;
      }
    }
    .left_body {
      flex: 1;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .body_img {
        width: 459px;
        height: 340px;
        border: 1px dashed rgba(204, 204, 204, 1);
        margin: 0 55px;
        box-sizing: border-box;
        padding: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .body_img2 {
        width: 1067px;
        height: 550px;
        border: 1px dashed rgba(204, 204, 204, 1);
        margin: 0 55px;
        box-sizing: border-box;
        padding: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .review_right {
    margin-top: 12px;
    margin-left: 17px;
    margin-bottom: 24px;
    margin-right: 17px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .right_head {
      height: 270px;
      background-color: #fff;
      margin-bottom: 20px;
      box-sizing: border-box;
      padding-top: 60px;
      padding-left: 40px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .right_head_title {
        margin-bottom: 50px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
      }
      .right_head_roules {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 60px;
      }
    }
    .right_body {
      background-color: #fff;
      padding-top: 60px;
      padding-right: 22px;
      padding-left: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
      .right_body_title {
        margin-bottom: 50px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
        text-align: left;
        margin-left: 13px;
      }
      .actives {
        background: rgba(242, 242, 242, 1);
      }
      .right_body_choce {
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-left: 35px;
        cursor: pointer;
        .choce_icon {
          width: 20px;
          height: 20px;
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .active {
          background-color: #4994fb;
          border: none;
        }
        .choce_text {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-left: 27px;
        }
      }
      .right_body_nopass {
        display: none;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 35px;
        padding-right: 48px;
        margin-top: 45px;
        .el-select {
          margin-top: 20px;
          width: 100%;
        }
      }
      .disp_block {
        display: flex;
      }
      .right_body_bottom {
        display: flex;
        position: fixed;
        bottom: 50px;
        right: 20px;
        flex: 1;
        justify-content: flex-end;
        margin-top: 50px;
        .body_bottom_btn {
          width: 134px;
          height: 41px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background-color: #1269f9;
          margin: 0 20px;
          cursor: pointer;
          font-size: 16px;
        }
      }
    }
  }
}
</style>