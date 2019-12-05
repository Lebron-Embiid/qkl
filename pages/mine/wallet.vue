<template>
	<view class="wallet">
		<uni-nav-bar left-icon="back" leftText="返回" title="APP钱包" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="common_top_black">
			<view class="common_price">$ <text>{{over_money}}</text></view>
			<view class="add_btn" @tap="toIncrease">加额</view>
		</view>
		<common-wallet :list="walletNavs" :isApp="true"></common-wallet>
		<view class="invest_box">
			<view class="invest_top">
				<view class="it_left">流水单号</view>
				<view class="it_right">转入/转出</view>
			</view>
			<view class="invest_item" v-for="(item,index) in investList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.name}}</view>
					<view class="ic_right">{{item.price}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						投资于 {{item.time}}
					</view>
					<view>{{item.from}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import commonWallet from "@/components/commonWallet.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '/static/avatar.png',
				over_money: 1600000,
				walletNavs: [{title:'转入',name:'first'},{title:'转出',name:'active'},{title:'提现',name:''}],
				investList: [
					{
						name: 'SLM20191125A001',
						price: '+20000',
						time: '2019/11/25  09：00',
						from: '投资钱包转入'
					},{
						name: 'SLM20191125A001',
						price: '-20000',
						time: '2019/11/25  09：00',
						from: '提现'
					},{
						name: 'SLM20191125A001',
						price: '-10000',
						time: '2019/11/25  09：00',
						from: '转出到投资钱包'
					}
				]
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			commonWallet
		},
		methods:{
			toIncrease(){
				uni.navigateTo({
					url: '/pages/member/increase'
				})
			}
		},
		onShow(){
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
			})
		},
		onLoad(opt) {
			this.$http.userRecharge().then((data)=>{
				console.log(data);
			})
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
