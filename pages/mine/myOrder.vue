<template>
	<view class="myOrder">
		<uni-nav-bar left-icon="back" leftText="返回" title="我的订单" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="order_nav">
			<view class="nav_item" :class="[index==current?'active':'']" @tap="changeNav(index)" v-for="(item,index) in orderNavs" :key="index">{{item}}</view>
		</view>
		<scroll-view scroll-y="true" class="order_content">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view class="oi_top">{{item.status}}</view>
				<view class="oi_center">
					<image :src="item.src" mode="widthFix"></image>
					<view class="oi_title">{{item.title}}</view>
					<view class="oi_right">
						<view class="oi_price">￥{{item.price}}</view>
						<text>x{{item.num}}</text>
					</view>
				</view>
				<view class="oi_all">共计{{item.num}}件商品 <text>合计：￥{{parseInt(item.price)*item.num}}</text></view>
				<view class="oi_bottom">
					<button type="primary" @tap="toDetail(index)">查看详情</button>
					<button type="primary" @tap="toPay(index)" class="pay_btn last">立即支付</button>
				</view>
			</view>
		</scroll-view>
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
				orderNavs: ["全部订单","待付款","待发货","待收货","已完成"],
				current: 0,
				orderList: [
					{
						id: 1,
						status: '未付款',
						src: '',
						title: '靓变奶茶',
						price: '2980.00',
						num: 2,
						all: ''
					},{
						id: 1,
						status: '未付款',
						src: '',
						title: '靓变奶茶',
						price: '2980.00',
						num: 2,
						all: ''
					},{
						id: 1,
						status: '未付款',
						src: '',
						title: '靓变奶茶',
						price: '2980.00',
						num: 2,
						all: ''
					},{
						id: 1,
						status: '未付款',
						src: '',
						title: '靓变奶茶',
						price: '2980.00',
						num: 2,
						all: ''
					},{
						id: 1,
						status: '未付款',
						src: '',
						title: '靓变奶茶',
						price: '2980.00',
						num: 2,
						all: ''
					},{
						id: 1,
						status: '未付款',
						src: '',
						title: '靓变奶茶',
						price: '2980.00',
						num: 2,
						all: ''
					}
				]
			}
		},
		onLoad(opt) {
			if(opt.index != undefined){
				this.current = opt.index;
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		methods:{
			changeNav(idx){
				this.current = idx;
			},
			toDetail(idx){
				uni.navigateTo({
					url: '/pages/index/detail?id=' + idx
				})
			},
			toPay(idx){
				uni.navigateTo({
					url: '/pages/index/confirmation'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order_nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 10rpx solid #f4f4f4;
		.nav_item{
			width: 20%;
			text-align: center;
			color: #333;
			font-size: 28rpx;
			padding: 25rpx 0;
			&.active{
				color: #1ABC9C;
			}
		}
	}
	.order_content{
		// max-height: 880rpx;
		max-height: 70vh;
		.order_item{
			border-bottom: 10rpx solid #f4f4f4;
			font-size: 28rpx;
			.oi_top{
				padding: 20rpx;
				box-sizing: border-box;
				text-align: right;
				color: #f60;
			}
			.oi_center{
				background: #f4f4f4;
				padding: 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				image{
					display: block;
					width: 120rpx;
					height: 120rpx;
					background: #ccc;
				}
				.oi_title{
					width: 60%;
				}
				.oi_right{
					text-align: right;
					font-size: 24rpx;
				}
			}
			.oi_all{
				text-align: right;
				padding: 20rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #ccc;
				text{
					margin-left: 40rpx;
				}
			}
			.oi_bottom{
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				button{
					display: block;
					height: 60rpx;
					line-height: 60rpx;
					color: #999;
					font-size: 26rpx;
					background: #fff;
					padding: 0 20rpx;
					box-sizing: border-box;
					border-radius: 30rpx;
					border: 1px solid #ccc;
					margin: 0;
					transition: all .5s ease;
					&:active{
						background: #999;
						color: #fff;
					}
					&.pay_btn{
						color: #f60;
						border-color: #f60;
						&:active{
							background: #f60;
							color: #fff;
						}
					}
					&.last{
						margin-left: 30rpx;
					}
					&:after{
						border: 0;
					}
				}
			}
		}
	}
</style>
