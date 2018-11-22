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
      component: Home
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('./views/Question')
    },
    {
      path: '/questions/post',
      component: () => import('./views/QuestionPost')
    },
    {
      path: '/questions/:id',
      component: () => import('./views/QuestionDetail')
    },
    {
      path: '/myquestions',
      component: () => import('./views/MyQuestion'),
      children: [
        {
          path:'/myquestions/:id',
          component: () => import('./views/MyQuestionDetail')
        }
      ]
    }
  ]
})
