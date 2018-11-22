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
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./components/QuestionList.vue')
        },
        {
          path: 'question',
          name: 'question',
          component: () => import('./views/QuestionDetail.vue'),
          children: [
            {
              path: ':id',
              name: 'questionDetail'
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('./views/Edit.vue'),
      children: [
        {
          path: 'answer/:id',
          name: 'editAnswer',
          component: () => import('./components/EditAnswer.vue')
        },
        {
          path: 'question/:id',
          name: 'editQuestion',
          component: () => import('./components/EditQuestion.vue')
        }
      ]
    }
  ]
})
