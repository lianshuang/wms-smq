<template>
	<view>
		登录
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		methods: {
			login() {
				uni.setStorageSync('Token', 'dfsa6d5ad4fdffs6d5fa6ds');
			}
		}
	}
</script>

<style>
</style>
