(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/historyList"],{"4ae8":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"750a":function(t,e,n){"use strict";n.r(e);var a=n("acf1"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a},"79d4":function(t,e,n){},"7af3":function(t,e,n){"use strict";var a=n("79d4"),i=n.n(a);i.a},a9fc:function(t,e,n){"use strict";n.r(e);var a=n("4ae8"),i=n("750a");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("7af3");var r=n("2877"),s=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"6457f29a",null);e["default"]=s.exports},acf1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"ae6d"))},i=function(){return n.e("components/commonAvatar").then(n.bind(null,"a5d8"))},u={data:function(){return{title:"历史提款",isType:0,memberList:[{icon:"/static/member_icon1.png",title:"投资钱包",url:"/pages/mine/investWallet",value:"600000"},{icon:"/static/member_icon2.png",title:"APP钱包",url:"/pages/mine/wallet",value:"16000000"}],investList:[{name:"SLM20191125A001",price:"20000",time:"2019/11/25  09：00",status:"申请中",is_status:1},{name:"SLM20191125A001",price:"20000",time:"2019/11/25  09：00",status:"已完成",is_status:2},{name:"SLM20191125A001",price:"10000",time:"2019/11/25  09：00",status:"已取消",is_status:0}]}},components:{uniNavBar:a,commonAvatar:i},onLoad:function(e){this.isType=e.type,0==e.type?(this.title="历史提款",t.setNavigationBarTitle({title:"历史提款"})):(this.title="历史转款",t.setNavigationBarTitle({title:"历史转款"}))},methods:{toListLink:function(e){t.navigateTo({url:this.memberList[e].url})}}};e.default=u}).call(this,n("6e42")["default"])},c9ca:function(t,e,n){"use strict";(function(t){n("3574"),n("921b");a(n("66fd"));var e=a(n("a9fc"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["c9ca","common/runtime","common/vendor"]]]);