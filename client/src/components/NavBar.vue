<template>
  <div id="nav" class="container-fluid p-3 border-bottom">
    <div class="container row mx-auto">
      <router-link to="/">HacktivOverFlow</router-link>
      <div v-if="status" class="ml-auto">
        <router-link to="/signin" @click.native="signOut">Sign out</router-link>
      </div>
      <div v-else class="ml-auto">
        <router-link to="/signin">Sign in</router-link> &nbsp; | &nbsp;
        <router-link to="/signup">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status'],
  methods: {
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.$emit('sign-out')
    }
  },
  created () {
    if (localStorage.getItem('token')) this.isLogin = true
  }
}
</script>
