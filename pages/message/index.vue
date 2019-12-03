<template>
	<view class="message">
		<uni-nav-bar title="讯息" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<view class="message_box">
			<view class="message_item" v-for="(item,index) in messageList" :key="index">
				<view class="message_top">{{item.title}}</view>
				<view class="message_center">{{item.content}}</view>
				<view class="message_bottom"><text @tap="toDetail(index,item.title,item.content)">查看详情</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				messageList: [
					{
						title: '讯息标题1',
						content: '这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。'
					},{
						title: '讯息标题1',
						content: '这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。'
					},{
						title: '讯息标题1',
						content: '这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。'
					},{
						title: '讯息标题1',
						content: '这是一个用纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素。'
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			toDetail(idx,title,content){
				uni.navigateTo({
					url: '/pages/message/messageDetail?id=' + idx+'&title='+ title+'&content='+ content
				})
			}
		},
		onShow() {
			uni.hideTabBarRedDot({
				index: 2
			})
		}
	}
</script>

<style scoped lang="scss">
	.message_box{
		padding: 20rpx 40rpx;
		.message_item{
			border: 1px solid #f2f2f2;
			box-sizing: border-box;
			color: #333;
			font-size: 26rpx;
			margin-bottom: 20rpx;
			.message_top{
				border-bottom: 1px solid #f2f2f2;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				font-weight: bold;
			}
			.message_center{
				color: #999;
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #f2f2f2;
			}
			.message_bottom{
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				text-align: right;
				text{
					color: #666;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
