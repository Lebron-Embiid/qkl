<template>
	<view class="historyList">
		<uni-nav-bar left-icon="back" leftText="返回" :title="title"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="member_info_box">
			<view class="member_list">
				<view class="member_item" @tap="toListLink(index)" v-for="(item,index) in memberList" :key="index">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="right_area">
						<view class="member_txt">{{item.title}}：</view>
						<view class="member_money">$ {{item.value}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="invest_box" v-if="isType == 0">
			<view class="invest_top">
				<view class="it_left">流水单号</view>
				<view class="it_right">提现</view>
			</view>
			<view class="invest_item" v-for="(item,index) in investList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.bank_account}}</view>
					<view class="ic_right">{{item.money}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						{{util.formatTime(item.add_time)}}
					</view>
					<view v-if="item.status == 0">{{item.status_name}}</view>
					<view v-if="item.status == 1" class="load">{{item.status_name}} <text @tap="lookPic(index)">查看图片</text></view>
					<view v-if="item.status == 2" class="finish">{{item.status_name}}</view>
				</view>
			</view>
		</view>
		<view class="invest_box" v-if="isType == 1">
			<view class="invest_top">
				<view class="it_left">流水单号</view>
				<view class="it_right">转款</view>
			</view>
			<view class="invest_item" v-for="(item,index) in transferList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.order_sn}}</view>
					<view class="ic_right"><block v-if="item.from_user_name == mobile">-</block> {{item.money}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						{{item.add_time}}
					</view>
					<view>{{item.to_user_name}}</view>
					<!-- <view v-if="item.is_status == 0">{{item.status}}</view>
					<view v-if="item.is_status == 1" class="load">{{item.status}}</view>
					<view v-if="item.is_status == 2" class="finish">{{item.status}}</view> -->
				</view>
			</view>
		</view>
		<view class="invest_box" v-if="isType == 2">
			<view class="invest_top">
				<view class="it_left">流水单号</view>
				<view class="it_right">充值金额</view>
			</view>
			<view class="invest_item" v-for="(item,index) in rechargeList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.order_sn}}</view>
					<view class="ic_right">{{item.money}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						{{util.formatTime(item.add_time)}}
					</view>
					<view v-if="item.status == 0">{{item.status_name[item.status]}}</view>
					<view v-if="item.status == 1" class="load">{{item.status_name}}</view>
					<view v-if="item.status == 2" class="finish">{{item.status_name}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import util from '@/common/util.js'
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				title: '历史提款',
				isType: 0,
				name: '',
				avatar: '',
				memberList: [
					{
						icon: '/static/member_icon1.png',
						title: '投资钱包',
						url: '/pages/mine/investWallet',
						value: ''
					},{
						icon: '/static/member_icon2.png',
						title: '现金钱包',
						url: '/pages/mine/wallet',
						value: ''
					}
				],
				investList: [],
				transferList:[],
				rechargeList: [],
				photo: [],
				util: util,
				page: 1,
				mobile: '',
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			uniLoadMore
		},
		onLoad(opt) {
			this.$http.getUserInfo().then((data)=>{
				this.mobile = data.data.mobile;
			})
			this.$http.getUserBonus().then((data)=>{
				let res = data.data;
				this.memberList[0].value = res[0].money;
				this.memberList[1].value = res[1].money;
			})
			// type: 0 提款  1 转款  2 充值
			this.isType = opt.type;
			if(opt.type == 0){
				this.title = '历史提款';
				uni.setNavigationBarTitle({
					title: "历史提款"
				});
				this.$http.getCashList({
					page: this.page,
					limit: 10
				}).then((data)=>{
					// console.log(data.data);
					this.investList = data.data;
					if(this.investList.length < 10){
						this.loadingType = 'noMore';
					}
				})
			}else if(opt.type == 1){
				this.title = '历史转款';
				uni.setNavigationBarTitle({
					title: "历史转款"
				});
				this.$http.getTransferList({
					page: this.page,
					limit: 10
				}).then((data)=>{
					// console.log(data.data);
					this.transferList = data.data.list;
					if(this.transferList.length < 10){
						this.loadingType = 'noMore';
					}
				})
			}else{
				this.title = '历史充值';
				uni.setNavigationBarTitle({
					title: "历史充值"
				});
				this.$http.userRecharge({
					page: this.page,
					limit: 10
				}).then((data)=>{
					// console.log(data.data);
					this.rechargeList = data.data.list;
					if(this.rechargeList.length < 10){
						this.loadingType = 'noMore';
					}
				})
			}
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
		methods:{
			toListLink(idx){
				uni.navigateTo({
					url: this.memberList[idx].url
				})
			},
			lookPic(idx){
				var that = this;
				that.photo = [];
				that.photo.push(that.$http.url+that.investList[idx].pic);
				console.log(that.photo);
				// uni.previewImage({
				// 	current: that.photo[0],
				// 	urls: that.photo
				// });
				uni.previewImage({
					current: that.photo[0],
					urls: that.photo,
					longPressActions: {
					itemList: ['保存图片'],
						success: function (res) {
							console.log(res.tapIndex + 1);
							if(res.tapIndex + 1 == 1){
								uni.saveImageToPhotosAlbum({					
									filePath: that.photo[0],				                
									success: function () { 
										that.$api.msg('保存成功');
									},
									fail: () => {
										that.$api.msg('保存失败');
									}
								});
							}
						}   
					}
				});
			}
		},
		onReachBottom() {
			this.page++;
			if(this.isType == 0){
				this.$http.getCashList({
					page: this.page,
					limit: 10
				}).then((data)=>{
					// console.log(data.data);
					this.loadingType = "loading";
					if(data.data.length == 0){
						this.loadingType = "noMore";
						return;
					}
					this.investList = this.investList.concat(data.data);
				})
			}else if(this.isType == 1){
				this.$http.getTransferList({
					page: this.page,
					limit: 10
				}).then((data)=>{
					// console.log(data.data);
					this.loadingType = "loading";
					if(data.data.list.length == 0){
						this.loadingType = "noMore";
						return;
					}
					this.transferList = this.transferList.concat(data.data.list);
				})
			}else{
				this.$http.userRecharge({
					page: this.page,
					limit: 10
				}).then((data)=>{
					// console.log(data.data);
					this.loadingType = "loading";
					if(data.data.list.length == 0){
						this.loadingType = "noMore";
						return;
					}
					this.rechargeList = this.rechargeList.concat(data.data.list);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.invest_box .invest_item .invest_bottom{
		view{
			display: block;
			width: 50%;
			text-align: center;
			color: #999;
			&.load{
				color: #090;
			}
			&.finish{
				color: #c00;
			}
			text{
				font-style: normal;
				margin-left: 20rpx;
				color: #f00;
			}
		}
		
	}
	.member_info_box{
		background: #000;
		padding: 0 10rpx 10rpx;
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
			align-items: stretch;
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
	.history_list_box{
		height: 100vh;
	}
</style>
