<template>
	<view class="transfer">
		<uni-nav-bar left-icon="back" leftText="返回" title="转款" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
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
		<view class="increase_apply">
			<text>转款操作</text>
			<image src="/static/scan.svg" @tap="scanCode" mode="widthFix"></image>
		</view>
		<view class="increase_before" v-if="is_apply == 1">
			<image src="/static/success.svg" mode="widthFix"></image>
			<view class="ib_title">操作成功</view>
			<view class="ib_info">您已成功转款 <text>{{send_price}}</text> 到{{name}}钱包中</view>
			<button type="primary" class="black" @tap="toHistory">历史转款</button>
		</view>
		<view class="increase_after" v-if="is_apply == 0">
			<view class="form_item">
				<view class="icon no"><image src="/static/account.png" mode="widthFix"></image></view>
				<view class="right_box all">
					<view class="ipt_box">
						<input type="text" placeholder="请输入会员ID或钱包地址" v-model="id_link" />
					</view>
				</view>
			</view>
			<view class="form_item">
				<view class="icon no"><image src="/static/add.png" mode="widthFix"></image></view>
				<view class="right_box all">
					<view class="ipt_box">
						<input type="text" placeholder="请输入转款金额" v-model="price" />
					</view>
				</view>
			</view>
			<view class="form_item">
				<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
				<view class="right_box">
					<view class="ipt_box">
						<input type="password" placeholder="请输入支付密码" v-if="input_type == 0" v-model="password" />
						<input type="text" placeholder="请输入支付密码" v-else v-model="password" />
					</view>
					<switchc text="可见|***" class="switch_btn" :sid="0" @change="switchchange"></switchc>
				</view>
			</view>
			<button class="submit_btn" form-type="submit" @tap="applyConfirm">提交确认</button>
			<button class="submit_btn history_btn" @tap="toHistory">历史转款</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				memberList: [
					{
						icon: '/static/member_icon1.png',
						title: '投资钱包',
						url: '/pages/mine/investWallet',
						value: '600000'
					},{
						icon: '/static/member_icon2.png',
						title: 'APP钱包',
						url: '/pages/mine/wallet',
						value: '16000000'
					}
				],
				is_apply: 0,	//是否点击申请按钮
				name: 'Peter',
				id_link: '',
				send_price: 10000,
				price: '',
				password: '',
				input_type: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			switchc
		},
		methods:{
			toListLink(idx){
				uni.navigateTo({
					url: this.memberList[idx].url
				})
			},
			setAccount(){
				uni.navigateTo({
					url: '/pages/mine/bankCard'
				})
			},
			switchchange(e){
				console.log(e);
				if(e.value == true){
					this.input_type = 1;
				}else{
					this.input_type = 0;
				}
			},
			applyConfirm(){
				this.is_apply = 1;
			},
			scanCode(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				})
			},
			toHistory(){
				uni.navigateTo({
					url: '/pages/member/historyList?type=1'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
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
	.increase_apply{
		height: 100rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		background: #999;
		image{
			display: block;
			width: 76rpx;
			height: 76rpx;
		}
	}
	.increase_before{
		padding: 80rpx 100rpx 30rpx;
		box-sizing: border-box;
		text-align: center;
		image{
			display: block;
			width: 120rpx;
			height: 120rpx;
			margin: 0 auto 30rpx;
		}
		.ib_title{
			color: #666;
			font-size: 36rpx;
		}
		.ib_info{
			color: #999;
			font-size: 28rpx;
			width: 100%;
			margin: 10rpx auto 80rpx;
			text{
				color: #900;
				font-weight: bold;
				margin: 0 5rpx;
			}
		}
		button{
			height: 90rpx;
			line-height: 90rpx;
			background: #099;
			color: #fff;
			font-size: 32rpx;
			border-radius: 50rpx;
			&:active{
				background: #1ABC9C;
			}
			&.again_btn{
				width: 280rpx;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 10rpx;
				margin-bottom: 50rpx;
				font-size: 26rpx;
			}
			&.black{
				background: #666;
			}
			&:after{
				border: 0;
			}
		}
	}
	.increase_after{
		padding: 80rpx 100rpx 30rpx;
		box-sizing: border-box;
	}
	.add_upload{
		align-items: flex-start;
		color: #999;
		font-size: 24rpx;
		.add_btn{
			border: 1px solid #d7dde4;
			box-sizing: border-box;
			width: 200rpx;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			image{
				display: block;
				width: 200rpx;
				height: 200rpx !important;
			}
			.add_icon{
				width: 56rpx;
				height: 56rpx;
			}
		}
	}
	.submit_btn{
		margin-top: 20rpx;
		margin: 50rpx 0 40rpx;
	}
	.history_btn{
		background: #666;
		margin: 0;
	}
</style>
