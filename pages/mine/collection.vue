<template>
	<view class="collection">
		<uni-nav-bar left-icon="back" leftText="返回" title="收款凭证" :backgroundColor="background" :color="color" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="collect_box">
			<text class="collect_txt">{{link}}</text>
			<button type="primary" @tap="copyLink">复制钱包地址</button>
			<image src="/static/code.png" mode="widthFix"></image>
			<text>扫码收钱</text>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				color: '#333',
				background: '#fff',
				link: 'AdDyRahRz5vmvgy0Uik6fjgQfSeB126TTA'
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		methods:{
			copyLink(){
				uni.setClipboardData({
				    data: this.link,
				    success: function () {
				        console.log('success');
				    }
				});
				uni.getClipboardData({
				    success: function (res) {
				        console.log(res.data);
				    }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.collect_box{
		padding: 40rpx;
		box-sizing: border-box;
		color: #999;
		font-size: 28rpx;
		text-align: center;
		.collect_txt{
			color: #099;
		}
		button{
			width: 80%;
			height: 68rpx;
			line-height: 68rpx;
			font-size: 26rpx;
			background: #099;
			border-radius: 10rpx;
			margin: 20rpx auto 30rpx;
			&:after{
				border: 0;
			}
		}
		image{
			display: block;
			width: 392rpx;
			height: 392rpx;
			margin: 0 auto 20rpx;
		}
	}
</style>
