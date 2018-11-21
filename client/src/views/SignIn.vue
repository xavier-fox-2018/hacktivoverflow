<template>
  <div id="signIn" class="text-white p-3">
    <b-alert variant="danger" v-if="show">{{ alert }}</b-alert>
    <b-container class="w-25 bg-dark p-4 mt-5 rounded">
      <h1>Sign in to HacktivOverflow</h1>
      <b-form @submit="onSubmit">
        <b-form-group label="Email:">
          <b-form-input type="email" v-model="form.email" required placeholder="Enter Email..."></b-form-input>
        </b-form-group>
        <b-form-group label="Password:">
          <b-form-input type="password" v-model="form.password" required placeholder="Enter Password..."></b-form-input>
        </b-form-group>
        <b-button variant="success" type="submit">Sign in</b-button>
      </b-form>
      <hr>
      <div id="my-signin2"></div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      alert: '',
      show: false
    }
  },
  methods: {
    onSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      axios({
        url: 'http://overflow-server.pemmz-palzu.site/users/oauthsignin',
        method: 'post',
        data: {
          email: profile.getEmail(),
          name: profile.getName()
        }
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          this.$router.replace('/')
          this.$emit('sign-in')
        })
        .catch(error => {
          console.log(error)
        })
    },
    onFailure(error) {
      console.log(error);
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.signIn()
    },
    signIn () {
      axios({
        url: 'http://overflow-server.pemmz-palzu.site/users/signin',
        method: 'post',
        data: { 
          email: this.form.email,
          password: this.form.password
         }
      })
        .then(response => {
          this.form = {}
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          this.$emit('sign-in')
          this.$router.replace('/')
        })
        .catch(error => {
          this.alert = error
          this.show = true
          console.log(error)
        })
    }
  },
  mounted () {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      })
  }
}
</script>

<style>
#signIn {
  background-image: url('../assets/signinsignup.jpeg');
  min-height: 100vh;
}
.bg-dark {
  background-color: rgba(120, 120, 120, 0.7) !important;
}
</style>

