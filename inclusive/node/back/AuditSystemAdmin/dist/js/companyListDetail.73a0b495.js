(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["companyListDetail"],{4660:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"companyListDetail"},[i("el-row",{staticClass:"name"},[i("el-col",{attrs:{span:8}},[t._v(" "+t._s(t.companyName)+" "),1==t.statue?[i("span",{staticStyle:{color:"#ccc",padding:"0.521vw 0"}},[t._v("未认证")])]:[i("div",{staticClass:"wrz"},[i("span",[t._v("已认证")])])]],2)],1),i("div",{staticClass:"LoanManageDetail-content"},[i("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName1,callback:function(s){t.activeName1=s},expression:"activeName1"}},[i("el-tab-pane",{attrs:{label:"基本信息",name:"first"}},[i("div",{staticClass:"meg-table"},[i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("企业名称")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.companyName))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("管理员姓名")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.workerName))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("管理员手机")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.phoneNumber))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("法人姓名")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.legalPerson))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("法人手机")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.legalPersonPhoneNumber))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("法人身份证")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.idCard))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("社会信用代码")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.businessLicense))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("营业执照")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.businessLicensePhotos))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("行业类型")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.industryTypeStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("经营范围")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.busRange))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("人员规模")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.staffCountStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("企业注册地")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.registerAddressStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("企业经营地")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.businessAddressStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("平台注册时间")]),i("div",{staticClass:"item-content"},[t._v(t._s(t._f("datetimeformat")(t.createdTime)))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("平台认证时间")]),i("div",{staticClass:"item-content"},[t._v(t._s(t._f("datetimeformat")(t.createdTime)))])])])])]),i("el-tab-pane",{attrs:{label:"经营状况",name:"second"}},[i("div",{staticClass:"meg-table"},[i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("经营年限")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.busYearsStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("近一年度营业额")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.lastTurnover))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("近一年实缴税额")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.lastTaxAmount))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("固定资产净值")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.fixAsset))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("总资产")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.asset))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("总负债")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.liabilities))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("净资产/所有者权益")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.fixAsset))])])])])]),i("el-tab-pane",{attrs:{label:"其他资质",name:"third"}},[i("div",{staticClass:"meg-table"},[i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("是否为政府采购供应商")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.purchaserStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("是否有抵押物")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.hasMortgageStr))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("有否有企业信用评价等级证书")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.qyxyFile))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("有否有纳税信用等级证书")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.taxFile))])])]),i("div",{staticClass:"item-row"},[i("div",{staticClass:"items"},[i("div",{staticClass:"item-title"},[t._v("是否为高新技术认定企业")]),i("div",{staticClass:"item-content"},[t._v(t._s(t.highFile))])])])])])],1)],1)],1)},a=[],n=i("4ec3"),l={name:"companyListDetail",data:function(){return{statue:2,activeName1:"first",companyName:null,workerName:null,phoneNumber:null,authenticationStatus:null,authenticationStatusStr:null,legalPerson:null,legalPersonPhoneNumber:null,idCard:null,idCardPhotos:null,businessLicense:null,businessLicensePhotos:null,industryType:null,industryTypeStr:null,staffCount:null,staffCountStr:null,busYears:null,busYearsStr:null,busRange:null,registerAddress:null,businessAddress:null,registerAddressStr:null,businessAddressStr:null,lastTurnover:null,fixAsset:null,lastTaxAmount:null,asset:null,liabilities:null,debtRatio:null,currentRatio:null,quickRatio:null,cashRatio:null,qyxyGrade:null,qyxyGradeStr:null,qyxyFile:null,hasMortgage:null,hasMortgageStr:null,mortgageValue:null,taxCredit:null,taxCreditStr:null,taxFile:null,highTech:null,highTechStr:null,highFile:null,purchaser:null,purchaserStr:null,purchaserFile:null,createdTime:null}},created:function(){var t=this,s={companyId:this.$route.query.id},i=this;this.$store.commit("loadingChange",!0),n["a"].loanInfoMaterialgetLoanMaterial(s).then((function(s){t.$store.commit("loadingChange",!1),0==s.code?(i.companyName=s.content.companyName,i.workerName=s.content.workerName,i.phoneNumber=s.content.phoneNumber,i.authenticationStatus=s.content.authenticationStatus,i.authenticationStatusStr=s.content.authenticationStatusStr,i.legalPerson=s.content.legalPerson,i.legalPersonPhoneNumber=s.content.legalPersonPhoneNumber,i.idCard=s.content.idCard,i.idCardPhotos=s.content.idCardPhotos,i.businessLicense=s.content.businessLicense,i.businessLicensePhotos=s.content.businessLicensePhotos,i.industryType=s.content.industryType,i.industryTypeStr=s.content.industryTypeStr,i.staffCount=s.content.staffCount,i.staffCountStr=s.content.staffCountStr,i.busYears=s.content.busYears,i.busYearsStr=s.content.busYearsStr,i.busRange=s.content.busRange,i.registerAddress=s.content.registerAddress,i.businessAddress=s.content.businessAddress,i.registerAddressStr=s.content.registerAddressStr,i.businessAddressStr=s.content.businessAddressStr,i.lastTurnover=s.content.lastTurnover,i.fixAsset=s.content.fixAsset,i.lastTaxAmount=s.content.lastTaxAmount,i.asset=s.content.asset,i.liabilities=s.content.liabilities,i.debtRatio=s.content.debtRatio,i.currentRatio=s.content.currentRatio,i.quickRatio=s.content.quickRatio,i.cashRatio=s.content.cashRatio,i.qyxyGrade=s.content.qyxyGrade,i.qyxyGradeStr=s.content.qyxyGradeStr,i.qyxyFile=s.content.qyxyFile,i.hasMortgage=s.content.hasMortgage,i.hasMortgageStr=s.content.hasMortgageStr,i.mortgageValue=s.content.mortgageValue,i.taxCredit=s.content.taxCredit,i.taxCreditStr=s.content.taxCreditStr,i.taxFile=s.content.taxFile,i.highTech=s.content.highTech,i.highTechStr=s.content.highTechStr,i.highFile=s.content.highFile,i.purchaser=s.content.purchaser,i.purchaserStr=s.content.purchaserStr,i.purchaserFile=s.content.purchaserFile,i.createdTime=s.content.createdTime):t.$message.error(s.msg)}))},methods:{handleClick:function(){}}},c=l,r=(i("8bf9"),i("9ca4")),o=Object(r["a"])(c,e,a,!1,null,"075d57dc",null);s["default"]=o.exports},"8bf9":function(t,s,i){"use strict";var e=i("ad78"),a=i.n(e);a.a},ad78:function(t,s,i){}}]);