<template>
	<view class="message">
		<uni-nav-bar title="讯息" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<view class="message_box">
			<view class="message_item" :class="[item.is_read == 1?'':'dot']" v-for="(item,index) in messageList" :key="index">
				<view class="message_top">{{item.title}}</view>
				<view class="message_center">
					{{item.desc}}
					<!-- <block v-if="item.content!=''">
						<u-parse :content="item.content"></u-parse>
					</block> -->
				</view>
				<view class="message_bottom"><text @tap="toDetail(item.id)">查看详情</text></view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uParse from '@/components/u-parse/u-parse.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				messageList: [],
				page: 1,
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uParse,
			uniLoadMore
		},
		methods:{
			toDetail(id){
				uni.navigateTo({
					url: '/pages/message/messageDetail?id=' + id
				})
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('token'));
		},
		onShow() {
			if(uni.getStorageSync('token') == ''){
				this.$api.msg('请登录');
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/login/login'
					})
				},1500)
			}
			this.$http.getNewsList().then((data)=>{
				this.messageList = data.data;
				if(this.messageList.length < 10){
					this.loadingType = 'noMore';
				}
			})
			this.$http.getRead().then((data)=>{
				if(data.data.is_read == 1){
					uni.hideTabBarRedDot({
						index: 2
					})
				}
			})
		},
		onPullDownRefresh() {
			this.$http.getNewsList().then((data)=>{
				this.messageList = data.data;
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom() {
			this.page++;
			this.$http.getNewsList({
				limit: 10,
				page: this.page
			}).then((data)=>{
				this.loadingType = "loading";
				if(data.data.length == 0){
					this.loadingType = 'noMore';
				}
				this.messageList = this.messageList.concat(data.data);
			})
		}
	}
</script>

<style scoped lang="scss">
	.message_box{
		padding: 40rpx;
		.message_item{
			border: 1px solid #f2f2f2;
			box-sizing: border-box;
			color: #333;
			font-size: 26rpx;
			margin-bottom: 30rpx;
			position: relative;
			&.dot:after{
				content: "";
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background-color: #f00;
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				z-index: 1;
			}
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
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
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
