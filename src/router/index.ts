import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Login.vue');
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Home.vue');
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Welcome.vue');
const Users = () => import(/* webpackChunkName: "user_rights_roles" */ '@/components/user/Users.vue');
const Rights = () => import(/* webpackChunkName: "user_rights_roles" */ '@/components/power/Rights.vue');
const Roles = () => import(/* webpackChunkName: "user_rights_roles" */ '@/components/power/Roles.vue');
const Cate = () => import(/* webpackChunkName: "cate_params_list" */ '@/components/goods/Cate.vue');
const Params = () => import(/* webpackChunkName: "cate_params_list" */ '@/components/goods/Params.vue');
const List = () => import(/* webpackChunkName: "cate_params_list" */ '@/components/goods/List.vue');
const Add = () => import(/* webpackChunkName: "add_order_report" */ '@/components/goods/Add.vue');
const Order = () => import(/* webpackChunkName: "add_order_report" */ '@/components/order/Order.vue');
const Report = () => import(/* webpackChunkName: "add_order_report" */ '@/components/report/Report.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', redirect: '/login'}, // 重定向
  {path: '/login', component: Login},
  {
    path: '/home', component: Home, redirect: '/welcome', children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: Users},
      {path: '/rights', component: Rights},
      {path: '/roles', component: Roles},
      {path: '/categories', component: Cate},
      {path: '/params', component: Params},
      {path: '/goods', component: List},
      {path: '/goods/add', component: Add},
      {path: '/orders', component: Order},
      {path: '/reports', component: Report},
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
