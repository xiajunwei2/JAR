webpackJsonp([13],{MC2J:function(t,e){},kWbK:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loantype-wrapper bg-color-white jq-maxwidth margin-tb-sm"},[n("set-title",{attrs:{"title-name":"贷款类型","is-back":!0}}),t._v(" "),n("div",{staticClass:"loantype-container padding-sm"},t._l(t.typeLists,function(e){return n("my-card",{key:e.name,staticClass:"margin-bottom-sm",attrs:{"title-name":e.name}},[n("div",{staticClass:"jq-flex-btw jq-c-center"},[n("span",[t._v(t._s(e.description))]),t._v(" "),n("Button",{staticClass:"btn-border-red",staticStyle:{padding:"0.313vw 0.833vw","border-radius":"1.042vw"},on:{"on-click":function(n){return t.chooseType(e)}}},[t._v("选择该分类")])],1)])}),1),t._v(" "),n("div",{staticClass:"text-center padding"},[n("router-link",{attrs:{to:"/user-center/my-loan"}},[n("Button",{staticClass:"jq-btn-red"},[t._v("返回借款列表")])],1)],1)],1)},staticRenderFns:[]};var s=n("C7Lr")({data:function(){return{typeLists:[]}},methods:{chooseType:function(t){this.$router.push({name:"apply-loan",query:{id:t.id}})}},created:function(){var t=this;this.$api.common.getLoanType().then(function(e){e.err||(t.typeLists=e.data||[])})}},a,!1,function(t){n("MC2J")},"data-v-ec5d80ba",null);e.default=s.exports}});