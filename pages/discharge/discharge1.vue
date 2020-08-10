<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="卸货" @clickLeft="backToIndex()">
				<view slot="left">
					<i class="iconfont iconfanhui1 icon-left" />
				</view>
				<view slot="right"> <text>{{$username}}</text> </view>
			</uni-nav-bar>
		</view>
		<!-- 操作栏 -->
		<view class="operation">
			<view class="scanner">
				<view class="scanner-label">扫描入库单号：</view>
				<input class="scanner-input" type="text" placeholder="请扫描入库单号" @confirm="nextStep()" v-model="formData.master_order_num" />
			</view>
			<!-- 底栏操作按钮 -->
			<view class="bottom-btn">
				<button class="left" type="primary" @click="back()" :loading="false">完成</button>
				<button class="right" type="primary" @click="nextStep()" :loading="false">下一步</button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		nextStep,
		finish_task
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {
				formData: {
					master_order_num: ''
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
			console.log(option);
			this.option = option
		},
		methods: {
			// 校验
			validateForm() {
				return new Promise((resolve, reject) => {
					if (!this.formData.master_order_num) {
						uni.showToast({
							title: '请扫描入库单号',
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
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确定强制结束所有卸货作业？',
					success: function(res) {
						if (res.confirm) {
							// 调用接口
							finish_task(_this.filterRequest(_this.requestData)).then(res => {
								console.log(res);
								if (res.code === 200) {
									uni.showToast({
										title: res.msg,
										duration: 2000,
										icon: 'none',
										mask: true,
										position: 'top',
										success: function() {
											setTimeout(() => {
												uni.redirectTo({
													url: '../index/index'
												});
											}, 1900)
										}
									});
								} else {
									uni.showToast({
										title: res.msg || res.message || 'fail request! please check!',
										mask: true,
										duration: 2000,
										icon: 'none',
										position: 'top'
									});
								}
							})

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style>
</style>
