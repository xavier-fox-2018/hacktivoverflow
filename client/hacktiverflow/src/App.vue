<template>
  <div id="app">
    <div id="nav">
      <navBar :isLogin="isLogin" :checkLogin="checkLogin" />
    </div>
    <router-view/>
    <modal-login :checkLogin="checkLogin" />
    <modal-sign-up :checkLogin="checkLogin" />
  </div>
</template>

<script>
import ModalLogin from '@/components/ModalLogin.vue'
import ModalSignUp from '@/components/ModalSignUp.vue'
import navBar from '@/components/Navbar.vue';
import Vue from 'vue'


export default {
  data() {
    return {
      isLogin: false,
    }
  },
  components: {
    navBar,
    ModalLogin,
    ModalSignUp  
  },
  methods: {
    checkLogin() {
      let token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } else { 
        this.isLogin = false
      }
    }
  },
  created: function() {
    this.checkLogin()
  },
  mounted: function() {

  },
  watch: {

  },
  computed: {

  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
