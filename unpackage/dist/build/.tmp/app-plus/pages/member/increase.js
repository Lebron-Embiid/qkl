(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/member/increase"],{"356c":function(n,t,e){"use strict";(function(n){e("3574"),e("921b");o(e("66fd"));var t=o(e("95f9"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},"95f9":function(n,t,e){"use strict";e.r(t);var o=e("f585"),i=e("f122");for(var a in i)"default"!==a&&function(n){e.d(t,n,function(){return i[n]})}(a);e("9810");var c=e("2877"),u=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,"62fb4f1a",null);t["default"]=u.exports},9810:function(n,t,e){"use strict";var o=e("b8e2"),i=e.n(o);i.a},a7cd:function(n,t,e){"use strict";(function(n,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"ae6d"))},a=function(){return e.e("components/commonAvatar").then(e.bind(null,"a5d8"))},c=function(){return e.e("components/zz-switchc/zz-switchc").then(e.bind(null,"9d66"))},u=function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"10aa"))},s={data:function(){return{rightIcon:"/static/ling.png",dot:!0,memberList:[{icon:"/static/member_icon1.png",title:"投资钱包",url:"/pages/mine/investWallet",value:"600000"},{icon:"/static/member_icon2.png",title:"APP钱包",url:"/pages/mine/wallet",value:"16000000"}],is_apply:0,is_pass:0,price:"",password:"",input_type:"",photo:"",bank_account:"4412324354522"}},components:{uniNavBar:i,commonAvatar:a,switchc:c,uniPopup:u},methods:{toListLink:function(t){n.navigateTo({url:this.memberList[t].url})},apply:function(){this.is_apply=1},switchchange:function(n){console.log(o(n," at pages\\member\\increase.vue:131")),1==n.value?this.input_type=1:this.input_type=0},uploadImg:function(){var t=this;n.chooseImage({count:1,sizeType:["original"],sourceType:["album"],success:function(n){console.log(o(JSON.stringify(n.tempFilePaths)," at pages\\member\\increase.vue:145")),t.photo=n.tempFilePaths[0]}})},copyAccount:function(){var t=this;n.setClipboardData({data:t.bank_account,success:function(){console.log(o("success"," at pages\\member\\increase.vue:172")),t.$api.msg("复制成功，快去粘贴吧！")}}),n.getClipboardData({success:function(n){console.log(o(n.data," at pages\\member\\increase.vue:178"))}})},applyConfirm:function(){this.is_apply=1},lookAccount:function(){this.$refs.popup.open()},cancelPopup:function(){this.$refs.popup.close()},okPopup:function(){this.$refs.popup.close()}}};t.default=s}).call(this,e("6e42")["default"],e("0de9")["default"])},b8e2:function(n,t,e){},f122:function(n,t,e){"use strict";e.r(t);var o=e("a7cd"),i=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);t["default"]=i.a},f585:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})}},[["356c","common/runtime","common/vendor"]]]);