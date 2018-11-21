import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginUser: false,
    allQuestions: [],
    allAnswer: [],
    questionAnswer: []
  },
  mutations: {
    mutateLogin(state){
      state.isLoginUser = true
    },
    mutateLogout(state){
        state.isLoginUser = false
    },
    mutateAllQuestion(state, payload){
      state.allQuestions = payload
    },
    mutateUVquestion(state,payload){
      let filtered = state.allQuestions.filter(data => {
        if (data._id == payload.data._id){
          data.upvote = payload.data.upvote
          data.downvote = payload.data.downvote
        }
        return data
      })
    },
    mutateDVquestion(state,payload){
      let filtered = state.allQuestions.filter(data => {
        if (data._id == payload.data._id){
          data.downvote = payload.data.downvote
          data.upvote = payload.data.upvote

        }
        return data
      })
    },
    mutateNewQuest(state, payload){
      state.allQuestions.push(payload)
    },
    mutateAllAnswer(state, payload){
      state.allAnswer = payload
      // console.log(payload)
    },
    mutateNewAnswer(state, payload){
      state.allAnswer.push(payload)
    },
   
  },

  getters: {
    filterAnswer: (state)=> (id) => {
      // console.log(id)
    //  let filtered = state.allAnswer.filter(val => {
    //     return val.questionId._id == id;
    //   })
    //   return filtered
    }
      
      
    
  },

  actions: {
    setStatusUser (context){
      context.commit('mutateLogin')
    },
    setStatusUserOut(context){
      context.commit('mutateLogout')
    },
    getAllQuestion(context){
      axios.get('http://localhost:3000/question')
      .then(done => {
        context.commit('mutateAllQuestion', done.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvoteQuestion(context, data){
      axios.post('http://localhost:3000/question/upvote', data)
      .then(data => {
        context.commit('mutateUVquestion', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    downvoteQuestion(context, data){
      axios.post('http://localhost:3000/question/downvote', data)
      .then(data => {
        context.commit('mutateDVquestion', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addQuestion (context, data){
     
      axios.post('http://localhost:3000/question/add', data)
      .then(data => {
        // console.log(data.data)
        context.commit('mutateNewQuest', data.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllAnswer(context){
      axios.get('http://localhost:3000/answer/all')
      .then(data => {
        context.commit('mutateAllAnswer', data.data)
        
      })
      .catch(err => {
        console.log(err)
      })
    },
    addAnswer(context,data){
      axios.post('http://localhost:3000/answer/add', data)
      .then(data => {
        console.log(data)
        context.commit('mutateNewAnswer', data.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
   
    
  },
})
