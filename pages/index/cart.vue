<template>
	<view>
		<uni-nav-bar left-icon="back" leftText="返回" title="购物车"></uni-nav-bar>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
            <view class="row" v-for="(row,index) in goodsList" :key="index" >
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(row.gid)">
					<view class="icon shanchu"></view>
				</view>
				<!-- 商品 -->
				<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- checkbox -->
					<view class="checkbox-box" @tap="selected(index)">
						<view class="checkbox">
							<view :class="[row.selected==true?'on':'']"></view>
						</view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info" @tap="toGoods(row.gid)">
						<view class="img">
							<image :src="url+row.pic" mode="widthFix"></image>
						</view>
						<view class="info">
							<view class="title">{{row.name}}</view>
							<!-- <view class="spec">{{row.spec}}</view> -->
							<view class="price-number">
								<view class="price">${{row.price}}</view>
								<view class="number">
									<view class="sub" @tap.stop="sub(index)">
										<view class="icon jian"></view>
									</view>
									<view class="input" @tap.stop="discard">
										<input type="number" v-model="row.num" @blur="sumBlur(index)" @input="sum($event,index)" />
									</view>
									<view class="add"  @tap.stop="add(index)">
										<view class="icon jia"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
        </view>
		<!-- 脚部菜单 -->
		<view class="footer" :style="{bottom:footerbottom}">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected==false?'':'on']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view>
			<view class="settlement">
				<view class="sum">合计:<view class="money">${{sumPrice}}</view></view>
				<view class="btn" @tap="toConfirmation">结算({{selectedList.length}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default {
		data() {
			return {
				sumPrice:'0.00',
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				selectedList:[],
				numList: [],
				isAllselected:false,
				goods: [],
				goodsList:[],
				//控制滑动效果
				theIndex:null,
				oldIndex:null,
				isStop:false,
				url: ''
			}
		},
		components:{
			uniNavBar
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			this.url = this.$http.url;
			//兼容H5下结算条位置
			// #ifdef H5
				this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onShow() {
			this.$http.getCar().then((data)=>{
				// console.log(data.data);
				let goodsList = [];
				let res = data.data.list;
				let arr = [];
				for(let i in res){
					arr.push(res[i])
				}
				this.goods = arr;
				for(var i=0;i<arr.length;i++){
					goodsList.push({
						gid: arr[i].gid,
						name: arr[i].name,
						num: arr[i].num,
						pic: arr[i].pic,
						price: arr[i].price,
						selected: false
					})
				}
				this.selectedList = [];
				this.isAllselected = false;
				this.goodsList = goodsList;
				this.sum();
				console.log(this.goodsList);
			})
		},
		methods: {
			//加入商品 参数 goods:商品数据
			joinGoods(goods){
				/*
				* 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				* 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
				* 一般商城购物车的增删改动作是由后端来完成的,
				* 后端记录后返回前端更新前端缓存
				*/
				let len = this.goodsList.length;
				let isFind = false;//是否找到ID一样的商品
				for(let i=0;i<len;i++){
					let row = this.goodsList[i];
					if(row.id==goods.id )
					{	//找到商品一样的商品
						this.goodsList[i].number++;//数量自增
						isFind = true;//找到一样的商品
						break;//跳出循环
					}
				}
				if(!isFind){
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.goodsList[i].unshift(goods);
				}
			},
			//控制左滑删除效果-begin
			touchStart(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
			},
			touchMove(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				
				if(this.isStop||Math.abs(moveX)<5){
					return ;
				}
				if (Math.abs(moveY) > Math.abs(moveX)){
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}
				
				if(moveX<0){
					this.theIndex = index;
					this.isStop = true;
				}else if(moveX>0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex){
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(()=>{
							this.oldIndex = null;
						},150)
					}
				}
			},
			touchEnd(index,$event){
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end
			//商品跳转
			toGoods(id){
				console.log(id);
				uni.navigateTo({
					url: '/pages/index/detail?cid=' + id
				});
			},
			//跳转确认订单页面
			toConfirmation(){
				let tmpList=[];
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					if(this.goodsList[i].selected) {
						tmpList.push(this.goodsList[i]);
					}
				}
				if(tmpList.length<1){
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					});
					return ;
				}
				// uni.showLoading({
				// 	title:'正在提交订单...'
				// })
				this.$Debounce.canDoFunction({
					key: "addOrder",
					time: 1500,
					success:()=>{
						uni.navigateTo({
							url: '/pages/index/confirmation?id='+JSON.stringify(this.selectedList)+'&type=1'
						})
					}
				})
			},
			//删除商品
			deleteGoods(id){
				let ids = [];
				ids.push(id);
				console.log(JSON.stringify(ids));
				this.$http.delCar({
					g_id: JSON.stringify(ids)
				}).then((data)=>{
					this.$api.msg(data.data.message);
					this.$http.getCar().then((data)=>{
						let goodsList = [];
						let res = data.data.list;
						let arr = [];
						for(let i in res){
							arr.push(res[i])
						}
						console.log(arr);
						for(var i=0;i<arr.length;i++){
							goodsList.push({
								gid: arr[i].gid,
								name: arr[i].name,
								num: arr[i].num,
								pic: arr[i].pic,
								price: arr[i].price,
								selected: false
							})
						}
						this.goodsList = goodsList;
						this.sum();
					})
				})
				this.sum();
				this.oldIndex = null;
				this.theIndex = null;
			},
			// 删除商品s
			deleteList(){
				let that = this;
				let len = that.selectedList.length;
				let is_all = '';
				uni.showModal({
					title: '删除提示',
					content: '确定删除选中的商品？',
					success: (res)=>{
						if (res.confirm) {
							if(that.isAllselected == true){
								is_all = 1;
								that.$http.delCar({
									is_all: is_all
								}).then((data)=>{
									that.$api.msg(data.data.message);
									that.$http.getCar().then((data)=>{
										let goodsList = [];
										let res = data.data.list;
										let arr = [];
										for(let i in res){
											arr.push(res[i])
										}
										console.log(arr);
										for(var i=0;i<arr.length;i++){
											goodsList.push({
												gid: arr[i].gid,
												name: arr[i].name,
												num: arr[i].num,
												pic: arr[i].pic,
												price: arr[i].price,
												selected: false
											})
										}
										that.goodsList = goodsList;
										that.sum();
									})
								})
							}else{
								is_all = 0;
								that.$http.delCar({
									g_id: JSON.stringify(that.selectedList)
								}).then((data)=>{
									that.$api.msg(data.data.message);
									that.$http.getCar().then((data)=>{
										let goodsList = [];
										let res = data.data.list;
										let arr = [];
										for(let i in res){
											arr.push(res[i])
										}
										console.log(arr);
										for(var i=0;i<arr.length;i++){
											goodsList.push({
												gid: arr[i].gid,
												name: arr[i].name,
												num: arr[i].num,
												pic: arr[i].pic,
												price: arr[i].price,
												selected: false
											})
										}
										that.goodsList = goodsList;
										that.sum();
									})
								})
							}
							console.log(that.selectedList);
							
							// while (this.selectedList.length>0)
							// {
							// 	this.deleteGoods(this.selectedList[0]);
							// }
							that.selectedList = [];
							that.isAllselected = that.selectedList.length == that.goodsList.length && this.goodsList.length>0;
							that.sum();
						}
					}
				});
			},
			// 选中商品
			selected(index){
				console.log(index);
				for(let x in this.goodsList){
					this.numList[index] = this.goodsList[x].num;
				}
				console.log(this.goodsList[index].selected);
				this.goodsList[index].selected = !this.goodsList[index].selected;
				let i = this.selectedList.indexOf(this.goodsList[index].gid);
				i>-1?this.selectedList.splice(i, 1):this.selectedList.push(this.goodsList[index].gid);
				this.isAllselected = this.selectedList.length == this.goodsList.length;
				// if(this.selectedList.length == this.goodsList.length && this){
				// 	this.isAllselected = true;
				// }else{
				// 	this.isAllselected = false;
				// }
				this.sum();
			},
			//全选
			allSelect(){
				let len = this.goodsList.length;
				let arr = [];
				for(let i=0;i<len;i++){
					this.goodsList[i].selected = this.isAllselected? false : true;
					arr.push(this.goodsList[i].gid);
				}
				this.selectedList = this.isAllselected?[]:arr;
				this.isAllselected = !this.isAllselected;
				this.sum();
			},
			// 减少数量
			sub(index){
				console.log(index);
				if(this.goodsList[index].num<=1){
					return;
				}
				this.goodsList[index].num--;
				this.$http.editCar({
					g_id: this.goodsList[index].gid,
					num: this.goodsList[index].num
				}).then((data)=>{
					
				})
				this.sum();
			},
			// 增加数量
			add(index){
				this.goodsList[index].num++;
				this.$http.editCar({
					g_id: this.goodsList[index].gid,
					num: this.goodsList[index].num
				}).then((data)=>{
					
				})
				this.sum();
			},
			sumBlur(index){
				console.log(index);
				this.$http.editCar({
					g_id: this.goodsList[index].gid,
					num: this.goodsList[index].num
				}).then((data)=>{
					
				})
			},
			// 合计
			sum(e,index){
				this.sumPrice=0;
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					if(this.goodsList[i].selected) {
						if(e && i==index){
							this.sumPrice = this.sumPrice + (e.detail.value*this.goodsList[i].price);
						}else{
							this.sumPrice = this.sumPrice + (this.goodsList[i].num*this.goodsList[i].price);
						}
					}
				}
				this.sumPrice = this.sumPrice.toFixed(2);
			},
			discard() {
				//丢弃
			}
		},
		// ,
		// onPullDownRefresh() {
		// 	setTimeout(function(){
		// 		uni.stopPullDownRefresh();
		// 	},2000)
		// }
	}
