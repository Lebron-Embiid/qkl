(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/zz-switchc/zz-switchc"],{"2b55":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"switchComponent",props:{value:{type:Boolean,default:!1},bgcolor:{type:String,default:"#1abc9c"},width:{type:Number,default:52},text:{type:String,default:""},sid:{type:Number,default:0}},data:function(){return{isChecked:this.value}},computed:{direction:function(){return this.text?this.text.split("|"):[]}},watch:{value:function(t){this.isChecked=t},isChecked:function(t){var e="";t&&(e=this.text.split("|")[0]),t||(e=this.text.split("|")[1]);var n={sid:this.sid,value:t,text:e};this.$emit("change",n)}},methods:{toggle:function(t){this.isChecked=!this.isChecked}}};e.default=i},"70e3":function(t,e,n){"use strict";var i=n("df8d"),u=n.n(i);u.a},"846a":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return u})},"9d66":function(t,e,n){"use strict";n.r(e);var i=n("846a"),u=n("bdfc");for(var c in u)"default"!==c&&function(t){n.d(e,t,function(){return u[t]})}(c);n("70e3");var a=n("2877"),s=Object(a["a"])(u["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},bdfc:function(t,e,n){"use strict";n.r(e);var i=n("2b55"),u=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,function(){return i[t]})}(c);e["default"]=u.a},df8d:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/zz-switchc/zz-switchc-create-component',
    {
        'components/zz-switchc/zz-switchc-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("9d66"))
        })
    },
    [['components/zz-switchc/zz-switchc-create-component']]
]);                
