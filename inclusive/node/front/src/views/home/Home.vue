<template>
  <div class="home" :style="{backgroundImage:'url('+bgImg+')'}">
    <Banner></Banner>
    <div class="match">
      <div class="match-left" :style="{backgroundImage:'url('+mbg+')'}">
        <div class="dTitle">金融贷款产品介绍</div>
        <div class="items">
          <div class="left-item">
            <div class="item-title">信用贷</div>
            <div class="item-subtitle">Credit loan</div>
            <div class="item-list">
              <div v-for="(item,index) in KnowledgeList" @click="matchProd(item,1)" :key="index" class="l-item">
                {{ item.type }} <img src="/static/images/allow.png" style="margin-left:7px;width:5px;height:9px;"></div>
            </div>
          </div>
          <div class="left-item">
            <div class="item-title">抵押贷</div>
            <div class="item-subtitle">Mortgage loan</div>
            <div class="item-list">
              <div v-for="(item,index) in MortgageList" @click="matchProd(item,2)" :key="index" class="l-item"
                   :class="{'d-l-item':item.type && item.type.length>=6}">{{ item.type }} <img
                src="/static/images/allow.png" style="margin-left:7px;width:5px;height:9px;"></div>
            </div>
          </div>
        </div>
        <div class="one-match" @click="match">
          一键匹配
        </div>
      </div>
      <div class="match-right">
        <div class="r-item">
          <div>
            <img src="/static/images/g.png" alt="">
            <span>政府官方平台</span>
          </div>
          <div class="r-desc">
            <div>平台由政府搭建，通过人工智能的应用和大数据的整合，促进企业与金融机构的信息交互和精准对接</div>
          </div>
        </div>
        <div class="r-item">
          <div>
            <img src="/static/images/s.png" alt="">
            <span>申请便捷</span>
          </div>
          <div class="r-desc">
            <div>企业填报一次资料，既可一键匹配平台合作金融机构所有线上产品，系统自动推荐方案，高效、快捷</div>
          </div>
        </div>
        <div class="r-item">
          <div>
            <img src="/static/images/input.png" alt="">
            <span>数据安全</span>
          </div>
          <div class="r-desc">
            <div>企业数据加密传输，并利用区块链技术保障贷款流程真实有效性</div>
          </div>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="s-item" v-for="item in services" :key="item.title">
        <img :src="item.image" alt="">
        <div class="s-text">
          <div>{{ item.title }}</div>
          <div>{{ item.stitle }}</div>
        </div>
      </div>
    </div>
    <div class="dydata-box">
      <div class="dydata" style="position:relative;">
        <BoxTitle title="实时动态" etitle="Real time dynamic"></BoxTitle>
        <div class="line"></div>
        <div class="dy-title">
          <div class="t-text">公司名称</div>
          <div class="t-text">贷款银行</div>
          <div class="t-text">贷款金额(万元)</div>
        </div>
        <Spin fix v-if="loadding" class="loadding">加载中...</Spin>
        <div class="dy-list" v-if="!loadding">
          <div id="list_overflowy">
            <div class="list-item" v-for="(item,index) in tableDataList" :key="index">
              <div class="t-text item-company">{{ item.customerName|filterName }}</div>
              <div class="t-text item-bank">{{ item.bankName|filterName }}</div>
              <div class="t-text item-money">{{ item.loanAmount }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hline"></div>
      <div class="dydata">
        <BoxTitle title="政策服务" etitle="Policy services" rtitle="一键匹配政策" @more="matchZc"></BoxTitle>
        <div class="match-arc-list">
          <div class="l-item" v-for="(item,index) in zcfwList" :key="index" @click="look(item)">
            <div class="l-i-title">
              <div class="dot"></div>
              <div class="l-i-title-text">{{ item.title }}</div>
              <img src="/static/images/new.png" class="new" v-if="item.label"/>
            </div>
            <div class="l-i-desc" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="news">
      <BoxTitle title="新闻快讯" etitle="Policy news" rtitle="查看更多"></BoxTitle>
      <NewsItem v-for="(item,index) in newsList" :item="item" :key="index" class="news-item"
                @look="lookNews(item)"></NewsItem>
    </div>
    <div class="company">
      <BoxTitle title="合作机构" etitle="Cooperative organization"></BoxTitle>
      <div class="c-list">
        <vue-seamless-scroll :data="bankLists" :class-option="classOption" class="table-content">
          <!--            <div style="float: left" v-for="item in bankLists" :key="item.src">-->
          <img style="margin-right: 10px" :src="item.src" alt="" v-for="item in bankLists" :key="item.src">
          <!--            </div>-->
          <!--          </ul>-->
        </vue-seamless-scroll>
        <div style="clear: both"></div>
        <!--              <div class="c-item" v-for="item in bankLists" :key="item.src"><img :src="item.src" alt=""></div>-->
      </div>
    </div>
    <mask-layer class='reason-mask' :show='HasCompanys' title-name='' @close="handleClickMask(false)" box-width='550px'
                box-height="300px">
      <template slot='content'>
        <p class="tTitle">提示</p>
        <div class='reason-content'>
          <div class="companyList">
            <p>添加企业且认证成功后可申请贷款</p>
          </div>
          <div class="butns">
            <div class="btns btn-two" @click="handleClickMask(false)">取消</div>
            <div class="btns btn-one" @click="handleClickMask(true)">添加企业</div>
          </div>
        </div>
      </template>
    </mask-layer>
    <mask-layer class='reason-mask' :show='HasCompanysInfo' title-name='' @close="handleClickMask(false)"
                box-width='550px'
                box-height="300px">
      <template slot='content'>
        <p class="tTitle">提示</p>
        <div class='reason-content'>
          <div class="companyList">
            <p>您还没有完善您的贷款需求，是否立即去完善？</p>
          </div>
          <div class="butns">
            <div class="btns btn-two" @click="handleClickMask(false)">取消</div>
            <div class="btns btn-one" @click="handleClickMask(true)">填写贷款需求</div>
          </div>
        </div>
      </template>
    </mask-layer>
  </div>
</template>

<script>
import './home.less';
import Banner from '@/views/home/banner.vue';
import BoxTitle from '@/views/home/box-title.vue';
import NewsItem from '@/views/home/news-item.vue';
import Axios from 'axios';
import Bank from './bank.json';
import {COM_SERVICE as http} from '@/api/request';

export default {
  data() {
    return {
      HasCompanys: false,
      HasCompanysInfo: false,
      bgImg: require('@/assets/images/jq/bbg.png'),
      mbg: require('@/assets/images/jq/mbg.png'),
      services: [
        {image: '/static/images/gf.png', title: '股权融资', stitle: 'equity financing'},
        {image: '/static/images/db.png', title: '担保服务', stitle: 'Guarantee service'},
        {image: '/static/images/bx.png', title: '保险服务', stitle: 'Insurance services'},
        {image: '/static/images/pm.png', title: '债权拍卖', stitle: 'Debt auction'},
      ],
      bankLists: [
        {src: require('@/assets/images/jq/HuaXiaLogo.png')},
        {src: require('@/assets/images/jq/MinShengLogo.png')},
        {src: require('@/assets/images/jq/PuFaLogo.png')},
        {src: require('@/assets/images/jq/XinYeLogo.png')},
        {src: require('@/assets/images/jq/ZhongXinLogo.png')},
      ],
      tableDataList: [],
      zcfwList: [],
      newsList: [],
      KnowledgeList: [
        {type: '综合信用贷', id: ''},
        {type: '商业价值贷', id: ''},
        {type: '订单价值贷', id: ''},
        {type: '水电税务贷', id: ''},
        {type: '知识价值贷', id: ''},
      ],
      MortgageList: [
        {type: '住房抵押贷', id: ''},
        {type: '工业厂房贷', id: ''},
        {type: '其他抵押贷', id: ''},
        // {title:'保险单保证金',type:''},
        // {title:'专利技术',type:''},
        // {title:'银票/商票',type:''},
      ],
      scrollTimer: null,
      scrollHeight: 350,
      loadding: false,
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  methods: {
    handleClickMask(bool) {
      if (bool === false)
        this.HasCompanys = false
      else if (bool === true) {
        if (this.$store.state.user.myBaseInfo.isRelationCompany === 0) {
          this.$router.push({name: "add-company"})
          return false
        } else if (sessionStorage.getItem('isDkInfo') == 1) {
          this.$router.push({name: "my-enterprice-info"})
          return false
        }
      }
    },
    initScroll() {
      let self = this
      let dom = document.querySelector('#list_overflowy')
      if (dom !== null) {
        self.startScroll(dom)
        dom.onmouseenter = function () {
          clearInterval(self.scrollTimer)
        }
        dom.onmouseleave = function () {
          setTimeout(() => {
            self.startScroll(this)
          }, 500)
        }
      }
    },
    startScroll(dom) {
      let height = dom.scrollHeight - this.scrollHeight + 10 //10表示多走1s，40表示表头的高度
      if (height <= 0) {
        return
      }
      let top = dom.scrollTop
      clearInterval(this.scrollTimer)
      this.scrollTimer = setInterval(() => {
        top += 1
        if (top >= height) {
          top = -10
        }
        dom.scrollTop = top
      }, 100)
    },
    look(item) {
      localStorage.setItem('newsItem', JSON.stringify(item));
      this.$router.push({path: "/news", query: {type: "zc", id: item.id}})
    },
    lookNews(item) {
      localStorage.setItem('newsItem', JSON.stringify(item));
      this.$router.push({path: "/news", query: {type: "news", id: item.id}})
    },
    matchZc() {
      window.open('http://jlpzc.cicba.cn/', "_blank");
    },
    match() {
      debugger
      if (this.$store.state.user.myBaseInfo.isRelationCompany === 0) {
        this.HasCompanys = true
        return false
      } else {
        this.$router.push({name: "loan-matching"})
        return false
      }
      if (sessionStorage.getItem('isDkInfo') == 1) {
        this.HasCompanysInfo = true
        return false
      } else {
        this.$router.push({name: "loan-matching"})
        return false
      }
      // this.$router.push({path:"/loan-type"})

      // this.$router.push({name: "loan-matching"})
    },
    matchType(item) {
      this.$router.push({path: "/loan-type", query: {type: item.type}})
    },
    matchProd(item, type) {
      this.$router.push({path: "/product", query: {type: type, id: item.id,name:item.type}})
    },
    getZcfwList() {
      Axios.get('/static/data.json').then(res => {
        if (res.status == 200) {
          this.zcfwList = res.data.zc;
          this.newsList = res.data.news;
        }
      })
    },
    getBankData() {
      this.loadding = true;
      this.$api.common.getBankData().then(res => {
        this.loadding = false;
        if (res.code == 0) {
          this.tableDataList = res.content || [];
        }
      })
    },
    getAllTypeGroup() {
      // /inclusive/productType/getAllTypeGroup
      http.post('/productType/getAllTypeGroup', {}, 'nauth').then(res => {
        if (res.code == 0) {
          let KnowledgeList = res.content.filter(item => item.type == '信用贷');
          this.KnowledgeList = KnowledgeList[0].children;
          let MortgageList = res.content.filter(item => item.type == '抵押贷');
          this.MortgageList = MortgageList[0].children;
        }
      })
    },
    getArticleList(type, field) {
      // /article/articleList
      let params = {type: type}
      http.post('/article/articleList', params, 'nauth').then(res => {
        if (res.code == 0) {
          this.$set(this, field, res.content);
        }
      })
    }
  },
  mounted() {
    this.getBankData();
    this.getAllTypeGroup();
    this.getArticleList(0, 'newsList');
    setTimeout(() => {
      this.getArticleList(1, 'zcfwList');
      this.initScroll()
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.scrollTimer)
    let dom = document.querySelector('#list_overflowy')
    if (dom) {
      dom.onmouseenter = null
      dom.onmouseleave = null
    }
  },
  filters: {
    filterName(name) {
      name = name.substr(0, 2) + '****' + name.substr(-3);
      return name;
    },
  },
  components: {
    Banner,
    BoxTitle,
    NewsItem
  }
}
</script>
<style lang="less" scoped>
/deep/.table-content {
  width: 100%;
  overflow: hidden;
  /*>div >div{
    display:flex;
    flex-wrap:nowrap;
    margin-bottom:10px;
  }*/
}

.dTitle {
  width: 220px;
  height: 48px;
  background: rgba(255,255,255,.2);
  color: rgba(255,255,255,.9);
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 48px;
  text-align: center;
  margin: 17px 0 0 5px;
}

/deep/ .reason-mask .mask-box {
  .tTitle {
    font-size: 20px;
    color: #5e5e5e;
  }

  .mask-title {
    border-bottom: none;
  }

  .mask-content {
    width: 100%;
    padding: 40px;
    text-align: center;
  }

  .icon-box {
    text-align: center;
    margin: 20px 0 30px;
  }

  .iconfont.icon-cuowu {
    font-size: 56px;
    color: rgba(241, 79, 74, 1);
  }

  .companyList {
    text-align: center;
    margin: 30px 0 0 0;

    p {
      font-size: 16px;
    }
  }

  .reason-content {
    text-align: left;
    line-height: 30px;
  }

  .butns {
    width: 270px;
    height: 40px;
    margin: 0 auto;
  }

  .btn-one {
    float: right;
    display: inline-block;
    width: 123px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    //padding:0px 15px;
    cursor: pointer;
    border: 2px solid rgba(204, 204, 204, 0);
    background: rgba(241, 79, 74, 1);
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 30px auto 0;
    border-radius: 5px;
  }

  .btn-two {
    float: left;
    border-radius: 5px;
    display: inline-block;
    width: 123px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    //padding:0px 15px;
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 1);
    background: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin: 30px auto 0;
  }
}
</style>
