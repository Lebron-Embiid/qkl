<template>
	<view class="register">
		<!-- #ifndef H5 -->
		<uni-nav-bar left-icon="back" backgroundColor="#fff" :border="false"></uni-nav-bar>
		<!-- #endif -->
		
		<view class="white_logo_box">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{app_name}}</text>
		</view>
		<view class="register_box">
			<form @submit="loginSubmit">
				<view class="form_item">
					<view class="icon no"><image src="/static/phone.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box internation">
							<!-- <input type="text" class="inter_ipt" placeholder="国际号" disabled v-model="internation_number"> -->
							<picker @change="bindPickerChange" :range="country" :value="index" class="inter_ipt">
								<!-- <text>{{internation_number}}</text> -->
								<input type="text" placeholder="区号" disabled v-model="areaCode[index]">
							</picker>
							<input type="text" placeholder="输入手机号码" v-model="phone" />
							<!-- <image :class="[phone!=''?'active':'']" @tap="clearPhone" src="/static/clear.svg" mode="widthFix"></image> -->
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="设置登录密码" v-if="input_type1 == 0" v-model="password" />
							<input type="text" placeholder="设置登录密码" v-else v-model="password" />
							<!-- <image :class="[password!=''?'active':'']" @tap="clearPwd" src="/static/clear.svg" mode="widthFix"></image> -->
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
						<!-- #ifndef H5 -->
						<image src="/static/scan1.svg" @tap="scanInvite" mode="widthFix"></image>
						<!-- #endif -->
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
				<view class="form_item nopad">
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入验证码" v-model="v_code" />
						</view>
						<valid-code :value.sync="validCode" @update:value="getCode"></valid-code>
					</view>
				</view>
				<view class="agree_txt">
					<view v-if="is_agree == false" @tap="changeAgree"><image src="/static/radio.svg" mode="widthFix"></image></view>
					<view v-else @tap="changeAgree"><image src="/static/radio_on.svg" mode="widthFix"></image></view>
					已阅读并同意《<text @tap="toAgreement">用户服务协议</text>》
					<!-- <checkbox-group @change="changeAgree">
						<label class="checkbox" v-for="item in items" :key="item.value">
							<checkbox color="#fff" :value="item.value" :checked="item.checked" />
							
						</label>
					</checkbox-group> -->
				</view>
				<button class="submit_btn" form-type="submit">确认</button>
			</form>
		</view>
		<!-- #ifdef H5 -->
		<uni-popup ref="till" :maskClick="false" type="center">
			<view class="till_reg_box">
				<view class="trb_title">恭喜您注册成为平台会员。</view>
				<view>请点击确认到APP分发平台下载安装客户端到手机使用，谢谢！</view>
				<button @tap="toDownPage" type="primary" size="mini">确认</button>
			</view>
		</uni-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import validCode from '@/components/validCode.vue'
	import util from '@/common/util.js'
	
	export default {
	    data(){
			return{
				logoSrc: '',
				app_name: '',
				internation_number: '',
				phone: '',
				password: '',
				trade_pwd: '',
				input_type1: '',
				input_type2: '',
				invite_code: '',
				email: '',
				country: [],
				areaCode: [],
				v_code: '',
				validCode: '',
				index: null,
				items: [{
					value: '0',
					checked: false
				}],
				is_agree: false
			}
		},
		components: {
			uniNavBar,
			switchc,
			uniPopup,
			validCode
		},
		onLoad(opt) {
			console.log(opt);
			// #ifdef H5
			if(opt.code != undefined){
				this.invite_code = opt.code;
			}
			// #endif
		},
		onShow() {
			this.app_name = getApp().globalData.app_name;
			this.logoSrc = getApp().globalData.app_logo;
			this.$http.getAreaCode().then((res)=>{
				for(let i in res.data){
					this.country.push(res.data[i].country);
					this.areaCode.push(res.data[i].code);
				}
				// console.log(this.country,this.areaCode);
			})
		},
		methods:{
			toAgreement(){
				uni.navigateTo({
					url: '/pages/login/agreement'
				})
			},
			toDownPage(){
				uni.redirectTo({
					url: '/pages/member/webpage'
				})
			},
			scanInvite(){
				let that = this;
				// #ifndef H5
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.invite_code = res.result;
				    }
				})
				// #endif
			},
			getCode(value){
			  // console.log(value);
			  this.validCode = value.toLowerCase();
			},
			bindPickerChange(e) {
				this.index = e.target.value;
				this.internation_number = this.areaCode[e.detail.value];
			},
			switchchange(e) {
				// console.log(e);
				if(e.value == true){
					this.input_type1 = 1;
				}else{
					this.input_type1 = 0;
				}
			},
			switchchange1(e) {
				// console.log(e);
				if(e.value == true){
					this.input_type2 = 1;
				}else{
					this.input_type2 = 0;
				}
			},
			changeAgree(e){
				if(this.is_agree == false){
					this.is_agree = true;
				}else{
					this.is_agree = false;
				}
			},
			loginSubmit(e){
				// console.log(util.phoneList);
				this.$Debounce.canDoFunction({
					key: "register",
					time: 1500,
					success:()=>{
						if(this.is_agree == false){
							this.$api.msg("请阅读并同意用户协议");
							return;
						}
						if(this.v_code == ''){
							this.$api.msg('请输入验证码');
							return;
						}
						if(this.v_code.toLowerCase() != this.validCode){
							this.$api.msg('请输入正确的验证码');
							return;
						}
						let all_phone = this.internation_number+this.phone;
						// console.log(all_phone);
						for(let i in util.phoneList){
							let reg = new RegExp(util.phoneList[i][1]);
							// console.log(reg);
							if((reg.test(all_phone))){
								console.log(util.phoneList[i][0]);
							}
						}
						
						this.$http.formRegister({
							account: this.phone,
							login_pwd: this.password,
							safety_pwd: this.trade_pwd,
							pid: this.invite_code,
							email: this.email,
							area_code: this.internation_number
						}).then((data)=>{
							this.$api.msg(data.data.message);
							// #ifndef H5
							if(data.data.status == 1){
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/login/login'
									})
								},1500)
							}
							// #endif
							// #ifdef H5
							if(data.data.status == 1){
								setTimeout(()=>{
									this.$refs.till.open();
								},1500)
							}
							// #endif
							
						}).catch((err)=>{
							// console.log('request fail', err);
							// this.$api.msg(err);
						})
					}
				})
						
				// if(this.internation_number == ''){
				// 	this.$api.msg('请输入区号');
				// 	return;
				// }
				// if(this.phone == ''){
				// 	this.$api.msg("请输入手机号码");
				// 	return;
				// }
				// if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				// 	this.$api.msg("手机号码格式不正确");
				// 	return; 
				// }
				// if(this.password.length < 6 || this.password.length > 20){
				// 	this.$api.msg("密码长度需为6-20位");
				// 	return;
				// }
				// if(this.trade_pwd == ''){
				// 	this.$api.msg("请输入交易密码");
				// 	return;
				// }
				// if(this.invite_code == ''){
				// 	this.$api.msg("请输入邀请码");
				// 	return;
				// }
				// if(this.email == ''){
				// 	this.$api.msg("短信验证码不正确");
				// 	return;
				// }
				// if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
				// 	this.$api.msg("邮箱格式不正确");
				// 	return;
				// }
				// this.$api.msg("注册成功",1500,false,'success');
				// setTimeout(function(){
				// 	uni.redirectTo({
				// 		url: '/pages/login/login'
				// 	})
				// },1500)
			}
		}
	}
