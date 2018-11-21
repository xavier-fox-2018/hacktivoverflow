import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    axios_url: "http://localhost:4000",
    isLogin: true,
    questions: ''
  },
  getters: {
  },
  mutations: {
    LOGIN_CHANGE: (state, value) => {
      state.isLogin = value
    },

    POPULATE_QUESTIONS: (state, value) => {
      state.questions = value
    }
  },
  actions: {}
});
