<template>
	<view class="login">
		<view class="login_top">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{app_name}}</text>
		</view>
		<view class="login_box">
			<form @submit="loginSubmit">
				<view class="form_item">
					<view class="icon no"><image src="/static/phone.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box">
							<input type="text" placeholder="手机号码" v-model="phone" />
							<image :class="[phone!=''?'active':'']" @tap="clearPhone" src="/static/clear.svg" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="登录密码" v-if="input_type == 0" v-model="password" />
							<input type="text" placeholder="登录密码" v-else v-model="password" />
							<image :class="[password!=''?'active':'']" @tap="clearPwd" src="/static/clear.svg" mode="widthFix"></image>
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="0" @change="switchchange"></switchc>
					</view>
				</view>
				<view class="forget_txt"><text @tap="toForgetPwd">忘记密码</text></view>
				<button class="submit_btn" form-type="submit">
					<image v-if="is_success == true" src="/static/loading.svg" class="loading" mode="widthFix"></image>登录
				</button>
				<text class="create_btn" @tap="toCreatePage">创建账号</text>
			</form>
		</view>
	</view>
</template>

<script>
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				logoSrc: '/static/logo1.png',
				app_name: 'SOLOMON MATRIX',
				phone: '',
				password: '',
				input_type: '',
				is_success: false
			}
		},
		components: {
			switchc
		},
		onShow() {
			
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
			clearPhone(){
				this.phone = '';
			},
			clearPwd(){
				this.password = '';
			},
			toCreatePage(){
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			toForgetPwd(){
				uni.navigateTo({
					url: '/pages/login/forgetPassword'
				})
			},
			loginSubmit(){
				this.$Debounce.canDoFunction({
				    key:"login",//基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
				    time:1500,//如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
				    success:()=>{//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
						console.log(getApp().globalData.is_login);
						this.$http.checkLogin({
							account: this.phone,
							password: this.password
						}).then((data)=>{
							// console.log(data.data);
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								this.is_success = true;
								getApp().globalData.is_login = true;
								uni.setStorageSync('token',data.data.token);
								// uni.setStorageSync('sessionkey',data.sessionkey);
								setTimeout(function(){
									uni.reLaunch({
										url: '/pages/member/index'
									})
								},1500)
							}
						}).catch((err)=>{
							// this.$api.msg('登录失败');
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
				// if(this.password == ''){
				// 	this.$api.msg("请输入登录密码");
				// 	return;
				// }
				// if(){
				//	this.$api.msg("账号或密码不正确");
				// 	return;
				// }
				
				// this.$api.msg("登录成功",1500,false,'success');
			}
		}
	}
</script>

<style scoped lang="scss">
	.login_top{
		background: rgba(0, 153, 153, 1);
		text-align: center;
		padding: 100rpx 30rpx 120rpx;
		box-sizing: border-box;
		image{
			display: block;
			width: 260rpx;
			height: 260rpx;
			margin: 0 auto 30rpx;
		}
		text{
			color: #fff;
			font-weight: 700;
			font-size: 36rpx;
		}
	}
	.login_box{
		padding: 120rpx 80rpx 20rpx;
		box-sizing: border-box;
		.create_btn{
			display: block;
			width: 100%;
			text-align: center;
			color: #1ABC9C;
			font-size: 26rpx;
		}
		.forget_txt{
			text-align: right;
			margin: 15rpx 0 50rpx;
			text{
				color: #1ABC9C;
				font-size: 24rpx;
			}
		}
	}
</style>
