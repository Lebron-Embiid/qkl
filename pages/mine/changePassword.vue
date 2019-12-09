<template>
	<view class="changePassword">
		<uni-nav-bar left-icon="back" leftText="返回" title="修改密码"></uni-nav-bar>
		<view class="form_box">
			<view class="basic_title">修改登录密码</view>
			<view class="form_item" v-for="(item,index) in loginPwd" :key="item.id">
				<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
				<view class="right_box">
					<view class="ipt_box">
						<block v-if="index == 0">
							<input type="password" :placeholder="item.text" v-if="item.type == 0" v-model="password" />
							<input type="text" :placeholder="item.text" v-else v-model="password" />
						</block>
						<block v-if="index == 1">
							<input type="password" :placeholder="item.text" v-if="item.type == 0" v-model="new_password" />
							<input type="text" :placeholder="item.text" v-else v-model="new_password" />
						</block>
						<block v-if="index == 2">
							<input type="password" :placeholder="item.text" v-if="item.type == 0" v-model="again_password" />
							<input type="text" :placeholder="item.text" v-else v-model="again_password" />
						</block>
					</view>
					<switchc text="可见|***" class="switch_btn" :sid="index" @change="switchchange($event,index)"></switchc>
				</view>
			</view>
			<button class="submit_btn" @tap="submitForm">修改</button>
			<view class="basic_title">修改交易密码</view>
			<view class="form_item" v-for="(trade,idx) in tradePwd" :key="trade.id">
				<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
				<view class="right_box">
					<view class="ipt_box">
						<block v-if="idx == 0">
							<input type="password" :placeholder="trade.text" v-if="trade.type == 0" v-model="trade_password" />
							<input type="text" :placeholder="trade.text" v-else v-model="trade_password" />
						</block>
						<block v-if="idx == 1">
							<input type="password" :placeholder="trade.text" v-if="trade.type == 0" v-model="new_trade_password" />
							<input type="text" :placeholder="trade.text" v-else v-model="new_trade_password" />
						</block>
						<block v-if="idx == 2">
							<input type="password" :placeholder="trade.text" v-if="trade.type == 0" v-model="again_trade_password" />
							<input type="text" :placeholder="trade.text" v-else v-model="again_trade_password" />
						</block>
					</view>
					<switchc text="可见|***" class="switch_btn" :sid="idx" @change="switchchange1($event,idx)"></switchc>
				</view>
			</view>
			<button class="submit_btn" @tap="submitForm1">修改</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				password: '',
				new_password: '',
				again_password: '',
				trade_password: '',
				new_trade_password: '',
				again_trade_password: '',
				loginPwd: [
					{
						id: 1,
						text: '旧登录密码',
						type: 0
					},{
						id: 2,
						text: '新登录密码',
						type: 0
					},{
						id: 3,
						text: '确认登录密码',
						type: 0
					}
				],
				tradePwd: [
					{
						id: 4,
						text: '旧交易密码',
						type: 0
					},{
						id: 5,
						text: '新交易密码',
						type: 0
					},{
						id: 6,
						text: '确认交易密码',
						type: 0
					}
				]
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		onShow() {
			
		},
		methods:{
			switchchange(e,idx) {
				if(e.value == true){
					this.loginPwd[idx].type = 1
				}else{
					this.loginPwd[idx].type = 0
				}
				// console.log(this.loginPwd[idx].type);
			},
			switchchange1(e,idx) {
				if(e.value == true){
					this.tradePwd[idx].type = 1
				}else{
					this.tradePwd[idx].type = 0
				}
			},
			submitForm(){
				// console.log(this.password,this.new_password,this.again_password);
				// if(this.password == this.again_password){
				// 	this.$api.msg('旧密码与新密码一样');
				// 	return;
				// }
				this.$http.updateLoginPassword({
					old_pwd: this.password,
					new_pwd: this.new_password,
					rep_pwd: this.again_password
				}).then((data)=>{
					this.$api.msg(data.data.message);
					if(data.data.status == 1){
						this.password = '';
						this.new_password = '';
						this.again_password = '';
					}
				})
			},
			submitForm1(){
				// console.log(this.trade_password,this.new_trade_password,this.again_trade_password);
				// if(this.trade_password == this.again_trade_password){
				// 	this.$api.msg('旧密码与新密码一样');
				// 	return;
				// }
				this.$http.updateTradePassword({
					old_pwd: this.trade_password,
					new_pwd: this.new_trade_password,
					rep_pwd: this.again_trade_password
				}).then((data)=>{
					this.$api.msg(data.data.message);
					if(data.data.status == 1){
						this.trade_password = '';
						this.new_trade_password = '';
						this.again_trade_password = '';
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.form_box{
		padding: 30rpx;
		box-sizing: border-box;
		.basic_title{
			color: #999;
			font-size: 28rpx;
			padding-bottom: 15rpx;
			border-bottom: 1px solid #f2f2f2;
		}
	}
	.submit_btn{
		margin: 50rpx;
	}
</style>
