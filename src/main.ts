import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/css/global.css';
import '@/assets/fonts/iconfont.css'; // 引入icon
import {Form, FormItem, Input, Button, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$http = axios; //全局挂载
Vue.config.productionTip = false;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
