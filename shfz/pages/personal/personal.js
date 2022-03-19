var app = getApp();
var main = require("../../main.js");
const config = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  userinfo: [],
	  id:0,
	  imgUrl:'',
  },

/**
   * 获取个人账户信息
   */
  get_member_info: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.taskapi + '/Index/memberinfoshare',
      method: 'post',
      data: {
        token: main.get_storage('token'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (!main.checklogin(res, 'personal')) {
          return;
        }
        if (!res.data) {
          wx.showToast({
            title: '加载错误',
            icon: 'loading',
            duration: 10000
          })
        }
        if (res.data.errcode == '200') {
          wx.hideLoading();
          that.setData({
			userinfo: res.data.data.member,
			imgUrl:res.data.data.member.mqrcode
          })
        } else {
			  wx.showToast({
				title: res.data.errmsg,
				icon: 'none',
				duration: 3000
			  })
			  setTimeout(function() {
				   wx.switchTab({
					   url: '/pages/my/my',
				   })
			  }, 2000)
        }
      },
	  fail: function(res) {
           that.get_member_info();
      },
    })
  },
  //去修改个人设置
  formSubmit: function(e) {
	   var that = this;
	   if (that.data.id == 1) {
	     wx.showToast({
	   			title: '请勿重复提交!',
	   			icon: 'none',
	   			duration: 3000
	     })
	     return false;
	   }
	   wx.showLoading({
	     title: '加载中',
	   })
	   if (!main.isMobile(e.detail.value.mobile)) {
	     wx.showToast({
			title: '请输入正确的手机号!',
			icon: 'none',
			duration: 3000
	     })
	     return false;
	   }
	   if (!main.isEmail(e.detail.value.email)) {
	     wx.showToast({
			title: '请输入正确的邮箱地址!',
			icon: 'none',
			duration: 3000
	     })
	     return false;
	   }
	   wx.request({
	     url: app.taskapi + '/Index/memberupdatainfo',
	     method: 'post',
	     data: {
	       token: main.get_storage('token'),
		   truename: e.detail.value.truename,
		   mobile: e.detail.value.mobile,
		   email: e.detail.value.email,
		   address: e.detail.value.address,
	     },
	     header: {
	       'content-type': 'application/x-www-form-urlencoded'
	     },
	     success: function(res) {
	       if (!main.checklogin(res, 'personal')) {
	         return;
	       }
	       if (!res.data) {
	         wx.showToast({
	           title: '加载错误',
	           icon: 'loading',
	           duration: 10000
	         })
	       }
	       if (res.data.errcode == '200') {
	         wx.hideLoading();
			 that.setData({
			 	id: 1,
			 })
	         wx.showToast({
	   	   			title: res.data.errmsg,
	   	   			icon: 'none',
	   	   			duration: 3000
	          })
	       } else {
	   		  wx.showToast({
	   			title: res.data.errmsg,
	   			icon: 'none',
	   			duration: 3000
	   		  })
	       }
	     }
	   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  var that = this;
  //判断是否已经授权
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        wx.showLoading({
          title: '加载中',
        }),
        that.get_member_info();
      } else {
        wx.showModal({
                 title: '温馨提示',
                 content: '当前您未授权,请立即去授权！',
                 showCancel: true,//是否显示取消按钮
                 cancelText:"否",//默认是“取消”
                 cancelColor:'#111111',//取消文字的颜色
                 confirmText:"是",//默认是“确定”
                 confirmColor: '#111111',//确定文字的颜色
                 success: function (res) {
                    wx.switchTab({
                          url: '/pages/my/my',
                    });
                 },
                 // fail: function (res) { },//接口调用失败的回调函数
                 // complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        });
      }
    }
  })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})