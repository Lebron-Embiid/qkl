<template>
	<view class="wallet">
		<view class="wallet_box">
			<view class="wallet_txt" :class="item.name" @tap="changeNav(index)" v-for="(item,index) in list" :key="index">{{item.title}}</view>
		</view>
		<uni-popup ref="popup" :maskClick="false" type="center">
			<view class="popup_box">
				<view class="popup_content">
					<view class="popup_title">
						<block v-if="current == 0">
						从APP钱包转入
						</block>
						<block v-if="current == 1">
						转出到APP钱包
						</block>
						<block v-if="current == 2 && isApp == false">
						钱包投资
						</block>
						<block v-if="current == 2 && isApp == true">
						钱包提现
						</block>
					</view>
					<view class="popup_info">
						<block v-if="current == 0 && isApp == false">
						您将从APP钱包转入到投资钱包上
						</block>
						<block v-if="current == 0 && isApp == true">
						您将把APP钱包资金转入到投资钱包
						</block>
						<block v-if="current == 1 && isApp == false">
						您将把投资钱包资金转入到APP钱包
						</block>
						<block v-if="current == 1 && isApp == true">
						您将把APP钱包资金转入到投资钱包
						</block>
						<block v-if="current == 2 && isApp == false">
						您将对投资钱包资金进行投资
						</block>
						<block v-if="current == 2 && isApp == true">
						您将对APP钱包资金进行提现申请
						</block>
					</view>
					
					<block v-if="current == 0">
						<view class="over_price">当前APP钱包余额</view>
						<view class="over_price_val">$ {{over_money}}</view>
					</block>
					
					<input type="text" v-model="price" :placeholder="placeholder" />
					<input type="password" v-model="pay_pwd" placeholder="请输入支付密码" />
				</view>
				<view class="popup_btn">
					<view @tap="cancelPopup">取消</view>
					<view class="ok" @tap="okPopup">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		name: 'commonWallet',
		data(){
			return{
				current: 0,
				price: '',
				pay_pwd: '',
				placeholder: "请输入转入金额"
			}
		},
		props:{
			over_money:{
				type: String,
				default: ''
			},
			// 是否是APP钱包页面
			isApp:{
				type: Boolean,
				default: false
			},
			list:{
				type: Array,
				default: () => []
			}
		},
		components:{
			uniPopup
		},
		methods:{
			changeNav(idx){
				this.current = idx;
				this.$refs.popup.open();
				console.log(this.current,this.isApp);
				if(this.current == 0){
					this.placeholder = "请输入转入金额";
				}
				if(this.current == 1){
					this.placeholder = "请输入转出金额";
				}
				if(this.current == 2 && this.isApp == true){
					this.placeholder = "请输入申请提现金额"
				}
				if(this.current == 2 && this.isApp == false){
					this.placeholder = "请输入投资金额"
				}
			},
			cancelPopup(){
				this.$refs.popup.close();
				this.pay_pwd = '';
				this.price = '';
			},
			okPopup(){
				this.$Debounce.canDoFunction({
					key: "investment",
					time: 1500,
					success:()=>{
						// 投资钱包转入
						if(this.current == 0 && this.isApp == false){
							this.$http.changeInvestmentinto({
								sec_password: this.pay_pwd,
								money: this.price,
								type: 1
							}).then((data)=>{
								console.log('投资转入：');
								this.$api.msg(data.data.message);
								if(data.data.status == 1){
									this.$refs.popup.close();
									this.pay_pwd = '';
									this.price = '';
								}
							})
						}
						// 投资钱包转出
						if(this.current == 1 && this.isApp == false){
							this.$http.changeInvestmentinto({
								sec_password: this.pay_pwd,
								money: this.price,
								type: 2
							}).then((data)=>{
								console.log('投资转出：');
								this.$api.msg(data.data.message);
								if(data.data.status == 1){
									this.$refs.popup.close();
									this.pay_pwd = '';
									this.price = '';
								}
							})
						}
						// APP钱包转入
						if(this.current == 0 && this.isApp == true){
							this.$http.changeInvestmentinto({
								sec_password: this.pay_pwd,
								money: this.price,
								type: 2
							}).then((data)=>{
								console.log('投资转入：');
								this.$api.msg(data.data.message);
								if(data.data.status == 1){
									this.$refs.popup.close();
									this.pay_pwd = '';
									this.price = '';
								}
							})
						}
						// APP钱包转出
						if(this.current == 1 && this.isApp == true){
							this.$http.changeInvestmentinto({
								sec_password: this.pay_pwd,
								money: this.price,
								type: 1
							}).then((data)=>{
								console.log('投资转出：');
								this.$api.msg(data.data.message);
								if(data.data.status == 1){
									this.$refs.popup.close();
									this.pay_pwd = '';
									this.price = '';
								}
							})
						}
						// 投资
						if(this.current == 2 && this.isApp == false){
							this.$http.changeInvestment({
								sec_password: this.pay_pwd,
								money: this.price
							}).then((data)=>{
								this.$api.msg(data.data.message);
								if(data.data.status == 1){
									this.$refs.popup.close();
									this.pay_pwd = '';
									this.price = '';
								}
							})
						}
						// 提现
						if(this.current == 2 && this.isApp == true){
							this.$http.changeInvestment({
								sec_password: this.pay_pwd,
								money: this.price
							}).then((data)=>{
								this.$api.msg(data.data.message);
								if(data.data.status == 1){
									this.$refs.popup.close();
									this.pay_pwd = '';
									this.price = '';
								}
							})
						}
						this.$emit('updateMoney');
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.wallet_box{
		padding: 0 10rpx 10rpx;
		box-sizing: border-box;
		background: #000;
		color: #fff;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.wallet_txt{
			width: 32%;
			height: 138rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #999;
			border-radius: 10rpx;
			&.first{
				background: #666;
			}
			&.active{
				background: #333;
			}
		}
	}
</style>
