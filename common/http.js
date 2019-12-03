import { config } from '@/common/config.js'

class HTTP {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params) {
    var that = this
    var url = this.baseRestUrl + params.url;

    if (!params.method) {
      params.method = 'GET';
    }
    uni.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type':'application/x-www-form-urlencoded',
	    'token':uni.getStorageSync('token')||null
		// #ifdef MP
		// 'appkey':config.appkey
		// #endif
      },
      success: params.success,
      fail: function (err) {
        params.fail && params.fail(err)
      }
    });
  }
};

export { HTTP };