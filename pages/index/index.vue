<template>
	<view class="container">
		<uni-nav-bar :shadow='false' title="首页" @clickRight="logOut()">
			<view slot="right">
				<text>{{$username}}</text>
				<i class="iconfont icontuichu logout"/>
			</view>
		</uni-nav-bar>
		<uni-grid @change="navigatorTo($event)" :column="3" :show-border="true" :square="true">
			<uni-grid-item v-for="(item,index) in grid_array" :index='index' :key="item.icon" class="grid-item">
				<i :class="['grid-icon','iconfont', item.icon]" :style="{color:item.color}"/>
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
						icon: 'iconxiezai',
						text: '卸货',
						path: 'discharge',
						color: '#87ceeb'
					},
					{
						icon: 'iconshouhuo',
						text: '收货',
						path: 'receipt',
						color: '#ad2c56'
					},
					{
						icon: 'iconiconfontzhizuobiaozhunbduan31',
						text: '上架',
						path: 'shelf',
						color: '#0fd454'
					},
					{
						icon: 'iconjianhuoguihuan',
						text: '拣选',
						path: 'pick',
						color: '#e087eb'
					},
					{
						icon: 'icondabaoxiazai',
						text: '打包',
						path: 'bale',
						color: '#1f43c5'
					},
					{
						icon: 'iconfahuo',
						text: '发货',
						path: 'ship',
						color: '#f90909'
					}
				]
			}
		},
		computed: {
			username() {
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
				font-size: 80rpx;
			}
		}
	}
</style>
