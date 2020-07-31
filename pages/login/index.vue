<template>
	<view class="login">
		<view class="login-box">
			<view class="title">WMS SMQ</view>
			<view class="login-input">
				<text class="lebel">账号:</text><input v-model="username" @confirm="login()" class="uni-input" focus @fu placeholder="请输入账号" />
			</view>
			<view class="login-input">
				<text class="lebel">密码:</text><input v-model="password" @confirm="login()" class="uni-input" :password="true"
				 placeholder="请输入密码" />
			</view>
			<view class="submit">
				<button type="primary" :loading="submiting" :disabled="submiting" size="mini" @click="login()">登 录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login,
		getInfo
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				submiting: false,
				firstEnter: true
			}
		},
		onShow() {
			this.checkLogin()
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.checkLogin()
		},
		created() {
			console.log('on create--------------');
		},
		methods: {
			// 检查是否已经登陆过
			checkLogin(){
				if (getApp().globalData.token) {
					this.getInfo()
				} else if (uni.getStorageSync('token')) {
					getApp().globalData.token = uni.getStorageSync('token')
					this.getInfo()
				} else {
					return
				}
			},
			// 检验账号密码
			checkForm() {
				return new Promise((resolve, reject) => {
					if (!this.username || !this.password) {
						resolve(false)
					} else {
						resolve(true)
					}
				})
			},
			// 登录
			async login() {
				let n = await this.checkForm()
				if (!n) {
					uni.showToast({
						title: '请输入账号密码',
						mask: true,
						duration: 2000,
						icon: 'none',
						position: 'top'
					});
					return
				}
				const loginParams = {
					username: this.username,
					password: this.password
				}
				this.submiting = true
				login(loginParams).then(res => {
					uni.setStorageSync('token', res.token);
					getApp().globalData.token = res.token
					this.getInfo()
				}).catch(err=>{console.log('错误');console.log(err);this.submiting = false})
			},
			// 获取个人信息
			getInfo() {
				getInfo({}).then(res => {
					if(res.id){
						// 跳转首页
						getApp().globalData.userInfo = res
						uni.setStorageSync('userInfo', JSON.stringify(res));
						this.$setUsername(res.username)
						uni.navigateTo({
							url: '../index/index'
						});
					} else{
						uni.showToast({
							title: res.message,
							mask: true,
							duration: 2000,
							icon: 'none',
							position: 'top'
						});
					}
					this.submiting = false
				}).catch(err=>{this.submiting = false})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100vw;
		height: 100vh;
		background-color: #2A2A36;

		.login-box {
			width: 80vw;
			height: 460rpx;
			background-color: #fff;
			position: fixed;
			padding: 0 30rpx;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -70%);
			border-radius: 5px;

			.title {
				text-align: center;
				padding: 30rpx 0 60rpx 0;
				font-size: 40rpx;
				font-weight: bold;
			}

			.login-input {
				display: flex;

				.lebel {
					font-size: 30rpx;
					line-height: 65rpx;
					width: 120rpx;
					height: 65rpx;
				}

				input {
					border-bottom: 1px solid #ccc;
					border-radius: 2px;
					width: 500rpx;
					height: 65rpx;
					padding: 0 16rpx;
					font-size: 30rpx;
				}

				&:nth-last-child(2) {
					margin-top: 40rpx;
				}
			}

			.submit {
				text-align: center;
				margin-top: 40rpx;

				button {
					width: 100%;
					padding: 10rpx 0;
				}
			}
		}
	}
</style>
