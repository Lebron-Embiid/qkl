(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/forgetPassword"],{"00e5":function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a,s=function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"ae6d"))},c=function(){return e.e("components/zz-switchc/zz-switchc").then(e.bind(null,"9d66"))},i={data:function(){return{color:"#999999",background:"#f2f2f2",phone:"",email:"",code:"",password:"",input_type:"",second:0}},components:{uniNavBar:s,switchc:c},computed:{yanzhengma:function(){return 0==this.second?"发送验证码":this.second+"秒"}},methods:{switchchange:function(n){console.log(t(n," at pages\\login\\forgetPassword.vue:76")),1==n.value?this.input_type=1:this.input_type=0},getcode:function(){var t=this;""!=t.phone?/^1[3456789]\d{9}$/.test(t.phone)?t.second>0||o.request({url:"",data:{content:t.account},method:"GET",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(n){1==n.data.code?(o.showToast({title:n.data.msg,icon:"none"}),t.second=0):(o.showToast({title:n.data.msg}),t.second=60,a=setInterval(function(){t.second--,0==t.second&&clearInterval(a)},1e3))}}):t.$api.msg("手机号码格式不正确"):t.$api.msg("请先填写手机号码")},loginSubmit:function(){/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)?this.password.length<6||this.password.length>20?this.$api.msg("密码长度需为6-20位"):(this.$api.msg("密码重置成功",1500,!1,"success"),setTimeout(function(){o.redirectTo({url:"/pages/login/login"})},1500)):this.$api.msg("邮箱格式不正确")}}};n.default=i}).call(this,e("0de9")["default"],e("6e42")["default"])},"029c":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},"0728":function(t,n,e){"use strict";e.r(n);var o=e("00e5"),a=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,function(){return o[t]})}(s);n["default"]=a.a},2458:function(t,n,e){"use strict";(function(t){e("3574"),e("921b");o(e("66fd"));var n=o(e("b326"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},8824:function(t,n,e){},b326:function(t,n,e){"use strict";e.r(n);var o=e("029c"),a=e("0728");for(var s in a)"default"!==s&&function(t){e.d(n,t,function(){return a[t]})}(s);e("eb12");var c=e("2877"),i=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"39ab962f",null);n["default"]=i.exports},eb12:function(t,n,e){"use strict";var o=e("8824"),a=e.n(o);a.a}},[["2458","common/runtime","common/vendor"]]]);