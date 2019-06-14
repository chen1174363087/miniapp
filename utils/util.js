const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



  /**
   * 网络请求
   */
function request(url, data, header, method){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      success: (res => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          resolve(res)
          //reject(res)
        }
      }),
      fail: (res => {
        resolve(res)
        //reject(res)
      })
    })
  })
}

  function baseUrl(){
    return 'http://127.0.0.1:8999/miniapp-api';
  }

  function initToken(){
    const method = 'GET'
    request('http://127.0.0.1:8999/miniapp-api/initToken','','',method)
  }

  function getOpenId(code){
    wx.login({
      success: res => {
        let code = res.code
        request('https://api.weixin.qq.com/sns/jscode2session?appid=wxbaa427a613b602ed&secret=ecfac00507f6890a53b02e5002d330f1&js_code=' + code + '&grant_type=authorization_code', '', '', 'GET').then(res => {
          wx.setStorageSync('openId', res.data.openid)
          console.log('wx.login' + res.data.openid)
        })
      }
    })
  }
module.exports = {
  formatTime: formatTime,
  requestApi: request,
  baseUrlApi: baseUrl,
  initTokenApi: initToken,
  getOpenIdApi: getOpenId
}
