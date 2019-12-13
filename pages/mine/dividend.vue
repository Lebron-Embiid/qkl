<template>
	<view class="dividend">
		<uni-nav-bar left-icon="back" leftText="返回" title="我的分红" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="dividend_box">
			<view class="dividend_left">
				<image src="/static/member_icon3.png" mode="widthFix"></image>
				<view class="right_area">
					<view class="member_txt">分红总额：</view>
					<view class="member_money">$ {{dividend}}</view>
				</view>
			</view>
			<view class="dividend_right" @tap="openOut">转出</view>
		</view>
		<view class="dividend_nav">
			<view :class="[current == index?'active':'']" @tap="changeNav(index)" v-for="(item,index) in navs" :key="index">{{item}}</view>
		</view>
		<view class="dividend_content" v-if="current == 0">
			<!-- <uni-transition :mode-class="['slide-right','fade']" :show="show"> -->
				<view class="dividend_top">
					<view class="dt_left">投资单号</view>
					<view class="dt_center">投资金额</view>
					<view class="dt_right">分红收益</view>
				</view>
				<view class="dividend_item" v-for="(item,index) in dividendList" :key="index">
					<view class="dividend_center">
						<view class="dc_left">{{item.order_sn}}</view>
						<view class="dc_center">{{item.money}}</view>
						<view class="dc_right">{{item.bonus}}</view>
					</view>
					<view class="dividend_bottom">
						<view>投资于 {{item.into_time}}</view>
						<view class="last">结算于 {{item.add_time}}</view>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			<!-- </uni-transition> -->
		</view>
		<view class="dividend_content" v-if="current == 1">
			<!-- <uni-transition :mode-class="['slide-left','fade']" :show="show1"> -->
				<view class="dividend_top">
					<view class="dt_left">会员</view>
					<view class="dt_center">层级</view>
					<view class="dt_right">分红收益</view>
				</view>
				<view class="dividend_item" v-for="(item,index) in dividendTeamList" :key="index">
					<view class="dividend_center" v-for="(list,idx) in item.list" :key="idx">
						<view class="dc_left">{{list.name}}</view>
						<view class="dc_center">{{list.level}}</view>
						<view class="dc_right">{{list.income}}</view>
					</view>
					<view class="dividend_bottom">
						<view></view>
						<view class="last">结算于 {{item.end_time}}</view>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			<!-- </uni-transition> -->
		</view>
		<uni-popup ref="popup" :maskClick="false" type="center">
			<view class="popup_box">
				<view class="popup_content">
					<view class="popup_title">转出到APP钱包</view>
					<view class="popup_info">您将把分红资金转入到APP钱包</view>
					<input type="text" v-model="price" placeholder="请输入转出金额" />
					<input type="password" v-model="pay_pwd" placeholder="请输入支付密码" />
				</view>
				<view class="popup_btn">
					<view @tap="cancelPopup">取消</view>
					<view class="ok" @tap="okPopup">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				show: true,
				show1: false,
				name: '',
				avatar: '',
				dividend: 0,
				navs: ['个人分红','团队分红'],
				current: 0,
				dividendList: [],
				dividendTeamList: [
					{
						list: [
							{
								name: 'LUCY',
								level: '1',
								income: '40'
							},{
								name: 'BECKY',
								level: '2',
								income: '10'
							},{
								name: 'MERRY',
								level: '3',
								income: '10'
							}
						],
						end_time: '2019/11/25  09：00'
					}
				],
				price: '',
				pay_pwd: '',
				loadingType: 'more',
				page: 1
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			uniPopup,
			uniTransition,
			uniLoadMore
		},
		methods:{
			changeNav(idx){
				this.current = idx;
				this.page = 1;
				if(this.current == 0){
					this.$http.getShareBonus({
						page: 1,
						limit: 10
					}).then((data)=>{
						if(data.data.list.length < 10){
							this.loadingType = 'noMore';
						}
						this.dividendList = data.data.list;
					})
				}else{
					
				}
			},
			openOut(){
				this.$refs.popup.open();
			},
			cancelPopup(){
				this.$refs.popup.close();
				this.price = '';
				this.pay_pwd = '';
			},
			okPopup(){
				this.$refs.popup.close();
			}
		},
		onShow(){
			this.avatar = getApp().globalData.avatar;
			if(this.current == 0){
				this.$http.getShareBonus({
					page: 1,
					limit: 10
				}).then((data)=>{
					if(data.data.list.length < 10){
						this.loadingType = 'noMore';
					}
					this.dividendList = data.data.list;
					for(let i in data.data.list){
						this.dividend += parseInt(data.data.list[i].bonus);
					}
					uni.setStorageSync('dividend',this.dividend);
				})
			}else{
				
			}
		},
		onLoad(opt) {
			if(opt.index != undefined){
				this.current = opt.index;
			}
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
		},
		onReachBottom() {
			this.page++;
			if(this.current == 0){
				this.$http.getShareBonus({
					page: this.page,
					limit: 10
				}).then((data)=>{
					this.loadingType = "loading";
					if(data.data.list.length == 0){
						this.loadingType = 'noMore';
					}
					this.dividendList = this.dividendList.concat(data.data.list);
				})
			}else{
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.dividend_box{
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		flex-wrap: wrap;
		background: #000;
		padding: 0 10rpx 20rpx;
		box-sizing: border-box;
		.dividend_left{
			width: 49%;
			background: #666;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			box-sizing: border-box;
			color: #fff;
			font-size: 28rpx;
			image{
				display: block;
				width: 78rpx;
				height: 64rpx;
				margin-right: 40rpx;
			}
			.member_txt{
				margin-bottom: 10rpx;
			}
		}
		.dividend_right{
			width: 49%;
			border-radius: 10rpx;
			background: #999;
			color: #fff;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.dividend_content{
		.dividend_top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #fff;
			view{
				width: 30%;
				text-align: center;
				padding: 20rpx 0;
			}
			.dt_left{
				width: 50%;
				color: #666;
				background: #ccc;
			}
			.dt_center{
				background: #999;
			}
			.dt_right{
				background: #666;
			}
		}
		.dividend_center{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 22rpx;
			border-bottom: 1px solid #ccc;
			color: #666;
			view{
				width: 30%;
				text-align: center;
				padding: 20rpx 0;
				border-right: 1px solid #ccc;
				&:last-child{
					border-right: 0;
				}
			}
			.dc_left{
				width: 50%;
			}
		}
		.dividend_bottom{
			color: #999;
			font-size: 24rpx;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;
			view{
				width: 50%;
				&.last{
					text-align: right;
				}
			}
		}
	}
</style>
