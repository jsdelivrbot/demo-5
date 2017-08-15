import axios from 'axios'
import vue from 'vue'
import store from './../store/index'
import { baseUrlHost } from './../config/env'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// baseURL配置
axios.defaults.baseURL = baseUrlHost + '/finsuit'

// axios的请求时间
let axiosDate = new Date()
// 是否首次请求数据
let storeSession = false
// 是否进行一次登录状态的判断
let token = false
let GET_MYLOTTERY_NUM = 0
let header,param;
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 请求数据之前判断是否首次请求 如果是添加session 如果不是跳过
  param = JSON.parse(config.data.substring(10));
  header = param.head;
  // header = JSON.parse(config.data.split('=')[1]).head
  if (header.SESSION_ID == '' || header.SESSION_ID == null) {
    storeSession = true;
  }
  // 添加请求头
  param.head.SYSTEM_TYPE = 'h5';
  param.head.VERSION = '';
  config.data = 'param_key=' + JSON.stringify(param);
  return config;
}, function (error) {
  return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (!parseInt(response.data.head.CODE)) {
    // 判断是否为第一次登陆，如果是在第一次请求的时候在vuex中添加 SESSION_ID
    if (storeSession) {
      store.dispatch('SESSION_ID', response.data.head.SESSION_ID)
      storeSession = false
    }
    // 判断是否是登录请求，如果是登录请求，请求是否显示显示中奖纪录接口
    // 判断登录状态
    if (store.state.common.token != '' && store.state.common.token != null) {
      GET_MYLOTTERY_NUM++
      if (GET_MYLOTTERY_NUM <= 1) {
        // query传参并保存登录状态后的登录状态
        token = true
      }
    } else {
      //  未登录状态，并进入登录页面登录
      if (header.TYPE == 'LOGIN') {
        token = true
      }
    }
    return response
  } else {
    alert(response.data.head.MSG)
  }
}, function (error) {
  return Promise.reject(error)
})

// 封装axios的post请求
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    let finsuithttpUrl = document.location.protocol + '//' + document.location.host
    axios.post(url, params)
      .then(response => {
        // 关闭  loading图片消失
        let oDate = new Date()
        let time = oDate.getTime() - axiosDate.getTime()
        if (time < 500) time = 500
        setTimeout(() => {
          store.dispatch('FETCH_LOADING', false)
        }, time)
        resolve(response.data)
        // 进行一次登录状态判断，并且请求是否显示抽奖结果的接口
        if (token) {
          token = false
          // 是否显示 中奖记录 action
          store.dispatch('AWARD_SHOW')
        }
      })
      .catch((error) => {
        // 关闭  loading图片消失
        store.dispatch('FETCH_LOADING', false)
        axiosDate = new Date()
        reject(error)
      })
  })
}

export default {
  // 获取我的页面的后台数据
  // mineBaseMsgApi(url, params) {
  //   return fetch('/finsuitPhone/deal')
  // },
  // 组件中公共页面请求函数
  commonApi (url, params) {
    if(stringQuery(window.location.href)) {
      store.dispatch('FETCH_LOADING', true);
    }
    axiosDate = new Date();
    return fetch(url, params);
  }
}

// 判断是否为分享页面， 共享页面取消加载动画
function stringQuery(url) {
  if(url.indexOf('?') != -1) {
    let url_arr = url.split('?');
    let query = {};
    let url_query_string = url_arr[url_arr.length-1];
    let url_query_arr = url_query_string.split('&');
    for(let i = 0; i < url_query_arr.length; i++) {
      let list = url_query_arr[i].split('=');
      query[list[0]] = list[1];
    }
    if(query.showTitle == 0 && query.showTitle != null && query.showTitle != '') {
      return false;
    }
  }
    
  return true; 
}
