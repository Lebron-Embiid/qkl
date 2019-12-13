<template>
	<view class="orderInfo">
		<uni-nav-bar left-icon="back" leftText="返回" title="订单详情"></uni-nav-bar>
		<view class="addr">
			<view class="icon">
				<image src="../../static/nav_icon2.svg" mode="widthFix"></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{name}}
					</view>
					<view class="tel">
						{{phone}}
					</view>
				</view>
				<view class="addres">
					{{address}}
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="url+row.com_img"></image>
					</view>
					<view class="info">
						<view class="title">{{row.com_name}}</view>
						<view class="spec">数量:{{row.com_num}}</view>
						<view class="price-number">
							<view class="price">￥{{row.com_price}}</view>
							<view class="number">
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="row">
				<view class="left">
					订单状态:
				</view>
				<view class="right">
					{{status}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					订单号:
				</view>
				<view class="right">
					{{order_no}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					下单时间:
				</view>
				<view class="right">
					{{time}}
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{price|toFixed}}</view></view>
				<view class="btn cancel" @tap="toCancel">取消订单</view>
				<view class="btn" @tap="toPay">支付</view>
			</view>
		</view>
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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		data(){
			return{
				id: '',
				address: '',
				name: '',
				phone: '',
				price: 0.0,
				order_no: '',
				time: '',
				status: '',
				buylist: [],
				url: '',
				pay_pwd: ''
			}
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		components:{
			uniNavBar,
			uniPopup
		},
		methods:{
			toPay(){
				this.$refs.popup.open();
			},
			cancelBack(){
				this.$refs.popup.close();
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
										url: '/pages/mine/myOrder'
									})
								},1500)
							}
						})
					}
				})
			},
			toCancel(){
				this.$Debounce.canDoFunction({
					key: "cancelOrder",
					time: 1500,
					success:()=>{
						this.$http.cancelOrder({
							id: this.id
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1500)
							}
						})
					}
				})
			}
		},
		// onBackPress() {
		// 	uni.switchTab({
		// 		url: '/pages/trade/index'
		// 	})
		// },
		onLoad(opt) {
			this.url = this.$http.url;
			this.id = opt.id;
			console.log(this.id);
			this.$http.getOrderDetail({
				order_id: opt.id
			}).then((data)=>{
				this.address = data.data.buy_address;
				this.name = data.data.buy_name;
				this.phone = data.data.buy_phone;
				this.price = data.data.buy_price;
				this.order_no = data.data.order_no;
				this.time = data.data.time;
				this.status = data.data.status_name;
				this.buylist = data.data.detail;
			})
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
			width: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 45%;
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
				margin-left: 20rpx;
				&.cancel{
					background: #999;
				}
			}
		}
	}
</style>
