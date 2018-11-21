<template>
<div class="container">
  <h5>We are logging you out. Please wait...</h5>
</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import jwt from 'jsonwebtoken'

export default {
  name: 'Logout',
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      'LOGIN_CHANGE'
    ]),
    loginChange(val) {
      this.LOGIN_CHANGE(val)
    }
  },
  computed: {
    ...mapState([
      'axios_url',
      'isLogin'
    ])
  },
  mounted() {
    localStorage.removeItem('token')
    this.loginChange(false)
    console.log(`sekarang kondisinya gini:`, this.isLogin)
    setTimeout(() => { 
      // User redirect
      this.$router.push('/')
    }, 2000);
  }
}
</script>

<style>

</style>
