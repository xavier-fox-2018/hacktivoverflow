import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import wysiwyg from "vue-wysiwyg";
import Notifications from 'vue-notification'
import swal from 'sweetalert';

Vue.use(wysiwyg, {});
Vue.use(Notifications)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
