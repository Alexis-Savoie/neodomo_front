import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/listPost',
    name: 'listPost',
    component: () => import('../views/listPost.vue')
  },
  {
    path: '/detailPost',
    name: 'detailPost',
    component: () => import('../views/detailPost.vue')
  },
  {
    path: '/listUser',
    name: 'listUser',
    component: () => import('../views/listUser.vue')
  },
  {
    path: '/statSales',
    name: 'statSales',
    component: () => import('../views/statSales.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
