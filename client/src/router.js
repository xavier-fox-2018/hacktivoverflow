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
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import(/* webpackChunkName: "about" */ './views/SelectTab.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "about" */ './components/QuestionsList.vue')
        },
        {
          path: 'questions',
          component: () => import(/* webpackChunkName: "about" */ './components/QuestionsList.vue')
        },
        {
          path: 'myquestions',
          component: () => import(/* webpackChunkName: "about" */ './components/MyQuestions.vue')
        }
      ]
    },
    {
      path: '/questions/:id',
      name: 'questiondetail',
      component: () => import(/* webpackChunkName: "about" */ './views/QuestionDetails.vue')
    },
    {
      path: '/createquestion',
      name: 'createquestion',
      component: () => import(/* webpackChunkName: "about" */ './views/QuestionForm.vue')
    }
  ]
})
