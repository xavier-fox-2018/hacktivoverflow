import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import wysiwyg from 'vue-wysiwyg'
import "vue-wysiwyg/dist/vueWysiwyg.css"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(wysiwyg, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
