import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    userId: '',
    formatedDate: ''
  },
  mutations: {
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setUserId(state, payload) {
      state.userId = payload
    },
    setFormatedDate(state, payload) {
      state.formatedDate = payload
    }
  },
  actions: {
    getIsLogin({commit, dispatch}, payload) {
      commit('setIsLogin', payload)
      if(localStorage.getItem('token')) {
        commit('setIsLogin', payload)
      } else {
        commit('setIsLogin', payload)
        this.$router.push('/login')
      }
    },
    getUsername({commit, dispatch}, payload) {
      commit('setUsername', payload)
    },
    getUserId({commit, dispatch}, payload) {
      commit('setUserId', payload)
    },
    getDate({commit, dispatch}, payload) {
      let date = new Date(payload);
      let newDate = date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear();
      commit('setFormatedDate', newDate)
    }
  }
})
