<template>
  <div class="index">
    <div class="wellcome">欢迎进入审核系统</div>
    <div class="index_head">
      <div class="head_item">
        <div class="item_title">今日任务审核数</div>
        <div class="item_main">
          <div class="main_icon ">
            <div class="iconfont icon-shalou"></div>
          </div>
          <div class="main_num" style="color:#8593f0;">{{dutyList.dayCount}}</div>
        </div>
      </div>
      <div class="head_item item_week">
        <div class="item_title ">本周任务审核数</div>
        <div class="item_main">
          <div class="main_icon  main_week">
            <div class="iconfont icon-shijianlishijilujishizhongbiaoxianxing"></div>
          </div>
          <div class="main_num" style="color:#05b3eb;">{{dutyList.weekCount}}</div>
        </div>
      </div>
      <div class="head_item">
        <div class="item_title">本月任务审核数</div>
        <div class="item_main">
          <div class="main_icon main_month">
            <div class="iconfont icon-renyuan"></div>
          </div>
          <div class="main_num" style="color:#55cfb3;">{{dutyList.monthCount}}</div>
        </div>
      </div>
    </div>
    <div class="index_body">
      <div class="body_left">
        <div class="body_left_title">今日审核情况</div>
        <div class="body_left_map">
          <IndexChart ref="chart"></IndexChart>
        </div>
        <!-- <div class="body_left_duty">
          <div><span></span> 未完成</div>
          <div><span></span>已完成</div>
        </div>-->
      </div>
      <div class="body_right">
        <template v-if="loanList.length>0">
          <div class="body_right_title">审核任务列表</div>
          <div class="body_right_list">
            <div class="body_right_item" v-for="(item,index) in loanList" :key="index">
              <div class="right_item_point"></div>
              <div class="right_item_text">{{item.taskName}}</div>
              <div class="right_item_btn" @click="toPage(item)">开始审核</div>
            </div>
          </div>
        </template>
        <div v-else class="no_list">暂无审核任务</div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
// import Api from "@/api/api.js";
import countTo from "vue-count-to";
import IndexChart from "@/components/indexChart.vue";
export default {
  name: "index",
  components: {
    IndexChart,
    countTo
  },
  data() {
    return {
      startVal:0,
      dutyList: [],
      chartList:{},
      loanList:[],
      newList:'',
    };
  },
  created () {
    },
  mounted() {
    let vm = this;
    this.getChartsData()
    vm.getDutyNums()
    vm.getDutyLists()
    // vm.getUserInfo()
  },
  methods: {
    toPage(item) {
      sessionStorage.setItem('item',item.taskId)
      this.$router.push({ name: "BusinessLicense", params: item });
    },
    getDutyNums(){
      this.$http.post('/auditsystem/auditRecord/getTaskCountStatistics').then(res=>{
        if(res.code==0){
          this.dutyList=res.content
        }else{
          this.$message.error(res.msg)
        }
      })

    },
    getChartsData(){
      this.$http.post('/auditsystem/auditRecord/getTaskDoneDetail').then(res=>{
         if(res.code==0){
           this.chartList=res.content
           console.log(this.$refs.chart)
           this.$refs.chart.setData(res.content)
          //  console.log(this.$refs.chart.data)
         }else{
          this.$message.error(res.msg)
        }
       })
    },
    getDutyLists(){
       this.$http.post('/auditsystem/auditTask/getPendingTask').then(res=>{
         if(res.code==0){
           console.log(res)
           this.loanList=res.content
           this
         }else{
          this.$message.error(res.msg)
        }
       })
    },
    // getcurrentDuty(item){
    //   let params={
    //     taskId:item.taskId
    //   }
    //   this.$http.post('/auditsystem/auditTask/getTask',params).then((res) => {
    //     if(res.code==0){
    //       console.log(res)
    //     }else{
    //       this.$message.error(res.msg)
    //     }
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.index {
  color: #000;
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f1f6f7;
  height: calc(100vh - 60px);
  overflow: hidden;
  .wellcome {
    height: 38px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-start;
    width: 100vw;
    box-sizing: border-box;
    padding-left: 35px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(144, 150, 158, 1);
    align-items: center;
  }
  .index_head {
    display: flex;
    justify-content: space-between;
    padding: 0 17px;
    margin-top: 12px;
    margin-bottom: 17px;
    .head_item {
      width: 620px;
      height: 185px;
      box-sizing: border-box;
      background: rgba(254, 254, 255, 1);
      border: 1px solid rgba(243, 243, 243, 1);
      padding-top: 21px;
      padding-left: 26px;
      display: flex;
      flex-direction: column;
      .item_title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
        text-align: left;
      }
      .item_main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        .main_icon {
          width: 78px;
          height: 78px;
          border-radius: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #8593f0;
          color: #fff;
          margin-right: 38px;
          .iconfont {
            font-size: 30px;
          }
        }
        .main_week {
          background-color: #05b3eb;
        }
        .main_month {
          background-color: #55cfb3;
        }
        .main_num {
          font-size: 34px;
        }
      }
    }
  }
  .index_body {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 17px;
    height: calc(100vh - 60px - 38px - 230px);
    overflow: hidden auto;
    .body_left {
      width: 620px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 32px;
      padding-left: 26px;
      .body_left_title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
        text-align: left;
        margin-bottom: 30px;
      }
      .body_left_map {
        width: 550px;
        height: 400px;
        margin-bottom: 20px;
      }
      .body_left_duty {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 81px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
        align-items: center;
        div {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            width: 28px;
            height: 28px;
            background-color: pink;
            margin-right: 27px;
          }
        }
      }
    }
    .body_right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 17px;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 32px;
      padding-left: 35px;
      padding-right: 30px;
      .body_right_title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(77, 81, 91, 1);
        text-align: left;
        margin-bottom: 30px;
      }
      .body_right_list {
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 0;
        }
        .body_right_item {
          width: 100%;
          height: 88px;
          border: 1px solid rgba(237, 235, 235, 1);
          display: flex;
          box-sizing: border-box;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 24px;
          .right_item_point {
            width: 7px;
            height: 7px;
            border-radius: 7px;
            background: rgba(201, 202, 206, 1);
            margin-left: 19px;
            margin-right: 17px;
          }
          .right_item_text {
            flex: 1;
            text-align: left;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(85, 85, 85, 1);
          }
          .right_item_btn {
            width: 134px;
            height: 41px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-color: #1269f9;
            margin-right: 35px;
            font-size: 16px;
            cursor: pointer;
          }
        }
        .body_right_item:hover {
          border: 1px solid #1269f9;
        }
      }
    }
  }
}
.no_list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
