import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error_status: false,
    error_msg: "",
    questionList: [],
    viewedQuestion: {},
    questionUpVote: 0,
    questionDownVote: 0,
    answerUpVote: 0,
    answerDownVote: 0,
    decoded: {},
    answersList: [],
    currentUserAnswerList: [],
  },
  mutations: {
    storeQuestions_Mutate(state, data) {
      state.questionList = data
      console.log(state.questionList)
    },
    viewedQuestion_Mutate(state, data) {
      state.questionUpVote = 0
      state.questionDownVote = 0
      data.votes.forEach(vote => {
        if (vote.vote == 1) {
          state.questionUpVote += 1
        } else if (vote.vote == -1) {
          state.questionDownVote += 1
        }
      });
      data.answers.forEach(vote => {
        if (vote.votes == 1) {
          state.answerUpVote += 1
        } else if (vote.vote == -1) {
          state.answerDownVote += 1
        }
      });
      state.viewedQuestion = data
    },
    decode_Mutate(state, data) {
      state.decoded = data
    },
    removeQuestion_Mutate(state, data) {
      let newArray = state.questionList.filter(list => String(list._id) != data._id)
      state.questionList = newArray
    },
    getAllAnswers_Mutata(state, data) {
      state.answersList = data
      state.currentUserAnswerList = []
      data.forEach(element => {
        if(element.poster._id == state.decoded._id){
          state.currentUserAnswerList.push(element)
        }
      });
      console.log('cual', state.currentUserAnswerList)
    },
    resetError_Mutate(state) {
      state.error_status = false
    },
  },
  actions: {
    storeQuestions_Action(context) {
      axios({
        method: "get",
        url: "http://35.194.200.110:3000/ho/question",
        })
        .then(response => {
          context.commit('storeQuestions_Mutate', response.data.data)
        })
        .catch(err => {
            console.log(err);
        });
    },
    viewedQuestion_Action(context, data) {
      context.commit('viewedQuestion_Mutate', data)
    },
    editQuestion_Action(context, data) {
      let token = localStorage.getItem("token");
      axios({
        method: "put",
        url: "http://35.194.200.110:3000/ho/question/edit",
        headers: { token: token },
        data: data
      })
        .then(response => {
          window.location.href = '/dashboard/questions'
        })
        .catch(err => {
          console.log(err);
        });
    },
    decode(context) {
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "http://35.194.200.110:3000/ho/decode",
        headers: { token: token }
      })
        .then(response => {
          context.commit('decode_Mutate', response.data.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeQuestion_Action(context, data) {
      let token = localStorage.getItem("token");
      return axios({
        method: "delete",
        url: "http://35.194.200.110:3000/ho/question/delete",
        headers: { token: token },
        data: data
      })
        .then(response => {
          context.commit('removeQuestion_Mutate', response.data.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    addQuestion_Action({context,dispatch,state}, data) {
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "http://35.194.200.110:3000/ho/question/add",
        headers: { token: token },
        data: data
      })
      .then((response) => {
        dispatch('storeQuestions_Action')
        state.error_status = false
      })
      .catch(err => {
        console.log(err);
        state.error_msg = err.response.data.message
        state.error_status = true
      });
    },
    getAllAnswers(context) {
      axios({
        method: "get",
        url: "http://35.194.200.110:3000/ho/answer"
      })
      .then(response => {
        context.commit('getAllAnswers_Mutata', response.data.data)
      })
      .catch(err => {
          console.log(err);
      });
    },
    editAnswer_Action(context, data) {
      let token = localStorage.getItem("token");
      axios({
        method: "put",
        url: "http://35.194.200.110:3000/ho/answer/edit",
        headers: { token: token },
        data: data
      })
        .then(response => {
          console.log(response.data);
          window.location.href = '/dashboard/answers'
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetError(context) {
      context.commit("resetError_Mutate")
    },
    voteQ_Action({context, dispatch, state}, data) {
      axios({
          method: "post",
          url: `http://35.194.200.110:3000/ho/${data.route}/vote`,
          headers: { token: data.token },
          data: {
            questionId: data.questionId,
            vote: data.vote
          },
        })
        .then((response) => {
          dispatch('storeQuestions_Action')
          //get question data
          axios({
            method: "get",
            url: "http://35.194.200.110:3000/ho/question",
            })
            .then(response => {
              //find the question with the same questionID
              response.data.data.forEach(element => {
                if(data.questionId == element._id) {
                  //once found, we dispatch so that the data regarding quetion being viewed will update
                  dispatch('viewedQuestion_Action', element)
                }
                state.error_status = false
              });
            })
            .catch(err => {
                console.log(err);
                state.error_msg = err.response.data.message
                state.error_status = true
            });
        })
        .catch((err) => {
          console.log(err)
          state.error_msg = err.response.data.message
          state.error_status = true
        })      
    },
    voteA_Action({context, dispatch, state}, data) {
      axios({
          method: "post",
          url: `http://35.194.200.110:3000/ho/${data.route}/vote`,
          headers: { token: data.token },
          data: {
            answerId: data.answerId,
            vote: data.vote
          },
        })
        .then((response) => {
          dispatch('storeQuestions_Action')
          //get question data
          axios({
            method: "get",
            url: "http://35.194.200.110:3000/ho/question",
            })
            .then(response => {
              console.log('GET', response)
              //find the question with the same questionID
              response.data.data.forEach(element => {
                if(data.questionId == element._id) {
                  //once found, we dispatch so that the data regarding quetion being viewed will update
                  dispatch('viewedQuestion_Action', element)
                }
              });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch((err) => {
          console.log(err)
        })      
    },
    addAnswer_Action({context, dispatch, state}, data) {
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "http://35.194.200.110:3000/ho/answer/add",
        headers: { token: token },
        data: data
      })
      .then((response) => {
        dispatch('storeQuestions_Action')
        //get question data
        return axios({
          method: "get",
          url: "http://35.194.200.110:3000/ho/question",
          })
          .then(response => {
            //find the question with the same questionID
            response.data.data.forEach(element => {
              if(data.questionId == element._id) {
                //once found, we dispatch so that the data regarding quetion being viewed will update
                dispatch('viewedQuestion_Action', element)
              }
              state.error_status = false
            });
          })
      })
      .catch(err => {
        console.log(err);
        state.error_msg = err.response.data.message
        state.error_status = true
      });
    }
  }
})
