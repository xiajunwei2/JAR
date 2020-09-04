
<template>
  <div class="home-box">
    <!-- banner图 -->
    <div
      id="carousel-example-generic"
      class="mt20 carousel slide"
      data-ride="carousel"
    >
      <!-- Indicators -->
      <!-- <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" :class='{active:i==0}' v-for='(it,i) in bannerLists.length' :key='i' :data-slide-to="i"></li>
      </ol> -->

      <!-- Wrapper for slides -->
      <div
        class="carousel-inner"
        role="listbox"
      >
        <div
          :class="['item','text-center',i==0 && 'active']"
          v-for='(it,i) in bannerLists'
          :key='i'
        >
          <!-- <img :src="it.image" alt="..." class='max-width-100'> -->
          <img
            :src="it.image"
            style='display:inline-block;width:100vw;'
          >
          <div class="carousel-caption"></div>
        </div>
      </div>

      <!-- Controls -->
      <a
        class="left carousel-control"
        href="#carousel-example-generic"
        role="button"
        data-slide="prev"
      >
        <span class='box'><i class="iconfont icon-xiaji"></i></span>
        <!-- <span class="sr-only">Previous</span> -->
      </a>
      <a
        class="right carousel-control"
        href="#carousel-example-generic"
        role="button"
        data-slide="next"
      >
        <span class='box'><i class="iconfont icon-xiaji"></i></span>
        <!-- <span class="sr-only">Next</span> -->
      </a>
      <!-- 申请 -->
      <div class='apply-wrapper'>
        <router-link to='/loan-type'>
          <span class='apply-box'>
            <img
              src="@/assets/images/jq/red_bg.png"
              alt=""
            >
            <span class='onekey-apply'>一键申请</span></span>
        </router-link>
      </div>
      <!-- 数字统计 -->
      <div class="statics-wrapper">
        <div class='jq-maxwidth text-center'>
          <div class="row">
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu01.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.companyCount? countNum.companyCount:0"></count-to>
                </b>个</p>
              <p class='desc'>注册企业</p>
            </div>
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu02.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.applyLoan? countNum.applyLoan:0"></count-to>
                </b>次</p>
              <p class='desc'>申请贷款</p>
            </div>
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu03.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.letGoLoan? countNum.letGoLoan:0"></count-to>
                </b>笔</p>
              <p class='desc'>成功放款</p>
            </div>
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu04.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.loanMoney? countNum.loanMoney:0"></count-to>
                </b>万元</p>
              <p class='desc'>放款总额</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 优势 -->
    <div class="adv-wrapper">
      <div class="adv-container jq-maxwidth">
        <ul class='adv-lists'>
          <li
            class='adv-item'
            v-for='(item,index) in advLists'
            :key='index'
          >
            <div class='title'>
              <span class="jq-gradient-red dot"></span>
              {{item.title}}
            </div>
            <div class='subtitle'>
              {{item.subtitle}}
            </div>
          </li>
        </ul>
        <!-- <img src="@/assets/images/jq/index_bg2.png" alt=""> -->
      </div>
    </div>
    <!-- 实时动态 -->
    <div class="table-wrapper bg-color-white padding-tb-60">
      <div class="center-title margin-bottom-xl"><span class='name'>实时动态</span></div>
      <ul class="list-wrapper jq-maxwidth">
        <li class='list-head list-item'>
          <div>公司名称</div>
          <div>贷款银行</div>
          <div>贷款金额（万元）</div>
          <div>贷款日期</div>
        </li>
        <li
          class="list-content jq-scroll-0"
          id='list_overflowy'
          :style='{"max-height":scrollHeight+"px"}'
        >
          <ul>
            <li
              class="list-item"
              v-for='(item,index) in tableData'
              :key='index'
            >
              <div>{{item.customerDesc | customer}}</div>
              <div>{{item.capitalDesc||'暂无数据'}}</div>
              <div>{{item.orderLoanInfo.amount+'.00'}}</div>
              <div>{{item.order.requestTime}}</div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <Table stripe border class='jq-table jq-maxwidth' :height="scrollHeight" :columns="tableColumns" :data="tableData"></Table> -->
    </div>
    <!-- 政策快讯 -->
    <div class="progress-wrapper bg-color-grey padding-tb-60">
      <div class='jq-maxwidth'>
        <div
          class="center-title"
          style='margin-bottom:0;'
        ><span class='name'>政策快讯</span></div>
        <Zckx></Zckx>
      </div>
    </div>
    <!-- progress -->
    <div
      class="progress-wrapper bg-color-grey padding-tb-60"
      style="background-color:white;"
    >
      <div class='jq-maxwidth'>
        <div
          class="center-title"
          style='margin-bottom:0;'
        ><span class='name'>操作步骤</span></div>
        <ul class="pro-box padding-tb-60">
          <li
            class='pro-item'
            v-for='pro in progressLists'
            :key="pro.sort"
          >
            <img
              v-lazy='pro.src'
              alt=""
            >
            <div
              class="dots-4"
              v-if='pro.sort<4'
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="pro-item-info">
              <p class="sort">{{pro.sort}}</p>
              <p class="name">{{pro.name}}</p>
            </div>
            <!-- <div class="pro-mask"></div> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 精准匹配 -->
    <div class="match-wrapper">
      <router-link to='/choose-case'>
        <img
          v-lazy='matchImage'
          alt=""
          class='max-width-100'
        >
      </router-link>
    </div>
    <!-- 合作机构 -->
    <coor-org></coor-org>
  </div>
