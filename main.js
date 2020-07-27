import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 字体图标
import './static/font/iconfont.css'

// 全局设置用户名
Vue.prototype.$setUsername = function(username){
	Vue.prototype.$username = username
}

// 全局跳转步骤页
Vue.prototype.getStepRouter = function(step){
	const url =  './' + (getCurrentPages()[getCurrentPages().length - 1]['$route']['path']).split('/')[2] + step
	uni.redirectTo({
		url
	});
}

// Vue.prototype.$userInfo = getApp().globalData.userInfo.username

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
