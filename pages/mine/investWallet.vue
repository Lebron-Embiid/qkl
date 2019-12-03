<template>
	<view class="wallet">
		<uni-nav-bar left-icon="back" leftText="返回" title="投资钱包" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="common_top_black">
			<view class="common_price">$ <text>{{over_money}}</text></view>
		</view>
		<common-wallet :list="walletNavs"></common-wallet>
		<view class="common_top_black all_price">当前投资总额：<text>{{invest_money}}</text></view>
		<view class="invest_box">
			<view class="invest_top">
				<view class="it_left">投资单号</view>
				<view class="it_right">投资金额</view>
			</view>
			<view class="invest_item" v-for="(item,index) in investList" :key="index">
				<view class="invest_center">
					<view class="ic_left">{{item.name}}</view>
					<view class="ic_right">{{item.price}}</view>
				</view>
				<view class="invest_bottom">
					<view>
						投资于 {{item.time}}
						<text>{{item.status}}</text>
					</view>
					<button type="primary" @tap="backMoney(index)" v-if="item.btn == 0">退款</button>
					<button type="primary" class="already" v-if="item.btn == 1">已退款</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup_back" type="center">
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
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				over_money: 1600000,
				invest_money: 120000,
				pay_pwd: '',
				walletNavs: [{title:'转入',name:'first'},{title:'转出',name:'active'},{title:'投资',name:''}],
				investList: [
					{
						name: 'SLM20191125A001',
						price: '20000',
						time: '2019/11/25  09：00',
						status: '进行中',
						btn: 0
					},{
						name: 'SLM20191125A001',
						price: '20000',
						time: '2019/11/25  09：00',
						status: '进行中',
						btn: 0
					},{
						name: 'SLM20191125A001',
						price: '10000',
						time: '2019/11/25  09：00',
						status: '已结束',
						btn: 1
					}
				]
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			commonWallet,
			uniPopup
		},
		methods:{
			backMoney(idx){
				this.$refs.popup_back.open();
			},
			cancelBack(){
				this.$refs.popup_back.close();
			},
			okBack(){
				this.$refs.popup_back.close();
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
	
</style>
