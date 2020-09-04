import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import {getSelects} from '../api/select.api'
import {user} from './modules/user';  //用户模块

export const store = new Vuex.Store({
  state:{
    isAlive:true,//用于是否显示router-view
    // 关于公司
    aboutus:{
      phone: "023-6173 8886",
      address: "重庆市九龙坡区前进支路15号九龙电力大厦20楼",
      records: "Copyright©2019-2020 重庆市九龙坡区人民政府 All Rights Reserved."
    },
    keywords:'',//全局搜索关键词
    groupmodel:0,//全局关键词的路由方向
    navbarShow:true,//导航栏是否显示
    addressLists:[
      {name:'重庆市',value:'cq'}
    ],
    subAddLists:[
      {name:'渝中区','value':'yuzhong'},
      {name:'九龙坡区',value:'jiulongpo'},
      {name:'沙坪坝区',value:'shapingba'},
      {name:'大渡口区',value:'dadukou'},
      {name:'南岸区',value:'nanan'},
      {name:'江北区',value:'jiangbei'},
      {name:'北碚区',value:'beibei'},
      {name:'渝北区',value:'yubei'},
      {name:'巴南区',value:'banan'},
      {name:'长寿区',value:'changshou'},
      {name:'綦江区',value:'qijiang'},
      {name:'永川区',value:'yongchuan'},
      {name:'璧山区',value:'bishan'},
      {name:'合川区',value:'hechuan'},
      {name:'江津区',value:'jiangjin'},
      {name:'万州区',value:'wanzhou'},
      {name:'梁平区',value:'liangping'},
      {name:'开州区',value:'kaizhou'},
      {name:'涪陵区',value:'fuling'},
      {name:'南川区',value:'nanchuan'},
      {name:'大足区',value:'dazu'},
      {name:'潼南区',value:'tongnan'},
      {name:'荣昌区',value:'nanchang'},
      {name:'武隆区',value:'wulong'}
    ],
    capitalSelect:[],//资金方
    loanTypeSelect:[],//贷款类型
    repaySelect:[],//还款方式
    sourceSelect:[],//还款方式
    guaranteeSelect:[],//还款方式
    usageSelect:[],//还款方式
    industrySelect:[],//还款方式
    natureSelect:[],//还款方式
    busTimeSelect:[],//还款方式
  },
  mutations:{
    reloadFrame(state){
      state.isAlive = false
      // 异步微任务队列
      new Promise((rev)=>{
        rev()
      }).then(()=>{
        state.isAlive = true
      })
    },
    updateNavbar(state,bool){
      state.navbarShow = bool
    },
  },
  actions:{
    getSelects({state},{force,tag}){
      if(!force && state[tag+'Select'].length){
        return;
      }
      getSelects(tag).then(res=>{
        if(!res.err){
          state[tag+'Select'] = res.data||[];
        }
      })
    }
  },
  modules:{
    user,
  }
})