<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="收货" @clickLeft="backToIndex()">
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
				<view class="scanner-title">当前SKU包装信息</view>
				<text class="scanner-label">长度(CM)：</text>
				<input class="scanner-input uni-input" cursor-spacing="10" type="number" focus placeholder="请输入长度" @confirm="nextStep()" v-model.number="formData.length" />
				<text class="scanner-label">宽度(CM)：</text>
				<input class="scanner-input uni-input" cursor-spacing="10" type="number" placeholder="请输入宽度" @confirm="nextStep()" v-model.number="formData.width" />
				<text class="scanner-label">高度(CM)：</text>
				<input class="scanner-input uni-input" cursor-spacing="10" type="number" placeholder="请输入高度" @confirm="nextStep()" v-model.number="formData.height" />
				<text class="scanner-label">毛重(KG)：</text>
				<input class="scanner-input uni-input" cursor-spacing="10" type="number" placeholder="请输入毛重" @confirm="nextStep()" v-model.number="formData.weight" />
				<text class="scanner-label">当前SKU同数量：</text>
				<input class="scanner-input uni-input" cursor-spacing="10" type="number" placeholder="请输入数量" @confirm="nextStep()" v-model.number="formData.pieces" />
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
					width: null,
					length: null,
					height: null,
					weight: null,
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
					console.log(this.formData.width);
					if (!this.formData.width || !this.formData.length || !this.formData.height || !this.formData.weight || !this.formData
						.pieces) {
						uni.showToast({
							title: '请输入确保输入长、宽、高、毛重、数量',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					} else if (this.formData.width < 0 || this.formData.length < 0 || this.formData.height < 0 || this.formData.weight <
						0 || this.formData.pieces < 0) {
						uni.showToast({
							title: '请正确输入长、宽、高、毛重、数量',
							icon: 'none',
							mask: true,
							duration: 2000
						});
						resolve(false)
					} else if (this.comfirm) {
						// 正负百分之50提醒校验
						let str = '您填写的'
						let flag = true
						if (this.formData.length <= this.getNum50Range(this.initData.length)[0] || this.formData.length >= this.getNum50Range(
								this.initData.length)[1]) {
							flag = false
							str += `长度:(${this.formData.length})与预计长度:(${this.initData.length})`
						}
						if (this.formData.width <= this.getNum50Range(this.initData.width)[0] || this.formData.width >= this.getNum50Range(
								this.initData.width)[1]) {
							flag = false
							str += `、宽度:${this.formData.width}与预计宽度:${this.initData.width}`
						}
						if (this.formData.height <= this.getNum50Range(this.initData.height)[0] || this.formData.height >= this.getNum50Range(
								this.initData.height)[1]) {
							flag = false
							str += `、高度:${this.formData.height}与预计高度:${this.initData.height}`
						}
						if (this.formData.weight <= this.getNum50Range(this.initData.weight)[0] || this.formData.weight >= this.getNum50Range(
								this.initData.weight)[1]) {
							flag = false
							str += `、重量:${this.formData.weight}与预计重量:${this.initData.weight}`
						}
						console.log(flag);
						if (!flag) {
							str += '偏差超过正负50%，确定继续当前操作？'
							uni.showModal({
								title: '提示',
								content: str,
								success: function(res) {
									if (res.confirm) {
										resolve(true)
									} else if (res.cancel) {
										console.log('用户点击取消');
										resolve(false)
									}
								}
							});
						} else {
							resolve(true)
						}
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
						uni.showToast({
							title: '收货成功',
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

<style>
</style>
