webpackJsonp([32],{Lmwy:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=s("l/JR"),e={data:function(){return{HasCompanys:!1,bankimg:s("L/nd"),company:[]}},created:function(){if(null!==this.$store.state.user.myBaseInfo.companyId){var t={companyId:this.$store.state.user.myBaseInfo.companyId};n.a.post("/loanInfoMaterial/perfectLoanMaterial",t,"nauth").then(function(t){0==t.code&&sessionStorage.setItem("isDkInfo",t.content.isPerfectLoan)}).catch(function(t){})}else sessionStorage.setItem("isDkInfo",1);this.getCompanyList()},methods:{handleClickMask:function(t){!1===t?this.HasCompanys=!1:!0===t&&this.$router.push({name:"add-company"})},detail:function(t,a){var s=t&&t.companyByUserVo&&t.companyByUserVo.id,n=a&&a.loanId;this.$router.push({path:"/user-center/loandetail",query:{companyId:s,loanId:n}})},toPage:function(t,a){var s=a&&a.companyByUserVo&&a.companyByUserVo.id;"edit"==t?this.$router.push({name:"my-enterprice-info",query:{id:s}}):this.$router.push({name:t,query:{id:s}})},getCompanyList:function(){var t=this;n.a.post("/loanInfo/loanInfoByUser",{userId:this.$store.state.user.myBaseInfo.userId},"nauth").then(function(a){0==a.code&&(t.company=a.content||[],0===t.company.length&&(t.$nextTick(function(){document.getElementsByClassName("user-center-right")[0].setAttribute("style","background : #ffffff")}),t.HasCompanys=!0))}).catch(function(t){})}}},o={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"loan"},[t.company.length>0?s("div",t._l(t.company,function(a){return s("div",{key:a.customerId,staticClass:"company-item"},[s("div",{staticClass:"company-info"},[s("div",{staticClass:"c-top"},[s("div",{staticClass:"left"},[s("div",{staticClass:"c-title"},[t._v(t._s(a.companyByUserVo&&a.companyByUserVo.companyName))]),t._v(" "),s("Icon",{staticClass:"c-auth-img",attrs:{type:"ios-checkmark-circle"}}),t._v(" "),s("div",{staticClass:"c-auth"},[t._v("\n              "+t._s(a.companyByUserVo&&a.companyByUserVo.authenticationStatus?"已认证":"审核中")+"\n            ")])],1),t._v(" "),s("div",{staticClass:"btns"},[s("div",{directives:[{name:"show",rawName:"v-show",value:a.companyByUserVo&&-1!=a.companyByUserVo.authenticationStatus&&0!=a.companyByUserVo.authenticationStatus,expression:"item.companyByUserVo && item.companyByUserVo.authenticationStatus != -1 && item.companyByUserVo.authenticationStatus != 0"}],staticClass:"btn-dmd",on:{click:function(s){return t.toPage("edit",a)}}},[t._v("修改贷款需求\n            ")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:a.companyByUserVo&&-1!=a.companyByUserVo.authenticationStatus&&0!=a.companyByUserVo.authenticationStatus&&null!=a.companyByUserVo.loanMoney,expression:"item.companyByUserVo && item.companyByUserVo.authenticationStatus != -1 && item.companyByUserVo.authenticationStatus != 0 && item.companyByUserVo.loanMoney != null"}],staticClass:"btn-one",on:{click:function(s){return t.toPage("loan-matching",a)}}},[t._v("一键贷款\n            ")])])]),t._v(" "),a.companyByUserVo&&a.companyByUserVo.loanMoney?s("div",{staticClass:"demand"},[s("div",{staticStyle:{display:"inline-block"}},[t._v("我的贷款需求：")]),t._v(" "),s("span",[t._v(t._s(a.companyByUserVo&&a.companyByUserVo.loanMoney)+"万元")])]):t._e()]),t._v(" "),a.loanInfoList&&a.loanInfoList.length>0?s("div",{staticClass:"table-data"},[t._m(0,!0),t._v(" "),t._l(a.loanInfoList,function(n){return s("div",{key:n.orderId,staticClass:"table-td"},[s("div",{staticClass:"td"},[s("div",{staticClass:"title"},[t._v(t._s(n.productName))]),t._v(" "),s("div",{staticClass:"bank-box"},[s("img",{staticClass:"bank-img",attrs:{src:n.companyLogo&&n.companyLogo.value,alt:""}})])]),t._v(" "),s("div",{staticClass:"td"},[t._v(t._s(n.loanMoney)+"万元")]),t._v(" "),s("div",{staticClass:"td"},[t._v(t._s(n.loanCycleStr)+"个月")]),t._v(" "),s("div",{staticClass:"td"},[t._v(t._s(t.$moment(1e3*n.applyTime).format("YYYY-MM-DD")))]),t._v(" "),s("div",{staticClass:"td"},[t._v(t._s(0===n.approveStatus?n.workerName:n.operatorName))]),t._v(" "),s("div",{staticClass:"td status"},[t._v(t._s(n.approveStatusStr))]),t._v(" "),s("div",{staticClass:"td detail",on:{click:function(s){return t.detail(a,n)}}},[t._v("查看详情")])])})],2):t._e(),t._v(" "),0==a.loanInfoList.length?s("div",{staticClass:"no-data"},[s("img",{staticClass:"no-img",attrs:{src:"/static/images/no-release.png",alt:""}}),t._v(" "),s("div",{staticClass:"no-text"},[t._v("尚未发布贷款需求")])]):t._e()])}),0):s("div",{staticClass:"noData"},[s("p",[t._v("您还没有添加企业，添加企业后可申请贷款")]),t._v(" "),s("div",{staticClass:"btns btn-one",on:{click:function(a){return t.$router.push({name:"add-company"})}}},[t._v("去添加企业")])]),t._v(" "),s("mask-layer",{staticClass:"reason-mask",attrs:{show:t.HasCompanys,"title-name":"","box-width":"28.646vw","box-height":"16.667vw"},on:{close:function(a){return t.handleClickMask(!1)}}},[s("template",{slot:"content"},[s("p",{staticClass:"tTitle"},[t._v("提示")]),t._v(" "),s("div",{staticClass:"reason-content"},[s("div",{staticClass:"companyList"},[s("p",[t._v("欢迎来到普惠金融服务平台")]),t._v(" "),s("p",[t._v("申请贷款需要添加企业信息，是否现在添加？")])]),t._v(" "),s("div",{staticClass:"butns"},[s("div",{staticClass:"btns btn-two",on:{click:function(a){return t.handleClickMask(!1)}}},[t._v("取消")]),t._v(" "),s("div",{staticClass:"btns btn-one",on:{click:function(a){return t.handleClickMask(!0)}}},[t._v("添加企业")])])])])],2)],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"table-th"},[s("div",[t._v("产品名称")]),t._v(" "),s("div",[t._v("贷款金额")]),t._v(" "),s("div",[t._v("贷款周期")]),t._v(" "),s("div",[t._v("发布日期")]),t._v(" "),s("div",[t._v("操作人")]),t._v(" "),s("div",[t._v("当前状态")]),t._v(" "),s("div",[t._v("操作")])])}]};var i=s("C7Lr")(e,o,!1,function(t){s("Op1R")},"data-v-085d6228",null);a.default=i.exports},Op1R:function(t,a){}});