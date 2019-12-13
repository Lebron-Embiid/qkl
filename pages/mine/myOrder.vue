<template>
	<view class="myOrder">
		<uni-nav-bar left-icon="back" leftText="返回" title="我的订单" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="order_nav">
			<view class="nav_item" :class="[index==current?'active':'']" @tap="changeNav(index)" v-for="(item,index) in orderNavs" :key="index">{{item}}</view>
		</view>
		<scroll-view scroll-y="true" class="order_content" @scrolltolower="scrollLower">
			<view class="order_item"  v-for="(item,index) in orderList" :key="index">
				<view class="oi_top">{{item.status_name}}</view>
				<view class="oi_center" v-for="(order,idx) in item.detail" :key="idx">
					<image :src="url+order.com_img" mode="widthFix"></image>
					<view class="oi_title">{{order.com_name}}</view>
					<view class="oi_right">
						<view class="oi_price">￥{{order.com_price}}</view>
						<text>x{{order.com_num}}</text>
					</view>
				</view>
				<!-- 共计{{item.com_num}}件商品 -->
				<view class="oi_all"><text>合计：￥{{item.buy_price}}</text></view>
				<view class="oi_bottom">
					<!-- <block v-if="row.type=='unpaid'"><view class="default" @tap="cancelOrder(row)">取消订单</view><view class="pay" @tap="toPayment(row)">付款</view></block>
					<block v-if="row.type=='back'"><view class="default" @tap="remindDeliver(row)">提醒发货</view></block>
					<block v-if="row.type=='unreceived'"><view class="default" @tap="showLogistics(row)">查看物流</view><view class="pay">确认收货</view><view class="pay">我要退货</view></block>
					<block v-if="row.type=='received'"><view class="default">评价</view><view class="default">再次购买</view></block>
					<block v-if="row.type=='completed'"><view class="default">再次购买</view></block>
					<block v-if="row.type=='refunds'"><view class="default">查看进度</view></block>
					<block v-if="row.type=='cancelled'"><view class="default">已取消</view></block> -->
					<button type="primary" @tap="toDetail(item.order_id)">查看详情</button>
					<button type="primary" v-if="item.status == 0" @tap="toPay(item.order_id)" class="pay_btn last">立即支付</button>
					<button type="primary" v-if="item.status == 2" @tap="toComplete(item.order_id)" class="pay_btn last">确认收货</button>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
		<uni-popup ref="popup" type="center">
			<view class="popup_box">
				<view class="popup_content">
					<input type="password" v-model="pay_pwd" placeholder="请输入支付密码" />
				</view>
				<view class="popup_btn">
					<view @tap="cancelBack">取消</view>
					<view class="ok" @tap="okBack">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '',
				orderNavs: ["全部订单","待付款","待发货","待收货","已完成","已取消"],
				current: 0,
				orderList: [],
				loadingType: 'more',
				page: 1,
				url: '',
				pay_pwd: '',
				id: '',
				type: 0
			}
		},
		onBackPress() {
			if(this.type != 1){
				uni.switchTab({
					url: '/pages/trade/index'
				})
			}else{
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.type != undefined){
				this.type = opt.type;
			}
			if(opt.index != undefined){
				this.current = opt.index;
			}
			console.log(this.current);
			this.$http.getOrderList({
				page: 1,
				limit: 10,
				status: this.current-1
			}).then((data)=>{
				this.orderList = data.data;
				if(this.orderList.length<10){
					this.loadingType = 'noMore';
				}
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
		components:{
			uniNavBar,
			commonAvatar,
			uniLoadMore,
			uniPopup
		},
		methods:{
			changeNav(idx){
				this.page = 1;
				this.current = idx;
				this.$http.getOrderList({
					page: this.page,
					limit: 10,
					status: this.current-1
				}).then((data)=>{
					if(this.orderList.length<10){
						this.loadingType = 'noMore';
					}
					this.orderList = data.data;
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/index/orderInfo?id=' + id
				})
			},
			toPay(id){
				this.$refs.popup.open();
				this.id = id;
			},
			cancelBack(){
				this.$refs.popup.close();
				this.pay_pwd = '';
			},
			okBack(){
				this.$Debounce.canDoFunction({
					key: "payOrder",
					time: 1500,
					success:()=>{
						this.$http.payOrder({
							id: this.id,
							sec_password: this.pay_pwd
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/mine/myOrder?index=2'
									})
								},1500)
							}
						})
					}
				})
			},
			toComplete(id){
				this.$Debounce.canDoFunction({
					key: "completeOrder",
					time: 1500,
					success:()=>{
						this.$http.completeOrder({
							id: id
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/mine/myOrder?index=4'
									})
								},1500)
							}
						})
					}
				})
			},
			// 滑动到底部加载更多
			scrollLower(){
				this.page++;
				this.$http.getOrderList({
					page: this.page,
					limit: 10,
					status: this.current-1
				}).then((data)=>{
					this.loadingType = 'loading';
					if(data.data.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.orderList = this.orderList.concat(data.data);
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
		max-height: 66vh;
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
					height: 120rpx !important;
				}
				.oi_title{
					width: 60%;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
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
