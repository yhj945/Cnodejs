
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    loginname: "",
    create_at: "",
    reply: [],
    reply_count: "",
    popErrorMsg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var reply_content = that.data.reply_content
    console.log(options.id)
    console.log(options.tag)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + options.id,
      success: function (res) {
        var create_date = res.data.data.create_at.substring(0, 10);
        var create_time = res.data.data.create_at.substring(11, 19);
        // console.log(create_date);
        // console.log(create_time);
        // console.log(res.data.data.replies);
        var replies = []
        let reply = that.data.reply
        for (var i = 0; i < res.data.data.replies.length; i++) {
          // var contentText = that.convertHtmlToText(res.data.data.replies[i].content)
          // console.log(res.data.data.replies[i].content)
          // console.log(contentText)
          // reply_content.push(contentText) 
          var avatar_url = res.data.data.replies[i].author.avatar_url
          var loginname = res.data.data.replies[i].author.loginname
          var reply_date = res.data.data.replies[i].create_at.substring(0, 10)
          var reply_time = res.data.data.replies[i].create_at.substring(11, 19)
          var reply_at = reply_date + " " + reply_time
          var obj = {}
          obj.avatar_url = avatar_url
          obj.loginname = loginname
          obj.reply_at = reply_at
          obj.floor = i+1
          // console.log(obj)
          reply.push(obj)

          var reply_content = res.data.data.replies[i].content
          replies.push(reply_content)
        }
        // console.log(reply)
        that.setData({
          title: res.data.data.title,
          loginname: res.data.data.author.loginname,
          create_at: create_date + " " + create_time,
          reply_count: res.data.data.replies.length,
          reply
        })

        var wxparse = require("../../wxParse/wxParse.js")
        var content = res.data.data.content
        wxparse.wxParse('content', 'html', content, that, 5)

        for (var i = 0; i < replies.length; i++){
          wxparse.wxParse('reply' + i, 'html', replies[i], that)
          if (i == replies.length-1){
            wxparse.wxParseTemArray("replyTemArray", 'reply', replies.length, that)
          }
        }
        wx.hideLoading() 
      },
      fail: function () {
        console.log("fail")
        wx.hideLoading()
        that.setData({
          popErrorMsg: '请求页面出错啦！'
        })
        that.ohShitfadeOut()
        
      },
    })
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
      wx.navigateBack({
        delta: -1
      })
    }, 2000);
  },
  // convertHtmlToText: function convertHtmlToText(inputText) {
  //   var returnText = "" + inputText;
  //   returnText = returnText.replace(/<\/div>/ig, '');
  //   returnText = returnText.replace(/<\/li>/ig, '\r\n');
  //   returnText = returnText.replace(/<li>/ig, ' * ');
  //   returnText = returnText.replace(/<\/ul>/ig, '\r\n');
  //   //-- remove BR tags and replace them with line break
  //   returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

  //   //-- remove P and A tags but preserve what's inside of them
  //   returnText = returnText.replace(/<p.*?>/gi, "");
  //   returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //   //-- remove all inside SCRIPT and STYLE tags
  //   returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  //   returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //   //-- remove all else
  //   returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

  //   //-- get rid of more than 2 multiple line breaks:
  //   returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

  //   //-- get rid of more than 2 spaces:
  //   returnText = returnText.replace(/ +(?= )/g, '');

  //   //-- get rid of html-encoded characters:
  //   returnText = returnText.replace(/ /gi, " ");
  //   returnText = returnText.replace(/&/gi, "&");
  //   returnText = returnText.replace(/"/gi, '"');
  //   returnText = returnText.replace(/</gi, '<');
  //   returnText = returnText.replace(/>/gi, '>');

  //   return returnText;
  // },

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