<!-- 
@startTime:2019-
@author:zoujingqiang
@endTime:2019-
@description:xxx
-->
<template>
  <div class='aboutus-wrapper'>
    <div class='aboutus-container jq-maxwidth'>
      <!-- <set-title title-name='关于我们'></set-title> -->
      <div class="aboutus-content">
        <p class='title'>{{title}}</p>
        <div class="text">
          为落实国家关于财政支持深化民营和小微企业金融服务综合改革的相关政策，重庆市九龙坡区政府搭建【九龙坡普惠金融服务平台】，联合银行、担保第三方数据等多方机构，合理利用政府风险代偿金，为企业提供便捷、简单、高效的融资服务。
        </div>
        <div class="text">
          平台通过数据共享通道和大数据风控机制，健全优化金融机构与企业信息对接机制，实现资金供需双方线上高效对接，化解“银企”之间信息不对称等问题，提高企业金融服务可得性、覆盖率和满意度，帮企业及时解决<b class='important'>“融资难、融资贵、融资慢”</b>问题，扶助微小企业高速、稳定发展。
        </div>
      </div>
      <div class='contact'>
        <p>联系电话：{{aboutus.phone}} （9:00 - 18:00）</p>
        <p style='margin-bottom:40px;'>地址：{{aboutus.address}}</p>
        <!-- <img src="@/assets/images/jq/map.png" alt=""> -->
        <div id="allmap"></div>
      </div>
      <!-- 合作机构 -->
     <!-- <coor-org style='background:#fff;'></coor-org> -->
    </div>
  </div>
</template>

<script>
import coorOrg from '@/components/coor-org.vue'
export default {
  components:{coorOrg},
  data(){
    return {
      contactInfo:{
        "name":"",
        "phone":"",
        "content":"",
        "email":""
      },
      title:process.env.TITLE,
      submitLoading:false
    }
  },
  computed:{
    aboutus(){
      return this.$store.state.aboutus
    }
  },
  methods:{
    initMap(){
      // 百度地图API功能
      var map = new BMapGL.Map("allmap");
      // var logo = require('@/assets/images/jq/logo.png')
      var point = new BMapGL.Point(106.519792,29.515582);
      map.centerAndZoom(point, 17);
      var marker = new BMapGL.Marker(point);  // 创建标注
	    map.addOverlay(marker);              // 将标注添加到地图中
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      var zoomCtrl = new BMapGL.ZoomControl();  // 添加比例尺控件
      map.addControl(zoomCtrl);
      var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
      map.addControl(scaleCtrl);
    }
  },
  mounted () {
    this.$nextTick(()=>{
      this.initMap();
    })
  }
}
</script>

<style lang='less' scoped>
#allmap{
  width:800px;
  height:400px;
}
.aboutus-wrapper{
  padding:20px;
}
.aboutus-container{
  padding-top:60px;
  padding-bottom:40px;
  background:#fff;
}
.aboutus-content,.contact{
  padding:0 50px;
  color:#666;
}
.aboutus-content{
  margin-bottom:70px;
}
.title{
  font-size:30px;
  font-family:Source Han Sans CN;
  font-weight:bold;
  color:rgba(51,51,51,1);
  margin-bottom:50px;
  position: relative;
  height:60px;
  &::after{
    content:'';
    position:absolute;
    bottom:0;
    left:0;
    width:54px;
    height:6px;
    background:rgba(220,61,56,1);
    border-radius:3px;
  }
}
.text{
  line-height: 30px;
  font-weight:300;
  color:rgba(85,85,85,1);
  font-size: 1.6rem;
  margin-bottom:20px;
  font-family: 黑体;
}
.important{
  color:red;
}

.contact{
  color:rgba(153,153,153,1);
  p{
    line-height: 30px;
  }
}
@media screen and (max-width:992px) {
  #allmap{
    width:100%;
    height:200px;
  }
}
</style>