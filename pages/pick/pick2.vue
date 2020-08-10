<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="拣选" @clickLeft="backToIndex()">
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
				<view>拣选单号：{{requestData.master_order_num}}</view>
				<view>库位：{{requestData.target_location}}</view>
				<view>SKU NO.：{{requestData.code}}</view>
				<view>应拣选件数：{{requestData.expected_pick}}</view>
			</view>
			<view class="scanner">
				<text class="scanner-label">扫描SKU条码：</text>
				<input class="scanner-input" type="text" placeholder="请扫描SKU条码" @confirm="nextStep()" v-model="formData.sku_code" />
			</view>
			<!-- 底部信息 -->
			<view class="bottom-info">
				<view>实际已拣选件数: {{requestData.actual_pick}}</view>
				<view>本次拣选件数: {{formData.pick_num}}</view>
				<input class="pick_num" type="number" placeholder="请输入本次拣选数量" v-model.number="formData.pick_num" />
			</view>
			<!-- 底栏操作按钮 -->
			<view class="bottom-btn">
				<button class="left" type="primary" @click="skip()" :loading="false">跳过</button>
				<button class="right" type="primary" @click="nextStep()" :loading="false">下一步</button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		nextStep,
		pick_ship_pick_order
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {
				formData: {
					sku_code: null,
					pick_num: 1
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
					if (!this.formData.sku_code) {
						uni.showToast({
							title: '请输入或扫描SKU条码',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					}
					resolve(true)
				})
			},
			// 跳过
			skip() {
				console.log('跳过');
				uni.showLoading({
					title: '请求中',
					mask: true
				});
				pick_ship_pick_order(this.filterRequest(this.requestData)).then(res => {
					if (res.code === 200) {
						getApp().globalData.request = { ...getApp().globalData.request,
							...res.data
						}
					} else {
						uni.showToast({
							title: res.detail || res.message || 'fail request! please check!',
							mask: true,
							duration: 2000,
							icon: 'none',
							position: 'top'
						});
					}
					uni.hideLoading();
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
						if (res.data.step != 1) {
							getApp().globalData.request = { ...getApp().globalData.request,
								...res.data
							}
						} else {
							const type = getApp().globalData.request.type
							getApp().globalData.request = {
								type
							}
						}
						uni.showToast({
							title: '拣选成功',
							mask: true,
							duration: 2000,
							icon: 'none',
							position: 'top'
						});
						uni.redirectTo({
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

<style scoped lang="scss">
	.pick_num {
		border: 1rpx solid #ccc;
		padding: 15rpx 20rpx;
		width: 40vw;
		font-size: 30rpx;
	}
</style>
