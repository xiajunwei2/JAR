webpackJsonp([16],{"42Vx":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("lC5x"),a=s.n(r),n=s("J0Oq"),o=s.n(n),i=s("3cXf"),c=s.n(i),u=s("l/JR"),l=s("ssT3"),m={data:function(){return{form:{id:"",userId:"",customerName:"",businessNo:"",loanMoney:"",loanCycle:"",indutryType:"",staffCount:"",busYears:0,busRange:"",mortgage:0,purchaser:0,mortgageValue:0,purchaserContract:""},rules:{businessNo:[{required:!0,message:"请输入社会信用代码",trigger:"blur"}],loanCycle:[{required:!0,message:"请输入贷款周期",trigger:"blur"}],loanMoney:[{required:!0,message:"请输入我的贷款需求",trigger:"blur",type:"number"}],indutryType:[{required:!0,message:"请输入行业类型",trigger:"blur"}],staffCount:[{required:!0,message:"请输入企业人员规模",trigger:"blur"}],busYears:[{required:!0,message:"请输入经营年限",trigger:"blur",type:"number"}],busRange:[{required:!0,message:"请输入经营范围",trigger:"blur"}]},headers:{},fields:[],companyInfo:{},uploadurl:"http://124.70.157.102:9002/phjr-manager-service/file/uploadFile"}},created:function(){var e=this;sessionStorage.removeItem("companyData"),this.headers={token:Object(l.b)()},this.getField(),setTimeout(function(){e.getCompany()},1e3)},methods:{formatError:function(){},sizeError:function(){},upSuccess:function(e,t,s){200==e.code&&1==e.state&&(this.form.purchaserContract=e.data.value)},getCompany:function(){var e=this;u.a.post("/phjr-manager-service/customer/findCustomerDetailByUserId",{userId:this.$store.state.user.myBaseInfo.id}).then(function(t){e.companyInfo=t,e.form=e.companyInfo.customerBaseVo,e.form.mortgage=null==e.form.mortgage?0:e.form.mortgage,e.form.purchaser=null==e.form.purchaser?0:e.form.purchaser,e.form.staffCount=null!=e.form.staffCount?String(e.form.staffCount):"",e.form.loanCycle=null!=e.form.loanCycle?String(e.form.loanCycle):"",localStorage.setItem("companyId",e.companyInfo.customerBaseVo.id),localStorage.setItem("fileId",e.companyInfo.qualificationBaseVo.id),localStorage.setItem("companyInfo",c()(e.companyInfo))}).catch(function(t){return e.$alert.success(t.message)})},nextStep:function(){var e=this;this.$refs.form.validate(function(t){t&&(localStorage.setItem("step1",c()(e.form)),e.subForm())})},subForm:function(){var e=this,t=c()(this.form);(t=JSON.parse(t)).userId||(t.userId=this.$store.state.user.myBaseInfo.id),u.a.post("/phjr-manager-service/customer/saveCustomer",t).then(function(t){e.$alert.success("操作成功"),e.$router.push({name:"company-enterprice-info",params:{edit:1}})}).catch(function(t){return e.$alert.success(t.message)})},getField:function(){var e=this;return o()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.post("/phjr-manager-service/sysCode/getSysCode");case 2:e.fields=t.sent;case 3:case"end":return t.stop()}},t,e)}))()},setField:function(e){var t=this.fields.filter(function(t){return t.codeType==e});return t.length>0?t[0].sysCodeValueVos:[]}}},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"my-company"},[e._m(0),e._v(" "),s("div",{staticClass:"line"}),e._v(" "),s("div",{staticClass:"finsh"},[s("img",{staticClass:"finsh-img",attrs:{src:"/static/images/finsh.png",alt:""}}),e._v(" "),s("div",{staticClass:"c-tips"},[e._v("企业认证信息已提交成功")]),e._v(" "),s("div",{staticClass:"c-desc"},[e._v("平台将在24小时之内反馈审核结果")]),e._v(" "),s("div",{staticClass:"c-desc"},[e._v("您可以点击下方“申请贷款”填写贷款需求")]),e._v(" "),s("div",{staticClass:"btns-box"},[s("div",{staticClass:"btns btn-back",on:{click:function(t){return e.$router.push({path:"/"})}}},[e._v("返回首页")]),e._v(" "),s("div",{staticClass:"btns btn-opt",on:{click:function(t){return e.$router.push({path:"/loan-matching"})}}},[e._v("申请贷款")])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"step"},[t("img",{staticStyle:{width:"100%"},attrs:{src:"/static/images/add03.png"}})])}]};var d=s("C7Lr")(m,f,!1,function(e){s("Eqo2")},"data-v-d5eb5a66",null);t.default=d.exports},Eqo2:function(e,t){}});