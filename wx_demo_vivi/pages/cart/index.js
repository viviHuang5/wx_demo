// pages/cart/index.js
/**
 * 1.获取用户的收货地址
 *  1.点击绑定事件
 *  2.调用小程序内置api 获取用户的收货地址(走不通)
 *  2.获取用户 对小程序 所授予 获取地址的 权限状态 scope
 *    1.假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address   scope为 true
 *    2.假设 用户 点击获取收货地址的提示框 取消
 *      scope为 false
 *        1.诱导用户自己 打开 授权设置页面 当用户重新 给与 获取地址权限的时候
 *        2.获取收货地址
 *    3.假设 用户 从来没有调用过这个收货地址的api
 *      scope为 undefined
 *    4.把获取到的收货地址保存到缓存中
 */   
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({
  data: {

  },
  //获取收货地址

    async handleChooseAddress() {
      try {
      //1.获取权限状态
      const res1 = await getSetting();
      const scopeAdress = res1.authSetting["scope.address"]
      //2.判断权限状态
      if (scopeAdress === false) {
        //3.先诱导用户打开授权页面
        await openSetting();
      } 
        //4.调用获取收货地址的api
        const address = await chooseAddress();
        wx.setStorageSync('address', address);
          
    }catch(error){
      console.log(error)
    }
  }
 
})