<template>
  <div id="app">
    <NavBar :status="isLogin" @sign-out="changeStatus"/>
    <router-view @sign-in="changeStatus"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    NavBar
  },
  methods: {
    changeStatus () {
      this.isLogin = !this.isLogin
    }
  },
  mounted () {
    if (localStorage.getItem('token')) this.isLogin = true
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
