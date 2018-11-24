import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    userId : '',
    username : ''
  },
  mutations: {
    mutIsLogin(state,payload){
      state.isLogin = payload
    },
    mutUserId(state,payload){
      state.userId = payload
    },
    mutUserName(state,payload){
      state.username = payload
    }
  },
  actions: {
    checkToken(context){

      let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userId')
      let username = localStorage.getItem('username')

      if(token){
        context.commit('mutIsLogin',true)
        context.commit('mutUserId',userId)
        context.commit('mutUserName',username)
      }else{
        context.commit('mutIsLogin',false)
        context.commit('mutUserId','')
        context.commit('mutUserName','')
      }
    },
    signOut(context,payload){
      console.log('logging out...')
      
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')

      context.dispatch('checkToken')
    }
  }
})
