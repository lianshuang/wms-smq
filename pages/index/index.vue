<template>
	<view class="container">
		<uni-nav-bar :shadow='false' title="首页" @clickRight="logOut()">
			<view slot="right">
				<text>{{username}}</text>
				<icon type="close" color="red" size="20"/>
				<i class="iconfont icontuichu logout"/>
			</view>
		</uni-nav-bar>
		<uni-grid @change="navigatorTo($event)" :column="3" :show-border="true" :square="true">
			<uni-grid-item v-for="(item,index) in grid_array" :index='index' :key="item.icon" class="grid-item">
				<icon :type="item.icon" size="80rpx" class="grid-icon" />
				<text>{{item.text}}</text>
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
				grid_array: [{
						icon: 'success',
						text: '卸货',
						path: 'discharge'
					},
					{
						icon: 'success_no_circle',
						text: '收货',
						path: 'receipt'
					},
					{
						icon: 'info',
						text: '上架',
						path: 'shelf'
					},
					{
						icon: 'warn',
						text: '拣选',
						path: 'pick'
					},
					{
						icon: 'waiting',
						text: '打包',
						path: 'bale'
					},
					{
						icon: 'cancel',
						text: '发货',
						path: 'ship'
					}
				]
			}
		},
		computed: {
			username() {
				console.log(getApp().globalData.userInfo);
				return getApp().globalData.userInfo.username
			}
		},
		methods: {
			// 跳转
			navigatorTo(e) {
				console.log(e);
				console.log(this.grid_array[e.detail.index]['path']);
				const url = `../${this.grid_array[e.detail.index]['path']}/index`
				uni.navigateTo({
					url
				});
			},
			// 退出登录
			logOut() {
				uni.showModal({
				    title: '提示',
				    content: '退出登录',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							getApp().globalData.token = ''
							getApp().globalData.userInfo = {}
							uni.removeStorageSync('token');
							uni.removeStorageSync('userInfo');
							uni.navigateTo({
								url: '../login/index'
							});
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: $Gpadding;
		font-size: 14px;
		line-height: 24px;
		
		.logout {
			color: red;
			font-weight: bold;
			margin-left: 10rpx;
		}

		.grid-item {
			text-align: center;

			.grid-icon {
				margin: auto auto;
			}
		}
	}
</style>
