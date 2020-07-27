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

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */

	@import "/static/font/iconfont.css";
</style>
