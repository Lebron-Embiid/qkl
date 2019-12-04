<template>
	<view class="personInfo">
		<uni-nav-bar left-icon="back" leftText="返回" title="个人信息" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :has_edit_avatar="true"></common-avatar>
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
							<input type="password" placeholder="设置登录密码" v-if="input_type1 == 0" v-model="password" />
							<input type="text" placeholder="设置登录密码" v-else v-model="password" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="0" @change="switchchange"></switchc>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="设置交易密码" v-if="input_type2 == 0" v-model="trade_pwd" />
							<input type="text" placeholder="设置交易密码" v-else v-model="trade_pwd" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange1"></switchc>
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
							<input type="text" placeholder="请输入收货地址" v-model="address" />
						</view>
					</view>
				</view>
			</view>
			<view class="basic_title">银行账户</view>
			<view class="bank_info" v-for="(item,index) in bankList" :key="index">
				<view class="bank_left">
					<image :src="url+item.banq_img" mode="widthFix"></image>
					<view class="bank_txt">
						<view class="bank_name">{{item.banq_genre}}</view>
						<text>{{item.card_number}}</text>
					</view>
				</view>
				<view class="del_txt" @tap="deleteBank(item.id)">删除</view>
			</view>
			<button type="primary" class="bank_btn" @tap="addBankCard">银行账号</button>
			<button class="submit_btn" @tap="submitForm" form-type="submit">确认</button>
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
				url: '',
				name: '',
				phone: '',
				password: '',
				trade_pwd: '',
				input_type1: '',
				input_type2: '',
				invite_code: '',
				email: '',
				address: '',
				bankList: [
					// {
					// 	id: 1,
					// 	imageUrl: '',
					// 	bank_name: '中国工商银行',
					// 	bank_card: '622228219821821313421'
					// }
				]
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			switchc
		},
		onShow() {
			this.url = this.$http.url;
			console.log(this.url);
			this.$http.userBankList({
				limit: 10
			}).then((data)=>{
				if(data.data.status == 40001){
					uni.removeStorageSync('token');
					this.$api.msg('请登录');
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						})
					},1500)
					return;
				}
				this.bankList = data.data;
			}).catch((err)=>{
				
			})
		},
		methods:{
			switchchange(e) {
				console.log(e);
				if(e.value == true){
					this.input_type1 = 1;
				}else{
					this.input_type1 = 0;
				}
			},
			switchchange1(e) {
				console.log(e);
				if(e.value == true){
					this.input_type2 = 1;
				}else{
					this.input_type2 = 0;
				}
			},
			addBankCard(){
				uni.navigateTo({
					url: '/pages/mine/bankCard'
				})
			},
			deleteBank(id){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除该银行卡？',
					success:function(res){
						if(res.confirm){
							that.$http.delBank({
								id: id
							}).then((data)=>{
								that.$api.msg(data.data.message);
								that.$http.userBankList().then((data)=>{
									that.bankList = data.data;
								})
							})
						}
					}
				})
				
			},
			submitForm(){
				// if(this.phone == ''){
				// 	this.$api.msg("请输入登录手机号");
				// 	return;
				// }
				// if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				// 	this.$api.msg("手机号码格式不正确");
				// 	return; 
				// }
				// if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
				// 	this.$api.msg("邮箱格式不正确");
				// 	return;
				// }
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
		border-radius: 5rpx;
		padding: 20rpx 20rpx 20rpx 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		margin-bottom: 10rpx;
		border-top: 0;
		&:last-of-type{
			border-bottom: 0;
		}
		.bank_left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				display: block;
				width: 60rpx;
				height: 60rpx;
				margin-right: 30rpx;
				// background: #ccc;
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
			transition: all .5s ease;
			&:active{
				background: #099;
				border-color: #099;
				color: #fff;
			}
		}
	}
	.bank_btn{
		height: 80rpx;
		line-height: 80rpx;
		background: #666;
		font-size: 26rpx;
		border-radius: 10rpx;
		margin-bottom: 50rpx;
		color: #fff;
		transition: all .5s ease;
		&:active{
			opacity: .8;
		}
		&:after{
			border: 0;
		}
	}
	.submit_btn{
		margin-bottom: 0;
		width: 80%;
	}
</style>
