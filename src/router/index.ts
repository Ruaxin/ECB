import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/components/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/login' }, // 重定向
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
