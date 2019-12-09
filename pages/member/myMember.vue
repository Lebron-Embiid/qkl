<template>
	<view class="myMember">
		<uni-nav-bar title="我的会员" :rightDot="dot" :rightIcon="rightIcon"></uni-nav-bar>
		<common-avatar :name="name" :avatar="avatar"></common-avatar>
		<view class="my_member_box">
			<view class="my_member_item first">
				<image src="/static/member_icon4.png" mode="widthFix"></image>
				<view class="right_area">
					<view class="member_txt">会员人数：</view>
					<view class="member_money">{{person_num}}</view>
				</view>
			</view>
			<view class="my_member_item" @tap="toDividend">
				<image src="/static/member_icon3.png" mode="widthFix"></image>
				<view class="right_area">
					<view class="member_txt">团队分红：</view>
					<view class="member_money">$ {{dividend}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="my_member_list">
			<view class="my_member_list_item" v-for="(item,index) in memberList" :key="index">
				<view class="my_member_nav" :class="[item.current==true?'active':'']" @tap="changeTitle(index)">
					<text>{{item.title}}</text>
					<image src="/static/down.svg" mode="widthFix"></image>
				</view>
				<view class="my_member_content" :class="[item.current==true?'active':'']">
					<uni-transition :mode-class="['slide-top','fade']" :show="item.current">
						<view class="my_member_content_item" v-for="(list,idx) in item.list" :key="idx">
							<image :src="list.avatar" mode="widthFix"></image>
							<view class="member_content_right">
								<view>会员ID：{{list.member_id}}</view>
								<view>昵称：{{list.name}}</view>
								<view>上级：{{list.superior}}</view>
								<view>投资总额：{{list.price}}</view>
								<view>加入时间：{{list.time}}</view>
								<button type="primary" @tap="transferMoney(index,idx)">转款</button>
							</view>
						</view>
					</uni-transition>
				</view>
			</view>
		</view> -->
		<view class="my_member_box_tree">
			<view class="tree" v-for="(one,index) in treeList" :key="index">
				<view class="leaf-node first" @tap="transferMoney(index)">
					<image :src="url+'Public/home/wap/heads/default_avatar.svg'" mode="widthFix"></image>
					<view>昵称：{{one.name}}</view>
					<text class="active">投资：{{one.price}}</text>
				</view>
				<view class="tree" v-for="(two,idx) in one.children" v-if="one.children.length != 0" :key="idx">
					<view class="leaf-node middle" @tap="transferMoney(index,idx)">
						<image :src="url+'Public/home/wap/heads/default_avatar.svg'" mode="widthFix"></image>
						<view>昵称：{{two.name}}</view>
						<text class="active">投资：{{two.price}}</text>
					</view>
					<view class="tree" v-for="(three,ix) in two.children" v-if="two.children.length != 0" :key="ix">
						<view class="leaf-node last" @tap="transferMoney(index,idx,ix)">
							<image :src="url+'Public/home/wap/heads/default_avatar.svg'" mode="widthFix"></image>
							<view>昵称：{{three.name}}</view>
							<text>投资：{{three.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup_box">
				<view class="popup_content">
					<view class="popup_title">转款到对方APP钱包</view>
					<view class="popup_info">您将把资金转入到会员 {{member_name}} APP钱包</view>
					<input type="text" v-model="price" placeholder="请输入转款金额" />
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
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonAvatar from "@/components/commonAvatar.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniTransition from "@/components/uni-transition/uni-transition.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				rightIcon: '/static/ling.png',
				dot: true,
				
				name: '',
				member_name: '',
				avatar: '',
				person_num: 0,
				dividend: 800000,
				price: '',
				pay_pwd: '',
				memberList: [
					// {
					// 	title: '直推一级会员',
					// 	current: false,
					// 	list: [
					// 		{
					// 			avatar: '/static/avatar.png',
					// 			member_id: 'SLM00001',
					// 			name: 'Peter',
					// 			superior: 'Nick',
					// 			price: 30000,
					// 			time: '2019/11/23  09：00'
					// 		},{
					// 			avatar: '/static/avatar.png',
					// 			member_id: 'SLM00001',
					// 			name: 'Peter',
					// 			superior: 'Nick',
					// 			price: 30000,
					// 			time: '2019/11/23  09：00'
					// 		}
					// 	]
					// },{
					// 	title: '二级会员',
					// 	current: false,
					// 	list: [
					// 		{
					// 			avatar: '/static/avatar.png',
					// 			member_id: 'SLM00001',
					// 			name: 'Peter',
					// 			superior: 'Nick',
					// 			price: 30000,
					// 			time: '2019/11/23  09：00'
					// 		}
					// 	]
					// },{
					// 	title: '三级会员',
					// 	current: false,
					// 	list: [
					// 		{
					// 			avatar: '/static/avatar.png',
					// 			member_id: 'SLM00001',
					// 			name: 'Peter',
					// 			superior: 'Nick',
					// 			price: 30000,
					// 			time: '2019/11/23  09：00'
					// 		}
					// 	]
					// }
				],
				treeList: [],
				url: ''
			}
		},
		components:{
			uniNavBar,
			commonAvatar,
			uniPopup,
			uniTransition
		},
		onLoad() {
			this.$http.getHeadImg().then((data)=>{
				this.avatar = data.data.img_url;
				getApp().globalData.avatar = data.data.img_url;
				if(data.data.img_url == 'toux-icon.png'){
					this.avatar = this.$http.url+'Public/home/wap/heads/default_avatar.svg';
					getApp().globalData.avatar = this.$http.url+'Public/home/wap/heads/default_avatar.svg';
				}
			})
			this.$http.getNetList().then((data)=>{
				// console.log(data.data);
				// this.person_num = 
				this.treeList = [data.data];
				// console.log(this.treeList);
			})
			this.url = this.$http.url;
		},
		onShow() {			
			this.avatar = getApp().globalData.avatar;
			if(uni.getStorageSync('token') == ''){
				this.$api.msg('请登录');
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/login/login'
					})
				},1500)
			}else{
				this.$http.getUserInfo().then((data)=>{
					this.name = data.data.username;
					if(data.data.username == ''){
						this.name = data.data.mobile;
					}
				})
				this.$http.getNetList().then((data)=>{
					// console.log(data.data);
					// this.person_num = 
					this.treeList = [data.data];
				})
			}
			uni.removeTabBarBadge({
				index: 3
			})
		},
		methods:{
			changeTitle(idx){
				this.memberList[idx].current = !this.memberList[idx].current;
			},
			transferMoney(index,idx,ix){
				// this.name = this.memberList[index].list[idx].name;
				// console.log(index,idx,ix);
				// this.$refs.popup.open();
				if(idx == undefined && ix == undefined){
					this.treeList = this.treeList;
					// console.log(this.treeList);
					// this.member_name = this.treeList[index].name;
					return;
				}
				if(ix == undefined){
					this.treeList = [this.treeList[index].children[idx]];
					// console.log(this.treeList);
					// this.member_name = this.treeList[index].children[idx].name;
					return;
				}
				if(idx != undefined && ix != undefined){
					this.treeList = [this.treeList[index].children[idx].children[ix]];
					// console.log(this.treeList);
					// this.member_name = this.treeList[index].children[idx].children[ix].name;
					return;
				}
			},
			cancelPopup(){
				this.$refs.popup.close();
			},
			okPopup(){
				this.$refs.popup.close();
			},
			toDividend(){
				uni.navigateTo({
					url: '/pages/mine/dividend?index=1'
				})
			}
		},
		onPullDownRefresh() {
			this.$http.getNetList().then((data)=>{
				this.treeList = [data.data];
				uni.stopPullDownRefresh();
			})
		}
	}
