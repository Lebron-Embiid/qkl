<template>
	<view class="wallet">
		<uni-nav-bar left-icon="back" leftText="返回" title="投资钱包" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="common_top_black">
			<view class="common_price">$ <text>{{over_money}}</text></view>
		</view>
		<common-wallet :list="walletNavs" :over_money="over_money" @updateMoney="updateMoney"></common-wallet>
		<view class="common_top_black all_price">当前投资总额：<text>{{invest_money}}</text></view>
		<view class="dividend_nav">
			<view :class="[current == index?'active':'']" @tap="changeNav(index)" v-for="(item,index) in navs" :key="index">{{item}}</view>
		</view>
		<view class="invest_box" v-if="current == 0">
			<view class="invest_top">
				<view class="it_left">投资单号</view>
				<view class="it_right">投资金额</view>
			</view>
			<view class="invest_item" v-for="(item,index) in investList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.order_sn}}</view>
					<view class="ic_right">{{item.money}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						投资于 {{item.add_time}}
						<text>{{item.status_name}}</text>
					</view>
					<button type="primary" @tap="backMoney(item.id)" v-if="item.status == 1">退款</button>
					<button type="primary" class="already" v-else>已退款</button>
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
					<view class="ic_right">{{item.money}}</view>
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
		<uni-popup ref="popup_back" :maskClick="false" type="center">
			<view class="popup_box">
				<view class="popup_content">
					<view class="popup_title">退款</view>
					<view class="popup_back_txt">您将对投资项目进行退款操作，退款以后您不再享受该项目分红，请您确认。</view>
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
	import commonWallet from "@/components/commonWallet.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
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
				invest_money: '',
				id: '',
				pay_pwd: '',
				current: 0,
				navs: ['投资记录','转入转出明细'],
				walletNavs: [{title:'转入',name:'first'},{title:'转出',name:'active'},{title:'投资',name:''}],
				investList: [],
				transferList: [],
				page: 1,
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			commonWallet,
			uniPopup,
			uniLoadMore
		},
		onShow(){
			this.avatar = getApp().globalData.avatar;
		},
		onLoad() {
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
			this.$http.getInvestment({
				page: this.page,
				limit: 10
			}).then((data)=>{
				let res = data.data;
				if(res.list.length < 10){
					this.loadingType = 'noMore';
				}
				this.investList = res.list;
				this.over_money = res.bonus.bonus1;
				this.invest_money = res.total;
			})
		},
		methods:{
			changeNav(idx){
				this.current = idx;
				this.page = 1;
				if(this.current == 0){
					this.$http.getInvestment({
						page: this.page,
						limit: 10
					}).then((data)=>{
						let res = data.data;
						if(res.list.length < 10){
							this.loadingType = 'noMore';
						}
						this.investList = res.list;
						this.over_money = res.bonus.bonus1;
						this.invest_money = res.total;
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
			backMoney(id){
				this.$refs.popup_back.open();
				this.id = id;
			},
			cancelBack(){
				this.pay_pwd = '';
				this.$refs.popup_back.close();
			},
			okBack(){
				this.$Debounce.canDoFunction({
					key: "investmentOut",
					time: 1500,
					success:()=>{
						this.$http.changeInvestmentOut({
							order_id: this.id,
							sec_password: this.pay_pwd
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								this.$http.getInvestment({
									page: 1,
									limit: 10
								}).then((data)=>{
									let res = data.data;
									this.investList = res.list;
									this.over_money = res.bonus.bonus0;
									this.invest_money = res.bonus.bonus1;
									this.$refs.popup_back.close();
									this.id = '';
									this.pay_pwd = '';
								})
							}
						})
					}
				})
			},
			updateMoney(){
				this.$http.getInvestment({
						page: 1,
						limit: 10
					}).then((data)=>{
					let res = data.data;
					this.investList = res.list;
					this.over_money = res.bonus.bonus1;
					this.invest_money = res.total;
				})
				this.$http.getTransferOutIndex({
					page: 1,
					limit: 10
				}).then((data)=>{
					this.transferList = data.data;
				})
			}
		},
		onReachBottom() {
			this.page++;
			if(this.current == 0){
				this.$http.getInvestment({
					page: this.page,
					limit: 10
				}).then((data)=>{
					let res = data.data;
					this.loadingType = 'loading';
					if(res.list.length == 0){
						this.loadingType = 'noMore';
					}
					this.investList = this.investList.concat(res.list);
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
	.all_price{
		text{
			color: #fff;
			font-weight: bold;
		}
	}
	.invest_bottom button{
		color: #fff;
	}
</style>
