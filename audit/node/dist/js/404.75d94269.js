(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["404"],{"0e0a":function(t,e,s){t.exports=s.p+"img/cloud.0f4bc32b.png"},"16f4":function(t,e,s){t.exports=s.p+"img/404.a57b6f31.png"},"25e6":function(t,e,s){},2722:function(t,e,s){"use strict";var r=s("25e6"),i=s.n(r);i.a},"8cdb":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"error-container"},[r("div",{staticClass:"error-content"},[r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[r("div",{staticClass:"pic-error"},[r("img",{staticClass:"pic-error-parent",attrs:{alt:"401",src:s("16f4")}}),r("img",{staticClass:"pic-error-child left",attrs:{alt:"401",src:s("0e0a")}}),r("img",{staticClass:"pic-error-child",attrs:{alt:"401",src:s("0e0a")}}),r("img",{staticClass:"pic-error-child",attrs:{alt:"401",src:s("0e0a")}})])]),r("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[r("div",{staticClass:"bullshit"},[r("div",{staticClass:"bullshit-oops"},[t._v(t._s(t.oops))]),r("div",{staticClass:"bullshit-headline"},[t._v(t._s(t.headline))]),r("div",{staticClass:"bullshit-info"},[t._v(t._s(t.info))]),r("a",{staticClass:"bullshit-return-home",on:{click:t.routerFun}},[t._v(t._s(t.jumpTime)+"s "+t._s(t.btn))])])])],1)],1)])},i=[],a={name:"Page404",data:function(){return{jumpTime:15,oops:"抱歉!",headline:"当前页面不存在...",info:"请检查您输入的网址是否正确，或点击下面的按钮返回首页。",btn:"后返回",timer:0}},mounted:function(){this.timeChange(),document.body.style.background="#ffffff"},beforeDestroy:function(){clearInterval(this.timer),document.body.style.background="#f2f2f2"},methods:{routerFun:function(){var t=sessionStorage.getItem("treemenuLast");t&&t.length&&"404"!==t?this.$router.push({name:t}):this.$router.push({path:"/"}),clearInterval(this.timer)},timeChange:function(){var t=this;this.timer=setInterval((function(){if(t.jumpTime)t.jumpTime--;else{var e=sessionStorage.getItem("treemenuLast");e&&e.length&&"404"!==e?t.$router.push({name:e}):t.$router.push({path:"/"}),clearInterval(t.timer)}}),1e3)}}},n=a,l=(s("2722"),s("2877")),o=Object(l["a"])(n,r,i,!1,null,"2c0c9588",null);e["default"]=o.exports}}]);