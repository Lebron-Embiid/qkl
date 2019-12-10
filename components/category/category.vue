<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view class="nav-left-box" scroll-y>
					 <!-- :style="'height:'+height+'px'" -->
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryClickMain(item,index)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				 <!-- @scroll="scroll" -->
				<scroll-view class="nav-right-box" :scroll-into-view="slideTop" scroll-y scroll-with-animation>
					<view :id="'cate'+idx" class="nav-box" v-for="(cate,idx) in categoryList" :key="idx">
						<view class="nav-right-title">{{cate.title}}</view>
						<view class="nav-right-item" v-for="(sub,index2) in cate.child_list" :key="index2" @click="categoryClickSub(sub)">
							<image :src="url+sub.pic" />
							<view>{{sub.title}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				},
				slideTop: '',
				url: ''
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#F24544'
			},
			activeBackgroundColor: {
				type: String,
				default: '#e5e5e5'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.slideTop = 'cate'+index;
				console.log(this.slideTop);
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				// this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			}
		},
		mounted() {
			this.url = this.$http.url;
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight-55;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		}
	}
</script>

<style scoped>
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
		border-right: solid 1px #E0E0E0;
	}

	.nav-left-item {
		height: 50px;
		/* border-right: solid 1px #E0E0E0; */
		border-bottom: solid 1px #E0E0E0;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
		padding-top: 11px;
	}
	.nav-left-box,.nav-right-box{
		height: 90vh;		
	}
	
	.nav-box{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}
	.nav-right-title{
		width: 100%;
		padding-left: 30rpx;
		font-size: 32rpx;
		margin-bottom: 10rpx;
	}
	.nav-right-item {
		width: 28%;
		text-align: center;
		padding: 5px;
		font-size: 13px;
	}

	.nav-right-item image {
		display: block;
		width: 50px;
		height: 50px;
		margin: 0 auto 10rpx;
	}

	.active {
		color: #F24544;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
</style>
