// pages/category/index.js
import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接口的返回数据
    cates:[],
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop:0
  },


onLoad: function (options) {
    //1.先判断下本地存储中有没有旧的数据
    //{time:Date.now(),data:[...]}
    //2.没有旧数据 直接发送新请求
    //3.有旧的数据 同时旧的数据也没有过期 就使用本地存储中的旧数据即可
    
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      //有旧的数据 定义过期时间 10s 改成 5分钟
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates()
      }else{
        console.log('可以用旧的数据')
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
      
  },
  //获取分类数据
  async getCates(){ 
    const res = await request({url:'/categories'});
    this.Cates = res;
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
      //构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单的点击
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children; 
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})