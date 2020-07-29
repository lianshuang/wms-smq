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
			<!-- 顶部显示栏 -->
			<view class="top-info">
				<text>入库订单号：{{option.order_num}}</text>
			</view>
			<view class="scanner">
				<text class="scanner-label">输入箱数：</text>
				<input class="scanner-input" type="text" placeholder="请扫描入库单号" @confirm="nextStep()" v-model="formData.boxes" />
			</view>
			<!-- 底部显示栏 -->
			<view class="bottom-info">
				<text>扫描箱记录</text>
				<view class="list-table">
					<table>
						<!-- 表头 -->
						<!-- <tr>
							<th>Month</th>
							<th>Savings</th>
						</tr> -->
						<!-- 数据部分 -->
						<tr>
							<td>30箱</td>
							<td>2020-03-12 08:23:23</td>
						</tr>
					</table>
				</view>
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
					boxes: ''
				},
				option: {},
				loading: false
			}
		},
		computed: {
			// 获取页面路由信息
			// getRoutePath() {
			// 	const path = getCurrentPages()[getCurrentPages().length - 1]['$route']['path']
			// 	const step = Number(path.slice(-1))
			// 	const basicPath = './' + path.split('/')[3].slice(0, -1)
			// 	const lastPath = step - 1 === 0 ?
			// 		'../index/index' : './' + basicPath + (step - 1 - 1)
			// 	const nextPath = './' + path.split('/')[3].slice(0, -1) + (step + 1)
			// 	return {
			// 		step,
			// 		path,
			// 		lastPath,
			// 		nextPath,
			// 		basicPath
			// 	}
			// },
			// 获取当前步骤需要提交的表单信息
			requestData() {
				return { ...this.formData,
					step: this.getRoutePath().step
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
					if (!this.formData.boxes) {
						uni.showToast({
							title: '请输入箱数',
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
				nextStep(this.requestData).then(res => {
					console.log(res);
					if (res.code === 200) {
						uni.navigateTo({
							url: this.getRoutePath.basicPath + res.data.step
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
