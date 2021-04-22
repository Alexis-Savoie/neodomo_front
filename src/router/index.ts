import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'


function guardMyroute(to: any, from: any, next: any) {
  let isAuthenticated = false;
  //this is just an example. You will have to find a better or 
  // centralised way to handle you localstorage data handling 
  if (localStorage.getItem('isAuthenticated'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: () => import('../views/forgotPassword.vue')
  },
  {
    path: '/listPost',
    name: 'listPost',
    beforeEnter : guardMyroute,
    component: () => import('../views/listPost.vue')
  },
  {
    path: '/detailPost/:idPost?',
    name: 'detailPost',
    beforeEnter : guardMyroute,
    component: () => import('../views/detailPost.vue')
  },
  {
    path: '/listComment/:idPost?',
    name: 'listComment',
    beforeEnter : guardMyroute,
    component: () => import('../views/listComment.vue')
  },
  {
    path: '/listMessage',
    name: 'listMessage',
    beforeEnter : guardMyroute,
    component: () => import('../views/listMessage.vue')
  },
  {
    path: '/detailMessage/:idMessage?',
    name: 'detailMessage',
    beforeEnter : guardMyroute,
    component: () => import('../views/detailMessage.vue')
  },
  {
    path: '/listUser',
    name: 'listMessage',
    beforeEnter : guardMyroute,
    component: () => import('../views/listUser.vue')
  },
  {
    path: '/detailUser/:idUser?',
    name: 'detailUser',
    beforeEnter : guardMyroute,
    component: () => import('../views/detailUser.vue')
  },
  {
    path: '/listProduct',
    name: 'listProduct',
    beforeEnter : guardMyroute,
    component: () => import('../views/listProduct.vue')
  },
  {
    path: '/detailProduct/:idProduct?',
    name: 'detailProduct',
    beforeEnter : guardMyroute,
    component: () => import('../views/detailProduct.vue')
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    beforeEnter : guardMyroute,
    component: () => import('../views/addProduct.vue')
  },
  {
    path: '/listBill/:idProduct?',
    name: 'listBill',
    beforeEnter : guardMyroute,
    component: () => import('../views/listBill.vue')
  },
  {
    path: '/detailBill/:idBill?',
    name: 'detailBill',
    beforeEnter : guardMyroute,
    component: () => import('../views/detailBill.vue')
  },
  {
    path: '/statSales/:idProduct?',
    name: 'statSales',
    beforeEnter : guardMyroute,
    component: () => import('../views/statSales.vue')
  },
  {
    path: '/statGamification',
    name: 'statGamification',
    beforeEnter : guardMyroute,
    component: () => import('../views/statGamification.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    beforeEnter : guardMyroute,
    component: () => import('../views/settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
