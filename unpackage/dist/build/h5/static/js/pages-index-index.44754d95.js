(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0f47":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{}},onLoad:function(){this.loadExecution()},methods:{loadExecution:function(){try{var n=uni.getStorageSync("launchFlag");console.log(n),n?1==n?uni.redirectTo({url:"/pages/login/login"}):uni.redirectTo({url:"/pages/index/guide"}):(uni.setStorage({key:"launchFlag",data:!0,success:function(){console.log("存储launchFlag")}}),uni.redirectTo({url:"/pages/index/guide"}))}catch(e){uni.setStorage({key:"launchFlag",data:!0,success:function(){console.log("error时存储launchFlag")}}),uni.redirectTo({url:"/pages/index/guide"})}}}};e.default=u},"3a0e":function(n,e,t){"use strict";t.r(e);var u=t("5eda"),a=t("875f");for(var i in a)"default"!==i&&function(n){t.d(e,n,function(){return a[n]})}(i);var o=t("2877"),r=Object(o["a"])(a["default"],u["a"],u["b"],!1,null,"30c7f0ce",null);e["default"]=r.exports},"5eda":function(n,e,t){"use strict";var u=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-uni-view",{staticClass:"content"})},a=[];t.d(e,"a",function(){return u}),t.d(e,"b",function(){return a})},"875f":function(n,e,t){"use strict";t.r(e);var u=t("0f47"),a=t.n(u);for(var i in u)"default"!==i&&function(n){t.d(e,n,function(){return u[n]})}(i);e["default"]=a.a}}]);