<template>
	<view class="personInfo">
		<uni-nav-bar left-icon="back" leftText="返回" title="个人信息" :backgroundColor="background" :color="color" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="basic_info">
			<view class="basic_title">基本资料</view>
			<view class="form_box">
				<view class="form_item">
					<view class="icon no"><image src="/static/name.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入昵称" v-model="name" />
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon no"><image src="/static/phone.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入手机号码" v-model="phone" />
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="设置登录密码" v-model="password" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange"></switchc>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="设置交易密码" v-model="trade_pwd" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange"></switchc>
					</view>
				</view>
				<view class="form_item">
					<view class="icon no"><image src="/static/invite.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入邀请码" v-model="invite_code" />
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon no"><image src="/static/email.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入邮箱地址" v-model="email" />
						</view>
					</view>
				</view>
				<view class="form_item last">
					<view class="icon no"><image src="/static/ship.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入收货地址" v-model="name" />
						</view>
					</view>
				</view>
			</view>
			<view class="basic_title">银行账户</view>
			<view class="bank_info">
				<view class="bank_left">
					<image src="" mode=""></image>
					<view class="bank_txt">
						<view class="bank_name">中国工商银行</view>
						<text>622228219821821313421</text>
					</view>
				</view>
				<view class="del_txt">删除</view>
			</view>
			<button type="primary" class="bank_btn" @tap="addBankCard">添加银行卡</button>
			<button class="submit_btn" form-type="submit">确认</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				color: '#333',
				background: '#fff',
				
				name: '',
				phone: '',
				password: '',
				trade_pwd: '',
				invite_code: '',
				email: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			switchc
		},
		methods:{
			addBankCard(){
				uni.navigateTo({
					url: '/pages/mine/bankCard'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.basic_info{
		padding: 50rpx 30rpx 20rpx;
		box-sizing: border-box;
		.form_box{
			padding: 0 30rpx;
			box-sizing: border-box;
			margin-bottom: 50rpx;
			.form_item{
				&.last{
					.icon{
						width: 40rpx;
						display: flex;
						justify-content: center;
						image{
							width: 22rpx;
							height: 48rpx !important;
						}
					}
				}
			}
		}
		.basic_title{
			color: #999;
			font-size: 28rpx;
			padding-bottom: 10rpx;
			border-bottom: 1px solid #ccc;
			margin-bottom: 30rpx;
		}
	}
	.bank_info{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border: 1px solid #ccc;
		border-radius: 10rpx;
		padding: 20rpx 20rpx 20rpx 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		margin-bottom: 10rpx;
		border-top: 0;
		border-bottom: 0;
		.bank_left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				display: block;
				width: 60rpx;
				height: 60rpx;
				margin-right: 30rpx;
				background: #ccc;
			}
			.bank_txt{
				.bank_name{
					margin-bottom: 20rpx;
				}
			}
		}
		.del_txt{
			border: 1px solid #ccc;
			padding: 5rpx 25rpx;
			box-sizing: border-box;
			border-radius: 6rpx;
			color: #999;
		}
	}
	.bank_btn{
		height: 80rpx;
		line-height: 80rpx;
		background: #666;
		font-size: 26rpx;
		border-radius: 10rpx;
		margin-bottom: 50rpx;
		&:after{
			border: 0;
		}
	}
	.submit_btn{
		margin-bottom: 0;
		width: 80%;
	}
</style>
