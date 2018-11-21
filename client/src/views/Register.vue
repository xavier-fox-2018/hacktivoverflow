<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register a new account</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
              <v-alert
                v-model="alert"
                dismissible
                type="success"
              >
                Register success, you can now log in
              </v-alert>
              <v-alert
                v-model="alertfail"
                dismissible
                type="error"
              >
                {{failmessage}}
              </v-alert>
            <v-form>
              <v-text-field prepend-icon="perm_identity" name="name" label="Name" type="text" v-model="registerName"></v-text-field>
              <v-text-field prepend-icon="contact_mail" name="register" label="Email" type="email" v-model="registerEmail"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="registerPassword"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      alert: false,
      alertfail: false,
      failmessage: ''
    }
  },
  methods: {
    register () {
      this.$axios.post('users/register', {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword
      })
        .then(response => {
          this.registerName = ''
          this.registerEmail = ''
          this.registerPassword = ''
          this.alert = true
        })
        .catch(error => {
          this.failmessage = error.response.data.error.message
          this.alertfail = true
        })
    }
  }
}
</script>

<style>

</style>
