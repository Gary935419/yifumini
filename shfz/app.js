// app.js
App({
  taskapi: 'https://ryksa.dltqwy.com/index.php/api', //正式接口测试
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
	  //小程序获取的微信用户信息
	  userInfo: [],
	  openid: '',
	  sessionKey: '',
	  
	  btype: '',
	  school: '',
	  area: '',
	  ftype: '',
	  money: '',
	  
	  token: ''
  }
})
