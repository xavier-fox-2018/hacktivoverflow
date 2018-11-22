<template>
  <div id="app">
    <navbar :isLogin="isLogin" @logout="logout" :checkToken="checkToken"></navbar>
    <router-view :checkToken="checkToken"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  components: {
     Navbar: () => import('@/components/Navbar')
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ]),

   checkToken(){
        const token = localStorage.getItem('token')
        if (token) {
            this.checkLogin()
            if(this.$router.history.current.name === 'home' ){
                this.$router.push('/myquestions')
            } 
        } else {
            this.checkLogin()
            if(this.$router.history.current.name !== 'home' && this.$router.history.current.name !== 'questions'){
              this.$router.push('/')
            }
        }
      },
    logout(){
      this.isLogin = false
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      this.checkToken()
      this.$router.push('/')
    }
  },
  created(){
    this.checkLogin()
  }
}
</script>
