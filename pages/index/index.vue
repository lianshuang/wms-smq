<template>
	<view class="container">
		<uni-nav-bar :shadow='false' title="首页" @clickRight="logOut()">
			<view slot="right">
				<text>{{$username}}</text>
				<i class="iconfont icontuichu logout" />
			</view>
		</uni-nav-bar>
		<view class="grid-box">
			<uni-grid @change="navigatorTo($event)" :column="3" :show-border="true" :square="true">
				<uni-grid-item v-for="(item,index) in grid_array" :index='index' :key="item.icon" class="grid-item">
					<i :class="['grid-icon','iconfont', item.icon]" :style="{color:item.color}" />
					<text>{{item.text}}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view>
			<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
			 @trigger="trigger" @fabClick="fabClick"></uni-fab>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	// const Qs = require('qs')
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniNavBar,
			uniFab
		},
		data() {
			return {
				pattern: {
					color: '',
					selectedColor: '',
					backgroundColor: '',
					buttonColor: ''
				},
				content: [{
						iconPath: '/static/sku.png',
						selectedIconPath: '/static/sku.png',
						text: 'sku库存',
						active: true
					},
					{
						iconPath: '/static/kc.png',
						selectedIconPath: '/static/kc.png',
						text: '库位库存',
						active: false
					}
				],
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'vertical',
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
						icon: 'iconnavicon-kcpdd',
						text: '盘点',
						path: 'check',
						color: '#f90909'
					},
					{
						icon: 'iconyiku',
						text: '移库下架',
						path: 'transferoff',
						color: '#000'
					},
					{
						icon: 'iconyiku1',
						text: '移库上架',
						path: 'transferon',
						color: 'teal'
					}
				]
			}
		},
		onShow() {
			getApp().globalData.request = {}
		},
		computed: {
			username() {
				return getApp().globalData.userInfo.username
			}
		},
		created() {
			// this.$axios.post('http://127.0.0.1:8001', Qs.stringify({
			// 	action: 'getPrinterList'
			// })).then((res) => {
			// 	if (res.status === 200) {
			// 		this.printer_list = res.data.data
			// 	} else {
			// 		this.$message.error('获取打印机失败')
			// 	}
			// }).catch(() => {
			// 	this.$message.error('获取打印机失败')
			// })
		},
		methods: {
			trigger(data) {
				switch (data.index) {
					case 0:
						uni.navigateTo({
							url: '../sku/index'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '../warehouse/index'
						})
						break;
					default:
						break;
				}

			},
			fabClick() {},
			// 跳转
			navigatorTo(e) {
				const type = this.grid_array[e.detail.index]['path']
				const url = `../${this.grid_array[e.detail.index]['path']}/index?type=${type}`
				console.log(type);
				getApp().globalData.request.type = type
				console.log(url);
				uni.navigateTo({
					url
				});
			},
			// 退出登录
			logOut() {
				uni.showModal({
					title: '提示',
					content: '退出登录',
					success: function(res) {
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
		font-size: 14px;
		line-height: 24px;

		.logout {
			color: red;
			font-weight: bold;
			margin-left: 10rpx;
		}

		.grid-box {
			padding: $Gpadding;

			.grid-item {
				text-align: center;

				.grid-icon {
					margin: auto auto;
					font-size: 80rpx;
				}
			}
		}


	}
</style>
