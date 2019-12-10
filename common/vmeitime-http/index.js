import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */
export const url = http.config.baseUrl
// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log(response)
		
		// if(response.data.status == 40001){
		// 	setTimeout(function(){
		// 		uni.reLaunch({
		// 			url: '/pages/login/login'
		// 		})
		// 	},1500)
		// }
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data
    })
}

// 登录
export const checkLogin = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Login/checkLogin',
        method: 'POST', 
        data
		// handle:true
    })
}
// 注册
export const formRegister = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Login/register',
        method: 'POST', 
        data
		// handle:true
    })
}
// 找回密码
export const forgetPassword = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Login/setpsw',
        method: 'POST', 
        data
    })
}
// 发送邮箱验证码
export const sendEmailCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Home/Login/sendEmailCode',
        method: 'POST', 
        data
    })
}
// 获取国际区号
export const getAreaCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Home/Login/areaCode',
        method: 'POST', 
        data
    })
}

// 充值列表
export const userRecharge = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Recharge/index',
        method: 'POST', 
        data
    })
}
// 上传充值凭证
export const uploadFiles = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Recharge/uploadFiles',
        method: 'POST', 
        data
    })
}
// 提交充值申请
export const addRecharge = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Recharge/add',
        method: 'POST', 
        data
    })
}


// 所有开户银行
export const getBank = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Growth/bankList',
        method: 'POST', 
        data
    })
}
// 添加银行卡
export const addBank = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Growth/addBank',
        method: 'POST', 
        data
    })
}
// 删除银行卡
export const delBank = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Growth/cardInfos',
        method: 'POST', 
        data
    })
}
// 用户银行卡列表
export const userBankList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Growth/userBankList',
        method: 'POST', 
        data
    })
}


// 申请提现
export const applyCash = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Cash/apply',
        method: 'POST', 
        data
    })
}
// 提现申请记录
export const getCashList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Cash/cashList',
        method: 'POST', 
        data
    })
}


// 资讯列表
export const getNewsList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status === 40001){
			uni.showToast({
				title: '登录失效,请重新登录',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
		if(response.data.status === 40002){
			uni.showToast({
				title: '账号已冻结',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
	}
    return http.request({
        url: 'News/index',
        method: 'POST', 
        data
    })
}
// 资讯列表
export const getNewsDetail = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status === 40001){
			uni.showToast({
				title: '登录失效,请重新登录',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
		if(response.data.status === 40002){
			uni.showToast({
				title: '账号已冻结',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
	}
    return http.request({
        url: 'News/NewsDetail',
        method: 'POST', 
        data
    })
}


// 获取个人信息
export const getUserInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status === 40001){
			uni.showToast({
				title: '登录失效,请重新登录',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
		if(response.data.status === 40002){
			uni.showToast({
				title: '账号已冻结',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
	}
    return http.request({
        url: 'User/userInfo',
        method: 'POST', 
        data
    })
}
// 修改个人信息
export const editUserInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'User/editUserInfo',
        method: 'POST', 
        data
    })
}
//修改登录密码
export const updateLoginPassword = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'User/updatePassword',
        method: 'POST', 
        data
    })
}
//修改交易密码
export const updateTradePassword = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'User/setSecPwd',
        method: 'POST', 
        data
    })
}
//修改头像
export const updateimgUps = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'User/imgUps',
        method: 'POST', 
        data
    })
}
//获取头像
export const getHeadImg = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'User/getHeadImg',
        method: 'POST', 
        data
    })
}
//分享二维码
export const shareCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'User/shareCode',
        method: 'POST', 
        data
    })
}



// 转款钱包二维码 
export const transferWalletCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Transfer/walletCode',
        method: 'POST', 
        data
    })
}
// 提交转款  
export const submitTransferMoney = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Transfer/transferMoney',
        method: 'POST', 
        data
    })
}
// 转款记录列表  
export const getTransferList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Transfer/getList',
        method: 'POST', 
        data
    })
}


// 会员列表  
export const getNetList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Net/index',
        method: 'POST', 
        data
    })
}


// 转入投资  
export const changeInvestment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Investment/changeInto',
        method: 'POST', 
        data
    })
}
// 投资记录列表
export const getInvestment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Investment/index',
        method: 'POST', 
        data
    })
}
// 投资退款
export const changeInvestmentOut = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Investment/changeOut',
        method: 'POST', 
        data
    })
}
// 转入转出
export const changeInvestmentinto = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Investment/into',
        method: 'POST', 
        data
    })
}


// 商城首页
export const getStoreIndex = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Store/index',
        method: 'POST', 
        data
    })
}
// 商品分类
export const getGoodsCate = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'GoodsCate/index',
        method: 'POST', 
        data
    })
}
// 商品列表
export const getStoreMend = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Store/mend',
        method: 'POST', 
        data
    })
}
// 商品详情
export const getStoreDetails = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Store/details',
        method: 'POST', 
        data
    })
}

// 获取购物车
export const getCar = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Car/getCar',
        method: 'POST', 
        data
    })
}
// 添加购物车
export const addCar = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Car/addCar',
        method: 'POST', 
        data
    })
}
// 删除购物车
export const delCar = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'AUTHORIZATION': uni.getStorageSync('token')
		}
	}
    return http.request({
        url: 'Car/delCar',
        method: 'POST', 
        data
    })
}
// if(data.data.status == 40001){
// 	this.$api.msg('请登录');
// 	setTimeout(function(){
// 		uni.reLaunch({
// 			url: '/pages/login/login'
// 		})
// 	},1500)
// }


// this.$http.formRegister({
					
// }).then((data)=>{
	// this.$api.msg(data.data.message);
	// if(data.data.status == 1){
		
	// }
// }).catch((err)=>{
	
// })

// 防重复点击
// this.$Debounce.canDoFunction({
// 	key: "getcode",
// 	time: 1500,
// 	success:()=>{
		
// 	}
// })

// 来解除事件锁定
// this.$Debounce.releaseKey("getcode");

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	url,
	test,
    checkLogin,
	formRegister,
	forgetPassword,
	sendEmailCode,
	getAreaCode,
	userRecharge,
	uploadFiles,
	addRecharge,
	getBank,
	addBank,
	delBank,
	userBankList,
	applyCash,
	getCashList,
	getNewsList,
	getNewsDetail,
	getUserInfo,
	editUserInfo,
	updateLoginPassword,
	updateTradePassword,
	getHeadImg,
	updateimgUps,
	shareCode,
	transferWalletCode,
	submitTransferMoney,
	getTransferList,
	getNetList,
	changeInvestment,
	getInvestment,
	changeInvestmentOut,
	changeInvestmentinto,
	getStoreIndex,
	getGoodsCate,
	getStoreMend,
	getStoreDetails,
	getCar,
	addCar,
	delCar
}