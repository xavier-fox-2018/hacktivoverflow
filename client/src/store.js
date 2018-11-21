import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    registerSuccessAlert : false,
    questionList : [],
    myPostList : []
  },
  mutations: {
    openRegisterSuccessAlert (state) {
      state.registerSuccessAlert = true
    },
    changeLoginTrue (state) {
      state.isLogin = true
      state.registerSuccessAlert = false
    },
    changeLoginFalse (state) {
      state.isLogin = false
    },
    setQuestionList (state, payload) {  
      state.questionList = payload
    },
    setMyPostList (state, payload) {
      state.myPostList = payload
    }
  },
  actions: {
    registerUser ({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users',
        data : {
          name : payload.name,
          email : payload.email,
          password : payload.password
        }
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    registerSuccess ({commit}) {
      commit('openRegisterSuccessAlert')
    },
    logoutUser ({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      commit('changeLoginFalse')
    },
    isLogged ({commit}) {
      commit('changeLoginTrue')
    },
    loginUser ({commit}, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data : {
          email : payload.email,
          password : payload.password
        }
      })
      .then(data => {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('name', data.data.name)
        console.log('masuk')
        commit('changeLoginTrue')
      })
      .catch(err => {
        console.log(err)
      })
    },
    createQuestion({dispatch, commit}, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/questions',
        headers: {
          token : localStorage.getItem('token')
        },
        data: payload
      })
      .then(data => {
        dispatch('getQuestion')
        dispatch('getMyPost')
        console.log('created')
      })
      .catch(err => {
        console.log(err)
      })
    },
    getQuestion({commit}) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions',
      })
      .then(question => {
        console.log(question)
        console.log('get')
        commit('setQuestionList', (question.data).reverse())
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMyPost({commit}) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions/mypost',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(question => {
        commit('setMyPostList', (question.data).reverse())
      })
      .catch(err => {
        console.log(err)
      })
      console.log('dari sini')
    }
  }
})
