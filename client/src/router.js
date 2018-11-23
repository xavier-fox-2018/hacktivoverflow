import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },

    // Path to register
    {
      path: "/register",
      name: "Register",
      component: () => import("./views/Register.vue")
    },

    // Path to login
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },

    // Path to logout
    {
      path: "/logout",
      name: "Logout",
      component: () => import("./views/Logout.vue")
    },

    // Path to dashboard (Logged in user only)
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/Dashboard.vue")
    },

    // New question
    {
      path: "/ask",
      name: "Ask",
      component: () => import("./views/Ask.vue")
    },

    // Question page
    {
      path: "/:userId/:questionId",
      name: "QuestionFull",
      component: () => import('./views/QuestionFull.vue')
    }
  ]
});
