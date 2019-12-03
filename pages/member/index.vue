<template>
	<view class="member">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->  
		<view class="member_top">
			<view>
				<image :src="logoSrc" mode="widthFix"></image>
				<text>{{app_name}}</text>
			</view>
			<button type="primary" @tap="toShop">商城</button>
		</view>
		<view class="member_info_box">
			<image src="/static/avatar.png" mode="widthFix" class="avatar_img"></image>
			<view class="member_name">Mr.Maker</view>
			<view class="member_list">
				<view class="member_item" @tap="toListLink(index)" v-for="(item,index) in memberList" :key="index">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="right_area">
						<view class="member_txt">{{item.title}}：</view>
						<view class="member_money">{{index!=3?'$':''}} {{item.value}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ad_box">
			<view class="ad_title">平台公告：</view>
			<view class="ad_content">欢迎使用 <text>{{app_name}}</text> ，平台将在近期推出全新理财产品，敬请期待！谢谢。</view>
		</view>
		<view class="other_box">
			<view class="other_item" v-for="(item,index) in otherList" @tap="toOtherLink(index)" :key="index">
				<view class="other_img"><image :src="item.icon" mode="widthFix"></image></view>
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				logoSrc: '/static/logo1.png',
				app_name: 'SOLOMON MATRIX',
				memberList: [
					{
						icon: '/static/member_icon1.png',
						title: '投资钱包',
						url: '/pages/mine/investWallet',
						value: '600000'
					},{
						icon: '/static/member_icon2.png',
						title: 'APP钱包',
						url: '/pages/mine/wallet',
						value: '16000000'
					},{
						icon: '/static/member_icon3.png',
						title: '分红总额',
						url: '/pages/mine/dividend',
						value: '800000'
					},{
						icon: '/static/member_icon4.png',
						title: '会员人数',
						url: '/pages/member/myMember',
						value: '2000'
					}
				],
				otherList: [
					{
						icon: '/static/member_icon5.png',
						text: '加额'
					},{
						icon: '/static/member_icon6.png',
						text: '提款'
					},{
						icon: '/static/member_icon7.png',
						text: '转款'
					},{
						icon: '/static/member_icon8.png',
						text: '推荐'
					}
				]
			}
		},
		onLoad() {
			console.log(getApp().globalData.is_login);
		},
		onShow() {
			
		},
		methods:{
			toListLink(idx){
				if(idx == 3){
					uni.switchTab({
						url: this.memberList[idx].url
					})
					return;
				}
				uni.navigateTo({
					url: this.memberList[idx].url
				})
			},
			toOtherLink(idx){
				console.log(idx);
				if(idx == 0){
					uni.navigateTo({
						url: '/pages/member/increase'
					})
				}
				if(idx == 1){
					uni.navigateTo({
						url: '/pages/member/withdraw'
					})
				}
				if(idx == 2){
					uni.navigateTo({
						url: '/pages/member/transfer'
					})
				}
				if(idx == 3){
					uni.navigateTo({
						url: '/pages/member/recommendMember'
					})
				}
			},
			toShop(){
				uni.navigateTo({
					url: '/pages/index/shop'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.member_top{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 10rpx 20rpx 10rpx 30rpx;
		box-sizing: border-box;
		view{
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			image{
				display: block;
				width: 70rpx;
				height: 70rpx;
				margin-right: 20rpx;
			}
			text{
				color: #099;
				font-size: 28rpx;
				font-weight: bold;;
			}
		}
		button{
			margin: 0;
			border-radius: 10rpx;
			width: 188rpx;
			height: 54rpx;
			font-size: 26rpx;
			line-height: 54rpx;
			background: #099;
			color: #fff;
			transition: all .5s ease;
			&:active{
				opacity: .8;
			}
			&:after{
				border: 0;
			}
		}
	}
	.member_info_box{
		background: #000;
		padding: 50rpx 10rpx 10rpx;
		box-sizing: border-box;
		.avatar_img{
			display: block;
			width: 138rpx;
			height: 138rpx;
			border-radius: 50%;
			margin: 0 auto 20rpx;
		}
		.member_name{
			color: #ccc;
			font-size: 24rpx;
			text-align: center;
			margin-bottom: 20rpx;
		}
		.member_list{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			.member_item{
				width: 50%;
				background: #666;
				margin-bottom: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20rpx 0;
				box-sizing: border-box;
				color: #fff;
				font-size: 28rpx;
				&:nth-child(2n){
					background: #333;
				}
				image{
					display: block;
					width: 78rpx;
					height: 64rpx;
					margin-right: 30rpx;
				}
				.member_txt{
					margin-bottom: 10rpx;
				}
			}
		}
	}
	.ad_box{
		padding: 20rpx;
		box-sizing: border-box;
		color: #999;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		.ad_title{
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		.ad_content{
			border-bottom: 1px solid #ccc;
			padding-bottom: 20rpx;
			text-indent: 2em;
			text{
				color: #099;
			}
		}
	}
	.other_box{
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.other_item{
			text-align: center;
			width: 134rpx;
			height: 134rpx;
			.other_img{
				width: 134rpx;
				height: 134rpx;
				border-radius: 50%;
				background: #099;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					display: block;
					width: 72rpx;
					height: 72rpx;
				}
			}
			&:nth-child(2){
				.other_img{
					image{
						width: 46rpx;
						height: 88rpx;
					}
				}
			}
			&:nth-child(3){
				.other_img{
					image{
						width: 92rpx;
						height: 54rpx;
					}
				}
			}
			text{
				color: #666;
				font-size: 28rpx;
			}
		}
	}
</style>
