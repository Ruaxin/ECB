import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'
import '@/assets/fonts/iconfont.css' // 引入icon
import { Form, FormItem, Input, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
