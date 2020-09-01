import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/css/global.css';
import '@/assets/fonts/iconfont.css'; // 引入icon
import '@/config/element';
import '@/config/axios';


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
