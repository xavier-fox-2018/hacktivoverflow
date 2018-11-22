import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    loginStatus: false,
    name: '',
    showAlert: false,
    alertMessage: '',
    varAlert: '', //danger, success,
    allQuestions: []
  },
  mutations: {
    toLogin: (state, user)=>{
      state.loginStatus = true
      state.token = user.token
      state.name = user.name
    },
    toMustLogin: (state)=>{
      state.showAlert = true
      state.alertMessage = 'Registered Success, please login to continue!'
      state.varAlert = 'success'
    },
    setQuestions: (state, data)=>{
      state.allQuestions = data
    } 
    
  },
  actions: {
    login({commit}, payload){
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response=>{
          console.log(response, '==response')
          localStorage.setItem('token', response.data.token)
          commit('toLogin', response.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    register({commit}, payload){
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(response=>{
          if(response.status === 201){
            commit('toMustLogin')
          } else {
            console.log(response)
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }, 
    getQuestions({commit}){
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions'
      })
        .then(payload=>{
          // console.log(payload, "masuk pak ekoo")
          commit('setQuestions', payload.data)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
})
