webpackJsonp([18],{dTiG:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("lC5x"),n=o.n(a),s=o("J0Oq"),r=o.n(s),i=o("3cXf"),c=o.n(i),l=o("l/JR"),m=(o("ssT3"),{data:function(){return{chooseCompanys:!1,companyList:[],form:{id:"",userId:"",customerName:"",businessNo:"",loanMoney:"",loanCycle:"",hasMortgage:!1,indutryType:"",staffCount:"",busYears:0,busRange:"",mortgage:0,purchaser:0,mortgageValue:"",purchaserContract:""},rules:{loanMoney:[{required:!0,message:"请输入贷款需求",trigger:"blur"}],loanCycle:[{required:!0,message:"请选择贷款周期",trigger:"change"}]},companyLoanInfo:"",companyId:""}},created:function(){sessionStorage.removeItem("loanInfo"),sessionStorage.removeItem("company_id"),this.companyId=this.$route.query.id||"",this.companyId=this.$route.params.id||"",this.getField(),this.getCompanyLoanInfo()},methods:{handleClickMask:function(t){this.companyId=t,this.getCompanyLoanInfo(),this.chooseCompanys=!1},getCompanyList:function(){var t=this;this.chooseCompanys=!0;var e={userId:this.$store.state.user.myBaseInfo.userId};l.a.post("/sysCompany/getCompanyByUserId",e,"nauth").then(function(e){0==e.code&&(t.companyList=e.content||[])}).catch(function(t){})},getCompanyLoanInfo:function(){var t=this,e="/sysCompany/getMainCompany",o="";this.companyId&&(e="/loanInfoMaterial/getLoanMaterial",o={companyId:this.companyId}),l.a.post(e,o,"nauth").then(function(e){e&&(t.companyId||t.$route.query.id?(t.companyLoanInfo=e.content||"",sessionStorage.setItem("AllInfos",c()(e.content)),t.form=e.content,t.form&&(t.form.loanMoney=t.form.loanMoney?t.form.loanMoney+"":"",t.form.loanCycle=t.form.loanCycle?t.form.loanCycle+"":"",t.form.hasMortgage=!!t.form.hasMortgage,t.companyId&&sessionStorage.setItem("company_id",t.companyId),sessionStorage.setItem("allLoanInfo",c()(t.form)))):(t.companyId=e.content&&e.content.companyId,t.getCompanyLoanInfo()))})},formatError:function(){},sizeError:function(){},upSuccess:function(){},nextPage:function(){var t=this;this.$refs.form.validate(function(e){if(e){var o={companyId:t.companyId,loanMoney:t.form.loanMoney,loanCycle:t.form.loanCycle,hasMortgage:t.form.hasMortgage,mortgageValue:t.form.mortgageValue};sessionStorage.setItem("loanInfo",c()(o)),t.$router.push({name:"company-enterprice-info"})}})},getField:function(){var t=this;return r()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.post("/sysCode/getCode",{codeType:"DKZQ"},"nauth");case 2:t.fields=e.sent;case 3:case"end":return e.stop()}},e,t)}))()},setField:function(t){var e=[],o=this.fields&&this.fields.content||[];return o&&o.length&&(e=o.filter(function(e){return e.codeType==t})),console.log(e),e.length>0?e[0].sysCodeVoList:[]}}}),f={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"my-company"},[t.companyLoanInfo?o("div",{staticClass:"my-company-content"},[t.companyLoanInfo.companyName?o("div",{staticClass:"c-info"},[o("div",{staticClass:"c-text"},[o("span",{staticClass:"c-name"},[t._v(t._s(t.companyLoanInfo.companyName))]),t._v(" "),o("Icon",{staticClass:"c-img",attrs:{type:"ios-checkmark-circle"}}),t._v(" "),o("span",{staticClass:"status"},[t._v(t._s(t.companyLoanInfo.authenticationStatusStr))])],1),t._v(" "),o("div",{staticClass:"c-btn",on:{click:t.getCompanyList}},[t._v("更换企业")])]):t._e(),t._v(" "),o("div",{staticClass:"line"}),t._v(" "),t._m(0),t._v(" "),o("div",{staticClass:"line"}),t._v(" "),o("div",{staticClass:"info-form"},[t._m(1),t._v(" "),o("Form",{ref:"form",staticClass:"form-info",attrs:{model:t.form,rules:t.rules,"label-width":160}},[o("FormItem",{staticClass:"required",attrs:{label:"我的贷款需求",prop:"loanMoney"}},[o("Input",{attrs:{placeholder:"请输入我的贷款需求"},model:{value:t.form.loanMoney,callback:function(e){t.$set(t.form,"loanMoney",e)},expression:"form.loanMoney"}},[o("div",{staticClass:"append",attrs:{slot:"append"},slot:"append"},[t._v("万元")])])],1),t._v(" "),o("FormItem",{attrs:{label:"贷款周期",prop:"loanCycle"}},[o("Select",{model:{value:t.form.loanCycle,callback:function(e){t.$set(t.form,"loanCycle",e)},expression:"form.loanCycle"}},t._l(t.setField("DKZQ"),function(e){return o("Option",{key:e.code,attrs:{value:e.code}},[t._v(t._s(e.value))])}),1)],1),t._v(" "),o("FormItem",{attrs:{label:"是否有抵押物",prop:"hasMortgage"}},[o("div",{staticClass:"mortgage-box"},[o("i-switch",{model:{value:t.form.hasMortgage,callback:function(e){t.$set(t.form,"hasMortgage",e)},expression:"form.hasMortgage"}}),t._v(" "),t.form.hasMortgage?o("div",{staticClass:"mortgage-input"},[o("div",{staticClass:"input-label"},[t._v("抵押物价值")]),t._v(" "),o("Input",{staticClass:"input-text",attrs:{placeholder:"请输入抵押物价值"},model:{value:t.form.mortgageValue,callback:function(e){t.$set(t.form,"mortgageValue",e)},expression:"form.mortgageValue"}})],1):t._e()],1)])],1),t._v(" "),o("div",{staticClass:"next-btn",on:{click:t.nextPage}},[t._v("下一步")])],1)]):t._e(),t._v(" "),o("mask-layer",{staticClass:"reason-mask",attrs:{show:t.chooseCompanys,"title-name":"更换企业","box-width":"28.646vw"},on:{close:function(e){t.chooseCompanys=!1}}},[o("template",{slot:"content"},[o("div",{staticClass:"reason-content"},t._l(t.companyList,function(e,a){return o("div",{staticClass:"companyList"},[o("p",[t._v(t._s(e.companyName))]),t._v(" "),o("div",{staticClass:"btns btn-one",on:{click:function(o){return t.handleClickMask(e.id)}}},[t._v("选择")])])}),0)])],2)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"step"},[e("img",{staticStyle:{width:"100%"},attrs:{src:"/static/images/stpe1.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tips"},[e("div",{staticClass:"tips-text"},[e("div",[this._v("以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款申请服务")]),this._v(" "),e("div",[this._v("您所填写资料的完善度将会影响到系统为您匹配贷款产品的准确率，请您务必如实填写详尽")])])])}]};var u=o("C7Lr")(m,f,!1,function(t){o("x7yu")},"data-v-925dfa18",null);e.default=u.exports},x7yu:function(t,e){}});