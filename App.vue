<script>
	import pageAnimation from './components/page-animation'
	export default {
		mixins: [pageAnimation],
		globalData: {
			token: '',
			userInfo: {}
		},
		onLaunch: function() {
			console.log('App Launch');
			// 设置信息
			if (!getApp().globalData.token && !uni.getStorageSync('token')) {
				uni.navigateTo({
					url: './pages/login/index'
				});
			} else if (!getApp().globalData.token && uni.getStorageSync('token')) {
				getApp().globalData.token = uni.getStorageSync('token')
				getApp().globalData.username = uni.getStorageSync('username')
				getApp().globalData.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				this.$setUsername(JSON.parse(uni.getStorageSync('userInfo')).username)
			}

		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/deep/ .uni-navbar__header {
		color: #fff !important;
		background-color: #484370 !important;
	}

	/deep/ .uni-nav-bar-text {
		color: #fff !important;
	}

	.operation {
		padding: 10rpx 30rpx 45px 30rpx;
		// background-color: #C2ADAF;
		box-sizing: border-box;
		min-height: calc(100vh - 45px);

		.scanner {
			.scanner-label {
				font-size: 36rpx;
				font-weight: bold;
			}

			.scanner-input {
				border: 1rpx solid #ccc;
				padding: 15rpx 20rpx;
				margin-top: 14rpx;
			}
		}

		.bottom-btn {
			width: 100vw;
			height: 45px;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;

			.left {
				width: 50%;
				border-radius: 0px;
				border-right: 1px solid rgba(255, 255, 255, .2);
				background-color: #484370;

				&::after {
					border: none;
				}
			}

			.right {
				width: 50%;
				border-radius: 0px;
				background-color: #484370;

				&::after {
					border: none;
				}
			}
		}
	}
</style>
