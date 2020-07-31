import base from './config'

//  统一给参数
const dataObj = (url, params) => {
	let options = params

	// #ifdef APP-PLUS
	// DOTO:暂时没处理过,只是放在这里
	let data = null; //业务数据
	let terminal = 1 //终端类型，web:0,app:1
	options = {
		...params,
		data,
		sign,
		terminal
	}
	// #endif

	return options
}

const goLogin = () => {
	uni.clearStorageSync();
	uni.reLaunch({
		url: '/pages/login/Login'
	}) //未授权，请重新登录(401)
}

// 请求错误处理
const checkError = (e, reject) => {
	// console.error("----接口错误----", e)
	if (e.data) {
		if (e.data.code) {
			switch (Number(e.data.code)) {
				case 401:
					goLogin()
					break;
			}
		}
		reject(e.data)
	} else {
		reject({
			'msg': '接口錯誤'
		})
	}
}

// 封装请求
const request = (method, url, options) => {
	let methods = '';
	let headers = {
		// Authorization: 'Bearer ' + uni.getStorageSync('token')
	};
	switch (method) {
		case 'get':
			methods = 'GET'
			headers = {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			}
			break;
		case 'post':
			methods = 'POST'
			headers = {
				'Content-Type': 'application/json; charset=UTF-8'
			}
			break;
		case 'postForm':
			methods = 'POST'
			headers = {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
			break;
	}
	let obj = {},
		hideLoading = false,
		loadingText = 'loading...';
	if (options) { //如果有options
		if (options.hideLoading) {
			hideLoading = options.hideLoading
			delete options.hideLoading
		}
		if (options.loadingText) {
			loadingText = options.loadingText
			delete options.loadingText
		}
	}

	return new Promise((resolve, reject) => {
		!hideLoading && uni.showLoading({
			title: loadingText
		})
		if (!url.includes('login')) {
			headers['Authorization'] = 'Bearer ' + getApp().globalData.token
		}
		uni.request({
			url: `${base.BASE_URL}${url}`,
			method: methods,
			data: dataObj(url, options),
			header: headers,
			success: res => {
				if (res.statusCode == 200) {
					if (res.data.code === 401 && res.data.detail === 'Signature has expired.' && res.data.message ===
						'Auth failed') {
						// 登录失效
						uni.showToast({
							title: '登陆已失效',
							mask: true,
							duration: 2000,
							icon: 'none',
							position: 'top'
						});
						setTimeout(function() {
							// 移除token等信息
							getApp().globalData = {
								token: '',
								userInfo: {},
								request: {}
							}
							uni.clearStorageSync();
							uni.redirectTo({
								url: '../../pages/login/index'
							})
						}, 2010)
					} else {
						resolve(res.data)
					}
				} else {
					const msg = res.statusCode + (res.data.detail ? ':' + res.data.detail : '')
					uni.showToast({
						title: msg,
						mask: true,
						duration: 2000,
						icon: 'none',
						position: 'top'
					});
					reject({
						'msg': '请求錯誤（' + res.statusCode + (res.data.detail ? ':' + res.data.detail : '') + ')'
					})
				}
			},
			fail: e => {
				checkError(e, reject)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}


// 上传文件 封装请求
const uploadFile = (url, options) => {
	let tempData = options || {}
	uni.showLoading({
		title: "上传中...",
		mask: true
	})

	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${base.BASE_URL}${url}`,
			filePath: tempData.file,
			name: 'file',
			formData: tempData,
			success: res => {
				if (res.statusCode == 200) {
					let temp = JSON.parse(res.data)
					// console.log('temp',temp)
					if (temp.code == 200) {
						resolve(temp)
					} else {
						reject(temp)
						uni.showToast({
							title: temp.msg || '接口错误(' + temp.code + ')',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: `未知错误(${res.statusCode})`,
						icon: 'none'
					})
				}
			},
			fail(e) {
				uni.showToast({
					title: '接口请求超时',
					icon: 'none'
				})
				reject(e.data)
			},
			complete: () => {
				uni.hideLoading()
			}
		});
	})
}


export default {
	get: (url, options) => {
		return request('get', url, options)
	},

	// JOSN格式
	post: (url, options) => {
		return request('post', url, options)
	},

	// form-data格式
	postForm: (url, options) => {
		return request('postForm', url, options)
	},

	// 上传
	upload: (url, options) => {
		return uploadFile(url, options)
	}
}
