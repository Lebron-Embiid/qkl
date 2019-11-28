<template>
	<view class="bankCard">
		<uni-nav-bar left-icon="back" leftText="返回" title="添加银行卡" :backgroundColor="background" :color="color" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar></common-avatar>
		<view class="bankCard_box">
			<!-- <view class="bank_title">*请绑定持卡人本人的银行卡，姓名一经填写不可修改!</view> -->
			<view class="bank_item">
				<text>持卡人姓名</text>
				<input type="text" placeholder="持卡人姓名" v-model="card_name">
			</view>
			<view class="bank_item">
				<text>开户银行</text>
				<view class="">
					<picker @change="bindPickerChange" :range="array">
						<view class="uni-input">{{bank_type}}</view>
					</picker>
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
			<button type="primary">添加</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				color: '#333',
				background: '#fff',
				array: ['中国工商银行', '中国农业银行', '中国建设银行'],
				bank_type: '请选择开户银行',
				card_name: '',
				card_number: '',
				card_bank: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar
		},
		methods:{
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.bank_type = this.array[e.target.value];
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
			text{
				display: block;
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
