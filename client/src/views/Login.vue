<template>
<div class="container">
  <form v-on:submit.prevent="onSubmit">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label>Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
      </div>

      <div class="col-12">
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-outline-warning btn-block" @click.prevent="LoginUser">Log In</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import jwt from 'jsonwebtoken'

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    LoginUser() {
      // console.log(this.firstName, this.lastName, this.email, this.password)
      axios({
        method: 'post',
        url: this.axios_url + '/user/login',
        data: {
          email: this.email,
          password: this.password,
        }
      })
      .then(result => {
        if (result.data.message === 'Success') {
          this.$notify({
            title: 'Login Successful',
            text: 'Please wait, we are redirecting you!',
            duration: 1500,
            type: 'success'
          });

          const decoded = jwt.decode(result.data.token)
          localStorage.setItem('token', result.data.token)

          // Redirecting
          setTimeout(() => { 
            // User redirect
            this.$router.push('/dashboard')
          }, 2000);
        }
      })
      .catch(err => {
        // ini error message disini
        console.log(err.response.data.message)

        if (err.response.data.message === "User not found") {
          this.$notify({
            title: 'Credentials does not match',
            text: 'Please re-check. If you have not registered, please do so <a href="/register" class="text-warning">here</a>',
            duration: 2500,
            type: 'error'
          });
        } else if (err.response.data.message === "Database error") {
          this.$notify({
            title: 'Internal server error',
            text: "We're sorry! Something went wrong on our side.",
            duration: 2500,
            type: 'error'
          })
        } else {
          this.$notify({
            title: 'Something went wrong',
            text: "We're sorry! Something went wrong on our side. We're looking into it.",
            duration: 2500,
            type: 'error'
          })
        }
      })
    }
  },
  computed: {
    ...mapState([
      'axios_url'
    ])
  }
}
</script>

<style>

</style>
