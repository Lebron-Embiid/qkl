<template>
	<view class="register">
		<uni-nav-bar left-icon="back" backgroundColor="#fff" :border="false"></uni-nav-bar>
		<view class="white_logo_box">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{app_name}}</text>
		</view>
		<view class="register_box">
			<form @submit="loginSubmit">
				<view class="form_item">
					<view class="icon no"><image src="/static/phone.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box">
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
				<view class="agree_txt">
					<view v-if="is_agree == false" @tap="changeAgree"><image src="/static/radio.svg" mode="widthFix"></image></view>
					<view v-else @tap="changeAgree"><image src="/static/radio_on.svg" mode="widthFix"></image></view>
					已阅读并同意《<text>用户服务协议</text>》
					<!-- <checkbox-group @change="changeAgree">
						<label class="checkbox" v-for="item in items" :key="item.value">
							<checkbox color="#fff" :value="item.value" :checked="item.checked" />
							
						</label>
					</checkbox-group> -->
				</view>
				<button class="submit_btn" form-type="submit">确认</button>
			</form>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default {
	    data(){
			return{
				logoSrc: '/static/logo1.png',
				app_name: 'SOLOMON MATRIX',
				phone: '',
				password: '',
				trade_pwd: '',
				input_type1: '',
				input_type2: '',
				invite_code: '',
				email: '',
				items: [{
					value: '0',
					checked: false
				}],
				is_agree: false
			}
		},
		components: {
			uniNavBar,
			switchc
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
			changeAgree(e){
				if(this.is_agree == false){
					this.is_agree = true;
				}else{
					this.is_agree = false;
				}
				// console.log(e);
				// let items = this.items,
				// 	values = e.detail.value;
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	const item = items[i]
				// 	if(values.includes(item.value)){
				// 		this.$set(item,'checked',true)
				// 	}else{
				// 		this.$set(item,'checked',false)
				// 	}
				// }
			},
			loginSubmit(e){
				if(this.phone == ''){
					this.$api.msg("请输入手机号码");
					return;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					this.$api.msg("手机号码格式不正确");
					return; 
				}
				if(this.password.length < 6 || this.password.length > 20){
					this.$api.msg("密码长度需为6-20位");
					return;
				}
				if(this.trade_pwd == ''){
					this.$api.msg("请输入交易密码");
					return;
				}
				// if(this.invite_code == ''){
				// 	this.$api.msg("请输入邀请码");
				// 	return;
				// }
				// if(this.email == ''){
				// 	this.$api.msg("短信验证码不正确");
				// 	return;
				// }
				if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
					this.$api.msg("邮箱格式不正确");
					return;
				}
				if(this.is_agree == false){
					this.$api.msg("请阅读并同意用户协议");
					return;
				}
				this.$api.msg("注册成功",1500,false,'success');
				setTimeout(function(){
					uni.redirectTo({
						url: '/pages/login/login'
					})
				},1500)
			}
		}
	}
</script>

<style scoped lang="scss">
	.register_box{
		padding: 0 80rpx 20rpx;
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
