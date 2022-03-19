// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height1: wx.getSystemInfoSync().windowWidth * 8 / 15.5, //图片高度 
    currentSwiper: 0,
    swiperCurrent: 0,
    cclist: [
      { url: "../../images/banner5.png" }
    ],
	listData:[], 
	isSelect:false,
    types:['2022','2023','2024','2025','2026','2027','2028','2029','2030'],
    type:"2022",
	zu:"",
	zuid:"",
  },
   //点击控制下拉框的展示、隐藏
   select:function(){
   var isSelect = this.data.isSelect
   this.setData({ isSelect:!isSelect})
   },
   //点击下拉框选项，选中并隐藏下拉框
   getType:function(e){
   let value = e.currentTarget.dataset.type
   console.log(value)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({
        zu: options.lname,
		zuid:options.id
      });
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