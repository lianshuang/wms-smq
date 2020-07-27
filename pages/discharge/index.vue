<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		created() {
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(() => {
				uni.hideLoading();
				const step = 1
				const url = this.getStepRouter(step)
				
			}, 2000);
		},
		methods: {

		}
	}
</script>

<style>
</style>
