<template>
	<view class="webpage">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onShow() {
			this.$http.updateVersion().then((data)=>{
				this.url = data.data.message.data.downLink
			})
		}
	}
</script>

<style>
</style>
