<template>
   <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login to your account</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-alert
                v-model="alert"
                dismissible
                type="error"
              >
                {{alertMessage}}
              </v-alert>

              <v-form>
                <v-text-field prepend-icon="contact_mail" name="login" label="Email" type="email" v-model="loginEmail"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="loginPassword"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <router-link to="/register">
                <v-btn color="secondary">Register</v-btn>
              </router-link>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
      alert: false,
      alertMessage: ''
    }
  },
  methods: {
    login () {
      this.$axios.post('users/login', {
        email: this.loginEmail,
        password: this.loginPassword
      })
        .then(response => {
          localStorage.setItem('token', response.data.result.token)
          this.loginEmail = ''
          this.loginPassword = ''
          this.$store.dispatch('checkLoginStatus')
          this.$store.dispatch('getUserDetail')
          this.$store.dispatch('getOwnQuestions')
          this.$router.replace('/')
        })
        .catch(error => {
          this.alertMessage = error.response.data.error.message
          this.alert = true
        })
    }
  }
}
</script>

<style>

</style>
