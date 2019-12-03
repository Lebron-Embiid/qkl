import { HTTP } from './http.js'


class Model extends HTTP{
  // 注册
  formRegister(data,success){ 
	  let params = {
		method:"POST",
		data: data,
		url:"/Login/register", 
		success:success
	  }
    this.request(params)
  }
  // 找回密码
  forgetPassword(data,success){ 
  	  let params = {
  		method:"POST",
  		data: data,
  		url:"/Login/setpsw", 
  		success:success
  	  }
    this.request(params)
  }
  // 登录
  checkLogin(data,success){ 
  	  let params = {
  		method:"POST",
  		data: data,
  		url:"/Login/checkLogin", 
  		success:success
  	  }
    this.request(params)
  }
  // 发送邮箱验证码
  sendEmailCode(data,success){ 
  	  let params = {
  		method:"POST",
  		data: data,
  		url:"/Home/Login/sendEmailCode",
  		success:success
  	  }
    this.request(params)
  }
  
	// 不需要参数
	//获取国际区号
  getAreaCode(success){
  	  let params = {
  		method:"POST",
  		url:"/Home/Login/areaCode", 
  		success:success
  	  }
    this.request(params)
  }
  // 固定参数
  getNearby(success){ 
	  let params = {
		method:"POST",
		data: {type: 1},
		url:"/app/firsttypeinfo/getList", 
		success:success
	  }
    this.request(params)
  }
  // 传参页数
  getCollectshop(pageNo,success){
      let data={pageNo:pageNo,pageSize:10}
    	  let params = {
    		method:"POST",
    		url:"/app/collectSeller/getCollect", 
    		data:data,
    		success:success
    	  }
      this.request(params)
    }
}

// import {Model} from '@/common/model.js'
// let model = new Model()

// model.getSwiper((data)=>{
// 	this.Swiperlist=data
// })

// model.getAreaCode({
	
// },(data)=>{
	
// })

export {Model}