</template>

<script>
import './index.less'
import coorOrg from '@/components/coor-org.vue'
export default {
  components: {
    coorOrg,
    Zckx: () => import('@/views/index/zckx.vue')
  },
  filters: {
    customer(val) {
      if (val) {
        return '重庆***公司'
      } else {
        return '赞无信息'
      }
    }
  },
  data() {
    return {
      countNum: [],
      advBgImage: require('@/assets//images/jq/index_bg3.png'),
      progressImage: require('@/assets/images/jq/index_bg02.png'),
      matchImage: require('@/assets/images/jq/xsy_bg03.png'),
      tableColumns: [
        {
          title: '公司名称',
          key: 'customerDesc'
        },
        {
          title: '贷款银行',
          key: 'capitalDesc'
        },
        {
          title: '贷款金额（万元）',
          key: 'account',
          render: function(h, params) {
            return h('div', params.row.orderInfo.amount)
          }
        },
        {
          title: '贷款日期',
          key: 'date',
          render: function(h, params) {
            return h('div', params.row.orderHeader.requestTime)
          }
        }
      ],
      tableData: [
        {
          customerDesc: '重庆***公司',
          capitalDesc: '重庆银行',
          address: '渝中区',
          order: {
            requestTime: '2020-05-03'
          },
          date: '2020-05-03',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国建设银行',
          address: '渝中区',
          order: {
            requestTime: '2020-04-12'
          },
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国工商银行',
          address: '九龙坡区',
          order: {
            requestTime: '2020-04-10'
          },
          date: '2020-04-10',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国建设银行',
          address: '九龙坡区',
          order: {
            requestTime: '2020-03-20'
          },
          date: '2020-03-20',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国银行',
          address: '沙坪坝区',
          order: {
            requestTime: '2020-03-13'
          },
          date: '2020-03-13',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国农业银行',
          address: '渝中区',
          order: {
            requestTime: '2020-03-01'
          },
          date: '2020-03-01',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '重庆银行',
          address: '九龙坡区',
          order: {
            requestTime: '2020-02-23'
          },
          date: '2020-02-23',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '重庆银行',
          address: '九龙坡区',
          order: {
            requestTime: '2020-02-18'
          },
          date: '2020-02-18',
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国建设银行',
          address: '渝中区',
          date: '2020-02-10',
          order: {
            requestTime: '2020-02-10'
          },
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '交通银行',
          address: '渝中区',
          date: '2020-01-25',
          order: {
            requestTime: '2020-01-25'
          },
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国工商银行',
          address: '渝中区',
          date: '2020-01-11',
          order: {
            requestTime: '2020-01-11'
          },
          orderLoanInfo: {
            amount: 500
          }
        },
        {
          customerDesc: '重庆***公司',
          capitalDesc: '中国工商银行',
          address: '渝中区',
          date: '2020-01-11',
          order: {
            requestTime: '2020-01-11'
          },
          orderLoanInfo: {
            amount: 600
          }
        }
      ],
      bannerLists: [
        { url: '', image: require('@/assets/images/jq/index_bg.png') },
        { url: '', image: require('@/assets/images/jq/index_bg.png') },
        { url: '', image: require('@/assets/images/jq/index_bg.png') }
      ],
      advLists: [
        {
          title: '政府官方平台',
          subtitle:
            '平台由政府搭建，通过人工智能的应用和大数据的整合，促进企业与金融机构的信息交互和精准对接，逐步提高企业的融资效率和降低金融机构放贷风险，以期实现普惠金融，金融普惠'
        },
        {
          title: '申请便捷',
          subtitle:
            '企业填报一次资料，既可一键匹配平台合作金融机构所有线上产品，由系统自动推荐最适合的方案，高效、快捷'
        },
        {
          title: '精准匹配',
          subtitle:
            '针对企业真实具体情况，可通过平台大数据人工智能精准匹配符合其自身条件的个性化融资服务，大大提高企业申请融资的成功率'
        },
        {
          title: '数据安全',
          subtitle:
            '企业数据加密传输，数据安全有保障，并利用区块链技术保障贷款流程真实有效性'
        }
      ],
      progressLists: [
        {
          name: '快捷注册',
          sort: '01',
          src: require('@/assets/images/jq/pro1.png')
        },
        {
          name: '一键申请',
          sort: '02',
          src: require('@/assets/images/jq/pro2.png')
        },
        {
          name: '完善信息',
          sort: '03',
          src: require('@/assets/images/jq/pro3.png')
        },
        {
          name: '精准匹配',
          sort: '04',
          src: require('@/assets/images/jq/pro4.png')
        }
      ],
      scrollTimer: null,
      scrollHeight: 350
    }
  },
  created() {
    this.getCountNum()
    // 获取实时动态数据
    this.$api.order
      .getOutOrder({
        page: 1,
        status: 202,
        rows: 10
      })
      .then(res => {
        if (!res.err && res.data.records.length) {
          this.tableData = res.data.records
        }
      })
  },
  methods: {
    async getCountNum() {
      let { data } = await this.$api.order.getCount()
      this.countNum = data
      // console.log(data)
    },
    initScroll() {
      let self = this
      let dom = document.querySelector('#list_overflowy')
      self.startScroll(dom)
      dom.onmouseenter = function() {
        clearInterval(self.scrollTimer)
      }
      dom.onmouseleave = function() {
        setTimeout(() => {
          self.startScroll(this)
        }, 500)
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
    }
  },
  mounted() {
    setTimeout(() => {
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
  }
}
</script>