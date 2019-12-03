<template>
	<view class="forgetPassword">
		<uni-nav-bar left-icon="back" title="重置密码" :color="color" :backgroundColor="background"></uni-nav-bar>
		<view class="white_logo_box">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{app_name}}</text>
		</view>
		<view class="forget_box">
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
					<view class="icon no"><image src="/static/email.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="注册邮箱地址" v-model="email" />
						</view>
						<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/vcode.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box">
							<input type="text" placeholder="输入验证码" v-model="code" />
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="请输入新的登录密码" v-if="input_type == 0" v-model="password" />
							<input type="text" placeholder="请输入新的登录密码" v-else v-model="password" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange"></switchc>
					</view>
				</view>
				<button class="submit_btn" form-type="submit">确认</button>
			</form>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	import {Model} from '@/common/model.js'
	let model = new Model()
	var timer;
	export default{
		data(){
			return{
				color: '#999999',
				background: '#f2f2f2',
				logoSrc: '/static/logo1.png',
				app_name: 'SOLOMON MATRIX',
				phone: '',
				email: '',
				code:'',
				password: '',
				input_type: '',
				second: 0
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		computed:{
			yanzhengma(){
				if(this.second==0){
					return '发送验证码';
				}else{
					return this.second+'秒';
				}
			}
		},
		methods:{
			switchchange(e) {
				console.log(e);
				if(e.value == true){
					this.input_type = 1;
				}else{
					this.input_type = 0;
				}
			},
			getcode(){
				let that = this;
				// if(that.phone == ''){
				// 	that.$api.msg("请先填写手机号码");
				// 	return;
				// }
				// if(!(/^1[3456789]\d{9}$/.test(that.phone))){
				// 	that.$api.msg("手机号码格式不正确");
				// 	return; 
				// }
				// if(that.phone){
				// 	that.$api.msg("该手机号未注册");
				// 	return;
				// }
				if(that.second>0){
					return;
				}
				model.sendEmailCode({
					mobile: that.phone,
					email: that.email
				},(data)=>{
					that.$api.msg(data.data.message);
					// {
					// 	that.second = 0;
					// }else
					if(data.data.status == 1){
						that.second = 60;
						timer = setInterval(function(){
							that.second--;
							if(that.second==0){
								clearInterval(timer)
							}
						},1000)
					}
				})
			},
			loginSubmit(){
				model.forgetPassword({
					mobile: this.phone,
					email: this.email,
					password: this.password,
					code: this.code
				},(data)=>{
					// console.log(data.data);
					this.$api.msg(data.data.message);
					if(data.data.status == 1){
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
							})
						},1500)
					}
				})
				// if(this.email == ''){
				// 	this.$api.msg("短信验证码不正确");
				// 	return;
				// }
				// if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
				// 	this.$api.msg("邮箱格式不正确");
				// 	return;
				// }
				// if(this.password.length < 6 || this.password.length > 20){
				// 	this.$api.msg("密码长度需为6-20位");
				// 	return;
				// }
				// this.$api.msg("密码重置成功",1500,false,'success');
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
	.white_logo_box{
		padding-top: 80rpx;
	}
	.form_item .right_box .ipt_box{
		width: 65%;
	}
	.forget_box{
		padding: 0 80rpx 20rpx;
		box-sizing: border-box;
		.submit_btn{
			margin-top: 60rpx;
		}
		.yzm{
			color: #999;
			font-size: 24rpx;
		}
	}
</style>
