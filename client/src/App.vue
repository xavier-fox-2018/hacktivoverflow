<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <sidebar/>
        </div>
        <div class="col-md-10">
          <router-view/> 
        </div>
      </div>
    </div>
  </div>
  

</template>
<script>
import { mapActions, mapState } from 'vuex'
import Navbar from '@/components/Header/Navbar.vue'
import sidebar from '@/components/Sidebar.vue'
export default {
  components: {
		sidebar,
    Navbar, 
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


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

#nav a.exact-active {
  color: #f1f1f1;
}
</style>
