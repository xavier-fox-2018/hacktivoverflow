import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pertanyaan : [],
    tanya : {}
  },
  mutations: {
    initializePertanyaan(state, payload){
      state.pertanyaan = payload
    },
    findById(state, payload){
      state.tanya = payload
    }
  },
  actions: {
    initializePertanyaan({ commit }){
      axios({
        method : 'GET',
        url : 'http://localhost:3000/pertanyaan'
      })
      .then( ({ data}) => {
        console.log(data)
        commit('initializePertanyaan', data)
      })
      .catch( error =>{
        console.log('error :', error)
      })
    }
  }
})
