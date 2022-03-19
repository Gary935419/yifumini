// index.js
// 获取应用实例
var app = getApp();
var main = require("../../main.js");
const config = app.globalData;
Page({
  data: {
	newlist:[],
	height1: wx.getSystemInfoSync().windowWidth * 8 / 13, //图片高度
	currentSwiper: 0,
	swiperCurrent: 0,
	cclist: [
	  { url: "../../images/banner1.png" }
	],
  },
  //轮播
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  yearSwiperChange(e) {
    let current = e.detail.current;
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  //获得资讯
  getNewslist:function(){
  	  var that = this;
  	  wx.showLoading({
  	    title: '加载中',
  	  })
  	  wx.request({
  	    url: app.taskapi + '/Index/indexnewlist',
  	    method: 'post',
  	    data: {
  	      token: main.get_storage('token'),
  	    },
  	    header: {
  	      'content-type': 'application/x-www-form-urlencoded'
  	    },
  	    success: function(res) {
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
  	  	  	  newlist: res.data.data.indexnewlist,
  	  	  	})
  	  	  console.log(res.data.data.indexnewlist)
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
  onLoad: function () {
    
  },
  //下拉刷新
  onPullDownRefresh: function() {
  
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
	//获取首页资讯
	that.getNewslist();
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  
  },
  
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
  	
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
  
  },
})
