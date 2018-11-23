import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue);

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
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Questions.vue'),
      children: [ 
        {
          path: '',
          component: () => import(/* webpackChunkName: "about" */ './components/Questions/QuestionHome.vue'),
        },
        {
          path: ':questionId',
          component: () => import(/* webpackChunkName: "about" */ './components/Questions/QuestionDetail.vue'),
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LogIn.vue'),
    },
    {
      path: '/dashboard',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // components: {
      //   default: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      // },
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      children: [ 
          {
            path: 'questions',
            component: () => import(/* webpackChunkName: "about" */ './components/Dashboard/UserQuestions.vue'),
          },
          {
            path: 'questions/view/:questionId',
            component: () => import(/* webpackChunkName: "about" */ './components/Dashboard/ViewQuestion.vue'),
          },
          {
            path: 'questions/edit/:questionId',
            component: () => import(/* webpackChunkName: "about" */ './components/Dashboard/EditQuestion.vue'),
            props: true,
          },
          {
            path: 'answers',
            component: () => import(/* webpackChunkName: "about" */ './components/Dashboard/UserAnswers.vue'),
          },
          {
            path: 'answers/view/:answerId',
            component: () => import(/* webpackChunkName: "about" */ './components/Dashboard/ViewAnswer.vue'),
          },
          {
            path: 'answers/edit/:answerId',
            component: () => import(/* webpackChunkName: "about" */ './components/Dashboard/EditAnswer.vue'),
            props: true,
          },
        ]
    },
  ]
})
