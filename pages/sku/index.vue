<template>
	<view>
		<!-- 顶部栏 -->
		<view class="step">
			<uni-nav-bar :shadow='false' title="查询sku库存" @clickLeft="backToIndex()">
				<view slot="left">
					<i class="iconfont iconfanhui1 icon-left" />
				</view>
				<view slot="right"> <text>{{$username}}</text> </view>
			</uni-nav-bar>
		</view>
		<!-- 操作栏 -->
		<view class="operation">
			<view class="scanner">
				<view class="scanner-label">扫描入或输入SKU：</view>
				<input class="scanner-input" type="text" placeholder="请扫描入或输入SKU" @confirm="nextStep()" v-model="formData.sku_code" />
			</view>
			<!-- 底部显示栏 -->
			<view class="bottom-info">
				<view>SKU NO.：{{formData.sku_code}}</view>
				<view>商品名称：{{formData.sku_name}}</view>
				<view class="list-table">
					<table>
						<th>
						<td>库位</td>
						<td>数量</td>
						</th>
						<template v-if="formData.record.length===0">
							<tr>
								暂无数据
							</tr>
						</template>
						<template v-else>
							<tr v-for="item in formData.record" :key="item.id">
								<td>{{item.position_num}}</td>
								<td>{{item.inventory_in_hand}}</td>
							</tr>
						</template>

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
		sku_search
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {
				formData: {
					sku_code: '',
					sku_name: '',
					record: []
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
		watch: {
			'formData.sku_code': {
				handler(n, o) {
					this.formData.sku_name = ''
					this.formData.record = []
				},
				deep: true
			}
		},
		methods: {
			// 校验
			validateForm() {
				return new Promise((resolve, reject) => {
					if (!this.formData.sku_code) {
						uni.showToast({
							title: '请扫描或输入SKU NO.',
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
					url: '../index/index'
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
				sku_search(this.filterRequest(this.requestData)).then(res => {
					console.log(res);
					if (res.code === 200) {
						getApp().globalData.request = { ...getApp().globalData.request,
							...res.data
						}
						this.formData.sku_name = res.data.sku_name
						this.formData.record = res.data.record
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
