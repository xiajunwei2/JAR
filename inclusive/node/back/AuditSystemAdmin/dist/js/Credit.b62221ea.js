(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Credit"],{9707:function(e,t,a){},b7b2:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"index"},[a("div",{staticClass:"account_head"},[a("div",{staticClass:"head_search"},[a("el-input",{staticStyle:{margin:"0 0.521vw"},attrs:{"prefix-icon":"el-icon-search",placeholder:"企业名称"},model:{value:e.companyName,callback:function(t){e.companyName=t},expression:"companyName"}}),a("el-input",{staticStyle:{margin:"0 0.521vw"},attrs:{"prefix-icon":"el-icon-search",placeholder:"贷款单号"},model:{value:e.loanNum,callback:function(t){e.loanNum=t},expression:"loanNum"}}),a("el-select",{staticStyle:{margin:"0 0.521vw"},attrs:{clearable:"",placeholder:"贷款类型"},model:{value:e.loanType,callback:function(t){e.loanType=t},expression:"loanType"}},e._l(e.departsList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("div",{staticStyle:{margin:"0 0.521vw"}},[a("div",{staticClass:"time_msg",staticStyle:{display:"inline"}},[e._v("贷款金额：")]),a("el-input-number",{attrs:{label:"最低金额",min:0},model:{value:e.loanMoneyUp,callback:function(t){e.loanMoneyUp=t},expression:"loanMoneyUp"}}),e._v(" --- "),a("el-input-number",{attrs:{label:"最高金额",min:0},model:{value:e.loanMoneyDown,callback:function(t){e.loanMoneyDown=t},expression:"loanMoneyDown"}}),e._v("/万元 ")],1)],1),a("div",{staticClass:"head_time"},[a("el-select",{staticStyle:{margin:"0 0.521vw"},attrs:{clearable:"",placeholder:"贷款机构"},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.$store.state.option.JGLX,(function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),1),a("div",{staticClass:"time_msg"},[e._v("申请时间:")]),a("el-date-picker",{attrs:{"value-format":"timestamp",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){return e.getTime()}},model:{value:e.applyTime,callback:function(t){e.applyTime=t},expression:"applyTime"}}),a("el-button",{staticClass:"time_btn",attrs:{type:"danger"},on:{click:e.search}},[e._v("查询")]),a("el-button",{staticClass:"time_btn",attrs:{type:"danger"},on:{click:e.searchfinnalDown}},[e._v("导出")])],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{background:"#fff",padding:"0 1.563vw"}},[a("vxe-table",{attrs:{border:"","sync-resize":e.selectTab,data:e.tableData,align:"center"}},[a("vxe-table-column",{attrs:{field:"loanNum",title:"单号"}}),a("vxe-table-column",{attrs:{field:"companyName",title:"企业名称","show-overflow":"tooltip"}}),a("vxe-table-column",{attrs:{field:"loanTypeStr",title:"贷款类型","show-overflow":"tooltip"}}),a("vxe-table-column",{attrs:{field:"loanMoney",title:"贷款金额(万元)","show-overflow":""}}),a("vxe-table-column",{attrs:{field:"applyTime",title:"申请时间","show-overflow":""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e.$moment(1e3*n.applyTime).format("YYYY-MM-DD HH:mm:ss")))])]}}])}),a("vxe-table-column",{attrs:{field:"workerName",title:"操作人","show-overflow":""}}),a("vxe-table-column",{attrs:{field:"approveStatusStr",title:"状态","show-overflow":""}}),a("vxe-table-column",{staticClass:"table_todo",attrs:{width:"300",title:"操作",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.todetai(n)}}},[e._v("查看详情")]),0==n.approveStatus?[a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.msgBox(n,0,1)}}},[e._v("通过审核")]),a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.refuseBox(n,0,5)}}},[e._v("拒审")])]:e._e(),1==n.approveStatus?[a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.msgBox(n,1,2)}}},[e._v("同意受理")]),a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.refuseBox(n,1,6)}}},[e._v("拒绝")])]:e._e(),2==n.approveStatus?[a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.msgBox(n,2,3)}}},[e._v("同意授信")]),a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.refuseBox(n,2,7)}}},[e._v("拒绝")])]:e._e(),3==n.approveStatus?[a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.msgBox(n,3,4)}}},[e._v("已经放款")]),a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.refuseBox(n,3,8)}}},[e._v("未放款")])]:e._e()]}}])})],1)],1),a("div",{staticStyle:{height:"1.042vw",backgroundColor:"#fff"}}),e.page5.totalResult>0?a("vxe-pager",{staticStyle:{background:"#fff",padding:"0 1.563vw"},attrs:{background:"","current-page":e.page5.currentPage,"page-size":e.page5.pageSize,total:e.page5.totalResult,layouts:["Total","PrevJump","PrevPage","JumpNumber","NextPage","NextJump","FullJump","Sizes"]},on:{"page-change":e.handlePageChange1,"update:currentPage":function(t){return e.$set(e.page5,"currentPage",t)},"update:current-page":function(t){return e.$set(e.page5,"currentPage",t)},"update:pageSize":function(t){return e.$set(e.page5,"pageSize",t)},"update:page-size":function(t){return e.$set(e.page5,"pageSize",t)}}}):e._e(),a("div",{staticStyle:{height:"1.042vw",backgroundColor:"#fff"}}),a("el-dialog",{attrs:{title:"提示",visible:e.msgVisible,width:"15.625vw"},on:{"update:visible":function(t){e.msgVisible=t}}},[a("span",[e._v("是否"+e._s(e.msgTitle))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.msgVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.msgVisible=!1,e.ok()}}},[e._v("确 定")])],1)]),a("el-dialog",{attrs:{title:e.refuseMsg,visible:e.refuseVisible,width:"30%"},on:{"update:visible":function(t){e.refuseVisible=t}}},[a("el-row",{staticStyle:{width:"100%"},attrs:{gutter:0}},[a("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea",rows:6,placeholder:"请输入拒绝内容"},model:{value:e.refuseText,callback:function(t){e.refuseText=t},expression:"refuseText"}})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.refuseVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.ok()}}},[e._v("确 定")])],1)],1)],1)},i=[],o=a("4ec3"),l={data:function(){return{row:null,NeuxStatues:null,nowTableIndex:null,companyName:"",loanNum:"",loanType:"",approveStatus:2,mechanism:"",loanMoneyUp:null,loanMoneyDown:null,applyTime:"",applyTimeUp:"",applyTimeDown:"",page5:{currentPage:1,pageSize:10,totalResult:0},value:"",refuseText:"",msgVisible:!1,refuseVisible:!1,loanVisible:!1,selectTab:0,name:"",departsList:[{value:0,label:"信用贷"},{value:1,label:"抵押贷"}],countStatus:[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}],tableData:[],msgTitle:"",refuseMsg:"",loading:!1,userId:""}},created:function(){var e=this;this.getProdList(),e.userId=e.$store.state.userInfor.userId},methods:{getTime:function(){this.applyTimeUp=this.applyTime[0]/1e3,this.applyTimeDown=this.applyTime[1]/1e3},handlePageChange1:function(e){var t=e.currentPage,a=e.pageSize;this.page5.currentPage=t,this.page5.pageSize=a,this.getProdList()},todetai:function(e){this.$router.push({name:"LoanManageDetail",query:{id:e.id,companyId:e.companyId}})},agree:function(e,t,a){this.row=JSON.parse(JSON.stringify(e)),this.loanVisible=!this.loanVisible,this.nowTableIndex=a},ok:function(){var e=this,t=this;t.$store.commit("loadingChange",!0);var a={userId:t.userId,id:t.row.id,remark:t.refuseText,approveStatus:this.nowTableIndex};1!=this.nowTableIndex&&2!=this.nowTableIndex&&3!=this.nowTableIndex&&4!=this.nowTableIndex||delete a.remark,o["a"].loanInfoapprove(a).then((function(a){t.refuseVisible=!1,t.loanVisible=!1,t.msgVisible=!1,t.$store.commit("loadingChange",!1),0==a.code?(t.page5.currentPage=e.page5.currentPage,t.page5.pageSize=e.page5.pageSize,t.getProdList()):t.$message.error(a.msg)}))},msgBox:function(e,t,a){this.nowTableIndex=a;this.row=JSON.parse(JSON.stringify(e)),this.msgVisible=!this.msgVisible,0==t&&(this.msgTitle="确定审核通过？"),2==t&&(this.msgTitle="确定同意授信？"),3==t&&(this.msgTitle="确定放款？")},refuseBox:function(e,t,a){this.nowTableIndex=a;this.row=JSON.parse(JSON.stringify(e)),this.refuseVisible=!this.refuseVisible,0==t&&(this.refuseMsg="请填写拒绝审核的原因"),2==t&&(this.refuseMsg="请填写拒绝授信的原因"),3==t&&(this.refuseMsg="请填写拒绝放款的原因")},searchfinnalDown:function(){var e=this,t=this,a={content:{companyName:this.companyName,loanNum:this.loanNum,loanType:this.loanType,approveStatus:this.approveStatus,mechanism:this.mechanism,loanMoneyUp:this.loanMoneyUp,loanMoneyDown:this.loanMoneyDown,applyTimeUp:this.applyTimeUp,applyTimeDown:this.applyTimeDown},pager:{pageSize:t.page5.pageSize,currentPage:t.page5.currentPage}};o["a"].loanInfoexportLoanInfoList(a).then((function(t){if(0==t.code){var a=document.createElement("a");a.setAttribute("href",t.content),a.setAttribute("target","_target"),a.setAttribute("style","display:none"),a.setAttribute("id","startTelMedicine"),document.getElementById("startTelMedicine")&&document.body.removeChild(document.getElementById("startTelMedicine")),document.body.appendChild(a),a.click()}else e.$message.error(t.msg)}))},getCurrentTabs:function(e){var t=this;t.page5.currentPage=this.page5.currentPage,this.approveStatus=e.label,this.getProdList()},searchTime:function(){var e=this;this.$store.commit("loadingChange",!0),o["a"].getCompany().then((function(t){e.$store.commit("loadingChange",!1),0==t.code||e.$message.error(t.msg)}))},getProdList:function(){var e=this,t={content:{companyName:this.companyName,loanNum:this.loanNum,loanType:this.loanType,approveStatus:this.approveStatus,mechanism:this.mechanism,loanMoneyUp:this.loanMoneyUp,loanMoneyDown:this.loanMoneyDown,applyTimeUp:this.applyTime&&this.applyTime.length>0?this.applyTime[0]:"",applyTimeDown:this.applyTime&&this.applyTime.length>0?this.applyTime[1]:""},pager:{pageSize:this.page5.pageSize,currentPage:this.page5.currentPage}};this.loading=!0,this.$store.commit("loadingChange",!0),o["a"].loanInfoloanInfoList(t).then((function(t){e.$store.commit("loadingChange",!1),e.loading=!1,0==t.code?(console.log(t),e.tableData=t.content.list,e.page5.currentPage=t.content.pager.currentPage,e.page5.pageSize=t.content.pager.pageSize,e.page5.totalResult=t.content.pager.totalCount,e.applyTimeUp="",e.applyTimeDown=""):e.$message.error(t.msg)}))},search:function(){this.page5.currentPage=1,this.getProdList()}}},s=l,r=(a("d8a6"),a("9ca4")),u=Object(r["a"])(s,n,i,!1,null,"33293608",null);t["default"]=u.exports},d8a6:function(e,t,a){"use strict";var n=a("9707"),i=a.n(n);i.a}}]);