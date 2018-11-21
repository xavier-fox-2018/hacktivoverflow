import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        userEmail: '',
        questions: []
    },
    mutations: {
        changeIsLogin: function(state, payload) {
            state.isLogin = payload;
        },
        fillUserEmail: function(state, payload) {
            state.userEmail = payload;
        },
        setQuestions: function(state, payload) {
            state.questions = payload;
        }
    },
    actions: {
        changeIsLogin: function(context, payload) {
            context.commit('changeIsLogin', payload);
        },
        fillUserEmail: function({ commit }, payload) {
            commit('fillUserEmail', payload);
        },
        checkLogin: function({ commit }) {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token) {
                commit('changeIsLogin', true);
            }

            if (email) {
                commit('fillUserEmail', email);
            }
        },
        getQuestions: function({ commit }) {
            axios({
                method: 'GET',
                url: `${config.port}/questions`
            })
                .then((questions) => {
                    console.log('asd')
                    commit('setQuestions', questions.data.reverse());
                })
                .catch((err) => {
                    console.log('Get All Questions Error: ', err);
                });
        }, 
        changeQuestions: function({ commit }, payload) {
            commit('setQuestions', payload);
        }
    }
});
