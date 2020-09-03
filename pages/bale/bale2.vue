<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="打包" @clickLeft="backToIndex()">
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
				<view>出库单数量(PCS)：{{requestData.expected_pick || '*'}} | {{requestData.actual_pick || '*'}}</view>
			</view>
			<view class="scanner">
				<text class="scanner-label">扫描Pallet ID：</text>
				<input class="scanner-input uni-input" cursor-spacing="10" type="text" placeholder="扫描Pallet ID" focus @confirm="nextStep()" v-model="formData.pallet_id" />
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
					pallet_id: ''
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
					if (!this.formData.pallet_id) {
						uni.showToast({
							title: '请扫描pallet_id',
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
				// 此步骤直接跳转至第三步带上pallet_id
				getApp().globalData.request = {
					...getApp().globalData.request,
					...this.formData
				}
				uni.redirectTo({
					url: this.getRoutePath().basicPath + 3
				})
			},
		}
	}
</script>

<style>
</style>
