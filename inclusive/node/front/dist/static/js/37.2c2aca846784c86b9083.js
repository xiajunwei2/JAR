webpackJsonp([37],{h7lw:function(t,a){},ulgz:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"info"},[s("table",{staticClass:"table",attrs:{border:""}},[s("tr",[s("td",{staticClass:"title"},[t._v("是否为政府采购供应商")]),t._v(" "),s("td",{staticClass:"ctx"},[s("span",[t._v(t._s(t.data.purchaserStr))]),t._v(" "),t._l(t.data.purchaserFileNode,function(a,e){return s("img",{key:e,staticClass:"ctx-img",attrs:{src:a.value,alt:""},on:{click:t.showImg}})}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.data.purchaserFileNode&&t.data.purchaserFileNode.length,expression:"data.purchaserFileNode && data.purchaserFileNode.length"}],staticClass:"btn-tips"},[t._v("点击图片查看")])],2)]),t._v(" "),s("tr",[s("td",{staticClass:"title"},[t._v("是否有抵押物")]),s("td",{staticClass:"ctx"},[t._v(t._s(t.data.hasMortgageStr)),s("span",{directives:[{name:"show",rawName:"v-show",value:t.data.hasMortgage,expression:"data.hasMortgage"}]},[t._v("（价值预估"+t._s(t.data.mortgageValue)+"万元）")])])]),t._v(" "),s("tr",[s("td",{staticClass:"title"},[t._v("有否有企业信用评价等级证书")]),t._v(" "),s("td",{staticClass:"ctx"},[s("span",[t._v(t._s(t.data.qyxyGradeStr))]),t._v(" "),t._l(t.data.qyxyFileNode,function(a,e){return s("img",{key:e,staticClass:"ctx-img",attrs:{src:a.value,alt:""},on:{click:t.showImg}})}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.data.qyxyFileNode&&t.data.qyxyFileNode.length,expression:"data.qyxyFileNode && data.qyxyFileNode.length"}],staticClass:"btn-tips"},[t._v("点击图片查看")])],2)]),t._v(" "),s("tr",[s("td",{staticClass:"title"},[t._v("有否有纳税信用等级证书")]),t._v(" "),s("td",{staticClass:"ctx"},[s("span",[t._v(t._s(t.data.taxCreditStr))]),t._v(" "),t._l(t.data.taxFileNode,function(a,e){return s("img",{key:e,staticClass:"ctx-img",attrs:{src:a.value,alt:""},on:{click:t.showImg}})}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.data.taxFileNode&&t.data.taxFileNode.length,expression:"data.taxFileNode && data.taxFileNode.length"}],staticClass:"btn-tips"},[t._v("点击图片查看")])],2)]),t._v(" "),s("tr",[s("td",{staticClass:"title"},[t._v("是否为高新技术认定企业")]),t._v(" "),s("td",{staticClass:"ctx"},[s("span",[t._v(t._s(t.data.highTechStr))]),t._v(" "),t._l(t.data.highFileNode,function(a,e){return s("img",{key:e,staticClass:"ctx-img",attrs:{src:a.value,alt:""},on:{click:t.showImg}})}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.data.highFileNode&&t.data.highFileNode.length,expression:"data.highFileNode && data.highFileNode.length"}],staticClass:"btn-tips"},[t._v("点击图片查看")])],2)])]),t._v(" "),s("Modal",{attrs:{"class-name":"vertical-center-modal",closable:!1},model:{value:t.imgshow,callback:function(a){t.imgshow=a},expression:"imgshow"}},[s("img",{staticClass:"doc",style:{width:t.width,height:t.height},attrs:{src:t.imgsrc,alt:""}}),t._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},staticRenderFns:[]};var i=s("C7Lr")({props:["data"],data:function(){return{imgshow:!1,imgsrc:"",width:"",height:""}},methods:{showImg:function(t){this.imgsrc=t.target.src,this.imgshow=!0,this.width=t.target.width<520?"100%":t.target.width+"px",this.height="auto"}}},e,!1,function(t){s("h7lw")},"data-v-540a60fc",null);a.default=i.exports}});