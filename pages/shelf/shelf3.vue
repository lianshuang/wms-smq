<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="上架" @clickLeft="backToIndex()">
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
				<view>入库订单号：{{requestData.master_order_num}}</view>
				<view>SKU NO.：{{requestData.sku_code}}</view>
			</view>
			<view class="scanner">
				<view class="scanner-title">输入当前SKU上架数量</view>
				<input class="scanner-input" type="number" focus placeholder="请输入上架数量" @confirm="nextStep()" v-model.number="formData.pieces" />
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
					pieces: null
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
					if (!this.formData.pieces) {
						uni.showToast({
							title: '请输入确保输入上架数量',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					} else if (this.formData.width < 0) {
						uni.showToast({
							title: '请正确输入上架数量',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					} else {
						resolve(true)
					}

				})
			},
			// 返回
			back() {
				uni.redirectTo({
					url: this.getRoutePath().lastPath
				})
			},
			// 获取数字得正负百分之50数组
			getNum50Range(num, percentage = 50) {
				const diff = Number((num * 0.5).toFixed(3))
				return [num - diff, num + diff]
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

<style>
</style>
