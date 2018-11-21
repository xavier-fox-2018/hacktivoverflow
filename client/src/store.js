import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        link: `http://localhost:3000`,
        questions: []
    },
    mutations: {
        getQuestionsMutate(state, data) {
            state.questions = data
        },
        addQuestionsMutate(state, data) {
            state.questions.push(data)
            console.log('ini question yang abru', state.questions)
        },
        getSearchedQuestionMutate(state, data) {
            state.questions = data
        }
    },
    actions: {
        getSearchedQuestion(context, payload) {
            console.log('ini dari store', payload)
            if (payload.search) {
                axios.get(`${this.state.link}/questions`, {
                        headers: {
                            token: payload.token
                        }
                    })
                    .then(({ data }) => {
                        const result = data.filter(datum => (datum.content.includes(payload.search) || datum.title.includes(payload.search)));
                        context.commit('getSearchedQuestionMutate', result)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                axios.get(`${this.state.link}/questions`, {
                        headers: {
                            token: payload
                        }
                    })
                    .then(({ data }) => {
                        context.commit('getQuestionsMutate', data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        getQuestions(context, payload) {
            axios.get(`${this.state.link}/questions`, {
                    headers: {
                        token: payload
                    }
                })
                .then(({ data }) => {
                    context.commit('getQuestionsMutate', data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        addQuestions(context, payload) {
            context.commit('addQuestionsMutate', payload)
        }
    }
})