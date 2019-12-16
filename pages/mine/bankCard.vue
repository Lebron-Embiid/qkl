<template>
	<view class="bankCard">
		<uni-nav-bar left-icon="back" leftText="返回" title="银行账号" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="bankCard_box">
			<!-- <view class="bank_title">*请绑定持卡人本人的银行卡，姓名一经填写不可修改!</view> -->
			<view class="bank_item">
				<text>持卡人姓名</text>
				<input type="text" placeholder="持卡人姓名" v-model="card_name">
			</view>
			<view class="bank_item">
				<text>开户银行</text>
				<view class="bank_box">
					<input type="text" class="area" placeholder="请输入国家" v-model="bank_county">
					-
					<input type="text" class="val" placeholder="请输入开户银行" v-model="bank_type">
					<!-- <picker @change="bindPickerChange" range-key="banq_genre" :range="array">
						<view class="uni-input">{{bank_txt}}</view>
					</picker> -->
				</view>
			</view>
			<view class="bank_item">
				<text>银行卡号</text>
				<input type="text" placeholder="输入银行卡号" v-model="card_number">
			</view>
			<view class="bank_item">
				<text>开户支行</text>
				<input type="text" placeholder="输入开户支行" v-model="card_bank">
			</view>
			<button type="primary" @tap="addCard">添加</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '',
				array: [],
				bank_type: '',
				bank_txt: '请输入开户银行',
				card_name: '',
				bank_id: '',
				card_number: '',
				card_bank: '',
				bank_county: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		onLoad() {
			this.$http.getBank().then((data)=>{
				console.log(data.data);
				this.array = data.data;
			})
		},
		onShow(){
			this.avatar = getApp().globalData.avatar;
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
		},
		methods:{
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.bank_txt = this.array[e.target.value].banq_genre;
				this.bank_id = this.array[e.target.value].q_id;
			},
			addCard(){
				this.$Debounce.canDoFunction({
					key: "addBank",
					time: 1500,
					success:()=>{
						this.$http.addBank({
							real_name: this.card_name,
							bank_id: this.bank_type,
							bank_account: this.card_number,
							open_card: this.card_bank,
							is_default: 1,
							country: this.bank_county
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								this.card_name = '';
								this.bank_id = '';
								this.bank_type = '';
								this.card_number = '';
								this.card_bank = '';
								this.bank_county = ''
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bankCard_box{
		color: #999;
		font-size: 24rpx;
		padding: 30rpx 0;
		.bank_title{
			padding: 20rpx 30rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #ccc;
		}
		.bank_item{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #ccc;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.bank_box{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 65%;
				.area{
					width: 30%;
					margin-right: 10rpx;
				}
				.val{
					margin-left: 10rpx;
				}
			}
			text{
				display: block !important;
				width: 25%;
			}
			input{
				color: #999;
				font-size: 24rpx;
			}
		}
		button{
			width: 80%;
			height: 80rpx;
			line-height: 80rpx;
			background: #666;
			font-size: 26rpx;
			border-radius: 10rpx;
			margin-top: 50rpx;
			color: #fff;
			transition: all .5s ease;
			&:active{
				opacity: .8;
			}
			&:after{
				border: 0;
			}
		}
	}
</style>
