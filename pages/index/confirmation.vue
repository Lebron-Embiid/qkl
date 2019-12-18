<template>
	<view>
		<uni-nav-bar left-icon="back" leftText="返回" title="确认订单"></uni-nav-bar>
		
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/nav_icon2.svg" mode="widthFix"></image>
			</view>
			<view class="right" v-if="recinfo == null || recinfo.length == 0">
				<view class="tel-name">
					<view class="name">
						请选择收货地址
					</view>
				</view>
			</view>
			<view class="right" v-else>
				<view class="tel-name">
					<view class="name">
						{{recinfo.name}}
					</view>
					<view class="tel">
						{{recinfo.telephone}}
					</view>
				</view>
				<view class="addres">
					{{recinfo.province_id+'-'+recinfo.city_id+'-'+recinfo.country_id}}
					{{recinfo.address}}
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="url+row.pic"></image>
					</view>
					<view class="info">
						<view class="title">{{row.name}}</view>
						<view class="spec">数量:{{row.num}}</view>
						<view class="price-number">
							<view class="price">￥{{row.price}}</view>
							<view class="number">
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<!-- <view class="order">
			<view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view> -->
		<!-- 明细 -->
		<!-- <view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					积分抵扣
				</view>
				<view class="content">
					￥-{{deduction|toFixed}}
				</view>
			</view>
		</view> -->
		<view class="blck">
			
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice|toFixed}}</view></view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default {
		data() {
			return {
				id: '',
				num: '',
				buylist:[],		//订单列表
				goodsPrice:0.0,	//商品合计价格
				sumPrice:0.0,	//用户付款价格
				freight:12.00,	//运费
				note:'',		//备注
				int:1200,		//抵扣积分
				deduction:0,	//抵扣价格
				recinfo: [],
				url: '',
				type: 0
			};
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.id!=undefined){
				this.id = opt.id;
			}
			if(opt.num!=undefined){
				this.num = opt.num;
			}
			if(opt.type!=undefined){
				this.type = opt.type;
			}else{
				this.type = 0;
			}
		},
		onShow() {
			// uni.showLoading({
			// 	title: '加载中'
			// })
			if(this.type == 0){
				this.$http.buyNow({
					gid: this.id,
					num: this.num
				}).then((data)=>{
					let addr = data.data.address;
					this.recinfo = addr;
					if(uni.getStorageSync('selectAddress') != ''){
						uni.getStorage({
							key:'selectAddress',
							success: (e) => {
								console.log(e);
								this.recinfo = e.data;
								uni.removeStorage({
									key:'selectAddress'
								})
							}
						})
					}
					this.buylist = [data.data.product];
					let len = this.buylist.length;
					for(let i=0;i<len;i++){
						this.sumPrice = this.goodsPrice + (this.buylist[i].num*this.buylist[i].price);
					}
					// uni.hideLoading();
					// console.log(this.recinfo);
				})
			}else{
				this.$http.carOrder({
					g_id: this.id
				}).then((data)=>{
					let addr = data.data.address;
					this.recinfo = addr;
					if(uni.getStorageSync('selectAddress') != ''){
						uni.getStorage({
							key:'selectAddress',
							success: (e) => {
								console.log(e);
								this.recinfo = e.data;
								uni.removeStorage({
									key:'selectAddress'
								})
							}
						})
					}
					this.buylist = data.data.list;
					let len = this.buylist.length;
					for(let i=0;i<len;i++){
						this.sumPrice +=  (this.buylist[i].num*this.buylist[i].price);
					}
					// uni.hideLoading();
					// console.log(this.recinfo);
				})
			}
			console.log(this.id,this.num,this.type);
		},
		onHide() {
			// uni.hideLoading();
		},
		// onBackPress() {
		// 	//页面后退时候，清除订单信息
		// 	this.clearOrder();
		// 	uni.hideLoading();
		// },
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			clearOrder(){
				this.buylist = [];
			},
			toPay(){
				if(this.recinfo == null || this.recinfo.length == 0){
					this.$api.msg('请选择收货地址');
					return;
				}
				//商品列表
				uni.showLoading({
					title:'正在提交订单...',
					mask: true
				})
				if(this.type == 0){
					this.$Debounce.canDoFunction({
						key: "addOrder1",
						time: 1500,
						success:()=>{
							this.$http.addOrder({
								address_id: this.recinfo.address_id,
								car_list: JSON.stringify(this.buylist),
								car: 0
							}).then((data)=>{
								this.$api.msg(data.data.message);
								uni.showToast({
									title: data.data.message,
									icon: 'success',
									duration: 1500,
									mask: true
								})
								uni.hideLoading();
								if(data.data.status == 1){
									console.log(data.data.result.order_id);
									setTimeout(()=>{
										uni.navigateTo({
											url: '/pages/index/orderInfo?id='+data.data.result.order_id
										})
									},1500)
								}
							})
						}
					})
				}else{
					this.$Debounce.canDoFunction({
						key: "addOrder2",
						time: 1500,
						success:()=>{
							this.$http.addOrder({
								address_id: this.recinfo.address_id,
								car_list: JSON.stringify(this.buylist),
								car: 1
							}).then((data)=>{
								this.$api.msg(data.data.message);
								uni.showToast({
									title: data.data.message,
									icon: 'success',
									duration: 1500,
									mask: true
								})
								uni.hideLoading();
								if(data.data.status == 1){
									setTimeout(()=>{
										uni.navigateTo({
											url: '/pages/index/orderInfo?id='+data.data.result.order_id
										})
									},1500)
								}
							})
						}
					})
				}
			},
			//选择收货地址
			selectAddress(){
				uni.navigateTo({
					url:'/pages/index/address?type=select'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.addr{
	width: 86%;
	padding: 20upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	display: flex;
	.icon{
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		image{
			width: 60upx;
			height: 60upx;
		}
	}
	.tel-name{
		width: 100%;
		display: flex;
		font-size: 32upx;
		.tel{
			margin-left: 40upx;
		}
	}
	.addres{
		width: 100%;
		font-size: 26upx;
		color: #999;
	}
}
.buy-list{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 30upx 0;
		.goods-info{
			width: 100%;
			display: flex;
			.img{
				width: 22vw;
				height: 22vw;
				border-radius: 10upx;
				overflow: hidden;
				flex-shrink: 0;
				margin-right: 10upx;
				image{
					width: 22vw;
					height: 22vw;
				}
			}
			.info{
				width: 100%;
				height: 22vw;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				position: relative;
				.title{
					width: 100%;
					font-size: 28upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					// text-align: justify;
					overflow: hidden;
				}
				.spec{
					font-size: 22upx;
					background-color: #f3f3f3;
					color: #a7a7a7;
					height: 40upx;
					display: flex;
					align-items: center;
					padding: 0 10upx;
					border-radius: 20upx;
					margin-bottom: 20vw;
				}
				.price-number{
					position: absolute;
					width: 100%;
					bottom: 0upx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					font-size: 28upx;
					height: 40upx;
					.price{
						color: #f06c7a;
					}
					.number{
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
	}
}
.order{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 20upx 0;
		height: 40upx;
		display: flex;
		.left{
			font-size: 28upx;
		}
		.right{
			margin-left: 40upx;
			font-size: 26upx;
			color: #999;
			input{
				font-size: 26upx;
				color: #999;
			}
		}
	}
}
.blck{
	width: 100%;
	height: 100upx;
}
.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		
		.settlement{
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}
.detail{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		height: 60upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nominal{
			font-size: 28upx;
		}
		.content{
			font-size: 26upx;
			color: #f06c7a;
		}
	}
}
</style>
