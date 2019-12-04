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
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

// 登录
export const checkLogin = (data) => {
    return http.request({
        url: 'Login/checkLogin',
        method: 'POST', 
        data,
		// handle:true
    })
}
// 注册
export const formRegister = (data) => {
    return http.request({
        url: 'Login/register',
        method: 'POST', 
        data,
		// handle:true
    })
}
// 找回密码
export const forgetPassword = (data) => {
    return http.request({
        url: 'Login/setpsw',
        method: 'POST', 
        data
    })
}
// 发送邮箱验证码
export const sendEmailCode = (data) => {
    return http.request({
        url: 'Home/Login/sendEmailCode',
        method: 'POST', 
        data
    })
}
// 获取国际区号
export const getAreaCode = (data) => {
    return http.request({
        url: 'Home/Login/areaCode',
        method: 'POST', 
        data
    })
}

// 充值列表
export const userRecharge = (data) => {
    return http.request({
        url: 'Recharge/index',
        method: 'POST', 
        data
    })
}
// 上传充值凭证
export const uploadFiles = (data) => {
    return http.request({
        url: 'Recharge/uploadFiles',
        method: 'POST', 
        data
    })
}
// 提交充值申请
export const addRecharge = (data) => {
    return http.request({
        url: 'Recharge/add',
        method: 'POST', 
        data
    })
}


// 所有开户银行
export const getBank = (data) => {
    return http.request({
        url: 'Growth/bankList',
        method: 'POST', 
        data
    })
}
// 添加银行卡
export const addBank = (data) => {
    return http.request({
        url: 'Growth/addBank',
        method: 'POST', 
        data
    })
}
// 删除银行卡
export const delBank = (data) => {
    return http.request({
        url: 'Growth/cardInfos',
        method: 'POST', 
        data
    })
}
// 用户银行卡列表
export const userBankList = (data) => {
    return http.request({
        url: 'Growth/userBankList',
        method: 'POST', 
        data
    })
}


// 申请提现
export const applyCash = (data) => {
    return http.request({
        url: 'Cash/apply',
        method: 'POST', 
        data
    })
}
// 提现申请记录
export const getCashList = (data) => {
    return http.request({
        url: 'Cash/cashList',
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
	getCashList
}