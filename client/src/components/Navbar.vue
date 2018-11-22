<template>
     <nav class="navbar navbar-expand-md navbar-light fixed-top py-4" id="main-nav">
    <div class="container">
      <a href="#home" class="navbar-brand">
        <!-- <img src="img/mlogo.png" width="50" height="50" alt=""> -->
        <h3 class="d-inline align-middle">OverFlow</h3>
      </a>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!isLogin">
          <router-link to="/">
               <p class="nav-link">Home</p>
          </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/questions">
               <p class="nav-link">All Questions</p>
          </router-link>
          <li class="nav-item">
            <router-link to="/myquestions">
               <p class="nav-link">My Questions</p>
          </router-link>
           
          </li>
          <li class="nav-item" v-if="isLogin">
            <p  class="nav-link" @click="logout">Logout</p>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props:['isLogin'],
    methods: {
      logout(){
        localStorage.removeItem('token')
        this.$emit('logout')
      }
    }
}
</script>

