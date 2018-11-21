import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    myQuestions: []
  },
  mutations: {
    setQuestions: (state, payload) => {
      state.questions = payload
    },

    setLogin: (state, payload) => {
      state.isLogin = payload
    }
  },
  actions: {

    setQuestions: ({commit}, payload) => {
      commit('setQuestions', payload)
    },

    setLogin: ({commit}, payload) => {
      commit('setLogin', payload)
    },

   checkLogin: ({commit}) => {
      const token =localStorage.getItem('token')
      if (token) {
        commit('setLogin', true)
      } else {
        commit('setLogin', false)
      }
   } 
  }
})
