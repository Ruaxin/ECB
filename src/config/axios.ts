import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
// 请求拦截器
axios.interceptors.request.use(config => {
  // 对请求头做处理，在Authorization添加token,来获取权限
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 在最后必须 return config
  return config;
});
Vue.prototype.$http = axios; //全局挂载
