<template>
	<view class="collection">
		<uni-nav-bar left-icon="back" leftText="返回" title="收款凭证" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="collect_box">
			<text class="collect_txt">{{link}}</text>
			<button type="primary" @tap="copyLink">复制钱包地址</button>
			<image :src="code_img" mode="widthFix"></image>
			<text>扫码收钱</text>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '/static/avatar.png',
				link: '',
				code_img: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		onShow(){
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
			this.$http.transferWalletCode().then((data)=>{
				this.code_img = this.$http.url+data.data.img_code;
				this.link = data.data.address;
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
			color: #fff;
			transition: all .5s ease;
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
