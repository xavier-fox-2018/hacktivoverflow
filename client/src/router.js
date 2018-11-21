import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: 'register',  component: () => import('./components/registerForm.vue')},
        {path: '',  component: () => import('./components/login.vue')},
      ]
    },
    {
      path: '/register',
      name: 'register', 
      component: () => import(/* webpackChunkName: "about" */ './components/registerForm.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import(/* webpackChunkName: "about" */ './views/main.vue'),
      children: [
        {path: '',  component: () => import('./components/questionList.vue')},
        {path: 'detail',  component: () => import('./views/detail.vue')},
      ]
    }
    // {
    //   path: '/detail',
    //   name: 'detail',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/detail.vue')
    // }
  ]
})
