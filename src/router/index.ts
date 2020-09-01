import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Welcome from '@/components/Welcome.vue';
import {componentFactory} from 'vue-class-component/lib/component';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', redirect: '/login'}, // 重定向
  {path: '/login', component: Login},
  {
    path: '/home', component: Home, redirect: '/welcome', children: [
      {
        path: '/welcome', component: Welcome
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

//路由导航守卫
router.beforeEach((to, form, next) => {
  // 如果是login,就放行
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  //如果没有token，就让他登录
  if (!tokenStr) return next('/login');
  next();
});

export default router;
