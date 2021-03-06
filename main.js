import Vue from 'vue'
import App from './App'
import axios from 'axios'

axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}

// create an axios instance
const service = axios.create({
    baseURL: 'http://127.0.0.1:8001/', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    // timeout: 5000, // request timeout
    crossDomain: true
})

Vue.prototype.$axios = service


Vue.config.productionTip = false

// 字体图标 = App端不支持在js里面引用css
// import './static/font/iconfont.css'

// 全局设置用户名
Vue.prototype.$setUsername = function(username) {
	Vue.prototype.$username = username
}

// 退出操作返回主页
Vue.prototype.backToIndex = function(step) {
	uni.showModal({
	    title: '提示',
	    content: '退出操作返回主页？',
	    success: function (res) {
	        if (res.confirm) {
	            uni.redirectTo({
	            	url: '../index/index'
	            });
	        } else if (res.cancel) {
	            console.log('用户点击取消');
	        }
	    }
	});
}

// 全局获取步骤后进行跳转步骤页
Vue.prototype.getStepRouter = function(step) {
	let base_path = ''
	// #ifdef APP-PLUS
	base_path = '/' + getCurrentPages()[getCurrentPages().length - 1]['route']
	// #endif
	// #ifndef APP-PLUS
	base_path = (getCurrentPages()[getCurrentPages().length - 1]['$route']['path'])
	// #endif
	const url = './' + base_path.split('/')[2] + step
	uni.redirectTo({
		url
	});
}

// 全局获取当前路由和前后路由
Vue.prototype.getRoutePath = function() {
	let base_path = ''
	// #ifdef APP-PLUS
	base_path = '/' + getCurrentPages()[getCurrentPages().length - 1]['route']
	// #endif
	// #ifndef APP-PLUS
	base_path = (getCurrentPages()[getCurrentPages().length - 1]['$route']['path'])
	// #endif
	
	const path = base_path
	const step = Number(path.slice(-1))
	if (isNaN(step)) return {}
	const basicPath = './' + path.split('/')[3].slice(0, -1)
	const lastPath = step - 1 === 0 ?
		'../index/index' : basicPath + (step - 1)
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
		index !== arr.length - 1 ? query += '&' : ''
	})
	return query
}


// 过滤全局请求request里面得数组类型
Vue.prototype.filterRequest = function(request = {}) {
	const tem = {}
	Object.keys(request).forEach(i => {
		// !Array.isArray(request[i]) ? tem[i] = request[i] : '',
		// 数组类型不带
		if(!Array.isArray(request[i]) && !i.startsWith('$')){
			tem[i] = request[i]
		}
	})
	return tem
}

// 转换时间
Vue.prototype.parseTime = function(time, type = 'datetime') {
	if (time) {
		var date = new Date(time)
		var year = date.getFullYear()
		var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		// 拼接
		if (type === 'datetime') {
			return year + '-' + month + '-' + day + '   ' + hours + ':' + minutes + ':' + seconds
		} else {
			return year + '-' + month + '-' + day
		}
	} else {
		return ''
	}
}

// Vue.prototype.$userInfo = getApp().globalData.userInfo.username

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
