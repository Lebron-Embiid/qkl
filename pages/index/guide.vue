<template>
	<view class="guide">
		<swiper class="swiper"
		:autoplay="autoplay" 
		:indicator-dots="indicator" 
		indicator-color="rgba(204, 204, 204, 1)"
		indicator-active-color="rgba(204, 204, 204, .5)"
		:duration="duration">
			<swiper-item v-for="(item,index) in guideList" :key="index">
				<view class="swiper-item">
					<view class="guide_title">{{item.title}}</view>
					<view class="guide_child_title">{{item.two_title}}</view>
					<image :src="item.logo" mode="widthFix"></image>
					<view class="guide_info">{{item.info}}</view>
					<button v-if="item.is_last == 1" type="primary" @tap="launchFlag()" size="mini">{{experience}}</button>
				</view>
				<!-- <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view> -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				indicator: true,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验',
				guideList: [
					{
						title: '引导页标题文案',
						two_title: '引导页二级文案内容',
						logo: '/static/logo1.png',
						info: 'SOLOMON MATRIX',
						is_last: 0
					},{
						title: '引导页标题文案',
						two_title: '引导页二级文案内容',
						logo: '/static/logo1.png',
						info: 'SOLOMON MATRIX',
						is_last: 0
					},{
						title: '引导页标题文案',
						two_title: '引导页二级文案内容',
						logo: '/static/logo1.png',
						info: 'SOLOMON MATRIX',
						is_last: 0
					},{
						title: '引导页标题文案',
						two_title: '引导页二级文案内容',
						logo: '/static/logo1.png',
						info: 'SOLOMON MATRIX',
						is_last: 1
					}
				]
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
					key: 'launchFlag',
					data: true,
				});
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 100vh;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		padding: 15vh 0 0;
		image{
			display: block;
			width: 190rpx;
			height: 190rpx;
			margin: 50rpx auto 20rpx;
		}
		.guide_title{
			width: 100%;
			color: #999;
			font-size: 44rpx;
			font-weight: 700;
			margin: 0 0 20rpx;
		}
		.guide_child_title{
			width: 100%;
			color: #999;
			font-size: 40rpx;
		}
		.guide_info{
			color: #666;
			font-size: 28rpx;
			font-weight: 700;
		}
		button{
			width: 360rpx;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 32rpx;
			background: rgba(0, 153, 153, 1);
			border-radius: 6rpx;
			margin-top: 200rpx;
			&:after{
				border: 0;
			}
			&:hover{
				background: rgba(0, 153, 153, .8);
			}
			&:active{
				background: rgba(22, 160, 133, 1);
			}
		}
	}
	/deep/ uni-swiper .uni-swiper-dots-horizontal{
		bottom: 10vh;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 40rpx;
		border-radius: 30rpx;
		font-size: 32rpx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
	}
	.jump-over{
		right: 45rpx;
		top: 125rpx;
	}
	.experience{
		right: 50%;
		margin-right: -105rpx;
		bottom: 0;
	}
</style>
