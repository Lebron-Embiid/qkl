<template>
	<view class="bankList">
		<uni-nav-bar left-icon="back" leftText="返回" title="我的银行卡"></uni-nav-bar>
		<view class="bank_info" v-for="(item,index) in bankList" :key="index">
			<view class="bank_left">
				<image :src="url+item.banq_img" mode="widthFix"></image>
				<view class="bank_txt">
					<view class="bank_name">{{item.banq_genre}}</view>
					<text>{{item.card_number}}</text>
				</view>
			</view>
			<view class="del_txt" @tap="deleteBank(item.id)">删除</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				url: '',
				bankList: [],
			}
		},
		components:{
			uniNavBar
		},
		onLoad() {
			this.url = this.$http.url;
			this.$http.userBankList({
				limit: 10
			}).then((data)=>{
				this.bankList = data.data;
			})
		},
		methods:{
			deleteBank(id){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除该银行卡？',
					success:function(res){
						if(res.confirm){
							that.$http.delBank({
								id: id
							}).then((data)=>{
								that.$api.msg(data.data.message);
								that.$http.userBankList().then((data)=>{
									that.bankList = data.data;
								})
							})
						}
					}
				})
			}
		}
		// onPullDownRefresh() {
		// 	this.$http.userBankList({
		// 		page: this.page,
		// 		limit: 10
		// 	}).then((data)=>{
		// 		this.bankList = data.data;
		// 		uni.stopPullDownRefresh();
		// 	})
		// },
		// onReachBottom() {
		// 	this.page++;
		// 	this.$http.userBankList({
		// 		page: this.page,
		// 		limit: 10
		// 	}).then((data)=>{
		// 		console.log(data.data);
		// 		if(data.data.length == 0){
		// 			this.loadingType="noMore";
		// 			return;
		// 		}
		// 		this.bankList = this.bankList.concat(data.data);
		// 	})
		// }
	}
</script>

<style scoped lang="scss">
	.bank_info{
		border: 0;
		margin-top: 10rpx;
		margin-bottom: 0;
		border-bottom: 1px solid #ccc;
	}
</style>
