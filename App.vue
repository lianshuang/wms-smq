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