</script>

<style scoped lang="scss">
	.my_member_box_tree{
		padding: 50rpx 0;
		.tree {
		  display: flex;
		  flex-wrap: wrap;
		  view {
			width: 100%;
			text-align: center;
		  }
		  .tree {
			width: 50%;
		  }
		  .leaf-node{
			  color: #333;
			  font-size: 26rpx;
			  margin-bottom: 90rpx;
			  image{
				  display: block;
				  width: 80rpx;
				  height: 80rpx;
				  border-radius: 50%;
				  margin: 0 auto 10rpx;
			  }
			  text{
				  display: block;
				  width: 100%;
				  color: #999;
				  position: relative;
			  }
			  &.middle{
				  margin-bottom: 120rpx;
			  }
			  &.first,&.middle{
				  text{
					  display: inline-block;
					  &:before,&:after{
						  content: "";
						  position: absolute;
						  width: 80rpx;
						  height: 1px;
						  background: #999;
						  display: none;
					  }
					  &.active:before,&.active:after{
						  display: block;
					  }
					  &:before{
						  transform: rotate(140deg);
						  left: 30%;
						  top: 80rpx;
					  }
					  &:after{
						  transform: rotate(-140deg);
						  right: 30%;
						  top: 80rpx;
					  }
				  }
			  }
			  &.middle{
				  text{
					  &:before{
						  transform: rotate(105deg);
						  left: 20%;
						  top: 90rpx;
					  }
					  &:after{
						  transform: rotate(-105deg);
						  right: 20%;
						  top: 90rpx;
					  }
				  }
			  }
			  &.last{
				  margin-bottom: 0;
			  }
		  }
		}
	}
	.my_member_box{
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		flex-wrap: wrap;
		background: #000;
		padding: 0 10rpx 20rpx;
		box-sizing: border-box;
		.my_member_item{
			width: 49%;
			background: #666;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			box-sizing: border-box;
			color: #fff;
			font-size: 28rpx;
			&.first{
				background: #333;
			}
			image{
				display: block;
				width: 78rpx;
				height: 64rpx;
				margin-right: 40rpx;
			}
			.member_txt{
				margin-bottom: 10rpx;
			}
		}
	}
	.my_member_list{
		.my_member_nav{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #f2f2f2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333;
			font-size: 32rpx;
			image{
				display: block;
				width: 28rpx;
				height: 28rpx;
			}
			&.active{
				image{
					transform: rotateX(180deg);
					transform-origin: 50% 50%;
				}
			}
		}
		.my_member_content{
			padding: 0 20rpx;
			box-sizing: border-box;
			overflow: hidden;
			transition: all .5s linear;
			.my_member_content_item{
				display: none;
				padding: 30rpx 0 20rpx;
				box-sizing: border-box;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1px solid #ccc;
				&:last-child{
					border-bottom: 0;
				}
				image{
					display: block;
					width: 138rpx;
					height: 138rpx;
					border-radius: 50%;
					margin-right: 40rpx;
				}
				.member_content_right{
					width: 75%;
					color: #999;
					font-size: 24rpx;
					position: relative;
					view{
						margin-bottom: 10rpx;
					}
					button{
						margin: 0;
						width: 180rpx;
						height: 60rpx;
						line-height: 60rpx;
						box-sizing: border-box;
						font-size: 26rpx;
						background: #099;
						position: absolute;
						right: 0;
						top: 0;
						z-index: 1;
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
			}
			&.active{
				.my_member_content_item{
					display: flex;
				}
			}
		}
	}
</style>
