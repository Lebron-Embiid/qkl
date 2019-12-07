<template>
	<view class="mine">
		<uni-nav-bar title="我的" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="mine_list">
			<view class="mine_item" v-for="(item,index) in mineList" @tap="clickLink(index)" :key="index">
				<view class="mine_img"><image :src="item.icon" mode="widthFix"></image></view>
				<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '/static/avatar.png',
				mineList: [
					{
						icon: '/static/mine_icon1.png',
						url: '/pages/mine/personInfo',
						title: '个人信息'
					},{
						icon: '/static/member_icon8.png',
						url: '/pages/member/recommendMember',
						title: '推荐会员'
					},{
						icon: '/static/mine_icon2.png',
						url: '/pages/mine/collection',
						title: '收款凭证'
					},{
						icon: '/static/mine_icon3.png',
						url: '/pages/mine/wallet',
						title: '我的钱包'
					},{
						icon: '/static/mine_icon4.png',
						url: '/pages/member/myMember',
						title: '我的会员'
					},{
						icon: '/static/mine_icon5.png',
						url: '/pages/mine/dividend',
						title: '我的分红'
					},{
						icon: '/static/mine_icon6.png',
						url: '/pages/mine/investWallet',
						title: '我的投资'
					},{
						icon: '/static/mine_icon7.png',
						title: '我的店铺'
					},{
						icon: '/static/mine_icon8.png',
						url: '/pages/mine/myOrder',
						title: '我的订单'
					}
				]
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		onLoad() {
			
		},
		onShow() {
			if(uni.getStorageSync('token') == ''){
				this.$api.msg('请登录');
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/login/login'
					})
				},1500)
			}else{
				this.$http.getUserInfo().then((data)=>{
					this.name = data.data.username;
					if(data.data.username == ''){
						this.name = data.data.mobile;
					}
				})
			}
		},
		methods:{
			clickLink(idx){
				// if(idx == 3){
				// 	uni.showActionSheet({
				// 	    itemList: ['APP钱包', '投资钱包'],
				// 	    success: function (res) {
				// 			if(res.tapIndex == 0){
				// 				uni.navigateTo({
				// 					url: '/pages/mine/wallet'
				// 				})
				// 			}
				// 			if(res.tapIndex == 1){
				// 				uni.navigateTo({
				// 					url: '/pages/mine/investWallet'
				// 				})
				// 			}
				// 	    },
				// 	    fail: function (res) {
				// 	        console.log(res.errMsg);
				// 	    }
				// 	});
				// 	return;
				// }
				if(idx == 4){
					uni.switchTab({
						url: this.mineList[idx].url
					})
					return;
				}
				uni.navigateTo({
					url: this.mineList[idx].url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine_list{
		padding: 50rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.mine_item{
			width: 134rpx;
			margin: 0 50rpx 50rpx 0;
			text-align: center;
			&:nth-child(3n){
				margin-right: 0;
			}
			.mine_img{
				display: block;
				width: 134rpx;
				height: 134rpx;
				border-radius: 50%;
				background: #099;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					display: block;
					width: 78rpx;
					height: 78rpx;
				}
			}
			&:first-child{
				.other_img{
					image{
						width: 96rpx;
						height: 98rpx;
					}
				}
			}
			&:nth-child(3){
				.other_img{
					image{
						width: 80rpx;
						height: 70rpx;
					}
				}
			}
			&:nth-child(6){
				.other_img{
					image{
						width: 94rpx;
						height: 82rpx;
					}
				}
			}
			text{
				color: #666;
				font-size: 28rpx;
			}
		}
	}
</style>
