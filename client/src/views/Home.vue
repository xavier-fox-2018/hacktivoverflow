<template>
	<div class="home">
		<!-- <navbar/> -->
		<!-- <myquestion/> -->
		<allquestion/>
	</div>
</template>


<script>

import { mapActions, mapState } from 'vuex';
import allquestion from '@/components/AllQuestion.vue'
import myquestion from '@/components/MyQuestion.vue'

export default {
	name: 'home',
	components: {
		allquestion,
		myquestion
		},

	computed: {
		...mapState(['isLogin', 'user'])
	},

	created () {
		this.userSignCheck()
		this.failedToken()
	},

	methods: {
		...mapActions(['loginIn','cekLogin', 'destroyLogin', 'getQuestions']),

		userSignCheck(){
		let token = localStorage.getItem('token')
			if(token){
				this.cekLogin()
			}
		},

		failedToken() {
			if (this.user.name === undefined) {
				this.destroyLogin()
			}
		},
		
		// getQuestion () {
      	// 	this.getQuestions()
    	// }
	},

	watch: {
		isLogin () {
			if (this.isLogin === true) {
				this.userSignCheck()
			} else {
				this.failedToken()
			}
		}
	}

}
</script>

