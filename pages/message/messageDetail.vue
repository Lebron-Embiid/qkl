<template>
	<view class="messageDetail">
		 <!-- :rightDot="dot" :rightIcon="rightIcon" -->
		<uni-nav-bar left-icon="back" leftText="返回" :title="title"></uni-nav-bar>
		<view class="message_detail_box">
			<!-- <image src="" mode=""></image> -->
			<view class="content_box">
				<view class="message_title">发表于 {{time}}</view>
				<view class="message_content">
					<block v-if="content!=''">
						<u-parse :content="content"></u-parse>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uParse from '@/components/u-parse/u-parse.vue'
	import util from '@/common/util.js'
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				id: '',
				title: '',
				time: '',
				content: ''
			}
		},
		components:{
			uniNavBar,
			uParse
		},
		methods:{
			
		},
		onLoad(opt) {
			console.log(opt);
			if(opt.id!=undefined){
				this.id = opt.id;
			}
			uni.showLoading({
				title: '加载中'
			})
			this.$http.getNewsDetail({
				id: this.id
			}).then((data)=>{
				console.log(data.data);
				this.title = data.data.title;
				this.content = data.data.content;
				this.time = util.formatDate(data.data.create_time);
				uni.hideLoading();
			})
		},
		onShow() {
			
		}
	}
</script>

<style scoped lang="scss">
	@import url("../../components/u-parse/u-parse.css");
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
