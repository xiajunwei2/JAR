<template>
  <div class="message">
    <div class="msg_list">
      <div class="list_box">
        <div class="box_item" v-for="(item,index) in newList " :key="index" @click="getcurrent(item)">
          <div class="box_text">系统通知</div>
          <div class="box_time">{{item.createdTime|datetimeformat('HH:mm')}}</div>
          <div class="box_point" v-if="item.status==0"></div>
        </div>
      </div>
    </div>
    <div class="msg_box">
      <div class="msg_box_title" v-if="currentMsg.createdTime">
        <div class="title_text">系统通知</div>
        <div class="title_time">{{currentMsg.createdTime|datetimeformat('YYYY-MM-dd HH:mm')}}</div>
      </div>
      <div class="msg_box_info" style="margin: 30px 0px;">
        {{currentMsg.message}}
      </div>
    </div>
  </div>
</template>
<script>
// import Api from "@/api/api.js";
export default {
  name: "message",
  data() {
    return {
      messageId: '',
      newList:[],
      currentMsg:{}
    };
  },
  created () {
    this.getMessageLists()
  },
  methods: {
    getMessageLists(){
      this.$http.post('/auditsystem/sysMessage/getListMessage').then(res=>{
        if(res.code==0){
           this.newList=res.content
        }
      })
    },
    getcurrent(item){
       let params={
        messageId:item.messageId
      }
      console.log(item)
      this.$http.post('/auditsystem/sysMessage/getMessage',params).then(res=>{
        if(res.code==0){
          console.log(res)
          this.currentMsg=res.content
          this.$http.post('/auditsystem/sysMessage/updateReadStatus',params).then(res=>{
            if(res.code=0){
              this.getMessageLists()
            }
          })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.message {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #efeeee;
  box-sizing: border-box;
  .msg_list {
    width: 300px;
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding: 15px 2px 15px 10px;
    .list_box {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border-right: 1px solid #e5e5e5;
      .box_item {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        padding-left: 34px;
        padding-right: 30px;
        font-size: 16px;
        position: relative;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        border-bottom: 1px solid #e5e5e5;
      }
      .box_point {
        width: 10px;
        height: 10px;
        background-color: #fb0d45;
        position: absolute;
        top: 20px;
        left: 110px;
        border-radius: 10px;
      }
      .box_time {
        color: #999999;
      }
    }
  }
  .msg_box {
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: flex-start;
    padding: 30px 26px;
    .msg_box_title {
      height: 90px;
      background-color: #f2f2f2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      box-sizing: border-box;
      padding-top: 18px;
      padding-left: 34px;
      .title_text {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      .title_time {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
    .msg_box_info {
      display: flex;
      justify-content: flex-start;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #555555;
      padding-left: 34px;
      margin-top: 10px;
    }
  }
}

.red_point {
  font-size: 12px;
  margin-top: -10px;
  margin-left: 10px;
  color: #fb0d45;
}
</style>