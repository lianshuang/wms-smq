(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shelf-shelf4"],{"04f0":function(t,e,a){"use strict";a.r(e);var n=a("34cf"),i=a("1252");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var r,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"3ad11d9e",null,!1,n["a"],r);e["default"]=u.exports},1252:function(t,e,a){"use strict";a.r(e);var n=a("97e9"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"34cf":function(t,e,a){"use strict";var n={uniNavBar:a("431a").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"step"},[a("uni-nav-bar",{attrs:{shadow:!1,title:"上架"},on:{clickLeft:function(e){arguments[0]=e=t.$handleEvent(e),t.backToIndex()}}},[a("v-uni-view",{attrs:{slot:"left"},slot:"left"},[a("i",{staticClass:"iconfont iconfanhui1 icon-left"})]),a("v-uni-view",{attrs:{slot:"right"},slot:"right"},[a("v-uni-text",[t._v(t._s(t.$username))])],1)],1)],1),a("v-uni-view",{staticClass:"operation"},[a("v-uni-view",{staticClass:"top-info"},[a("v-uni-view",[t._v("入库订单号："+t._s(t.requestData.master_order_num))]),a("v-uni-view",[t._v("SKU NO.："+t._s(t.requestData.sku_code))]),a("v-uni-view",[t._v("本次上架数量："+t._s(t.requestData.pieces))])],1),a("v-uni-view",{staticClass:"scanner"},[a("v-uni-view",{staticClass:"scanner-title"},[t._v("扫描库位")]),a("v-uni-input",{staticClass:"scanner-input",attrs:{placeholder:"请扫描库位"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.nextStep()}},model:{value:t.formData.location,callback:function(e){t.$set(t.formData,"location",e)},expression:"formData.location"}})],1),a("v-uni-view",{staticClass:"bottom-btn"},[a("v-uni-button",{staticClass:"left",attrs:{type:"primary",loading:!1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back()}}},[t._v("返回")]),a("v-uni-button",{staticClass:"right",attrs:{type:"primary",loading:!1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.nextStep()}}},[t._v("确定")])],1)],1)],1)},o=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},"97e9":function(t,e,a){"use strict";var n=a("ee27");a("4160"),a("fb6a"),a("a9e3"),a("b680"),a("b64b"),a("d3b7"),a("2ca0"),a("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var i=n(a("c964")),o=n(a("f3f3")),r=a("66fd"),s={data:function(){return{formData:{location:null},initData:{},comfirm:!1,option:{},loading:!1}},computed:{requestData:function(){return(0,o.default)({},getApp().globalData.request,{step:this.getRoutePath().step},this.formData)}},onLoad:function(t){this.option=t},created:function(){var t=this,e=getApp().globalData.request;Object.keys(e).forEach((function(a){a.startsWith("$")&&(t.initData[a.slice(1)]=e[a],t.formData[a.slice(1)]=e[a],t.comfirm=!0)}))},methods:{validateForm:function(){var t=this;return new Promise((function(e,a){console.log(t.formData.width),t.formData.location?e(!0):(uni.showToast({title:"请输入确保输入库位",icon:"none",mask:!0,duration:2e3}),e(!1))}))},back:function(){uni.redirectTo({url:this.getRoutePath().lastPath})},getNum50Range:function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var e=Number((.5*t).toFixed(3));return[t-e,t+e]},nextStep:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.loading){e.next=2;break}return e.abrupt("return");case 2:return t.loading=!0,uni.showLoading({title:"请求中",mask:!0}),e.next=6,t.validateForm();case 6:if(a=e.sent,uni.hideLoading(),t.loading=!1,a){e.next=11;break}return e.abrupt("return");case 11:(0,r.nextStep)(t.filterRequest(t.requestData)).then((function(e){if(console.log(e),200===e.code){if(2!=e.data.step)getApp().globalData.request=(0,o.default)({},getApp().globalData.request,{},e.data);else{var a=getApp().globalData.request.type;getApp().globalData.request={type:a,pre_carton:e.data.pre_carton,shelf_carton:e.data.shelf_carton,master_order_num:e.data.master_order_num}}uni.showToast({title:"上架成功",mask:!0,duration:2e3,icon:"none",position:"top"}),uni.redirectTo({url:t.getRoutePath().basicPath+e.data.step})}else uni.showToast({title:e.detail||e.message||"fail request! please check!",mask:!0,duration:2e3,icon:"none",position:"top"})}));case 12:case"end":return e.stop()}}),e)})))()}}};e.default=s}}]);