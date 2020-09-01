import {Form, FormItem, Input, Button, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;
