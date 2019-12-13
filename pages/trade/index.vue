<template>
	<view class="trade">
		<uni-nav-bar title="交易订单" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="order_nav_box">
			<view class="order_nav_top">全部订单<text @tap="lookMore">查看全部订单</text></view>
			<view class="order_nav_list">
				<view class="order_nav_item" @tap="toOrderPage(index)" v-for="(item,index) in orderNavs" :key="index">
					<view class="icon_box"><image :src="item.icon" mode="widthFix"></image><text v-if="item.new_txt != 0">{{item.new_txt}}</text></view>
					<view>{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="nav_list_box">
			<view class="nav_list_item" @tap="toTapNav(index)" v-for="(item,index) in navList" :key="index">
				<view><image :src="item.icon" mode="widthFix"></image>{{item.title}}</view>
				<text>{{item.text}}</text>
			</view>
			<view class="nav_list_item border" @tap="logout">
				<view><image src="/static/nav_icon5.svg" mode="widthFix"></image>注销登录</view>
				<text></text>
			</view>
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
				avatar: '',
				orderNavs: [
					{
						icon: '/static/order_icon1.svg',
						title: '待付款',
						new_txt: 0
					},{
						icon: '/static/order_icon2.svg',
						title: '待发货',
						new_txt: 0
					},{
						icon: '/static/order_icon3.svg',
						title: '待收货',
						new_txt: 0
					},{
						icon: '/static/order_icon4.svg',
						title: '已完成',
						new_txt: 0
					}
				],
				navList: [
					// {
					// 	icon: '/static/nav_icon1.svg',
					// 	title: '商城收益',
					// 	text: '',
					// 	url: '/pages/index/shop'
					// },
					{
						icon: '/static/nav_icon2.svg',
						title: '收货地址',
						text: '添加/修改',
						url: '/pages/index/address'
					},{
						icon: '/static/nav_icon3.svg',
						title: '我的订单',
						text: '',
						url: '/pages/mine/myOrder'
					},{
						icon: '/static/nav_icon6.svg',
						title: '购物车',
						text: '',
						url: '/pages/index/cart'
					}
					// ,{
					// 	icon: '/static/nav_icon4.svg',
					// 	title: '认证中心',
					// 	text: '前往认证',
					// 	url: ''
					// }
				]
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		methods:{
			toOrderPage(idx){
				let index = idx+1;
				uni.navigateTo({
					url: '/pages/mine/myOrder?index=' + index
				})
			},
			toTapNav(idx){
				uni.navigateTo({
					url: this.navList[idx].url
				})
			},
			logout(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					success:function(res){
						if(res.confirm){
							that.$api.msg("退出成功");
							uni.removeStorageSync('token');
							// uni.clearStorageSync();
							// uni.removeStorageSync('sessionkey');
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/login/login'
								})
							},1500)
						}
					}
				})
			},
			lookMore(){
				uni.navigateTo({
					url: '/pages/mine/myOrder'
				})
			}
		},
		onLoad() {
			this.$http.getHeadImg().then((data)=>{
				this.avatar = data.data.img_url;
				getApp().globalData.avatar = data.data.img_url;
				if(data.data.img_url == 'toux-icon.png'){
					this.avatar = this.$http.url+'Public/home/wap/heads/default_avatar.svg';
					getApp().globalData.avatar = this.$http.url+'Public/home/wap/heads/default_avatar.svg';
				}
			})
		},
		onShow() {
			this.$http.getOrderList({
				page: 1,
				limit: 100,
				status: 0
			}).then((data)=>{
				this.orderNavs[0].new_txt = data.data.length;
			})
			this.$http.getOrderList({
				page: 1,
				limit: 100,
				status: 1
			}).then((data)=>{
				this.orderNavs[1].new_txt = data.data.length;
			})
			this.$http.getOrderList({
				page: 1,
				limit: 100,
				status: 2
			}).then((data)=>{
				this.orderNavs[2].new_txt = data.data.length;
			})
			this.$http.getOrderList({
				page: 1,
				limit: 100,
				status: 3
			}).then((data)=>{
				this.orderNavs[3].new_txt = data.data.length;
			})
			
			this.avatar = getApp().globalData.avatar;
			if(uni.getStorageSync('token') == ''){
				this.$api.msg('请登录');
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/login/login'
					})
				},1500)
			}else{
				this.$http.getUserInfo().then((data)=>{
					this.name = data.data.username;
					if(data.data.username == ''){
						this.name = data.data.mobile;
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order_nav_box{
		border: 20rpx solid #f4f4f4;
		border-left: 0;
		border-right: 0;
		padding: 20rpx 0;
		box-sizing: border-box;
		.order_nav_top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			font-size: 32rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			text{
				color: #999;
				font-size: 26rpx;
			}
		}
		.order_nav_list{
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			.order_nav_item{
				width: 25%;
				color: #666;
				font-size: 26rpx;
				text-align: center;
				padding: 20rpx;
				&:active{
					background: #f9f9f9;
				}
				.icon_box{
					position: relative;
					text{
						display: block;
						width: 35rpx;
						height: 35rpx;
						line-height: 35rpx;
						border-radius: 50%;
						background: #f00;
						color: #fff;
						font-size: 24rpx;
						position: absolute;
						right: 20rpx;
						top: 0;
						z-index: 1;
					}
					image{
						display: block;
						width: 60rpx;
						height: 60rpx;
						margin: 0 auto 10rpx;
					}
				}
			}
		}
	}
	.nav_list_box{
		background: #fff;
		margin-bottom: 20rpx;
		.nav_list_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #f1f1f1;
			padding: 30rpx 40rpx 30rpx 30rpx;
			box-sizing: border-box;
			color: #333;
			font-size: 28rpx;
			&:active{
				background: #f9f9f9;
			}
			&.border{
				border-top: 20rpx solid #f4f4f4;
				border-bottom: 0;
				// border-bottom: 20rpx solid #f4f4f4;
			}
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					display: block;
					width: 40rpx;
					height: 40rpx;
					margin-right: 30rpx;
				}
			}
			text{
				color: #f00;
				font-size: 24rpx;
			}
		}
	}
</style>
