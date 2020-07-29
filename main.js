import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 字体图标
import './static/font/iconfont.css'

// 全局设置用户名
Vue.prototype.$setUsername = function(username) {
	Vue.prototype.$username = username
}

// 全局获取步骤后进行跳转步骤页
Vue.prototype.getStepRouter = function(step) {
	const url = './' + (getCurrentPages()[getCurrentPages().length - 1]['$route']['path']).split('/')[2] + step
	uni.redirectTo({
		url
	});
}

// 全局获取当前路由和前后路由
Vue.prototype.getRoutePath = function() {
	const path = getCurrentPages()[getCurrentPages().length - 1]['$route']['path']
	const step = Number(path.slice(-1))
	if(isNaN(step)) return {}
	const basicPath = './' + path.split('/')[3].slice(0, -1)
	const lastPath = step - 1 === 0 ?
		'../index/index' : './' + basicPath + (step - 1 - 1)
	const nextPath = './' + path.split('/')[3].slice(0, -1) + (step + 1)
	return {
		step,
		path,
		lastPath,
		nextPath,
		basicPath
	}
}

// 路由跳转设置url参数
Vue.prototype.setUrlParams = function(params = {}) {
	let query = '?'
	Object.keys(params).forEach((i, index, arr) => {
		query += i + '=' + params[i]
		index !== arr.length-1 ? query += '&' : ''
	})
	return query
}

// Vue.prototype.$userInfo = getApp().globalData.userInfo.username

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
