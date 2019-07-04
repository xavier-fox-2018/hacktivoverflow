import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const server = axios.create({
    baseURL: 'https://hacktivoverflow-1.herokuapp.com'
    // baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user : '',
        threads : [],
        thread : {}
    },
    mutations: {
        mutateThreads(state, data) {
            state.threads = data
        },
        mutateThread(state, data) {
            state.thread = data
        },
        mutateUser(state, data) {
            state.user = data
        }
    },
    actions: {

        fetchThreads({commit}) {
            server.get('/threads')
                .then((result) => {
                    commit('mutateThreads', result.data)
                }).catch((err) => {
                    console.log(err.response);
                });
        },

        fetchThread({commit}, threadId) {
            server.get(`/threads/${threadId}`)
                .then((result) => {
                    commit('mutateThread', result.data)
                }).catch((err) => {
                    console.log(err.response);
                });
        },

        setUser({commit}, payload) {
            commit('mutateUser', payload)
        },

    }
})
