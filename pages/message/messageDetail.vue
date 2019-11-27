<template>
	<view class="messageDetail">
		<uni-nav-bar left-icon="back" leftText="返回" :title="title" :backgroundColor="background" :color="color" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<view class="message_detail_box">
			<image src="" mode=""></image>
			<view class="content_box">
				<view class="message_title">发表于 {{time}}</view>
				<view class="message_content">{{content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				color: '#333',
				background: '#fff',
				title: '',
				time: '2019/11/25',
				content: ''
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			
		},
		onLoad(opt) {
			console.log(opt);
			this.title = opt.title;
			this.content = opt.content;
		}
	}
</script>

<style scoped lang="scss">
	.message_detail_box{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		image{
			display: block;
			width: 100%;
			height: 360rpx;
			margin-bottom: 20rpx;
			background: #ccc;
		}
		.content_box{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			color: #666;
			font-size: 26rpx;
			.message_title{
				color: #999;
				margin-bottom: 10rpx;
			}
		}
	}
</style>
