webpackJsonp([32],{RIEy:function(e,t){},h3eN:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("4YfN"),s=a.n(o),r=a("l/JR"),i=a("ssT3"),l={data:function(){return{chooseCompanys:!1,companyList:[],form:{qyxyGrade:0,taxCredit:0,highTech:0,qyxyFile:"",qyxyFileNode:[],taxFile:"",taxFileNode:[],highFile:"",highFileNode:[],purchaser:0,purchaserFileNode:[]},rules:{name:[{required:!0,message:"请输入企业名称",trigger:"blur"}]},uploadurl:"http://124.70.157.102:9002/inclusive/loanInfoMaterial/uploadFile",headers:{},loanInfo:"",companyLoanInfo:[]}},created:function(){sessionStorage.getItem("loanInfo")&&(this.loanInfo=JSON.parse(sessionStorage.getItem("loanInfo"))),JSON.parse(sessionStorage.getItem("AllInfos"))&&(this.companyLoanInfo=JSON.parse(sessionStorage.getItem("AllInfos"))),sessionStorage.getItem("allLoanInfo")&&(this.form=JSON.parse(sessionStorage.getItem("allLoanInfo")),this.form.lastTurnover=this.form.lastTurnover?+this.form.lastTurnover:0,this.form.lastTaxAmount=this.form.lastTaxAmount?+this.form.lastTaxAmount:0,this.form.qyxyFileNode=this.form.qyxyFileNode&&this.form.qyxyFileNode.length?this.form.qyxyFileNode:[],this.form.taxFileNode=this.form.taxFileNode&&this.form.taxFileNode.length?this.form.taxFileNode:[],this.form.highFileNode=this.form.highFileNode&&this.form.highFileNode.length?this.form.highFileNode:[],this.form.purchaserFileNode=this.form.purchaserFileNode&&this.form.purchaserFileNode.length?this.form.purchaserFileNode:[]),this.headers={token:Object(i.b)(),Authorization:"Bearer "+Object(i.b)()}},methods:{beforeUpImg:function(e){var t="image/jpeg"===e.type,a="image/png"===e.type,o=e.size/1024/1024/1024<4e3;return t||a||this.$Notice.warning({title:"提示",desc:"上传图片必须是JPG/JPEG/PNG/ 格式!"}),o||this.$Notice.warning({title:"提示",desc:"上传图片大小不能超过 4MB!"}),(t||a)&&o},formatError:function(){},sizeError:function(){},handleClickMask:function(e){this.$router.push({name:"my-enterprice-info",params:{edit:this.$route.params.edit,id:e}}),this.chooseCompanys=!1},getCompanyList:function(){var e=this;this.chooseCompanys=!0;var t={userId:this.$store.state.user.myBaseInfo.userId};r.a.post("/sysCompany/getCompanyByUserId",t,"nauth").then(function(t){0==t.code&&(e.companyList=t.content||[])}).catch(function(e){})},qyxyFileUp:function(e,t,a){e&&0==e.code&&e.content&&this.form.qyxyFileNode.push(e.content)},taxFileUp:function(e,t,a){e&&0==e.code&&e.content&&this.form.taxFileNode.push(e.content)},highFileUp:function(e,t,a){e&&0==e.code&&e.content&&this.form.highFileNode.push(e.content)},purchaserFileUp:function(e,t,a){e&&0==e.code&&e.content&&this.form.purchaserFileNode.push(e.content)},toPage:function(e){this.save(1,e)},save:function(e,t){var a=this,o=s()({},this.loanInfo);console.log(this.loanInfo);var i=sessionStorage.getItem("company_id");o.companyId=i,o.loanCycle=o.loanCycle?+o.loanCycle:0,o.loanMoney=o.loanMoney?+o.loanMoney:0,o.hasMortgage="true"==o.hasMortgage||o.hasMortgage?1:0,o.qyxyGrade=this.form.qyxyGrade?1:0,o.qyxyFileNode=this.form.qyxyGrade?this.form.qyxyFileNode:[],o.taxCredit=this.form.taxCredit?1:0,o.taxFileNode=this.form.taxCredit?this.form.taxFileNode:[],o.highTech=this.form.highTech?1:0,o.highFileNode=this.form.highFileNode?this.form.highFileNode:[],o.purchaser=this.form.purchaser?1:0,o.purchaserFileNode=this.form.purchaserFileNode?this.form.purchaserFileNode:[],r.a.post("/loanInfoMaterial/saveLoanMaterial",o,"nauth").then(function(o){0==o.code?a.$alert.success(o.content):a.$alert.warning(o.content),1!==e?a.$router.push({name:"my-enterprice-info"}):a.$router.push({name:t})})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"my-company"},[e.companyLoanInfo.companyName?a("div",{staticClass:"c-info"},[a("div",{staticClass:"c-text"},[a("span",{staticClass:"c-name"},[e._v(e._s(e.companyLoanInfo.companyName))]),e._v(" "),a("Icon",{staticClass:"c-img",attrs:{type:"ios-checkmark-circle"}}),e._v(" "),a("span",{staticClass:"status"},[e._v(e._s(e.companyLoanInfo.authenticationStatusStr))])],1),e._v(" "),a("div",{staticClass:"c-btn",on:{click:e.getCompanyList}},[e._v("更换企业")])]):e._e(),e._v(" "),a("div",{staticClass:"line"}),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"line"}),e._v(" "),a("div",{staticClass:"info-form"},[e._m(1),e._v(" "),1!=e.$route.params.edit?a("Form",{staticClass:"form-info",attrs:{model:e.form,"label-width":250}},[a("FormItem",{attrs:{label:"是否有企业信用评价等级证书",prop:"qyxyFile"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.qyxyGrade,callback:function(t){e.$set(e.form,"qyxyGrade",t)},expression:"form.qyxyGrade"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.form.qyxyGrade,expression:"form.qyxyGrade"}],staticClass:"mortgage-item upload-box"},[e.form.qyxyFileNode&&e.form.qyxyFileNode.length?a("span",e._l(e.form.qyxyFileNode,function(e,t){return a("img",{key:t,staticStyle:{width:"6.25vw",height:"6.25vw","margin-right":"0.521vw"},attrs:{src:e.value,alt:""}})}),0):e._e(),e._v(" "),a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.qyxyFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"before-upload":e.beforeUpImg,"on-exceeded-size":e.sizeError,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[a("Icon",{attrs:{type:"ios-add",size:"40"}})],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1),e._v(" "),a("FormItem",{attrs:{label:"是否有纳税信用等级证书",prop:"taxCredit"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.taxCredit,callback:function(t){e.$set(e.form,"taxCredit",t)},expression:"form.taxCredit"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.form.taxCredit,expression:"form.taxCredit"}],staticClass:"mortgage-item upload-box"},[e.form.taxFileNode&&e.form.taxFileNode.length?a("span",e._l(e.form.taxFileNode,function(e,t){return a("img",{key:t,staticStyle:{width:"6.25vw",height:"6.25vw","margin-right":"0.521vw"},attrs:{src:e.value,alt:""}})}),0):e._e(),e._v(" "),a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.taxFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"before-upload":e.beforeUpImg,"on-exceeded-size":e.sizeError,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[a("Icon",{attrs:{type:"ios-add",size:"40"}})],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1),e._v(" "),a("FormItem",{attrs:{label:"是否为高新技术认定企业",prop:"highTech"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.highTech,callback:function(t){e.$set(e.form,"highTech",t)},expression:"form.highTech"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.form.highTech,expression:"form.highTech"}],staticClass:"mortgage-item upload-box"},[e.form.highFileNode&&e.form.highFileNode.length?a("span",e._l(e.form.highFileNode,function(e,t){return a("img",{key:t,staticStyle:{width:"6.25vw",height:"6.25vw","margin-right":"0.521vw"},attrs:{src:e.value,alt:""}})}),0):e._e(),e._v(" "),a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.highFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"on-exceeded-size":e.sizeError,"before-upload":e.beforeUpImg,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[a("Icon",{attrs:{type:"ios-add",size:"40"}})],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1),e._v(" "),a("FormItem",{attrs:{label:"是否为政府采购供应商",prop:"purchaser"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.purchaser,callback:function(t){e.$set(e.form,"purchaser",t)},expression:"form.purchaser"}})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.form.purchaser,expression:"form.purchaser"}],staticClass:"mortgage-item upload-box"},[e.form.purchaserFileNode&&e.form.purchaserFileNode.length?a("span",e._l(e.form.purchaserFileNode,function(e,t){return a("img",{key:t,staticStyle:{width:"6.25vw",height:"6.25vw","margin-right":"0.521vw"},attrs:{src:e.value,alt:""}})}),0):e._e(),e._v(" "),a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.purchaserFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"on-exceeded-size":e.sizeError,"before-upload":e.beforeUpImg,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[a("Icon",{attrs:{type:"ios-add",size:"40"}})],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1)],1):e._e(),e._v(" "),1==e.$route.params.edit?a("Form",{staticClass:"form-info",attrs:{model:e.form,"label-width":250}},[a("FormItem",{attrs:{label:"是否有企业信用评价等级证书",prop:"qyxyFile"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.qyxyGrade,callback:function(t){e.$set(e.form,"qyxyGrade",t)},expression:"form.qyxyGrade"}})],1),e._v(" "),a("div",{staticClass:"mortgage-item upload-box"},[a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.qyxyFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"on-exceeded-size":e.sizeError,"before-upload":e.beforeUpImg,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[e.form.qyxyFile?e._e():a("Icon",{attrs:{type:"ios-add",size:"40"}}),e._v(" "),e.form.qyxyFile?a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.form.qyxyFile,alt:""}}):e._e()],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1),e._v(" "),a("FormItem",{attrs:{label:"是否有纳税信用等级证书",prop:"taxCredit"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.taxCredit,callback:function(t){e.$set(e.form,"taxCredit",t)},expression:"form.taxCredit"}})],1),e._v(" "),a("div",{staticClass:"mortgage-item upload-box"},[a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.taxFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"on-exceeded-size":e.sizeError,"before-upload":e.beforeUpImg,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[e.form.taxFile?e._e():a("Icon",{attrs:{type:"ios-add",size:"40"}}),e._v(" "),e.form.taxFile?a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.form.taxFile,alt:""}}):e._e()],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1),e._v(" "),a("FormItem",{attrs:{label:"是否为高新技术认定企业",prop:"highTech"}},[a("i-switch",{attrs:{"true-color":"#ff4949","true-value":1,"false-value":0},model:{value:e.form.highTech,callback:function(t){e.$set(e.form,"highTech",t)},expression:"form.highTech"}})],1),e._v(" "),a("div",{staticClass:"mortgage-item upload-box"},[a("Upload",{ref:"upload",staticClass:"upload",attrs:{"show-upload-list":!1,"on-success":e.highFileUp,format:["jpg","jpeg","png"],"max-size":102480,"on-format-error":e.formatError,"on-exceeded-size":e.sizeError,action:e.uploadurl,headers:e.headers}},[a("div",{staticClass:"upload-btn"},[e.form.highFile?e._e():a("Icon",{attrs:{type:"ios-add",size:"40"}}),e._v(" "),e.form.highFile?a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.form.highFile,alt:""}}):e._e()],1)]),e._v(" "),a("span",{staticClass:"upload-tips"},[e._v("请上传有效的政府采购合同")])],1)],1):e._e(),e._v(" "),a("div",{staticClass:"btns"},[a("div",{staticClass:"next-btn save",on:{click:e.save}},[e._v("保 存")]),e._v(" "),a("div",{staticClass:"next-btn",on:{click:function(t){return e.toPage("loan-matching")}}},[e._v("一键贷款")])])],1),e._v(" "),a("mask-layer",{staticClass:"reason-mask",attrs:{show:e.chooseCompanys,"title-name":"更换企业","box-width":"28.646vw"}},[a("template",{slot:"content"},[a("div",{staticClass:"reason-content"},e._l(e.companyList,function(t,o){return a("div",{staticClass:"companyList"},[a("p",[e._v(e._s(t.companyName))]),e._v(" "),a("div",{staticClass:"btns btn-one",on:{click:function(a){return e.handleClickMask(t.id)}}},[e._v("选择")])])}),0)])],2)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"step"},[t("img",{staticStyle:{width:"100%"},attrs:{src:"/static/images/stpe3.png"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips"},[t("div",{staticClass:"tips-text"},[t("div",[this._v("以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款申请服务")]),this._v(" "),t("div",[this._v("您所填写资料的完善度将会影响到系统为您匹配贷款产品的准确率，请您务必如实填写详尽")])])])}]};var c=a("C7Lr")(l,n,!1,function(e){a("RIEy")},"data-v-1545af54",null);t.default=c.exports}});