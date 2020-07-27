<template>
	<view class="step">
		<uni-nav-bar :shadow='false' title="卸货">
			<view slot="right">
				<text>{{$username}}</text>
				<!-- <i class="iconfont icontuichu logout"/> -->
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	export default{
		data(){
			return {}
		},
		created(){
			console.log(getCurrentPages()[0]);
		}
	}
</script>

<style>
</style>
