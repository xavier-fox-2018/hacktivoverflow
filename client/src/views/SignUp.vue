<template>
  <div id="signUp" class="text-white p-3">
    <b-container class="w-25 bg-dark p-4 mt-5 rounded">
      <h1>Sign in to HacktivOverflow</h1>
      <b-form @submit="onSubmit">
        <b-form-group label="Name:">
          <b-form-input type="text" v-model="form.name" required placeholder="Enter Name..."></b-form-input>
        </b-form-group>
        <b-form-group label="Email:">
          <b-form-input type="email" v-model="form.email" required placeholder="Enter Email..."></b-form-input>
        </b-form-group>
        <b-form-group label="Password:">
          <b-form-input type="password" v-model="form.password" required placeholder="Enter Password..."></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Sign up</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.signUp()
    },
    signUp () {
      axios({
        url: 'https://hacktivoverflow-server.pemmz-palzu.site/users/signup',
        method: 'post',
        data: { 
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
         }
      })
        .then(response => {
          this.form = {}
          this.$router.push('/signin')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
#signUp {
  background-image: url('../assets/signinsignup.jpeg');
  min-height: 100vh;
}
.bg-dark {
  background-color: rgba(120, 120, 120, 0.7) !important;
}
</style>

