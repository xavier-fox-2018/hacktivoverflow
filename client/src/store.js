import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listOfQuestion: []
  },
  mutations: {
    getQuestionList (state) {
      Axios({
        url: 'http://overflow-server.pemmz-palzu.site/questions',
        method: 'get'
      })
        .then(response => {
          state.listOfQuestion = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  actions: {
    getQuestionList ({ commit }) {
      commit('getQuestionList')
    }
  }
})
