<script>
	import pageAnimation from './components/page-animation'
	import base from './commom/js/config.js'
	export default {
		mixins: [pageAnimation],
		globalData: {
			token: '',
			userInfo: {},
			request: {}
		},
		onLaunch: function() {
			console.log('App Launch');

			uni.showLoading({
				title: '加载中',
				mask: true
			});

			// 设置请求地址
			if (uni.getStorageSync('BASE_URL')) {
				base.BASE_URL = uni.getStorageSync('BASE_URL')
			}

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

			// 设置全局type
			setTimeout(() => {
				const path = getCurrentPages()[getCurrentPages().length - 1]['$route']['path']
				const type = path.split('/')[2]
				getApp().globalData.request.type = type
				const page = path.slice(-1)
				if (!isNaN(Number(page))) {
					// 在操作得步骤页刷新得话跳回首页
					const url = `/pages/${type}/index?type=${type}`
					uni.hideLoading();
					uni.navigateTo({
						url
					});
				}
				uni.hideLoading();
			}, 1000)
			uni.hideLoading() 

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
	@import url("./static/font/iconfont.css");
	.step {
		position: fixed;
		width: 100vw;
		left: 0;
		top: 0;
		z-index: 888;
	}

	/deep/ .uni-mask {
		background: rgba(0, 0, 0, .5) !important;
	}

	/deep/ .uni-navbar__header {
		color: #fff !important;
		background-color: #484370 !important;
		padding-top: 40rpx;

		.icon-left {
			font-size: 40rpx;
		}
	}

	/deep/ .uni-nav-bar-text {
		color: #fff !important;
	}


	// 操作栏
	.operation {
		padding: 10rpx 30rpx 65px 30rpx;
		box-sizing: border-box;
		min-height: calc(100vh);
		padding-top: 65px;
		// margin-top: 65px;

		.top-info {
			font-size: 30rpx;
			font-weight: bold;
		}

		// 底部显示信息
		.bottom-info {
			font-size: 30rpx;
			margin-top: 30rpx;

			.list-table {
				border: 2rpx solid #cecece;
				table {
					width: 100%;
					color: #304456;
					text-align: center;
					th {
						display: flex;
						justify-content: space-evenly;
						flex-wrap: nowrap;
						background-color: #eee;
						td {
							flex-grow: 1;
							flex: 1;
						}
					}

					tr {
						display: flex;
						justify-content: space-evenly;
						flex-wrap: nowrap;

						td {
							// width: ;
							flex-grow: 1;
							flex: 1;
						}
					}
				}
			}



		}

		// 扫描输入框
		.scanner {
			.scanner-title {
				font-size: 36rpx;
				font-weight: 600;
			}

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

		// 底部表格
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
