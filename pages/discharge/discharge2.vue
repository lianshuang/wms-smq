<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="卸货" @clickLeft="backToIndex()">
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
				<text>入库订单号：{{requestData.master_order_num}}</text>
			</view>
			<view class="scanner">
				<text class="scanner-label">输入箱数：</text>
				<input class="scanner-input" type="text" placeholder="请输入箱数" @confirm="nextStep()" v-model="formData.boxes" />
			</view>
			<!-- 底部显示栏 -->
			<view class="bottom-info">
				<text>扫描箱记录</text>
				<view class="list-table">
					<table>
						<tr v-for="item in requestData.record" :key="item.id">
							<td>{{item.boxes}}箱</td>
							<td>{{parseTime(item.start_date)}}</td>
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
			// backToIndex(){
			// 	uni.showModal({
			// 	    title: '提示',
			// 	    content: '退出操作返回主页？',
			// 	    success: function (res) {
			// 	        if (res.confirm) {
			// 	            uni.redirectTo({
			// 	            	url: '../index/index'
			// 	            });
			// 	        } else if (res.cancel) {
			// 	            console.log('用户点击取消');
			// 	        }
			// 	    }
			// 	});
			// },
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
							title: '卸货成功',
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
