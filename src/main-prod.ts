import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueQuillEditor from 'vue-quill-editor';
import ZkTable from 'vue-table-with-tree-grid';

import '@/assets/css/global.scss';
import '@/assets/fonts/iconfont.css'; // 引入icon
import '@/config/element';
import '@/config/axios';
import '@/config/dateFormat';

import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */);

Vue.config.productionTip = false;
Vue.component('tree-table', ZkTable);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
