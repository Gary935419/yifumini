var app = getApp();
var main = require("../../main.js");
const config = app.globalData;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfinfo:[],
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
      url: app.taskapi + '/Index/memberinfo',
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
  			pdfinfo: res.data.data.member.pdfurl,
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
      }
    })
  },
    downLoadPdf(e){
      var url = e.currentTarget.dataset.url;
      wx.showToast({
        title: '打开中…',
        icon: "loading",
        duration: 100000
      })
  
    if (url){
      
      wx.downloadFile({
        url: url,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          console.log(res)
          var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用 
          wx.openDocument({
            filePath: Path,
            success: function (res) {          
                wx.hideToast();
  
            }
          })
        },
        fail: function (res) {
          console.log(res);
          wx.showToast({
            title: '下载失败',
            icon: "loading",
            duration: 1000
          })
        }
      })
    }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
	  that.get_member_info();
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