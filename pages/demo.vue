<template>
	<view class="">
		<uni-nav-bar left-icon="back" title="重置密码"></uni-nav-bar>
		<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange"></switchc>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		methods:{
			switchchange(e) {
				console.log(e);
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>
