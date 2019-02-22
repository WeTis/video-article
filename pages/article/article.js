// pages/article/article.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    text: "正在加载",
    isReachBottom: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://192.168.0.179:8080/imooc/lib/wxLogin.php',
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            method: "POST",
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getData(){
    api.getArticleList(this.data.page)
      .then((res) => {
        if(res.data.status == 90000){
          let params = this.data.list
          params.push(...res.data.params);
          console.log(params);
          this.setData({
            list: params,
            page: this.data.page + 1,
            isReachBottom: true
          })
        }else{
          this.setData({
            page: null,
            text: "我是有底线的"
          })
        }
        
      })
  },
  tapName: function () {
   wx.navigateTo({
     url: "/pages/articleAll/articleAll",
   })
  },

  onReachBottom: function() {

    if (this.data.isReachBottom){
      console.log("触底");
      this.setData({
        isReachBottom: false
      })
      if (this.data.page) {
        this.getData();
      }
    }
    
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})