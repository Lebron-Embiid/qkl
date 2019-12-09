<template>
	<view class="increase">
		<uni-nav-bar left-icon="back" leftText="返回" title="加额" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="member_info_box">
			<view class="member_list">
				<view class="member_item" @tap="toListLink(index)" v-for="(item,index) in memberList" :key="index">
					<image :src="item.icon" mode="widthFix"></image>
					<view class="right_area">
						<view class="member_txt">{{item.title}}：</view>
						<view class="member_money">$ {{item.value}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="increase_apply">
			<text>加额申请</text>
			<button type="primary" v-if="is_pass == 0">请申请汇款账号</button>
			<button type="primary" class="black" v-if="is_pass == 1" @tap="lookAccount">查看汇款账号</button>
		</view>
		<view class="increase_before" v-if="is_pass == 0 && is_apply == 0">
			<image src="/static/warning.svg" mode="widthFix"></image>
			<view class="ib_title">第一步：向平台申请汇款账号</view>
			<view class="ib_info">提交申请后，我们会在24小时内给你提供汇款账号，敬请留意。</view>
			<button type="primary" @tap="apply">申请汇款账号</button>
		</view>
		<view class="increase_before" v-if="is_apply == 1">
			<image src="/static/waiting.svg" mode="widthFix"></image>
			<view class="ib_title">等待处理</view>
			<view class="ib_info">已提交申请，等待系统处理</view>
			<button type="primary" v-if="is_pass == 0">汇款账号申请中</button>
			<button type="primary" class="black" v-else>汇款确认中</button>
		</view>
		<view class="increase_after" v-if="is_pass == 1 && is_apply == 0">
			<view class="form_item">
				<view class="icon no"><image src="/static/add.png" mode="widthFix"></image></view>
				<view class="right_box all">
					<view class="ipt_box">
						<input type="text" placeholder="请输入加额金额" v-model="price" />
					</view>
				</view>
			</view>
			<view class="form_item add_upload">
				<view class="add_btn" @tap="uploadImg">
					<image src="/static/add.svg" class="add_icon" v-if="photo==''" mode="widthFix"></image>
					<image :src="photo" v-else mode="widthFix"></image>
				</view>
				<text>上传汇款单</text>
			</view>
			<view class="form_item">
				<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
				<view class="right_box">
					<view class="ipt_box">
						<input type="password" placeholder="请输入支付密码" v-if="input_type == 0" v-model="password" />
						<input type="text" placeholder="请输入支付密码" v-else v-model="password" />
					</view>
					<switchc text="可见|***" class="switch_btn" :sid="0" @change="switchchange"></switchc>
				</view>
			</view>
			<button class="submit_btn" form-type="submit" @tap="applyConfirm">申请确认</button>
			<button class="submit_btn history_btn" @tap="toHistory">历史充值</button>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup_box">
				<view class="popup_content">
					<view class="popup_title">平台汇款账号</view>
					<view class="popup_info">请您先往以下账号汇款，然后向平台上传汇款单以此凭证，平台将会在24小时内审核。</view>
					<view class="look_info_box">
						<view>户名：{{bank_name}}</view>
						<view>开户行：{{bank_type}}</view>
						<view>银行账号：{{bank_account}}</view>
						<button type="primary" @tap="copyAccount">复制账号</button>
					</view>
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
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				name: '',
				avatar: '',
				memberList: [
					{
						icon: '/static/member_icon1.png',
						title: '投资钱包',
						url: '/pages/mine/investWallet',
						value: ''
					},{
						icon: '/static/member_icon2.png',
						title: 'APP钱包',
						url: '/pages/mine/wallet',
						value: ''
					}
				],
				is_apply: 0,	//是否点击申请按钮
				is_pass: 1,		//是否申请成功
				price: '',
				password: '',
				input_type: '',
				photo: '',
				bank_name: '',
				bank_type: '',
				bank_account: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			switchc,
			uniPopup
		},
		onLoad() {
			this.$http.getInvestment().then((data)=>{
				let res = data.data;
				this.memberList[0].value = res.bonus.bonus1;
				this.memberList[1].value = res.bonus.bonus0;
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
			this.$http.userBankList({limit: 1}).then((data)=>{
				// console.log(data.data);
				if(data.data.length != 0){
					this.bank_name = data.data[0].hold_name;
					this.bank_type = data.data[0].banq_genre;
					this.bank_account = data.data[0].card_number;
				}
			})
		},
		methods:{
			toListLink(idx){
				uni.navigateTo({
					url: this.memberList[idx].url
				})
			},
			apply(){
				this.is_apply = 1;
			},
			switchchange(e){
				console.log(e);
				if(e.value == true){
					this.input_type = 1;
				}else{
					this.input_type = 0;
				}
			},
			uploadImg(){
				let that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						uni.uploadFile({
							url: that.$http.url+'Recharge/uploadFiles', //图片接口
							filePath: res.tempFilePaths[0],
							name: 'file',
							header:{
								'AUTHORIZATION': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								// console.log(data);
								if(data.message.stats == 'error'){
									that.$api.msg(data.message.res);
									return;
								}
								if(data.status == 1){
									var url = that.$http.url+data.message.path;
									that.photo = url;
								}
							}
						});
				    }
				});
			},
			copyAccount(){
				let that = this;
				if(that.bank_account == ""){
					that.$api.msg('暂无银行卡账户，请先去添加');
					return;
				}
				// #ifndef H5
				uni.setClipboardData({
				    data: that.bank_account,
				    success: function () {
				        console.log('success');
						that.$api.msg('复制成功，快去粘贴吧！');
				    }
				});
				uni.getClipboardData({
				    success: function (res) {
				        console.log(res.data);
				    }
				});
				// #endif
				
				// #ifdef H5
				uni.setClipboardData({ data:that.bank_account, success:function(data){
						that.$api.msg('复制成功，快去粘贴吧！');
					}
				})
				// #endif
			},
			applyConfirm(){
				this.$Debounce.canDoFunction({
					key: "addRecharge",
					time: 1500,
					success:()=>{
						this.$http.addRecharge({
							money: this.price,
							files: this.photo,
							sec_password: this.password
						}).then((data)=>{
							this.$api.msg(data.data.message);
							if(data.data.status == 1){
								setTimeout(()=>{
									this.is_apply = 1;
								},1500)
							}
						})
					}
				})
			},
			lookAccount(){
				this.$refs.popup.open();
			},
			cancelPopup(){
				this.$refs.popup.close();
			},
			okPopup(){
				this.$refs.popup.close();
			},
			toHistory(){
				uni.navigateTo({
					url: '/pages/member/historyList?type=2'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.member_info_box{
		background: #000;
		padding: 0 10rpx 10rpx;
		box-sizing: border-box;
		.avatar_img{
			display: block;
			width: 138rpx;
			height: 138rpx;
			border-radius: 50%;
			margin: 0 auto 20rpx;
		}
		.member_name{
			color: #ccc;
			font-size: 24rpx;
			text-align: center;
			margin-bottom: 20rpx;
		}
		.member_list{
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			flex-wrap: wrap;
			.member_item{
				width: 50%;
				background: #666;
				margin-bottom: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20rpx 0;
				box-sizing: border-box;
				color: #fff;
				font-size: 28rpx;
				&:nth-child(2n){
					background: #333;
				}
				image{
					display: block;
					width: 78rpx;
					height: 64rpx;
					margin-right: 30rpx;
				}
				.member_txt{
					margin-bottom: 10rpx;
				}
			}
		}
	}
	.increase_apply{
		height: 100rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		background: #999;
		button{
			width: 286rpx;
			height: 76rpx;
			line-height: 76rpx;
			background: #ccc;
			color: #666;
			font-weight: normal;
			font-size: 24rpx;
			margin: 0;
			border-radius: 6rpx;
			&:after{
				border: 0;
			}
			&.black{
				background: #333;
				color: #fff;
			}
		}
	}
	.increase_before{
		padding: 100rpx 100rpx 30rpx;
		box-sizing: border-box;
		text-align: center;
		image{
			display: block;
			width: 120rpx;
			height: 120rpx;
			margin: 0 auto 30rpx;
		}
		.ib_title{
			color: #666;
			font-size: 36rpx;
		}
		.ib_info{
			color: #999;
			font-size: 28rpx;
			width: 100%;
			margin: 5rpx auto 50rpx;
		}
		button{
			height: 90rpx;
			line-height: 90rpx;
			background: #099;
			color: #fff;
			font-size: 32rpx;
			border-radius: 50rpx;
			transition: background .5s ease;
			&:active{
				background: #1ABC9C;
			}
			&.black{
				background: #999;
			}
			&:after{
				border: 0;
			}
		}
	}
	.increase_after{
		padding: 60rpx 100rpx 30rpx;
		box-sizing: border-box;
	}
	.add_upload{
		align-items: flex-start;
		color: #999;
		font-size: 24rpx;
		.add_btn{
			border: 1px solid #d7dde4;
			box-sizing: border-box;
			width: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			image{
				display: block;
				width: 200rpx;
				height: 200rpx !important;
			}
			.add_icon{
				width: 56rpx;
				height: 56rpx;
			}
		}
	}
	.submit_btn{
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}
	
	.look_info_box{
		border-top: 1px solid #ccc;
		padding-top: 30rpx;
		view{
			color: #666;
			font-size: 28rpx;
			margin-bottom: 10rpx;
		}
		button{
			width: 80%;
			height: 80rpx;
			line-height: 80rpx;
			background: #099;
			font-size: 28rpx;
			margin: 50rpx auto;
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
	
	.history_btn{
		background: #666 !important;
		margin: 30rpx 0 0 !important;
	}
</style>
