<template>
	<view class="login">
		<view class="login-box">
			<view class="title">WMS SMQ</view>
			<view class="login-input">
				<text class="lebel">账号:</text><input v-model="account" class="uni-input" focus @fu placeholder="请输入账号" />
			</view>
			<view class="login-input">
				<text class="lebel">密码:</text><input v-model="password" class="uni-input" :password="true" placeholder="请输入密码" />
			</view>
			<view class="submit">
				<button type="primary" :loading="submiting" :disabled="submiting" size="mini" @click="login()">登 录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				submiting: false
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		methods: {
			login() {
				console.log('登录了');
				this.submiting = true
				setTimeout(()=>{
					this.submiting = false
					console.log(getApp().globalData.text)
				},1000)
				uni.setStorageSync('Token', 'sdsd');
				getApp().globalData.text = 'sdsd'
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
				button{
					width: 100%;
					padding: 10rpx 0;
				}
			}
		}
	}
</style>
