<template>
	<view class="recommendMember">
		<uni-nav-bar left-icon="back" leftText="返回" title="推荐会员" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
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
	import {Model} from '@/common/model.js'
	import downloader from '@/js_sdk/img-downloader/img-downloader.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '',
				link: '',
				code_img: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		onLoad() {
			this.$http.shareCode().then((data)=>{
				this.code_img = this.$http.url+data.data.img_url;
				this.link = data.data.code;
			})
		},
		onShow(){
			this.avatar = getApp().globalData.avatar;
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
		},
		methods:{
			copyLink(){
				let that = this;
				// #ifndef H5
				uni.setClipboardData({
				    data: that.link,
				    success: function () {
				        console.log('success');
						that.$api.msg('复制成功，快去粘贴吧！');
				    }
				});
				uni.getClipboardData({
				    success: function (res) {
				        console.log(res.data);
				    }
				});
				// #endif
				// #ifdef H5
				uni.setClipboardData({ data:that.link, success:function(data){
						that.$api.msg('复制成功，快去粘贴吧！');
					}
				})
				// #endif
			},
			savaCode(){
				let that = this;
				// #ifndef H5
				uni.showLoading({
					title: '保存中'
				})
				uni.saveImageToPhotosAlbum({
					filePath: that.code_img,
					success: function () { 
						uni.hideLoading();
						that.$api.msg('保存成功');
					},
				})
				// #endif
				
				// #ifdef H5
				let promise = downloader.load(that.code_img, 'my_code'); //下载
				
				promise.then(([err, res])=>{
				    console.log(err, res);			// err 和 res 只会有一个存在，另一个为null
					if(res.statusCode == 200){
						that.$api.msg('保存成功');
					}
				});
				// #endif
				// uni.downloadFile({
				// 	url: that.code_img,
				// 	success: (ress) => {
				// 		if (ress.statusCode === 200) {
				// 			console.log(ress.tempFilePath);
				// 			uni.saveImageToPhotosAlbum({
				// 				filePath: ress.tempFilePath,
				// 				success: function () { 
				// 					uni.hideLoading();
				// 					that.$api.msg('保存成功');
				// 				},
				// 			})
				// 		}
				// 	},
				// 	fail() {
				// 		uni.hideLoading();
				// 		that.$api.msg('保存失败');
				// 	}
				// });
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
			color: #fff;
			transition: all .5s ease;
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
