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
				<view v-if="requestData.book_inventory">账面数量：{{requestData.book_inventory}}</view>
			</view>
			<view class="scanner">
				<view class="scanner-title">输入当前SKU盘点数量</view>
				<input class="scanner-input" placeholder="请输入当前SKU盘点数量" focus @confirm="nextStep()" v-model="formData.check_inventory" />
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
	const Qs = require('qs')
	import {
		nextStep,
		printer,
		get_intranet
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {
				formData: {
					check_inventory: null
				},
				// 初始反写信息
				initData: {},
				comfirm: false,
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
		created() {
			const t = getApp().globalData.request
			Object.keys(t).forEach(i => {
				if (i.startsWith('$')) {
					this.initData[i.slice(1)] = t[i]
					this.formData[i.slice(1)] = t[i]
					this.comfirm = true
				}
			})
		},
		methods: {
			// 校验
			validateForm() {
				return new Promise((resolve, reject) => {
					console.log(this.formData.width);
					if (!this.formData.check_inventory) {
						uni.showToast({
							title: '请输入盘点数量',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					} else if (Number(this.formData.check_inventory) < 0) {
						uni.showToast({
							title: '盘点数量不能小于0',
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
						if (res.data.step != 1) {
							getApp().globalData.request = { ...getApp().globalData.request,
								...res.data
							}
						} else {
							const type = getApp().globalData.request.type
							getApp().globalData.request = {
								type,
								master_order_num: res.data.master_order_num
							}
						}
						uni.showToast({
							title: '盘点成功',
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
						this.formData.check_inventory = ''
					}
				})
			},
		}
	}
</script>

<style>
</style>
