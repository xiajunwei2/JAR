webpackJsonp([11],{"/iyE":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("84iU");s.e(39).then(s.bind(null,"BZD2"));var i={data:function(){return{art:s("8rR4"),zcfwList:[],newsList:[],detail:{},type:{zc:"zcfwList",news:"newsList"}}},created:function(){localStorage.getItem("newsItem")&&(this.detail=JSON.parse(localStorage.getItem("newsItem")))},methods:{getData:function(){},getDetail:function(){}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"article"},[s("div",{staticClass:"art-title"},[t._v(t._s(t.detail.title))]),t._v(" "),s("div",{staticClass:"art-src"},[t._v("信息来源： "+t._s(t.detail.source))]),t._v(" "),s("div",{staticClass:"art-ctx",domProps:{innerHTML:t._s(t.detail.content)}})])},staticRenderFns:[]},n=s("C7Lr")(i,a,!1,null,null,null);e.default=n.exports},"8rR4":function(t,e,s){t.exports=s.p+"static/img/art.39455b8.jpg"}});