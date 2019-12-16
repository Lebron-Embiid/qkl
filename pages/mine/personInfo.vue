<template>
	<view class="personInfo">
		<uni-nav-bar left-icon="back" leftText="返回" title="个人信息" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="username" :avatar="avatar" :has_edit_avatar="true"></common-avatar>
		<view class="basic_info">
			<view class="basic_title">基本资料<text @tap="toChangePwd">修改密码</text></view>
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
							<input type="text" disabled placeholder="手机号码" v-model="phone" />
						</view>
					</view>
				</view>
				<!-- <view class="form_item">
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
				</view> -->
				<view class="form_item">
					<view class="icon no"><image src="/static/invite.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" disabled placeholder="邀请码" v-model="invite_code" />
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
				<button class="submit_btn" @tap="submitForm" form-type="submit">修改</button>
				<!-- <view class="form_item last">
					<view class="icon no"><image src="/static/ship.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入收货地址" v-model="address" />
						</view>
					</view>
				</view> -->
			</view>
			<view class="basic_title">银行账户<text @tap="toBankList">查看全部</text></view>
			<view class="bank_info" v-for="(item,index) in bankList" :key="index">
				<view class="bank_left">
					<!-- <image :src="url+item.banq_img" mode="widthFix"></image> -->
					<view class="bank_txt">
						<!-- <view class="bank_name">{{item.banq_genre}}</view> -->
						<view class="bank_name"><!-- {{item.country}} - -->{{item.card_name}}</view>
						<text>{{item.card_number}}</text>
					</view>
				</view>
				<view class="del_txt" @tap="deleteBank(item.id)">删除</view>
			</view>
			<button type="primary" class="bank_btn" @tap="addBankCard">银行账号</button>
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
				username: '',
				avatar: '',
				phone: '',
				password: '',
				trade_pwd: '',
				input_type1: '',
				input_type2: '',
				invite_code: '',
				email: '',
				// address: '',
				bankList: []
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			switchc
		},
		onLoad(){
		},
		onShow() {
			this.avatar = getApp().globalData.avatar;
			this.url = this.$http.url;
			console.log(this.url);
			this.$http.getUserInfo().then((data)=>{
				console.log(data.data);
				this.name = data.data.username;
				this.username = data.data.username;
				if(data.data.username == ''){
					// this.name = data.data.mobile;
					this.username = data.data.mobile;
				}
				this.phone = data.data.mobile;
				this.email = data.data.email;
				this.invite_code = data.data.parent_name;
			})
			this.$http.userBankList({
				limit: 1
			}).then((data)=>{
				this.bankList = data.data;
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
			toBankList(){
				uni.navigateTo({
					url: '/pages/mine/bankList'
				})
			},
			toChangePwd(){
				uni.navigateTo({
					url: '/pages/mine/changePassword'
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
								that.$http.userBankList({limit: 1}).then((data)=>{
									that.bankList = data.data;
								})
							})
						}
					}
				})
			},
			submitForm(){
				if(this.name == ''){
					this.$api.msg('请输入昵称');
					return;
				}
				this.$Debounce.canDoFunction({
					key: "editUserInfo",
					time: 1500,
					success:()=>{
						this.$http.editUserInfo({
							username: this.name,
							login_pwd: this.password,
							safety_pwd: this.trade_pwd,
							email: this.email
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status != 0){
								this.username = this.name;
							}
						})
					}
				})
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
			margin-bottom: 30rpx;
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			text{
				color: #999;
				font-size: 24rpx;
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
		margin: 30rpx auto 0;
		width: 80%;
	}
</style>
