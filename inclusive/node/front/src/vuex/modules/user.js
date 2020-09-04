import * as userApi from '@/api/user.api'
import alert from '@/vueInstance/alert/alert.js'

import {getToken,setToken,getRefToken,setRefToken,clearAll} from '@/utils/localStorage'
export const user = {
  state:{
    loginState:false,
    loginShow:false, // 登录弹框是否显示
    myBaseInfo:{
      account:''
    },
  },
  getters: {
    isLogin(state){
      let token = getToken()
      if(token){
        state.loginState = true
        return token
      }else{
        state.loginState = false
        return false
      }
    }
  },
  mutations: {
    updateLoginState(state,bool){
      state.loginState = bool;
    },
    updateLoginShow(state,bool){
      state.loginShow = bool;
    },
    setUserInfo(state,info){
      state.myBaseInfo  = info;
    }
  },
  actions: {
    // 退出登录
    logout({commit},isAlert=true){
      return new Promise((rev,rej)=>{
        userApi.logout().then(res=>{
          clearAll();
        })
        isAlert&&alert.success('已退出');
        commit('updateLoginState',false);
        commit('setUserInfo',{});
        rev();
      })
    },
    // 登录
    login({dispatch,commit},params){
      return new Promise((rev,rej)=>{
        userApi.login(params).then(({err,data})=>{
          // console.log(err,data)
          console.log(data)
          if(err || !data.content){
            rej(err)
            return
          }
          alert.success('登录成功');
          rev(data);
          commit('updateLoginState',true);
          commit('updateLoginShow',false);
          setToken(data.content);
          setRefToken(data.content);
          dispatch('getMyInfo',true);
        })
      })
    },
    getMyInfo({commit,state},force){
      if(!force && state.myBaseInfo.account){
        return;
      }
      return new Promise((rev,rej)=>{
        userApi.getMe().then(res=>{
          if(res.err){
            rej(res.err);
            return;
          }
          commit('setUserInfo',res.data.content);
          rev(res.data);
        })
      })
    }
  }
}