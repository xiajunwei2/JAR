(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ProductsManage"],{"02a7":function(e,t,a){},"6bc5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"index"},[a("div",{staticClass:"account_head"},[a("div",{staticClass:"head_search"},[a("el-input",{staticStyle:{margin:"0 0.521vw"},attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入产品名称"},model:{value:e.content.productName,callback:function(t){e.$set(e.content,"productName",t)},expression:"content.productName"}}),a("el-select",{staticStyle:{margin:"0 0.521vw"},attrs:{clearable:"",placeholder:"所属机构"},model:{value:e.content.mechanism,callback:function(t){e.$set(e.content,"mechanism",t)},expression:"content.mechanism"}},e._l(e.departsList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("el-select",{staticStyle:{margin:"0 0.521vw"},attrs:{clearable:"",placeholder:"贷款类型"},model:{value:e.content.loanType,callback:function(t){e.$set(e.content,"loanType",t)},expression:"content.loanType"}},e._l(e.departsList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("el-select",{staticStyle:{margin:"0 0.521vw"},attrs:{clearable:"",placeholder:"贷款周期"},model:{value:e.content.loanCycle,callback:function(t){e.$set(e.content,"loanCycle",t)},expression:"content.loanCycle"}},e._l(e.departsList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("div",{staticClass:"head_time"},[a("div",{staticStyle:{margin:"0 0.521vw"}},[a("div",{staticClass:"time_msg",staticStyle:{display:"inline"}},[e._v("贷款金额：")]),a("el-input-number",{attrs:{label:"最低金额"},model:{value:e.content.loanMoneyDown,callback:function(t){e.$set(e.content,"loanMoneyDown",t)},expression:"content.loanMoneyDown"}}),e._v(" --- "),a("el-input-number",{attrs:{label:"最高金额"},model:{value:e.content.loanMoneyUp,callback:function(t){e.$set(e.content,"loanMoneyUp",t)},expression:"content.loanMoneyUp"}}),e._v("/万元 ")],1),a("div",{staticClass:"time_msg"},[e._v("上架时间:")]),a("el-date-picker",{attrs:{"value-format":"timestamp",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:function(t){return e.getTime()}},model:{value:e.times,callback:function(t){e.times=t},expression:"times"}}),a("el-button",{staticClass:"time_btn",attrs:{type:"danger"},on:{click:e.search}},[e._v("查询")]),a("el-button",{staticClass:"time_btn",attrs:{type:"danger"},on:{click:e.searchDownload}},[e._v("导出")])],1)]),a("div",{staticClass:"account_form"},[a("vxe-table",{staticClass:"form_table",attrs:{border:"","show-header-overflow":"","show-overflow":"","highlight-hover-row":"",align:"center",data:e.tableData}},[a("vxe-table-column",{attrs:{field:"id",title:"产品ID"}}),a("vxe-table-column",{attrs:{field:"productName",title:"产品名称"}}),a("vxe-table-column",{attrs:{field:"mechanismName",title:"所属机构"}}),a("vxe-table-column",{attrs:{field:"loanTypeStr",title:"贷款类型"}}),a("vxe-table-column",{attrs:{field:"loanMoneyUp",title:"贷款金额上限(万元)"}}),a("vxe-table-column",{attrs:{field:"loanCycleDown",title:"贷款周期（月）"}}),a("vxe-table-column",{attrs:{title:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e.$moment(1e3*n.createdTime).format("YYYY-MM-DD HH:mm:ss")))])]}}])}),a("vxe-table-column",{attrs:{field:"statusStr",title:"状态"}}),a("vxe-table-column",{staticClass:"table_todo",attrs:{width:"200",title:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.reviewProduct(n,1)}}},[e._v("审核")]),a("vxe-button",{attrs:{type:"text"},on:{click:function(t){return e.topPage(n,2)}}},[e._v("查看")])]}}])})],1),e.pager.totalResult>0?a("vxe-pager",{attrs:{background:"","current-page":e.pager.currentPage,"page-size":e.pager.pageSize,total:e.pager.totalResult,layouts:["Total","PrevJump","PrevPage","JumpNumber","NextPage","NextJump","FullJump","Sizes"]},on:{"page-change":e.handlePageChange2,"update:currentPage":function(t){return e.$set(e.pager,"currentPage",t)},"update:current-page":function(t){return e.$set(e.pager,"currentPage",t)},"update:pageSize":function(t){return e.$set(e.pager,"pageSize",t)},"update:page-size":function(t){return e.$set(e.pager,"pageSize",t)}}}):e._e()],1),a("el-dialog",{attrs:{title:"提示",visible:e.msgVisible,width:"30%"},on:{"update:visible":function(t){e.msgVisible=t}}},[a("span",[e._v("是否同意审核？")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.msgVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.ok()}}},[e._v("审核通过")])],1)])],1)},o=[],r=a("4ec3"),i={data:function(){return{times:"",flag:!0,msgVisible:!1,reviewId:"",departsList:[{value:"选项1",label:"黄金糕"},{value:"选项5",label:"北京烤鸭"}],allAlign:null,tableData:[],pager:{currentPage:1,pageSize:10,totalResult:0},content:{productName:"",mechanism:"",loanType:"",status:2,loanCycle:"",loanMoneyUp:0,loanMoneyDown:0,createdTimeUp:"",createdTimeDown:""},rules:{count:[{required:!0,message:"请输入账号",trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"}],part:[{required:!0,message:"所属部门",trigger:"blur"}],role:[{required:!0,message:"角色属性",trigger:"change"}]}}},created:function(){this.ajaxTable()},methods:{getTime:function(){this.content.createdTimeUp=this.times[0]/1e3,this.content.createdTimeDown=this.times[1]/1e3},handlePageChange2:function(e){var t=e.currentPage,a=e.pageSize;this.pager.currentPage=t,this.pager.pageSize=a,this.ajaxTable()},reviewProduct:function(e){this.reviewId=e.id,this.msgVisible=!this.msgVisible},ok:function(){var e=this;this.msgVisible=!1,r["a"].productInfoApprove({id:this.reviewId}).then((function(t){0==t.code?(e.$message.success(t.msg),e.ajaxTable()):e.$message.success(t.msg)}))},search:function(){var e=this;e.pager.pageSize=this.pager.pageSize,e.pager.currentPage=1,e.ajaxTable()},ajaxTable:function(){var e=this,t=this;t.getTime(),this.$store.commit("loadingChange",!0);var a={content:this.content,pager:{pageSize:t.pager.pageSize,currentPage:t.pager.currentPage}};r["a"].productInfoproductInfoList(a).then((function(a){e.$store.commit("loadingChange",!1),0==a.code?(t.tableData=a.content.list,t.pager.totalResult=a.content.pager.totalCount,t.pager.currentPage=a.content.pager.currentPage,e.content.createdTimeUp="",e.content.createdTimeDown=""):t.$message.error(a.msg)}))},topPage:function(e){this.$router.push({name:"addProducts",params:{flag:!0,id:e.id}})},searchDownload:function(){var e=this,t={productName:this.content.productName,mechanism:this.content.mechanism,loanType:this.content.loanType,status:this.content.status,loanCycle:this.content.loanCycle,loanMoneyUp:this.content.loanMoneyUp,loanMoneyDown:this.content.loanMoneyDown,createdTimeUp:this.content.createdTimeUp,createdTimeDown:this.content.createdTimeDown,pager:{pageSize:vm.pager.pageSize,currentPage:vm.pager.currentPage}};this.$store.commit("loadingChange",!0),r["a"].getCompany(t).then((function(t){if(e.$store.commit("loadingChange",!1),0==t.code){var a=document.createElement("a");a.setAttribute("href",t.content),a.setAttribute("target","_target"),a.setAttribute("style","display:none"),a.setAttribute("id","startTelMedicine"),document.getElementById("startTelMedicine")&&document.body.removeChild(document.getElementById("startTelMedicine")),document.body.appendChild(a),a.click()}else e.$message.error(t.msg)}))},addProducts:function(){this.$router.push({path:"/addProducts"})},addProductssh:function(){this.$router.push({name:"ProductsManage"})},putShell:function(e){var t=this;this.$confirm("是否通过?","通过提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error"}).then((function(){t.$store.commit("loadingChange",!0),r["a"].productInfoapprove(e.id).then((function(e){if(t.$store.commit("loadingChange",fasle),0==e.code){var a=t;a.pager.pageSize=t.pager.pageSize,a.pager.currentPage=t.pageSize.currentPage,a.ajaxTable()}else t.$message.error(e.msg)}))}))}}},l=i,s=(a("727b"),a("9ca4")),c=Object(s["a"])(l,n,o,!1,null,"1ca250d9",null);t["default"]=c.exports},"727b":function(e,t,a){"use strict";var n=a("02a7"),o=a.n(n);o.a}}]);