import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert';
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLogin: false,
		user: {},
		questions: [],
		myquestions: []
	},

	mutations: {
		changeIsLoginAndMakeToken (state, payload) {
			state.isLogin = payload
		},
		setUser (state, payload) {
			state.user = payload
		},
		setQuestion (state, payload){
			state.questions = payload
		},
		myQuest (state, payload){
			state.myquestions = payload
		}
	},
	

	actions: {
		deleteQuestion({commit}, payload) {
			console.log(`delete`, payload);
			
			axios({
				url: url+`/questions/${payload}`,
				method: 'DELETE',
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response =>{
				this.dispatch('myQuestion')
				
			})
			.catch(err =>{
				console.log(`data no found`,err);
			})
		},


		getQuestion({commit}, payload){
			axios({
				url: url+ `/questions`,
				method: 'GET',
			})
			.then(response =>{
				console.log(`iiiiiii`, response)
				commit('setQuestion', response.data)
			})
			.catch(err =>{
				console.log(`data no found`);
			})
		},

		// getQuestions ({ commit }, payload) {
		// 	axios({
		// 		url: `http://localhost:3000/questions/${payload}`,
		// 		method: 'get'
		// 	})
		// 	.then(found => {
		// 		commit('setQuestion', found.data)
		// 	})
		// 	.catch(err => console.log(err))
		// },

		addQuestion({commit}, payload){
			axios({
				url: url+ `/questions`,
				method: 'POST',
				data: {
					title: payload.title,
					description: payload.description
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response =>{
				swal({
					title: "Good job!",
					text: `Success add questions`,
					icon: "success",
					button: "Aww yiss!",
				});
			})
			.catch(() => { 
				swal(`Failed add questions`)
			})
		},

		loginIn ({ commit }, payload) {
			axios({
				url: url + `/users/signin`,
				method: 'post',
				data: { 
					email: payload.email, 
					password: payload.password 
				}
			})
			.then(found => {
				localStorage.setItem('token', found.data.token)
				commit('changeIsLoginAndMakeToken', true)
			})
			.catch(() => { 
				console.log(`failed`) 
			})
		},

		registerIn({ commit}, payload) {
			axios({
				url: url+ `/users/signup`,
				method: 'POST',
				data:{
					name: payload.name,
					email: payload.email,
					password: payload.password
				}
			})
			.then(response =>{
				swal(`success`)
			})
			.catch(() => { 
				console.log(`failed broo`) 
			})
		},

		cekLogin({ commit }){
			axios({
				url: url + `/users/one`,
				method: 'get',
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(found => {
				// console.log(`ini fooouund`, this.questions);
				commit('setUser', found.data)
				commit('changeIsLoginAndMakeToken', true)
			})
			.catch(err =>{
				commit('setUser', {})
			})
		},

		destroyLogin ({ commit, dispatch }) {
			commit('changeIsLoginAndMakeToken', false)
			dispatch('cekLogin')
		},

		myQuestion ({commit}, payload){
			axios({
				url: url+ `/questions/myQuestion`,
				method: 'get',
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(found =>{
				commit('myQuest', found.data)
			})
			.catch(err =>{
				console.log(`data no found`);
			})
		},

		// likers({commit}, payload){
		// 	axios({
		// 		url: url+`/questions/like/${payload}`,
		// 		method: 'PUT',
		// 		headers: {
		// 			token: localStorage.getItem('token')
		// 		}
		// 	})
		// 	.then(response =>{
		// 		console.log(response);
		// 	})
		// 	.catch(err =>{
		// 		console.log(`data no found`);
		// 	})
		// }

	}

  

  
  

 

})
