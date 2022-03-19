var app = getApp();
var main = require("../../main.js");
const config = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height1: wx.getSystemInfoSync().windowWidth * 8 / 15.5, //图片高度 
    currentSwiper: 0,
    swiperCurrent: 0,
    cclist: [
      { url: "../../images/banner7.png" }
    ],
	hetonghao:"",
	page: 1,
	newlist:[]
  },
//轮播
swiperChange: function (e) {
  this.setData({
    currentSwiper: e.detail.current
  })
},
bindhetongText: function(e) {
	console.log(e.detail.value)
	if(e.detail.value == ''){
		this.setData({
		  page: 1
		})
	}
    this.setData({
      hetonghao: e.detail.value
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

getseache:function(){
  	  var that = this;
  	  wx.showLoading({
  	    title: '加载中',
  	  })
	  
	  	this.setData({
	  	  page: 1
	  	})
	  
  	  wx.request({
  	    url: app.taskapi + '/Index/baojiadan_list',
  	    method: 'post',
  	    data: {
  	      token: main.get_storage('token'),
		  page: 1,
		  gname: that.data.hetonghao,
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
			if(res.data.data.list.length == 0){
				wx.showToast({
					title: '已经加载全部啦！',
					icon: 'none',
					duration: 3000
				})
			}
			that.setData({
			  newlist: res.data.data.list,
			})
  	  	  console.log(that.data.newlist)
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
  
getNewslist:function(){
  	  var that = this;
  	  wx.showLoading({
  	    title: '加载中',
  	  })
  	  wx.request({
  	    url: app.taskapi + '/Index/baojiadan_list',
  	    method: 'post',
  	    data: {
  	      token: main.get_storage('token'),
		  page: that.data.page,
		  gname: that.data.hetonghao,
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
			if(res.data.data.list.length == 0){
				wx.showToast({
					title: '已经加载全部啦！',
					icon: 'none',
					duration: 3000
				})
			}
			that.setData({
			  newlist: that.data.newlist.concat(res.data.data.list),
			})
  	  	  console.log(that.data.newlist)
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
	this.setData({
	  page: 1,
	  newlist:[],
	})
	//获取首页资讯
	that.getNewslist();
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
    console.log("上拉加载")
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.getNewslist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})