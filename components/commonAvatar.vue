<template>
	<view class="commonAvatar">
		<view class="mine_top">
			<image :src="user_avatar" class="avatar_img" mode="widthFix"></image>
			<text>{{name}}</text>
			<image src="/static/left_bg.png" class="bg left_bg" mode="widthFix"></image>
			<image src="/static/right_bg.png" class="bg right_bg" mode="widthFix"></image>
			<view v-if="has_edit_avatar" class="avatar_btn" @tap="changeAvatar">修改头像</view>
		</view>
		<uni-popup class="uni-popup" ref="popup_avatar" type="center">
			<view class="popup_avatar_box">
				<radio-group @change="radioChange">
					<label v-for="(item,index) in sex" :key="index">
						<radio :value="item.value" color="#1ABC9C" :checked="item.checked" /> {{item.name}}
					</label>
				</radio-group>
				<view class="avatar_select" v-for="(item,index) in avatarList" :key="index" v-if="current == index">
					<view class="img" :class="[current==index && select==idx?'active':'']" v-for="(img,idx) in item" :key="idx" @tap="selectAvatar(index,idx)">
						<image class="icon" :src="img" mode="widthFix"></image>
						<image class="selected" :class="[current==index && select==idx?'active':'']" src="/static/select.svg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		name: 'commonAvatar',
		data(){
			return{
				user_name: '',
				user_avatar: '/static/avatar.png',
				sex: [
					{
						name: '男',
						value: 'male',
						checked: true
					},{
						name: '女',
						value: 'famale'
					}
				],
				current: 0,
				avatarList: [
					[
						'/static/avatar/avatar_m1.svg',
						'/static/avatar/avatar_m2.svg',
						'/static/avatar/avatar_m3.svg',
						'/static/avatar/avatar_m4.svg',
						'/static/avatar/avatar_m3.svg',
						'/static/avatar/avatar_m4.svg'
					],[
						'/static/avatar/avatar_w1.svg',
						'/static/avatar/avatar_w2.svg',
						'/static/avatar/avatar_w3.svg',
						'/static/avatar/avatar_w4.svg',
						'/static/avatar/avatar_m3.svg',
						'/static/avatar/avatar_m4.svg'
					]
				],
				select: null
			}
		},
		components:{
			uniPopup
		},
		props:{
			name: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ''
			},
			has_edit_avatar: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			this.user_avatar = this.avatar;
		},
		methods:{
			// update(){
				// this.$http.getUserInfo().then((data)=>{
				// 	this.name = data.data.username;
				// })
			// },
			changeAvatar(){
				// let that = this;
				// uni.chooseImage({
				//     count: 1, //默认9
				//     sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				//     sourceType: ['album'], //从相册选择
				//     success: function (res) {
				//         that.urlTobase64(res.tempFilePaths[0])
				//     }
				// });
				this.$refs.popup_avatar.open();
			},
			urlTobase64(url){
				let that = this;
				uni.request({
					url: url,
					method:'GET',
					responseType: 'arraybuffer',
					success: ress => {
						let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
						console.log(base64);
						
						that.$http.updateimgUps({
							dataflow: base64
						}).then((data)=>{
							that.$api.msg(data.data.message);
						})
					}
				})
			},
			radioChange(evt) {
				for (let i = 0; i < this.sex.length; i++) {
					if (this.sex[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				console.log(this.current);
				if(this.select != null){
					this.user_avatar = this.avatarList[this.current][this.select];					
				}
			},
			selectAvatar(index,idx){
				this.select = idx;
				this.user_avatar = this.avatarList[index][idx];
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine_top{
		position: relative;
		padding: 50rpx 0 20rpx;
		background: #000;
		box-sizing: border-box;
		text-align: center;
		color: #ccc;
		font-size: 24rpx;
		text{
			display: block;
			min-height: 16rpx;
			text-align: center;
			background: #000 !important;
		}
		.avatar_img{
			display: block;
			width: 138rpx !important;
			height: 138rpx !important;
			margin: 0 auto 20rpx;
		}
		.bg{
			position: absolute;
			display: block;
			width: 94rpx;
			height: 100% !important;
			top: 0;
		}
		.left_bg{
			left: 0;
		}
		.right_bg{
			right: 0;
		}
		.avatar_btn{
			margin: 20rpx auto 10rpx;
			background: #1ABC9C;
			color: #fff;
			border-radius: 8rpx;
			width: 140rpx;
			height: 50rpx;
			line-height: 50rpx;
		}
	}
	.popup_avatar_box{
		background: #fff;
		padding: 30rpx 30rpx 50rpx;
		width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		radio-group{
			display: flex;
			justify-content: center;
			align-items: center;
			label{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 30%;
				font-size: 28rpx;
				radio{
					transform: scale(.7);
					margin-top: 5rpx;
				}
			}
		}
		.avatar_select{
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			margin-top: 50rpx;
			.img{
				width: 124rpx;
				height: 124rpx;
				border: 2rpx solid #ccc;
				box-sizing: border-box;
				border-radius: 50%;
				margin-right: 30rpx;
				margin-bottom: 30rpx;
				position: relative;
				&.active{
					border-color: #1ABC9C;
				}
				&:nth-child(4n){
					margin-right: 0;
				}
				.selected{
					display: none;
					width: 30rpx;
					height: 30rpx;
					position: absolute !important;
					left: 50%;
					bottom: -18rpx;
					transform: translateX(-50%);
					&.active{
						display: block;
					}
				}
				.icon{
					display: block;
					width: 120rpx !important;
					height: 120rpx !important;
					border-radius: 50%;
				}
			}
		}
	}
</style>
