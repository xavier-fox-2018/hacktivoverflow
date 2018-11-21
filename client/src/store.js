import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataQuestion: [],
        loadingGif: false,
    },
    mutations: {
        GET_DATA: (state, dataQuestion) => {
            state.dataQuestion = dataQuestion;
        },
    },
    actions: {
        getData({ commit }) {
            this.state.dataQuestion = [];
            this.state.loadingGif = true;
            axios({
                method: 'GET',
                url: 'http://localhost:3000/questions',
            })
                .then(resolve => {
                    commit('GET_DATA', resolve.data);
                    this.state.loadingGif = false;
                })
                .catch(reject => {
                    console.log('reject ==== ', reject);
                });
        },
    },
});