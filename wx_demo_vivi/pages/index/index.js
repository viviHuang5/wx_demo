//index.js
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
//获取应用实例
const app = getApp()
//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //分类导航
    cateList:[],
    //楼层数据
    floorList:[]
    
  },

  onLoad: function(options) {
   this.getSwiperList();
   this.getCateList();
   this.getfloorList();
    
  },
  // 获取 轮播图数据
  async getSwiperList(){
    const res = await request({url:'/home/swiperdata'});
    console.log(res)
    this.setData({
      swiperList:res
    })
  },
  // 获取 分类导航数据
  async getCateList(){
    const res = await request({url:'/home/swiperdata'});
    this.setData({
      cateList:res
    })
  
  },
  // 获取 楼层数据
  async getfloorList(){
    const res = await request({url:'/home/floordata'});
    this.setData({
      floorList:res
    })
  }

});
  
