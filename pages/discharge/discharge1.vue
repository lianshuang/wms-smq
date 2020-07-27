<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="卸货">
				<view slot="right"> <text>{{$username}}</text> </view>
			</uni-nav-bar>
		</view>
		<!-- 操作栏 -->
		<view class="operation">
			<view class="scanner">
				<text class="scanner-label">扫描入库单号：</text>
				<input class="scanner-input" type="text" placeholder="请扫描入库单号" @confirm="enterConfirm()" v-model="formData.order_num" />
			</view>
			<!-- 底栏操作按钮 -->
			<view class="bottom-btn">
				<button class="left" type="primary" @click="back()" :loading="false">返回</button>
				<button class="right" type="primary" @click="nextStep()" :loading="false">下一步</button>
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
					order_num: ''
				},
				loading: false
			}
		},
		computed: {
			getRoutePath() {
				const path = getCurrentPages()[getCurrentPages().length - 1]['$route']['path']
				const step = Number(path.slice(-1))
				const lastPath = step - 1 === 0 ?
					'../index/index' : './' + path.split('/')[3].slice(0, -1) + (step - 1 - 1)
				const nextPath = './' + path.split('/')[3].slice(0, -1) + (step + 1)
				return {
					path,
					lastPath,
					nextPath
				}
			}
		},
		methods: {
			// 校验
			validateForm() {
				return new Promise((resolve, reject) => {
					if (!this.formData.order_num) {
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
				uni.navigateTo({
					url: this.getRoutePath.lastPath
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
				console.log('通过');
				nextStep().then(res => {
					console.log(res);
				})
			},
		}
	}
</script>

<style>
</style>
