<template>
	<uni-popup ref="popup" type="center">
		<view class="popup_box">
			<view class="popup_content">
				<view class="popup_title">转出到现金钱包</view>
				<view class="popup_info">您将把分红资金转入到现金钱包</view>
				<input type="text" v-model="price" placeholder="请输入转出金额" />
				<input type="password" v-model="pay_pwd" placeholder="请输入支付密码" />
			</view>
			<view class="popup_btn">
				<view>取消</view>
				<view class="ok">确定</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			uniPopup
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
