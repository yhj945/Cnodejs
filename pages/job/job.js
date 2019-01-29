Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics/?tab=job',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          data: res.data.data,
        })
        wx.hideLoading()
      },
      fail: function () {
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 5000
        })
      }
    })
  },
  visit: function (event) {
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../topic/topic?id=' + event.currentTarget.id
    })
  }
})