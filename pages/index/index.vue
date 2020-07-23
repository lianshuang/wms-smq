<template>
	<view class="container">
		<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" :shadow='false' title="导航栏组件"></uni-nav-bar>
		<uni-grid @change="navigatorTo($event)" :column="3" :show-border="true" :square="true">
			<uni-grid-item v-for="(value,index) in iconType" :index='index' :key="value+index" class="grid-item">
				<icon :type="value" size="80rpx" class="grid-icon" />
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniNavBar
		},
		data() {
			return {
				iconType: ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear']
			}
		},
		methods: {
			navigatorTo(e) {
				console.log(e);
				uni.setStorageSync('Token', 'dfsa6d5ad4fdffs6d5fa6ds');
				uni.navigateTo({
					url: '../login/index?id=1&name=uniapp',
					animationType: 'pop-in',
					animationDuration: 2000
				});
				// setTimeout(()=>{
				// 	console.log(uni.getStorageSync('Token'));
				// 	// uni.navigateTo({
				// 	//     url: 'pages/login/index?id=1&name=uniapp'
				// 	// });
				// },1000)

				// const value = uni.getStorageSync('storage_key');
				// uni.request({
				//     url: 'http://manage.zhengfx.com/auth/login/', //仅为示例，并非真实接口地址。
				//     data: {
				//         password: 'zfx@2019',
				// 		username: 'admin'
				//     },
				// 	method: 'POST',
				//     header: {
				//         'custom-header': 'hello' //自定义请求头信息
				//     },
				//     success: (res) => {
				//         console.log(res.data);
				//         this.text = 'request success';
				//     }
				// });
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: $Gpadding;
		font-size: 14px;
		line-height: 24px;

		.grid-item {
			text-align: center;

			.grid-icon {
				margin: auto auto;
			}
		}
	}
</style>
