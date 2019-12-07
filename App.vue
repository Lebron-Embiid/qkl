<script>
	export default {
		globalData:{
			is_login: false,
			app_name: 'SOLOMON MATRIX',
			app_logo: '/static/logo1.png'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let that = this;
			// setInterval(()=>{
				
			// },1000)
			console.log('App Show')
			uni.setTabBarBadge({
				index: 1,
				text: '10',
				success: function(){
				  
				}
			})
			uni.showTabBarRedDot({
				index: 2,
				success: function(){
					
				}
			})
			uni.setTabBarBadge({
				index: 3,
				text: 'new',
				success: function(){
					
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/*每个页面公共css */
@import "/static/iconfont/font.scss";
page,body{
	background: #fff;
}
uni-modal .uni-modal__btn_primary{
	color: #1ABC9C !important;
}
.uni-picker-container .uni-picker-action.uni-picker-action-confirm{
	color: #1ABC9C !important;
}
// 多选按钮样式修改  --  注册页面
// uni-checkbox .uni-checkbox-input{
// 	transform: scale(.7);
// 	border-radius: 50%;
// 	margin-bottom: 6rpx;
// }
// uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
// 	background: #1abc9c;
// 	border-color: #1ABC9C;
// }

.status_bar {  
    height: var(--status-bar-height);  
    width: 100%;
    background-color: #ffffff;
}


.wxParse{
	-webkit-user-select: text;
}
.wxParse image,.wxParse .img,.wxParse image>img{
	display: block !important;
	max-width: 100% !important;
	margin: 0 !important;
	padding: 0 !important;
	opacity: 1 !important;
}


.form_item{
	padding: 30rpx 0 30rpx 20rpx;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(228, 228, 228, 1);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.icon{
		opacity: .3;
		margin-right: 20rpx;
		&.no{
			opacity: 1;
		}
		image{
			display: block;
			width: 40rpx;
			height: 40rpx;
		}
	}
	.right_box{
		width: 95%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ipt_box{
			width: 75%;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			input{
				display: block;
				width: 90%;
			}
			image{
				display: none;
				width: 40rpx;
				height: 40rpx;
				&.active{
					display: block;
				}
			}
		}
		&.all{
			.ipt_box{
				width: 100%;
			}
		}
		input{
			font-size: 26rpx;
			margin-right: 20rpx;
		}
	}
	.switch_btn{
		margin-left: 20rpx;
	}
}
.submit_btn{
	background: rgba(0, 153, 153, 1);
	height: 90rpx;
	line-height: 90rpx;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	margin-bottom: 50rpx;
	position: relative;
	transition: all .5s ease;
	.loading{
		display: block;
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 38%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 1;
	}
	&:active{
		background: #1ABC9C;
	}
	&:after{
		border: 0;
	}
}

.white_logo_box{
	padding: 10rpx 30rpx 50rpx;
	box-sizing: border-box;
	text-align: center;
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	image{
		display: block;
		width: 260rpx;
		height: 260rpx;
		margin: 0 auto 40rpx;
	}
}

// 投资单号列表
.invest_box{
	.invest_top{
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		color: #666;
		font-size: 28rpx;
		view{
			width: 50%;
			padding: 20rpx 0;
			box-sizing: border-box;
		}
		.it_left{
			background: #ccc;
		}
		.it_right{
			background: #999;
			color: #fff;
		}
	}
	.invest_item{
		color: #666;
		font-size: 28rpx;
		.invest_center{
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			view{
				width: 50%;
				padding: 20rpx 0;
				box-sizing: border-box;
			}
			.it_left{
				background: #ccc;
			}
			.it_right{
				background: #999;
				color: #fff;
			}
			.ic_left{
				border-right: 1px solid #e6e6e6;
				box-sizing: border-box;
			}
			.ic_left,.ic_right{
				border-bottom: 1px solid #e6e6e6;
			}
		}
		.invest_bottom{
			padding: 20rpx 20rpx 20rpx 40rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #999;
			font-size: 24rpx;
			text{
				color: #099;
				margin-left: 30rpx;
			}
			button{
				margin: 0;
				padding: 0;
				width: 120rpx;
				height: 48rpx;
				line-height: 48rpx;
				font-size: 26rpx;
				background: #099;
				border-radius: 5rpx;
				&:after{
					border: 0;
				}
				&.already{
					background: #ccc;
				}
			}
		}
	}
}

// 弹框样式
.popup_box{
	width: 600rpx;
	background: #fff;
	border: 1px solid #dedede;
	border-radius: 20rpx;
	.popup_content{
		padding: 30rpx 40rpx 20rpx;
		box-sizing: border-box;
		.popup_title{
			color: #333;
			font-size: 32rpx;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.popup_info{
			color: #099;
			font-size: 26rpx;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.over_price{
			color: #999;
			font-size: 28rpx;
			text-align: center;
		}
		.over_price_val{
			color: #900;
			font-size: 32rpx;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.popup_back_txt{
			color: #c00;
			font-size: 26rpx;
			text-align: center;
			width: 75%;
			margin: 0 auto 30rpx;
		}
		input{
			font-size: 26rpx;
			border: 1px solid #a9a9a9;
			height: 60rpx;
			margin-bottom: 20rpx;
			padding: 0 10rpx;
			box-sizing: border-box;
		}
	}
	.popup_btn{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		border-top: 1px solid #e4e4e4;
		view{
			width: 50%;
			padding: 25rpx 0;
			text-align: center;
			color: #333;
			font-size: 28rpx;
			box-sizing: border-box;
			&.ok{
				color: #1ABC9C;
				border-left: 1px solid #E4E4E4;
			}
		}
	}
}

// 银行卡样式
.bank_info{
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	border: 1px solid #ccc;
	border-radius: 5rpx;
	padding: 20rpx 20rpx 20rpx 30rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	margin-bottom: 10rpx;
	border-top: 0;
	&:last-of-type{
		border-bottom: 0;
	}
	.bank_left{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		image{
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin-right: 30rpx;
			// background: #ccc;
		}
		.bank_txt{
			.bank_name{
				margin-bottom: 20rpx;
			}
		}
	}
	.del_txt{
		border: 1px solid #ccc;
		padding: 5rpx 25rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		color: #999;
		transition: all .5s ease;
		&:active{
			background: #099;
			border-color: #099;
			color: #fff;
		}
	}
}
</style>
