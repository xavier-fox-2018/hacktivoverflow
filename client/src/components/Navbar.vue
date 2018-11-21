<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/">
      <a class="navbar-brand text-warning" href="#">STOVER</a>
    </router-link>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    </ul>

    <ul class="navbar-nav my-auto" v-if="!isLogin">
      <router-link to="/register">
        <li class="nav-item">
          <a class="nav-link text-warning" href="#">Register</a>
        </li>
      </router-link>

      <router-link to="/login">
        <li class="nav-item">
          <a class="nav-link text-warning" href="#">Log In</a>
        </li>
      </router-link>
    </ul>

    <ul class="navbar-nav my-auto" v-if="isLogin">
      <router-link to="/dashboard">
        <li class="nav-item">
          <a class="nav-link text-warning" href="#">Dashboard</a>
        </li>
      </router-link>

      <router-link to="/ask">
        <li class="nav-item">
          <a class="nav-link text-warning" href="#">Ask</a>
        </li>
      </router-link>

      <router-link to="/logout">
        <li class="nav-item">
          <a class="nav-link text-warning" href="#">Log Out</a>
        </li>
      </router-link>
    </ul>
  </div>
</nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Navbar",
  computed: {
    ...mapState([
      'isLogin'
    ])
  }
}
</script>

<style>

</style>