</script>
<style scoped lang="scss">
	page{position: relative;background-color: #fff;}
	.checkbox-box{
		display: flex;
		align-items: center;
		.checkbox{
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #1abc9c;
			display: flex;
			justify-content: center;
			align-items: center;
			.on{
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #1abc9c;
			}
		}
		.text{
			font-size: 28upx;
			margin-left: 10upx;
		}
	}
.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.title{
			font-size: 36upx;
		}
		
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.goods-list{
		width: 100%;
		padding: 20upx 0 120upx 0;
		.tis{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.row{
			width: calc(92%);
			height: calc(22vw + 40upx); 
			margin: 20upx auto;
			
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu{
				.icon{
					color: #fff;
					// font-size: 25upx;
				}
				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}
			.carrier{
				@keyframes showMenu {
					0% {transform: translateX(0);}100% {transform: translateX(-30%);}
				}
				@keyframes closeMenu {
					0% {transform: translateX(-30%);}100% {transform: translateX(0);}
				}
				&.open{
					animation: showMenu 0.25s linear both;
				}
				&.close{
					animation: closeMenu 0.15s linear both;
				}
				background-color: #fff;
				.checkbox-box{
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info{
					width: 100%;
					display: flex;
					padding-right: 20upx;
					.img{
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;
						image{
							width: 22vw;
							height: 22vw;
						}
					}
					.info{
						width: 100%;
						height: 22vw;
						overflow: hidden;
						position: relative;
						.title{
							width: 100%;
							font-size: 28upx;
							overflow : hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							word-wrap: break-word;
							word-break: break-all;
						}
						.spec{
							// font-size: 20upx;
							// background-color: #f3f3f3;
							// color: #a7a7a7;
							// height: 30upx;
							// display: flex;
							// align-items: center;
							// padding: 0 10upx;
							// border-radius: 15upx;
							// margin-bottom: 20vw;
						}
						.price-number{
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;
							.price{
								color: #f00;
							}
							.number{
								display: flex;
								justify-content: center;
								align-items: flex-end;
								.input{
									width: 60upx;
									height: 60upx;
									margin: 0 10upx;
									background-color: #f3f3f3;
									input{
										width: 60upx;
										height: 60upx;
										display: flex;
										justify-content: center;
										align-items: center;
										text-align: center;
										font-size: 26upx;
									}
								}
								.sub ,.add{
									width: 45upx;
									height: 45upx;
									background-color: #f3f3f3;
									border-radius: 5upx;
									.icon{
										font-size: 22upx;
										width: 45upx;
										height: 45upx;
										display: flex;
										justify-content: center;
										align-items: center;
										
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		.delBtn{
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.settlement{
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 60%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				
				border-radius: 30upx;
			}
		}
	}
</style>
