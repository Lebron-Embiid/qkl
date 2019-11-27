<template>
	<view class="commonAvatar">
		<view class="mine_top">
			<image src="/static/avatar.png" class="avatar_img" mode="widthFix"></image>
			<text>Mr.Maker</text>
			<image src="/static/left_bg.png" class="bg left_bg" mode="widthFix"></image>
			<image src="/static/right_bg.png" class="bg right_bg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'commonAvatar',
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine_top{
		position: relative;
		padding: 50rpx 0 20rpx;
		background: #000;
		box-sizing: border-box;
		text-align: center;
		color: #ccc;
		font-size: 24rpx;
		.avatar_img{
			display: block;
			width: 138rpx;
			height: 138rpx;
			margin: 0 auto 20rpx;
		}
		.bg{
			position: absolute;
			display: block;
			width: 94rpx;
			height: 100% !important;
			top: 0;
		}
		.left_bg{
			left: 0;
		}
		.right_bg{
			right: 0;
		}
	}
</style>
