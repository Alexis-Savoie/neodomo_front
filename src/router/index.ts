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
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: () => import('../views/forgotPassword.vue')
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
    path: '/listComment',
    name: 'listComment',
    component: () => import('../views/listComment.vue')
  },
  {
    path: '/listMessage',
    name: 'listMessage',
    component: () => import('../views/listMessage.vue')
  },
  {
    path: '/detailMessage',
    name: 'detailMessage',
    component: () => import('../views/detailMessage.vue')
  },
  {
    path: '/listUser',
    name: 'listMessage',
    component: () => import('../views/listUser.vue')
  },
  {
    path: '/detailUser',
    name: 'detailUser',
    component: () => import('../views/detailUser.vue')
  },
  {
    path: '/listProduct',
    name: 'listProduct',
    component: () => import('../views/listProduct.vue')
  },
  {
    path: '/detailProduct',
    name: 'detailProduct',
    component: () => import('../views/detailProduct.vue')
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: () => import('../views/addProduct.vue')
  },
  {
    path: '/listBill',
    name: 'listBill',
    component: () => import('../views/listBill.vue')
  },
  {
    path: '/detailBill',
    name: 'detailBill',
    component: () => import('../views/detailBill.vue')
  },
  {
    path: '/statSales',
    name: 'statSales',
    component: () => import('../views/statSales.vue')
  },
  {
    path: '/statGamification',
    name: 'statGamification',
    component: () => import('../views/statGamification.vue')
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
