import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 字体图标
import './static/font/iconfont.css'

// 全局跳转步骤页
Vue.prototype.getStepRouter = function(step){
	const url =  './' + (getCurrentPages()[getCurrentPages().length - 1]['$route']['path']).split('/')[2] + step
	uni.redirectTo({
		url
	});
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
