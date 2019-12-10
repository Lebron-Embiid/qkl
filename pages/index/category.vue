<template>
	<view class="category">
		<uni-nav-bar left-icon="back" leftText="返回" title="全部商品"></uni-nav-bar>
		<uni-category :categoryList="categoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></uni-category>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniCategory from "@/components/category/category.vue"
	export default{
		data(){
			return{
				categoryList:[],
				subCategoryList:[]
			}
		},
		components:{
			uniNavBar,
			uniCategory
		},
		onLoad() {
			this.$http.getGoodsCate().then((data)=>{
				this.categoryList = data.data.list;
				// this.subCategoryList = data.data.child_list;
			})
		},
		methods:{
			categoryMainClick(category){
				console.log(category);
			},
			categorySubClick(category){
				console.log(category);
				uni.navigateTo({
					url: '/pages/index/goodsList?cid='+category.id+'&name='+category.title
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>
