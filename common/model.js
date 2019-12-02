import { HTTP } from './http.js'


class Model extends HTTP{
	// 不需要参数
  getSwiper(success){
  	  let params = {
  		method:"POST",
  		url:"/app/banner/getList?position=index", 
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
  // 自定义参数
  getByNeedFirst(data,success){ 
	  let params = {
		method:"POST",
		data: data,
		url:"/app/secondtypeinfo/getListByNeedFirst", 
		success:success
	  }
    this.request(params)
  }
  // 传参页数
  getCollectshop(pageNo,success){ //查看收藏店铺
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

export {Model}