(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-receipt-receipt2"],{"2cec":function(t,e,n){"use strict";var a=n("ee27");n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("c964")),r=a(n("f3f3")),o=n("66fd"),u={data:function(){return{formData:{sku_code:""},option:{},loading:!1}},computed:{requestData:function(){return(0,r.default)({},getApp().globalData.request,{step:this.getRoutePath().step},this.formData)}},onLoad:function(t){this.option=t},methods:{validateForm:function(){var t=this;return new Promise((function(e,n){t.formData.sku_code||(uni.showToast({title:"请扫描SKU NO.",icon:"none",mask:!0,duration:2e3}),e(!1)),e(!0)}))},back:function(){uni.showModal({title:"提示",content:"确定退出(".concat(getApp().globalData.request.master_order_num,")的收货？"),success:function(t){if(t.confirm){var e=getApp().globalData.request.type;getApp().globalData.request={type:e},uni.redirectTo({url:"./receipt1"})}else t.cancel&&console.log("用户点击取消")}})},nextStep:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.loading){e.next=2;break}return e.abrupt("return");case 2:return t.loading=!0,uni.showLoading({title:"请求中",mask:!0}),e.next=6,t.validateForm();case 6:if(n=e.sent,uni.hideLoading(),t.loading=!1,n){e.next=11;break}return e.abrupt("return");case 11:(0,o.nextStep)(t.filterRequest(t.requestData)).then((function(e){200===e.code?(1!=e.data.step&&(getApp().globalData.request=(0,r.default)({},getApp().globalData.request,{},e.data)),uni.redirectTo({url:t.getRoutePath().basicPath+e.data.step})):uni.showToast({title:e.detail||e.message||"fail request! please check!",mask:!0,duration:2e3,icon:"none",position:"top"})}));case 12:case"end":return e.stop()}}),e)})))()}}};e.default=u},adf6:function(t,e,n){"use strict";n.r(e);var a=n("c15a"),i=n("f421");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var o,u=n("f0c5"),s=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"6524d99c",null,!1,a["a"],o);e["default"]=s.exports},c15a:function(t,e,n){"use strict";var a={uniNavBar:n("431a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"step"},[n("uni-nav-bar",{attrs:{shadow:!1,title:"收货"},on:{clickLeft:function(e){arguments[0]=e=t.$handleEvent(e),t.backToIndex()}}},[n("v-uni-view",{attrs:{slot:"left"},slot:"left"},[n("i",{staticClass:"iconfont iconfanhui1 icon-left"})]),n("v-uni-view",{attrs:{slot:"right"},slot:"right"},[n("v-uni-text",[t._v(t._s(t.$username))])],1)],1)],1),n("v-uni-view",{staticClass:"operation"},[n("v-uni-view",{staticClass:"top-info"},[n("v-uni-view",[t._v("入库订单号："+t._s(t.requestData.master_order_num))])],1),n("v-uni-view",{staticClass:"scanner"},[n("v-uni-text",{staticClass:"scanner-label"},[t._v("扫描SKU NO.：")]),n("v-uni-input",{staticClass:"scanner-input",attrs:{type:"text",placeholder:"扫描商品SKU NO."},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.nextStep()}},model:{value:t.formData.sku_code,callback:function(e){t.$set(t.formData,"sku_code",e)},expression:"formData.sku_code"}})],1),n("v-uni-view",{staticClass:"bottom-btn"},[n("v-uni-button",{staticClass:"left",attrs:{type:"primary",loading:!1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back()}}},[t._v("完成")]),n("v-uni-button",{staticClass:"right",attrs:{type:"primary",loading:!1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.nextStep()}}},[t._v("确定")])],1)],1)],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},f421:function(t,e,n){"use strict";n.r(e);var a=n("2cec"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a}}]);