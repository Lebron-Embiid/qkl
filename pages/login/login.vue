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
				if(this.phone == ''){
					this.$api.msg("请输入登录手机号");
					return;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					this.$api.msg("手机号码格式不正确");
					return; 
				}
				if(this.password == ''){
					this.$api.msg("请输入登录密码");
					return;
				}
				// if(){
				//	this.$api.msg("账号或密码不正确");
				// 	return;
				// }
				this.is_success = true;
				this.$api.msg("登录成功",1500,false,'success');
				
				// uni.setStorageSync('token',data.token);
				// uni.setStorageSync('sessionkey',data.sessionkey);
				
				setTimeout(function(){
					uni.reLaunch({
						url: '/pages/member/index'
					})
				},1500)
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
