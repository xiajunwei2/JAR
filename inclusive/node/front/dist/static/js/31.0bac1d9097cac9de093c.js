webpackJsonp([31],{"6IQ/":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("l/JR"),e={data:function(){return{userId:"",companyInfo:"",customerId:"",customInfo:{},creditLoanList:[{title:"政府采e贷",type:"商业价值信用贷"},{title:"新才e贷",type:"人才贷"},{title:"科创贷",type:"知识价值信用贷"},{title:"路保贷",type:"商业价值信用贷"}],mortgageList:[{title:"个人助业贷",type:"住房抵押贷"},{title:"法人按揭贷",type:"住房抵押贷"},{title:"厂房贷",type:"工业厂房抵押贷"}],noList:[{title:"云电贷",type:"信用贷"},{title:"云税贷",type:"信用贷"},{title:"科创e贷",type:"信用贷"}],companyId:"",prodList:[]}},created:function(){this.userId=this.$store.state.user.myBaseInfo.userId,null!==sessionStorage.getItem("company_id")?this.companyId=sessionStorage.getItem("company_id"):this.companyId=this.$store.state.user.myBaseInfo.companyId,this.$route.query.companyId&&(this.companyId=this.$route.query.companyId),this.getCurrentInfo(),this.getLoanProductList()},methods:{toPage:function(t){var s={productId:1,companyId:this.companyId,userId:this.userId,item:t};this.$router.push({name:"apply-info",params:s})},getCurrentInfo:function(){var t=this,s={companyId:this.companyId};a.a.post("/loanInfoMaterial/getLoanMaterial",s,"nauth").then(function(s){console.log(s),0==s.code&&s.content&&(t.companyInfo=s.content)})},getLoanProductList:function(){var t=this;a.a.post("/loanInfo/getMatchProductInfo",{companyId:this.companyId},"nauth").then(function(s){t.prodList=s.content})}}},n={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"mach"}},[i("div",{staticClass:"mach"},[i("div",{staticClass:"center mach_head"},[i("div",{staticClass:"company"},[i("div",{staticClass:"company_title"},[t._v(t._s(t.companyInfo.companyName))]),t._v(" "),i("Icon",{staticClass:"company_icon",attrs:{color:"#31d406",type:"ios-checkmark-circle"}}),t._v(" "),i("span",{staticStyle:{color:"#fff",marginLeft:"0.208vw"}},[t._v(t._s(t.companyInfo.authenticationStatusStr))])],1),t._v(" "),i("div",{staticClass:"demand"},[i("div",{staticClass:"demand_mine"},[t._v("\n          我的贷款需求: "),i("span",[t._v(t._s(t.companyInfo.loanMoney))]),t._v("万元\n        ")]),t._v(" "),i("div",{staticClass:"demand_date"},[t._v("贷款期限:"+t._s(t.companyInfo.loanCycleStr)+"月")])])]),t._v(" "),i("div",{staticClass:"center mach_main"},[i("div",{staticClass:"demand_info"},[t._v("为您匹配到以下产品:")]),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),t._l(t.prodList,function(s,a){return i("div",{staticClass:"main_item"},[i("div",{staticClass:"item_head"},[i("div",{staticClass:"head_left"}),t._v(" "),i("div",{staticClass:"head_right"},[i("div",{staticClass:"right_title"},[t._v(t._s(s.loanTypeName))])])]),t._v(" "),i("div",{staticClass:"item_body"},t._l(s.matchLoanProductVos,function(s,a){return i("div",{key:a,staticClass:"body_items"},[i("div",{staticClass:"item_title"},[t._v(t._s(s.productName))]),t._v(" "),i("div",{staticClass:"item_percent"},[t._v(t._s(s.suitability-Math.ceil(20*Math.random())+"%"))]),t._v(" "),i("div",{staticClass:"item_suitability"},[t._v("匹配度")]),t._v(" "),i("div",{staticClass:"item_foot"},[i("div",{staticClass:"item_type"},[i("div",{staticClass:"type_left"},[t._v("担保类型")]),t._v(" "),i("div",{staticClass:"type_right"},[t._v(t._s(s.loanType))])]),t._v(" "),i("div",{staticClass:"item_type"},[i("div",{staticClass:"type_left"},[t._v("贷款利率")]),t._v(" "),i("div",{staticClass:"type_right"},[t._v(t._s(s.loanRate)+"%")])]),t._v(" "),i("div",{staticClass:"item_btn perfect_btn",on:{click:function(i){return t.toPage(s)}}},[t._v("立即申请")])])])}),0)])})],2),t._v(" "),i("div",{staticClass:"perfect"},[i("div",{staticClass:"main_item center"},[i("div",{staticClass:"item_head"},[i("div",{staticClass:"head_msg"},[i("Icon",{attrs:{color:"#fff",type:"ios-alert"}}),t._v(" "),i("div",{staticClass:"msg_content"},[t._v("以下产品需要您完善资料")])],1)]),t._v(" "),i("div",{staticClass:"item_body perfect_body"},t._l(t.noList,function(s,a){return i("div",{key:a,staticClass:"body_items perfect_items"},[i("div",{staticClass:"item_title"},[t._v(t._s(s.title))]),t._v(" "),i("div",{staticClass:"item_percent"},[t._v(t._s(65-Math.ceil(30*Math.random())+"%"))]),t._v(" "),i("div",{staticClass:"item_suitability"},[t._v("匹配度")]),t._v(" "),i("div",{staticClass:"item_foot perfect_foot"},[i("div",{staticClass:"item_type"},[i("div",{staticClass:"type_left"},[t._v("担保类型")]),t._v(" "),i("div",{staticClass:"type_right"},[t._v(t._s(s.type))])]),t._v(" "),t._m(0,!0),t._v(" "),i("div",{staticClass:"item_btn perfect_btn"},[t._v("立即申请")])])])}),0)])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"item_type"},[s("div",{staticClass:"type_left"},[this._v("贷款利率")]),this._v(" "),s("div",{staticClass:"type_right"},[this._v("3.85%-6.55%")])])}]};var c=i("C7Lr")(e,n,!1,function(t){i("sdar")},"data-v-17f586cf",null);s.default=c.exports},sdar:function(t,s){}});