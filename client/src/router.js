import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name : 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue')
    },
    {
      path: '/register',
      name : 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children :[
        {
          path: '',
          name: 'question',
          component: () => import(/* webpackChunkName: "about" */ '@/components/question.vue'),
        },
        {
          path: ':id',
          name: 'question',
          component: () => import(/* webpackChunkName: "about" */ '@/components/detail.vue'),
          children : [
            {
              path: 'answer',
              name: 'answer',
              component: () => import(/* webpackChunkName: "about" */ '@/components/answer.vue'),
            },
          ]
        }
      ]
    },
   
  ]
})
