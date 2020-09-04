<template>
  <div class="stepOut">
    <ul>
      <li class="stepItem" v-for="(stepItem, index) in stepInfo.list" :key="index" :class="{'reject':stepItem.status>=5}">
        <div :class="stepItem.status >= index+1 ? 'icon active':'icon'"></div>
        <div :class="stepItem.status >= index+2 ? 'line lineActive':'line'" v-show="index!==stepInfo.list.length-1">
        </div>
        <p class="now">{{stepItem.statusStr}}</p>
        <p class="stepStatus">{{stepItem.workerStr}}</p>

        <p class="statusTime">{{$moment(stepItem.createdTime*1000).format("YYYY-MM-DD HH:mm:ss")}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "steps",
  props: {
    // 传递步骤参数1
    stepInfo: {
      type: Object,
      default: function () {
        return {
          list: [],
          step: 0,
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
.stepOut {
  width: 100%;
  height: 120px;
  padding-top: 50px;
  display: flex;
  justify-content: flex-start;
  .stepItem {
    width: 260px;
    height: 70px;
    float: left;
    font-family: SimSun;
    list-style-type: none;
    font-size: 16px;
    text-align: center;
    position: relative;
    .icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #e2e2e2;
      margin: 0 auto;
      position: relative;
      z-index: 888;
    }
    .active {
      background-color: green;
    }
    .line {
      position: absolute;
      top: 9px;
      left: 50%;
      border-bottom: 4px dashed #e2e2e2;
      width: 260px;
      z-index: 111;
    }
    .now {
      font-weight: 600;
      position: absolute;
      bottom: 80px;
      margin: 0 auto;
      left: 37%;
    }
    .lineActive {
      border-bottom: 4px solid green;
    }
    .stepStatus {
      color: rgba(3, 2, 2, 0.7);
      margin: 0 auto;
      line-height: 36px;
      height:36px;
    }
    .statusTime {
      margin: 0 auto;
      color: rgba(87, 87, 87, 1);
      opacity: 0.5;
    }
  }
  .reject{
    .active{
      background-color: red;
    }
    .lineActive {
      border-bottom: 4px solid red;
    }
    .line {
      border-bottom: 4px dashed red;
    }
  }
}
</style>