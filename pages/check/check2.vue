<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="盘点" @clickLeft="backToIndex()">
				<view slot="left">
					<i class="iconfont iconfanhui1 icon-left" />
				</view>
				<view slot="right"> <text>{{$username}}</text> </view>
			</uni-nav-bar>
		</view>

		<!-- 操作栏 -->
		<view class="operation">
			<!-- 顶部显示栏 -->
			<view class="top-info">
				<view>盘点单号：{{requestData.master_order_num}}</view>
				<view>库位：{{requestData.target_location}}</view>
				<view>SKU NO.：{{requestData.sku_code}}</view>
			</view>
			<view class="scanner">
				<text class="scanner-label">扫描库位：</text>
				<input class="scanner-input" type="text" placeholder="扫描库位" focus @confirm="nextStep()" v-model="formData.position_num" />
			</view>
			<!-- 底栏操作按钮 -->
			<view class="bottom-btn">
				<button class="left" type="primary" @click="back()" :loading="false">返回</button>
				<button class="right" type="primary" @click="nextStep()" :loading="false">确定</button>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		nextStep
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {
				formData: {
					position_num: ''
				},
				option: {},
				loading: false
			}
		},
		computed: {
			// 获取当前步骤需要提交的表单信息
			requestData() {
				return {
					...getApp().globalData.request,
					step: this.getRoutePath().step,
					...this.formData,
				}
			}
		},
		onLoad: function(option) {
			this.option = option
		},
		methods: {
			// 校验
			validateForm() {
				return new Promise((resolve, reject) => {
					if (!this.formData.position_num) {
						uni.showToast({
							title: '请扫描库位',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					} else if(this.formData.position_num!=this.requestData.target_location){
						uni.showToast({
							title: '扫描的库位与目标库位不一致',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					}
					resolve(true)
				})
			},
			// 返回
			back() {
				uni.redirectTo({
					url: this.getRoutePath().lastPath
				})
			},
			// 下一步
			async nextStep() {
				if (this.loading) return
				this.loading = true
				uni.showLoading({
					title: '请求中',
					mask: true
				});
				let flag = await this.validateForm()
				uni.hideLoading();
				this.loading = false
				if (!flag) return
				nextStep(this.filterRequest(this.requestData)).then(res => {
					console.log(res);
					if (res.code === 200) {
						getApp().globalData.request = { ...getApp().globalData.request,
							...res.data
						}
						uni.navigateTo({
							url: this.getRoutePath().basicPath + res.data.step
						})
					} else {
						uni.showToast({
							title: res.detail || res.message || 'fail request! please check!',
							mask: true,
							duration: 2000,
							icon: 'none',
							position: 'top'
						});
					}
				})
			},
		}
	}
</script>

<style>
</style>
