(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/ratings"],{"268e":function(e,t,n){"use strict";n.r(t);var a=n("c854"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},"5c9d":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},"7f04":function(e,t,n){"use strict";n.r(t);var a=n("5c9d"),i=n("268e");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("e95f");var c=n("2877"),s=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"7b2f3195",null);t["default"]=s.exports},"9f1b":function(e,t,n){"use strict";(function(e){n("3574"),n("921b");a(n("66fd"));var t=a(n("7f04"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},a6c6:function(e,t,n){},c854:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"ae6d"))},i={data:function(){return{labelList:[{name:"全部",number:25,type:"all"},{name:"好评",number:23,type:"good"},{name:"中评",number:1,type:"secondary"},{name:"差评",number:1,type:"poor"},{name:"有图",number:12,type:"img"},{name:"追加",number:2,type:"append"}],labelIndex:0,ratingsList:[{id:1,username:"大黑哥",face:"/static/img/face.jpg",date:"2019-04-21",spec:"规格: XL",grade:"good",first:{content:"好看，可以，不愧是专业的，才拿到手上就研究了半天才装上",img:["https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg","https://ae01.alicdn.com/kf/HTB1sL7hTjDpK1RjSZFrq6y78VXaw.jpg","https://ae01.alicdn.com/kf/HTB111soTbvpK1RjSZPiq6zmwXXaB.jpg","https://ae01.alicdn.com/kf/HTB1O2TRTmzqK1RjSZPcq6zTepXa4.jpg"],video:[{img:"https://ae01.alicdn.com/kf/HTB1AMEBTcfpK1RjSZFOq6y6nFXaK.jpg",path:"https://mp4.vjshi.com/2018-12-28/1083f3db90334f86e3fc3586b4472914.mp4"}]},append:{date:65,content:"用了一段时间，质量很好，体验很流畅，推荐购买",img:["https://ae01.alicdn.com/kf/HTB1dKZtTgHqK1RjSZFEq6AGMXXaS.jpg","https://ae01.alicdn.com/kf/HTB18h3oTmzqK1RjSZFjq6zlCFXap.jpg"],video:[{img:"https://ae01.alicdn.com/kf/HTB1AMEBTcfpK1RjSZFOq6y6nFXaK.jpg",path:"https://mp4.vjshi.com/2017-06-17/ed1d63669bea39f5ef078c4e194291d6.mp4"}]}},{id:2,username:"小黑狗",face:"/static/img/face.jpg",date:"2019-04-21",spec:"规格: XL",grade:"secondary",first:{content:"好评，看图",img:["https://ae01.alicdn.com/kf/HTB111soTbvpK1RjSZPiq6zmwXXaB.jpg","https://ae01.alicdn.com/kf/HTB1O2TRTmzqK1RjSZPcq6zTepXa4.jpg"],video:[]}},{id:3,username:"小黑狗",face:"/static/img/face.jpg",date:"2019-04-21",spec:"规格: XL",grade:"poor",first:{content:"好评，看图",img:["https://ae01.alicdn.com/kf/HTB111soTbvpK1RjSZPiq6zmwXXaB.jpg","https://ae01.alicdn.com/kf/HTB1O2TRTmzqK1RjSZPcq6zTepXa4.jpg"],video:[]}},{id:3,username:"小黑狗",face:"/static/img/face.jpg",date:"2019-04-21",spec:"规格: XL",grade:"secondary",first:{content:"系统默认好评",img:[],video:[]}}],videoDirection:0,showFullscreenBtn:!0,showPlayBtn:!0,isPlayVideo:!0,videoSrc:""}},components:{uniNavBar:a},onReady:function(t){this.videoContext=e.createVideoContext("myVideo")},onPullDownRefresh:function(){setTimeout(function(){e.stopPullDownRefresh()},1e3)},onReachBottom:function(){e.showToast({title:"触发上拉加载"})},methods:{loadRatings:function(t){this.labelIndex=t,e.showToast({title:"切换评论列表"})},playVideo:function(e){this.videoSrc=e,this.$nextTick(function(){this.videoContext.requestFullScreen({direction:0})})},stopPlayVideo:function(){this.videoContext.pause()},videoPause:function(){this.videoSrc=""},viderFullscreen:function(e){e.detail.fullScreen?this.videoContext.play():this.stopPlayVideo()},showBigImg:function(t,n){e.previewImage({current:t,urls:n})}}};t.default=i}).call(this,n("6e42")["default"])},e95f:function(e,t,n){"use strict";var a=n("a6c6"),i=n.n(a);i.a}},[["9f1b","common/runtime","common/vendor"]]]);