<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="上架" @clickLeft="backToIndex()">
				<view slot="left">
					<i class="iconfont iconfanhui1 icon-left"/>
				</view>
				<view slot="right"> <text>{{$username}}</text> </view>
			</uni-nav-bar>
		</view>

		<!-- 操作栏 -->
		<view class="operation">
			<!-- 顶部显示栏 -->
			<view class="top-info">
				<view>入库订单号：{{master_order_num}}</view>
			</view>
			<view class="scanner">
				<text class="scanner-label">扫描SKU NO.：</text>
				<input class="scanner-input" type="text" placeholder="扫描商品SKU NO." @confirm="nextStep()" v-model="formData.sku_code" />
			</view>
			<!-- 底部信息 -->
			<view class="bottom-info">
				<text>入库订单PCS: {{pre_carton}} | {{shelf_carton}}</text>
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
					sku_code: ''
				},
				option: {},
				loading: false,
				pre_carton: '',
				shelf_carton: '',
				master_order_num: ''
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
			this.master_order_num = getApp().globalData.request.master_order_num
			this.pre_carton = getApp().globalData.request.pre_carton
			this.shelf_carton = getApp().globalData.request.shelf_carton
		},
		methods: {
			// 校验
			validateForm() {
				return new Promise((resolve, reject) => {
					if (!this.formData.sku_code) {
						uni.showToast({
							title: '请扫描SKU NO.',
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
					if (res.code === 200) {
						if (res.data.step != 1) {
							getApp().globalData.request = { ...getApp().globalData.request,
								...res.data
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
