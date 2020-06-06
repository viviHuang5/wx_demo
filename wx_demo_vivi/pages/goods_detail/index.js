// pages/goods_detail/index.js

/**
 * 1.发送请求获取数据
 * 2.点击轮播图 预览大图
 *  1.给轮播图绑定点击事件
 *  2.调用小程序的api previewImage
 */

import {request} from '../../request/index.js'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:''

  },
  //商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },

  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone部分手机 不识别 webp图片格式
        //最好找到后台，让他进行修改
        //临时自己改 确保后台存在 1.wabp => 1.jpg
        goods_introduce:goodsObj.goods_introduce.replace(/\.web/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
    console.log(this.data.goodsObj)

  },
  //点击轮播图放大预览的
  handlePreviewImage(e){
    //1.先构造要预览的图片数组
    //2.接收传递过来的图片url
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
      

  },
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