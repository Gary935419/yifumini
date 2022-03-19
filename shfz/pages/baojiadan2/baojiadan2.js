var app = getApp();
var main = require("../../main.js");
const config = app.globalData;
const util = require('../../utils/util') // 引入封装过的加载提示
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height1: wx.getSystemInfoSync().windowWidth * 8 / 15.5, //图片高度 
    currentSwiper: 0,
    swiperCurrent: 0,
    cclist: [
      { url: "../../images/banner4.png" }
    ],
	id:"",
	bianhao:"",
	page:1,
	newlist:[], 
	isSelect:false,
    types:['2022','2023','2024','2025','2026','2027','2028','2029','2030'],
    type:"2022",
  },
   //点击控制下拉框的展示、隐藏
   select:function(){
   var isSelect = this.data.isSelect
   this.setData({ isSelect:!isSelect})
   },
   //点击下拉框选项，选中并隐藏下拉框
   getType:function(e){
   let value = e.currentTarget.dataset.type
   this.setData({
   type:value ,
   isSelect: false,
   })
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
    // 预览文件
    previewFile(e) {
		let fileLink = e.currentTarget.dataset.url;
		console.log(fileLink);
        if(!fileLink) {
			wx.showToast({
			  title: '未上传数据文档!',
			  icon: 'loading',
			  duration: 2000
			})
            return false
        }
        util.showLoading()
      
        // 单次下载允许的最大文件为 200MB
        wx.downloadFile({
            url: fileLink, // 地址已打码，自己换个其他的地址（"https://www.xxxxx.com/file/测试通知.pdf"）
            success: function (res) {
                console.log(res, "wx.downloadFile success res")
                if(res.statusCode != 200) {
                    util.hideLoadingWithErrorTips()
                    return false
                }
                var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
                wx.openDocument({
                    filePath: Path,
                    showMenu: true,
                    success: function (res) {
                        console.log('打开成功');
                        util.hideLoading()
                    }
                })
            },
            fail: function (err) {
                console.log(err, "wx.downloadFile fail err");
                util.hideLoadingWithErrorTips()
            }
        })
      
    },
getNewslist:function(){
  	  var that = this;
  	  wx.showLoading({
  	    title: '加载中',
  	  })
  	  wx.request({
  	    url: app.taskapi + '/Index/baojiadankuanhao_list',
  	    method: 'post',
  	    data: {
  	      token: main.get_storage('token'),
		  page: that.data.page,
		  xid: that.data.id
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
      var that = this;
      that.setData({
        id: options.id,
		bianhao:options.bianhao
      });
      that.getNewslist();
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