</script>

<style scoped lang="scss">
	.till_reg_box{
		background: #fff;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		width: 80vw;
		font-size: 32rpx;
		border-radius: 10rpx;
		color: #666;
		view{
			text-align: center;
		}
		.trb_title{
			color: #f00;
			font-weight: bold;
			font-size: 30rpx;
			font-size: 34rpx;
			margin-bottom: 20rpx;
		}
		button{
			margin: 30rpx auto 0;
			display: block;
			color: #fff;
			background: #1ABC9C;
			&:active{
				
			}
			&:after{
				border: 0;
			}
		}
	}
	.form_item{
		&.nopad{
			padding: 10rpx 0;
		}
		.right_box{
			.ipt_box{
				&.internation{
					.inter_ipt{
						width: 25%;
						padding-right: 10rpx;
						box-sizing: border-box;
						display: inline-block;
						position: relative;
						margin-right: 20rpx;
						&:after{
							content: "";
							display: block;
							width: 1px;
							height: 20rpx;
							background: #999;
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
			image{
				display: block;
				width: 40rpx;
				height: 40rpx !important;
				margin-right: 10rpx;
			}
		}
	}
	/* #ifdef H5 */
	.white_logo_box{
		padding-top: 50rpx;
	}
	/* #endif */
	.register_box{
		padding: 0 80rpx 50rpx;
		box-sizing: border-box;
		.agree_txt{
			color: #999;
			font-size: 26rpx;
			margin: 30rpx 0 50rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				display: block;
				width: 35rpx;
				height: 35rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			text{
				color: #1ABC9C;
			}
		}
	}
	.submit_btn{
		margin-bottom: 0;
	}
</style>
