<template>
	<view class="recommendMember">
		<uni-nav-bar left-icon="back" leftText="返回" title="推荐会员" :backgroundColor="background" :color="color" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="recommend_box">
			<text class="collect_txt">推荐人邀请码：{{link}}</text>
			<button type="primary" @tap="copyLink">复制推荐地址</button>
			<image :src="code_img" mode="widthFix"></image>
			<text>邀请好友扫码注册</text>
			<button type="primary" class="save_btn" @tap="savaCode">保存二维码</button>
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
				link: 'YdhkSnm',
				code_img: '/static/code.png'
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
			},
			savaCode(){
				let that = this;
				uni.showLoading({
					title: '保存中'
				})
				uni.downloadFile({
					url: that.code_img,
					success: (ress) => {
						if (ress.statusCode === 200) {
							console.log(ress.tempFilePath);
							uni.saveImageToPhotosAlbum({
								filePath: ress.tempFilePath,
								success: function () { 
									uni.hideLoading();
									uni.showToast({
										title: '下载成功',
										icon: 'none',
										duration: 1500
									})
								},
							})
						}
					},
					fail() {
						uni.hideLoading();
						uni.showToast({
							title: '下载失败！',
							icon: 'none',
							duration: 1500
						})
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.recommend_box{
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
			&.save_btn{
				background: #333;
				margin-top: 50rpx;
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
