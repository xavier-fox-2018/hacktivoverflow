import Vue from 'vue'
import Notifications from "vue-notification"
import NProgress from "nprogress";
import App from './App.vue'
import router from './router'
import store from './store'
import "../node_modules/nprogress/nprogress.css";

Vue.config.productionTip = false
Vue.use(Notifications);

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
