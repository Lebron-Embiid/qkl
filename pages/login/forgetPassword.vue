<template>
	<view class="forgetPassword">
		<uni-nav-bar left-icon="back" title="重置密码"></uni-nav-bar>
		<view class="white_logo_box">
			<image src="/static/logo1.png" mode="widthFix"></image>
			<text>SOLOMON MATRIX</text>
		</view>
		<view class="forget_box">
			<form @submit="loginSubmit" @reset="loginReset">
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
							<input type="text" placeholder="注册邮箱地址" v-model="code" />
						</view>
						<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="请输入新的登录密码" v-model="password" />
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
	var timer;
	export default{
		data(){
			return{
				phone: '',
				email: '',
				code:'',
				password: '',
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
					return '获取验证码';
				}else{
					return this.second+'秒';
				}
			}
		},
		methods:{
			switchchange(e) {
				console.log(e);
			},
			getcode(){
				var that = this;
				if(that.second>0){
					return;
				} 
				uni.request({
					url: '', //仅为示例，并非真实接口地址。
					data: {content:that.account},
					method: 'GET',
					dataType:'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {  
						if(res.data.code == 1){
							uni.showToast({title:res.data.msg,icon:'none'});
							that.second = 0;
						}else{
							uni.showToast({title:res.data.msg});
							that.second = 60;
							timer = setInterval(function(){
								that.second--;
								if(that.second==0){
									clearInterval(timer)
								}
							},1000)
						}
					}
				});
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
		padding: 0 80rpx 100rpx;
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
