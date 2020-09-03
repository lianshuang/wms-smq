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
				<view>Pallet ID：{{requestData.pallet_id}}</view>
			</view>
			<view class="scanner">
				<view class="scanner-title">扫描SKU或分拣箱条码</view>
				<input class="scanner-input uni-input" cursor-spacing="10" placeholder="请扫描SKU条码" focus @confirm="nextStep()" v-model="formData.sku_code" />
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
					sku_code: null,
					piece: 1
				},
				// 初始反写信息
				initData: {},
				comfirm: false,
				option: {},
				loading: false,
				// 内网ip
				intranet: ''
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
			get_intranet().then(res => {
				console.log(res);
				if (res.code === 200) {
					this.intranet = res.data[0].value
				} else {
					console.log('获取不到内网ip，请重试！');
				}
			})
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
					if (!this.formData.sku_code) {
						uni.showToast({
							title: '请扫描SKU条码',
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
				uni.showModal({
					title: '提示',
					content: `确定退出(${getApp().globalData.request.master_order_num})的打包？`,
					success: function(res) {
						if (res.confirm) {
							const {
								type
							} = getApp().globalData.request
							getApp().globalData.request = {
								type
							}
							uni.redirectTo({
								url: './bale'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
						// 获取面单base64数据
						const PrinterName = 'Generic 26C-7SeriesPCL'
						const labelContent = res.data.label_base64
						this.$axios.post(this.intranet + ':8001', Qs.stringify({
							action: 'doPrint',
							printerName: PrinterName,
							print_too: 'sumatrapdf',
							printQty: 1,
							label: labelContent,
							type: 'pdf'
						})).then((res) => {
							if (res.data.status === 1) {
								this.$message.success('打印成功')
							} else {
								this.$message.error('打印失败')
							}
						}).catch(() => {
							this.$message.error('打印失败')
						})
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
							title: '打包成功',
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
						this.formData.sku_code = ''
					}
				})
			},
		}
	}
</script>

<style>
</style>
