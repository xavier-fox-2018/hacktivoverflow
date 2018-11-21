import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allquestions: [],
    myquestions: []
  },
  mutations: {
    getallstoredquestions (state, payload) {
      state.allquestions = payload
    },
    getfilteredquestions (state, payload) {
      state.allquestions = payload
    },
    getmystoredquestions (state, payload) {
      state.myquestions = payload
    }
  },
  actions: {
    getallstoredquestions (context, payload) { /* payload itu input data */
      if (!payload) {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/question/all'
        })
          .then(questions => {
            context.commit('getallstoredquestions', questions.data.data)
            console.log('ini di store', questions.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios({
          method: 'GET',
          url: `http://localhost:3000/question/search?search=${payload}`
        })
          .then(questions => {
            console.log('bisa search', questions)
            context.commit('getfilteredquestions', questions.data.data)
          })
          .catch(err => {
            console.log('error di search', err)
          })
      }
    },

    getmystoredquestions (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/question/mine',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(questions => {
          context.commit('getmystoredquestions', questions.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
