<template>
	<view class="shop">
		<uni-nav-bar left-icon="back" leftText="返回" title="商城"></uni-nav-bar>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" indicatorDots="true" indicator-color="rgba(0, 0, 0, .5)" indicator-active-color="rgba(0, 153, 153, .8)" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img"></image>
					</swiper-item>
				</swiper>
				<!-- <view class="indicator">
					<view
						class="dots"
						v-for="(swiper, index) in swiperList"
						:class="[currentSwiper >= index ? 'on' : '']"
						:key="index"
					></view>
				</view> -->
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view
				class="category"
				v-for="(row, index) in categoryList"
				:key="index"
				@tap="toCategory(row)">
				<view class="img"><image :src="row.img"></image></view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
		<!-- 广告图 -->
		<view class="banner"><image src="/static/img/banner.jpg"></image></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">
				热门商品
			</view>
			<view class="product-list">
				<view
					class="product"
					v-for="product in productList"
					:key="product.goods_id"
					@tap="toGoods(product)"
				>
					<image mode="widthFix" :src="product.img"></image>
					<view class="name">{{ product.name }}</view>
					<view class="info">
						<view class="price">{{ product.price }}</view>
						<view class="slogan">{{ product.slogan }}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {Model} from '@/common/model.js'
	let model = new Model()
	export default{
		data(){
			return{
				currentSwiper: 0,
				// 轮播图片
				swiperList: [
					{ id: 1, src: 'url1', img: '/static/1.jpg' },
					{ id: 2, src: 'url2', img: '/static/2.jpg' },
					{ id: 3, src: 'url3', img: '/static/3.jpg' }
				],	
				// 分类菜单
				categoryList: [
					{ id: 1, name: '入驻商家', img: '/static/img/1.png' },
					{ id: 2, name: '热门商品', img: '/static/img/2.png' },
					{ id: 3, name: '最新商品', img: '/static/img/3.png' },
					{ id: 4, name: '推荐商品', img: '/static/img/4.png' },
					{ id: 5, name: '全部商品', img: '/static/img/5.png' },
					{ id: 6, name: '会员中心', img: '/static/img/6.png' },
					{ id: 7, name: '帮助中心', img: '/static/img/7.png' },
					{ id: 8, name: '商城介绍', img: '/static/img/8.png' }
				],
				productList: [
					{
						goods_id: 0,
						img: '/static/img/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/p2.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				],
				more: 'noMore'
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		methods:{
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//分类跳转
			toCategory(e) {
				uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '/pages/index/goodsList?cid='+e.id+'&name='+e.name
				});
			},
			//商品跳转
			toGoods(e) {
				console.log(e,e.goods_id);
				uni.navigateTo({
					url: '/pages/index/detail?cid=' + e.goods_id + '&name=' + e.name
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.swiper {
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		.swiper-box {
			width: 92%;
			height: 30.7vw;
			overflow: hidden;
			border-radius: 15rpx;
			box-shadow: 0 8rpx 25rpx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;
			swiper {
				width: 100%;
				height: 30.7vw;
				swiper-item {
					image {
						width: 100%;
						height: 30.7vw;
					}
				}
			}
			// .indicator {
			// 	position: absolute;
			// 	bottom: 20rpx;
			// 	left: 20rpx;
			// 	background-color: rgba(255, 255, 255, 0.4);
			// 	width: 150rpx;
			// 	height: 5rpx;
			// 	border-radius: 3rpx;
			// 	overflow: hidden;
			// 	display: flex;
			// 	.dots {
			// 		width: 0;
			// 		background-color: rgba(255, 255, 255, 1);
			// 		transition: all 0.3s ease-out;
			// 		&.on {
			// 			width: (100%/3);
			// 		}
			// 	}
			// }
		}
	}
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30rpx 0;
		// border-bottom: solid 2rpx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 25%;
			margin-top: 50rpx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 9vw;
					height: 9vw;
				}
			}
			.text {
				margin-top: 16rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24rpx;
				color: #3c3c3c;
			}
		}
	}
	.banner {
		// width: 92%;
		margin: 30rpx 0 20rpx;
		image {
			width: 100%;
			height: 250rpx;
			// border-radius: 10vw;
			box-shadow: 0 5rpx 25rpx rgba(0, 0, 0, 0.3);
		}
	}
	.goods-list {
		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: #f47825;
			font-size: 32upx;
			margin-bottom: 20rpx;
			position: relative;
			&:before,&:after{
				content: "";
				width: 30vw;
				position: absolute;
				height: 1px;
				background: #f47825;
				top: 50%;
				transform: translateY(-50%);
				z-index: 1;
			}
			&:before{
				left: 5%;
			}
			&:after{
				right: 5%;
			}
		}
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}
		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
				image {
					width: 100%;
					height: 320rpx !important;
					border-radius: 20upx 20upx 0 0;
				}
				.name {
					width: 92%;
					padding: 0 4%;
					font-size: 30upx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
