import axios from 'axios';
import Vue from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
// 请求拦截器
axios.interceptors.request.use(config => {
  // 对请求头做处理，在Authorization添加token,来获取权限
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 在最后必须 return config
  return config;
});
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});
Vue.prototype.$http = axios; //全局挂载
