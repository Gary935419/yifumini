const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/* 加载动画相关 */
const showLoading = (tips = '加载中...') => {
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: tips,
  })
}

const hideLoading = () => {
  wx.hideLoading()
  wx.hideNavigationBarLoading()
}

const hideLoadingWithErrorTips = (err = '加载失败...') => {
  hideLoading()
  wx.showToast({
    title: err,
    icon: 'error',
    duration: 2000
  })
}

module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  hideLoadingWithErrorTips: hideLoadingWithErrorTips,
  formatTime,
}