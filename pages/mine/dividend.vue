<template>
	<view class="dividend">
		<uni-nav-bar left-icon="back" leftText="返回" title="我的分红" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="dividend_box">
			<view class="dividend_left first" @tap="toTeam">
				<image src="/static/member_icon4.png" mode="widthFix"></image>
				<view class="right_area">
					<view class="member_txt">会员人数：</view>
					<view class="member_money">{{person_num}}</view>
				</view>
			</view>
			<view class="dividend_left">
				<image src="/static/member_icon3.png" mode="widthFix"></image>
				<view class="right_area">
					<view class="member_txt">分红总额：</view>
					<view class="member_money">$ {{dividend}}</view>
				</view>
			</view>
			<!-- <view class="dividend_right" @tap="openOut">转出</view> -->
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
						<view class="dc_left">{{list.username}}</view>
						<view class="dc_center">{{list.dept}}</view>
						<view class="dc_right">{{list.bonus}}</view>
					</view>
					<view class="dividend_bottom">
						<view></view>
						<view class="last">结算于 {{item.add_time}}</view>
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
				person_num: 0,
				dividend: 0,
				navs: ['个人分红','团队分红'],
				current: 0,
				dividendList: [],
				dividendTeamList: [],
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
			toTeam(){
				uni.switchTab({
					url: '/pages/member/myMember'
				})
			},
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
						if(data.data.total != null){
							this.dividend = data.data.total;
						}
					})
				}else{
					this.$http.getTeamBonusList({
						page: 1,
						limit: 10
					}).then((data)=>{
						if(data.data.length < 10){
							this.loadingType = 'noMore';
						}
						this.dividendTeamList = data.data;
						// let list = [];
						// for(let i in data.data){
						// 	list[i] = data.data[i][0];
						// }
						// for(let i in data.data){
						// 	this.dividendTeamList.push({
						// 		list: [list[i]],
						// 		add_time: data.data[i].add_time
						// 	})
						// }
						
						// console.log(this.dividendTeamList);
					})
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
				this.$http.changeInvestmentinto({
					sec_password: this.pay_pwd,
					money: this.price,
					type: 1
				}).then((data)=>{
					this.$api.msg(data.data.message);
					if(data.data.status == 1){
						this.$refs.popup.close();
						this.pay_pwd = '';
						this.price = '';
					}
				})
			}
		},
		onShow(){
			this.avatar = getApp().globalData.avatar;
			this.$http.getNetList().then((data)=>{
				this.person_num = data.data.title[1].charAt(data.data.title[1].length-1);
			})
			if(this.current == 0){
				this.$http.getShareBonus({
					page: 1,
					limit: 10
				}).then((data)=>{
					if(data.data.list.length < 10){
						this.loadingType = 'noMore';
					}
					this.dividendList = data.data.list;
					if(data.data.total != null){
						this.dividend = data.data.total;
					}
				})
			}else{
				this.$http.getTeamBonusList({
					page: 1,
					limit: 10
				}).then((data)=>{
					if(data.data.length < 10){
						this.loadingType = 'noMore';
					}
					this.dividendTeamList = data.data;
				})
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
			this.$http.getShareBonus().then((data)=>{
				if(data.data.total != null){
					this.dividend = data.data.total;
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
				this.$http.getTeamBonusList({
					page: this.page,
					limit: 10
				}).then((data)=>{
					this.loadingType = "loading";
					if(data.data.length == 0){
						this.loadingType = 'noMore';
					}
					this.dividendTeamList = this.dividendTeamList.concat(data.data);
				})
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
			&.first{
				background: #333;
			}
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
