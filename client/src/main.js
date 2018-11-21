import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false


const server = axios.create({
    baseURL: 'https://h8ikecommunity-server.adishare.online'
    // baseURL: 'http://localhost:3000'

})

server.interceptors.request.use(function (config) {
    document.body.classList.add('loading-indicator');
    return config
}, function (error) {
    return Promise.reject(error);
});

server.interceptors.response.use(function (response) {
    document.body.classList.remove('loading-indicator');
    return response;
}, function (error) {
    return Promise.reject(error);
});


Vue.prototype.$server = server
Vue.prototype.$clientBaseUrl = 'https://h8overfly.firebaseapp.com'
// Vue.prototype.$clientBaseUrl = 'http://localhost:8080'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
