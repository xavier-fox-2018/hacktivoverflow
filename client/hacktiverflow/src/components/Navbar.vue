<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div class="container">
    <a class="navbar-brand" href="#">
          <img src="http://placehold.it/150x50?text=Logo" alt="">
        </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
        </li>
        <li class="nav-item">
          <router-link to="/">Home</router-link> |
        </li>
        <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <a data-toggle="modal" data-target="#modalLoginForm" v-if="isLogin === false">Login</a>
        </li>
        <li class="nav-item">
          <a data-toggle="modal" data-target="#modalLoginForm" v-if="isLogin === false">Register</a>
        </li>
        <li class="nav-item">
          <a class="dropdown-item" v-if="isLogin === true" @click="signOut">Logout</a>
        </li>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </ul>
    </div>
  </div>
</nav>
</template>


<script>
export default {
  props: ['isLogin', 'checkLogin'],
  data() {
    return {
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.checkLogin()
    }
  },
  components: {

  }
}
</script>
