<template>
	<view></view>
</template>

<script>
	import {
		getStep
	} from '../../commom/js/api.js'
	export default {
		data() {
			return {}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.getStep(option.type)
		},
		created() {},
		methods: {
			getStep(type) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				getStep({
					type
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.getStepRouter(res.data.step)
						getApp().globalData.request = { ...getApp().globalData.request,
							...res.data.params
						}
					}
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style>
</style>
