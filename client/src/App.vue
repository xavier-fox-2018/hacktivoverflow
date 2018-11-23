<template>
  <div id="app">
    <notifications position="top center" />
    <Navbar id="Navbar"/>
    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import jwt from 'jsonwebtoken'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  components: {
    Navbar
  },
  created() {
    this.checkLogin()
  },
  computed: {
    ...mapState([
      'axios_url',
      'isLogin'
    ])
  },
  methods: {
    ...mapMutations([
      'LOGIN_CHANGE'
    ]),
    loginChange(val) {
      this.LOGIN_CHANGE(val)
    },
    checkLogin() {
      axios({
      method: 'post',
      url: this.axios_url + '/user/verify',
      data: {
        token: localStorage.getItem('token')
      }
    })
      .then(result => {
        if (result.data.message === "Token authorized") {
          console.log(`ini masuk Token authorized`)
          this.loginChange(true)
          console.log(`sekarang kondisinya gini:`, this.isLogin)
        }
      })
      .catch(err => {
        console.log(`masuk di catch`)
        if (err.response.data.message === "Token fail") {
          localStorage.removeItem('token')
          this.loginChange(false)
        }
      })
    }
  },
  watch: {
    $route(n, o) {
      this.checkLogin()
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5%;
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

.vue-notification {
  padding: 10px;
  /* margin: 0 5px 5px; */
  margin-top: 2em;
 
  font-size: 1em;
 
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
 
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

#Navbar {
  margin-bottom: 3em;
}
</style>
