
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/index","pages/index/index","pages/discharge/index","pages/discharge/discharge1","pages/discharge/discharge2","pages/receipt/index","pages/receipt/receipt1","pages/receipt/receipt2","pages/receipt/receipt3","pages/shelf/index","pages/shelf/shelf1","pages/shelf/shelf2","pages/shelf/shelf3","pages/shelf/shelf4"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"扫描枪-SMQ","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF","titleNView":false,"animationType":"fade-in","animationDuration":300},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"oms-smq","compilerVersion":"2.8.3","entryPagePath":"pages/login/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/discharge/index","meta":{},"window":{"navigationBarTitleText":"卸货"}},{"path":"/pages/discharge/discharge1","meta":{},"window":{"navigationBarTitleText":"扫描入库单号"}},{"path":"/pages/discharge/discharge2","meta":{},"window":{"navigationBarTitleText":"输入箱数"}},{"path":"/pages/receipt/index","meta":{},"window":{"navigationBarTitleText":"收货"}},{"path":"/pages/receipt/receipt1","meta":{},"window":{"navigationBarTitleText":"扫描入库单号"}},{"path":"/pages/receipt/receipt2","meta":{},"window":{"navigationBarTitleText":"扫描SKU"}},{"path":"/pages/receipt/receipt3","meta":{},"window":{"navigationBarTitleText":"输入SKU包装信息"}},{"path":"/pages/shelf/index","meta":{},"window":{"navigationBarTitleText":"上架"}},{"path":"/pages/shelf/shelf1","meta":{},"window":{"navigationBarTitleText":"扫描入库单号"}},{"path":"/pages/shelf/shelf2","meta":{},"window":{"navigationBarTitleText":"扫描SKU"}},{"path":"/pages/shelf/shelf3","meta":{},"window":{"navigationBarTitleText":"输入SKU上架数量"}},{"path":"/pages/shelf/shelf4","meta":{},"window":{"navigationBarTitleText":"扫描库位"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
