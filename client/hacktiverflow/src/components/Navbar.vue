<template>
  <div id="navbar">
    <div id="wrapper" class="animate">
      <nav class="navbar header-top fixed-top navbar-expand-lg  navbar-dark bg-dark">
        <span class="navbar-toggler-icon leftmenutrigger"></span>
        <a class="navbar-brand" href="#">LOGO</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav animate side-nav">
            <li class="nav-item">
              <div class="nav-link">
              <router-link to="/" class="text-white">Home</router-link> 
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link">
              <router-link to="/articles" class="text-white" >Articles</router-link>
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link">
              <router-link to="/about" class="text-white" >About</router-link>
              </div>
            </li>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </ul>
          <ul class="navbar-nav ml-md-auto d-md-flex">
            <li class="nav-item">
              <div class="nav-link">
              <a class="text-white" data-toggle="modal" data-target="#modalLoginForm" v-if="isLogin === false">Login</a>
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link">
              <a class="text-white" data-toggle="modal" data-target="#modalLoginForm" v-if="isLogin === false">Register</a>
              </div>
            </li>
            <li class="nav-item">
              <div class="nav-link">
              <a class="text-white" v-if="isLogin === true" @click="signOut">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
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


<style scoped>
.navTitle {
  text-decoration-color: aliceblue
}
</style>
