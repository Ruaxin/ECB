import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/css/global.scss';
import '@/assets/fonts/iconfont.css'; // 引入icon
import '@/config/element';
import '@/config/axios';
import ZkTable from 'vue-table-with-tree-grid';


Vue.config.productionTip = false;
Vue.component('tree-table', ZkTable);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
