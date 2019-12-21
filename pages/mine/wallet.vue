<template>
	<view class="wallet">
		<uni-nav-bar left-icon="back" leftText="返回" title="APP钱包" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="common_top_black">
			<view class="common_price">$ <text>{{over_money}}</text></view>
			<view class="add_btn" @tap="toIncrease">加额</view>
		</view>
		<common-wallet :list="walletNavs" @updateMoney="updateMoney" :over_money="over_money" :isApp="true"></common-wallet>
		<view class="dividend_nav">
			<view :class="[current == index?'active':'']" @tap="changeNav(index)" v-for="(item,index) in navs" :key="index">{{item}}</view>
		</view>
		<view class="invest_box" v-if="current == 0">
			<view class="invest_top">
				<view class="it_left">流水单号</view>
				<view class="it_right">转入/转出</view>
			</view>
			<view class="invest_item" v-for="(item,index) in investList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.order_sn}}</view>
					<view class="ic_right">{{item.money}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						投资于 {{item.add_time}}
					</view>
					<view>{{item.type_name}}</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view class="invest_box" v-if="current == 1">
			<view class="invest_top">
				<view class="it_left">流水单号</view>
				<view class="it_right">转入/转出</view>
			</view>
			<view class="invest_item" v-for="(item,index) in transferList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.order_sn}}</view>
					<view class="ic_right"><block v-if="item.bonus == 'APP钱包'">-</block>{{item.money}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						投资于 {{item.add_time}}
					</view>
					<view>{{item.bonus}} 转入 {{item.to_bonus}}</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import commonWallet from "@/components/commonWallet.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '',
				over_money: '',
				current: 0,
				navs: ['全部明细','转入转出明细'],
				walletNavs: [{title:'转入',name:'first'},{title:'转出',name:'active'},{title:'提现',name:''}],
				investList: [],
				transferList: [],
				loadingType: 'more',
				page: 1
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			commonWallet,
			uniLoadMore
		},
		methods:{
			changeNav(idx){
				this.page = 1;
				this.current = idx;
				if(this.current == 0){
					this.$http.getBonusIndex({
						page: 1,
						limit: 10,
						type: 0
					}).then((data)=>{
						this.investList = data.data;
					})
				}else{
					this.$http.getTransferOutIndex({
						page: this.page,
						limit: 10
					}).then((data)=>{
						this.transferList = data.data;
					})
				}
			},
			toIncrease(){
				uni.navigateTo({
					url: '/pages/member/increase'
				})
			},
			updateMoney(){
				this.$http.getInvestment().then((data)=>{
					let res = data.data;
					this.over_money = res.bonus.bonus0;
				})
				this.$http.getBonusIndex({
					page: 1,
					limit: 10,
					type: 0
				}).then((data)=>{
					this.investList = data.data;
				})
				this.$http.getTransferOutIndex({
					page: 1,
					limit: 10
				}).then((data)=>{
					this.transferList = data.data;
				})
			}
		},
		onShow(){
			this.avatar = getApp().globalData.avatar;
			if(this.current == 0){
				this.$http.getBonusIndex({
					page: 1,
					limit: 10,
					type: 0
				}).then((data)=>{
					if(data.data.length < 10){
						this.loadingType = 'noMore';
					}
					this.investList = data.data;
				})
			}else{
				this.$http.getTransferOutIndex({
					page: 1,
					limit: 10
				}).then((data)=>{
					if(data.data.length < 10){
						this.loadingType = 'noMore';
					}
					this.transferList = data.data;
				})
			}
		},
		onLoad(opt) {
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
			this.$http.getInvestment().then((data)=>{
				let res = data.data;
				this.over_money = res.bonus.bonus0;
			})
		},
		onReachBottom() {
			this.page++;
			if(this.current == 0){
				this.$http.getBonusIndex({
					page: this.page,
					limit: 10,
					type: 0
				}).then((data)=>{
					this.loadingType = "loading";
					if(data.data.length == 0){
						this.loadingType = 'noMore';
					}
					this.investList = this.investList.concat(data.data);
				})
			}else{
				this.$http.getTransferOutIndex({
					page: this.page,
					limit: 10
				}).then((data)=>{
					this.loadingType = 'loading';
					if(data.data.length == 0){
						this.loadingType = 'noMore';
					}
					this.transferList = this.transferList.concat(data.data);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .mine_top{
		padding-bottom: 0;
	}
	.common_top_black{
		background: #000;
		color: #ccc;
		font-size: 28rpx;
		padding: 10rpx 0 20rpx;
		text-align: center;
		position: relative;
		.common_price{
			color: #fff;
			text{
				color: #ccc;
				margin-left: 10rpx;
			}
		}
		.add_btn{
			display: block;
			width: 180rpx;
			height: 45rpx;
			line-height: 45rpx;
			text-align: center;
			border-radius: 10rpx;
			background: #099;
			color: #fff;
			font-size: 26rpx;
			position: absolute;
			right: 30rpx;
			top: 0;
		}
	}
	.wallet_box{
		padding: 0 10rpx 30rpx;
		box-sizing: border-box;
		background: #000;
		color: #fff;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.wallet_txt{
			width: 32%;
			height: 138rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #999;
			border-radius: 10rpx;
			&.first{
				background: #666;
			}
			&.active{
				background: #333;
			}
		}
	}
	.all_price{
		text{
			color: #fff;
			font-weight: bold;
		}
	}
	.invest_box .invest_item .invest_bottom{
		padding: 25rpx 20rpx 25rpx 40rpx;
	}
</style>
