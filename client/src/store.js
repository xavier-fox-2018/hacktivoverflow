import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawerState: false,
    isLogin: false,
    allQuestions: [],
    ownQuestions: [],
    detailQuestion: null,
    userDetail: null
  },
  mutations: {
    getAllQuestions (state, payload) {
      state.allQuestions = payload
    },
    getOwnQuestions (state, payload) {
      state.ownQuestions = payload
    },
    getQuestionDetails (state, payload) {
      state.detailQuestion = payload
    },
    toggleDrawer (state) {
      state.drawerState = !state.drawerState
    },
    changeDrawerState (state, payload) {
      state.drawerState = payload
    },
    checkLoginStatus (state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    getUserDetail (state, payload) {
      state.userDetail = payload
    },
    resetOwnQuestions (state) {
      state.ownQuestions = []
    }
  },
  actions: {
    getAllQuestions ({ commit }) {
      axios.get('https://hackverflow-server.arjunagbt.icu/questions')
        .then(response => {
          commit('getAllQuestions', response.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOwnQuestions ({ commit }) {
      axios.get('https://hackverflow-server.arjunagbt.icu/questions/myQuestions', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          commit('getOwnQuestions', response.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getQuestionDetails ({ commit }, value) {
      axios.get(`https://hackverflow-server.arjunagbt.icu/questions/${value}`)
        .then(response => {
          commit('getQuestionDetails', response.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUserDetail ({ commit }) {
      if (localStorage.getItem('token')) {
        axios.get(`https://hackverflow-server.arjunagbt.icu/users/profile`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            commit('getUserDetail', response.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        commit('getUserDetail', {})
      }
    },
    checkLoginStatus ({ commit }) {
      commit('checkLoginStatus')
    },
    toggleDrawer ({ commit }) {
      commit('toggleDrawer')
    },
    changeDrawerState ({ commit }, value) {
      commit('changeDrawerState', value)
    },
    resetOwnQuestions ({ commit }) {
      commit('resetOwnQuestions')
    }
  }
})
