import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allQuestions: [],
    userID: "",
    name: ""
  },
  mutations: {
    setLoginStatus: function(state, status) { // ini tereksekusi kapan?
      state.isLoggedIn = status
    },
    setAllQuestions: function(state, payload) { 
      state.allQuestions = payload
    },
    setUserID: function(state, payload) {
      state.userID = payload
    },
    setName: function(state, payload) {
      state.name = payload
    },
  },
  actions: {
    login: function ({ commit, state }, payload) { 
      let accesstoken = localStorage.getItem('accesstoken')
      let userID = localStorage.getItem('userID')
      let name = localStorage.getItem('name')
      if (accesstoken) {
        commit('setLoginStatus', true)
        commit('setUserID', userID)
        commit('setName', name)
      }
      else {
        commit('setLoginStatus', false)
        commit('setUserID', null)
        commit('setName', null)
      }
    },
    getAllQuestions: function({commit, state}, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/question',
      })
      .then( response => {
        console.log(response.data);
        commit('setAllQuestions', response.data)
      })
      .catch( err => {
        console.log(err);
      })
    }
  }
})
