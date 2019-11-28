<template>
	<view class="trade">
		<uni-nav-bar title="交易订单" :backgroundColor="background" :color="color" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="order_nav_box">
			<view class="order_nav_top">全部订单<text @tap="lookMore">查看全部订单</text></view>
			<view class="order_nav_list">
				<view class="order_nav_item" @tap="toOrderPage(index)" v-for="(item,index) in orderNavs" :key="index">
					<image :src="item.icon" mode="widthFix"></image>
					<view>{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="nav_list_box">
			<view class="nav_list_item" @tap="toTapNav(index)" :class="[index==5?'border':'']" v-for="(item,index) in navList" :key="index">
				<view><image :src="item.icon" mode="widthFix"></image>{{item.title}}</view>
				<text>{{item.text}}</text>
			</view>
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
				orderNavs: [
					{
						icon: '/static/order_icon1.svg',
						title: '待付款'
					},{
						icon: '/static/order_icon2.svg',
						title: '待发货'
					},{
						icon: '/static/order_icon3.svg',
						title: '待收货'
					},{
						icon: '/static/order_icon4.svg',
						title: '已完成'
					}
				],
				navList: [
					{
						icon: '/static/nav_icon1.svg',
						title: '商城收益',
						text: '',
						url: ''
					},{
						icon: '/static/nav_icon2.svg',
						title: '收货地址',
						text: '添加/修改',
						url: '/pages/index/edit'
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
					},{
						icon: '/static/nav_icon4.svg',
						title: '认证中心',
						text: '前往认证',
						url: ''
					},{
						icon: '/static/nav_icon5.svg',
						title: '注销登录',
						text: '',
						url: ''
					}
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
				if(idx == 5){
					uni.showModal({
						title: '确定退出登录？',
						cancelText: '取消',
						confirmText: '确定',
						success:function(res){
							if(res.confirm == true){
								
							}
						}
					})
					return;
				}
				uni.navigateTo({
					url: this.navList[idx].url
				})
			},
			lookMore(){
				uni.navigateTo({
					url: '/pages/mine/myOrder'
				})
			}
		},
		onShow() {
			uni.removeTabBarBadge({
				index: 1
			})
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
				image{
					display: block;
					width: 60rpx;
					height: 60rpx;
					margin: 0 auto 10rpx;
				}
			}
		}
	}
	.nav_list_box{
		background: #fff;
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
				border-bottom: 20rpx solid #f4f4f4;
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
