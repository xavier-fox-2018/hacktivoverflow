<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Name" 
                v-model="registerName">
              </v-text-field>
              <v-text-field 
                v-model="registerEmail" 
                prepend-icon="email" 
                name="email" 
                label="Email" 
                type="text">
              </v-text-field>
              <v-text-field 
                v-model="registerPassword" 
                id="password" 
                prepend-icon="lock" 
                name="password" 
                label="Password" 
                type="password">
              </v-text-field>
            </v-form>
            <alert :alert="alert" :alertType="alertType" :alertMessage="alertMessage"></alert>
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
import config from '@/config.js'
import Alert from '@/components/Alert.vue'

export default {
  components : {
    Alert
  },
  data (){
    return {
      registerName : '',
      registerEmail : '',
      registerPassword : '',

      alert : false,
      alertType : '',
      alertMessage : ''
    }
  },
  methods : {
    register(){
      let data = {
        name : this.registerName,
        email : this.registerEmail,
        password : this.registerPassword
      }

      axios({
        method : 'POST',
        url : `${config.port}/users/signup`,
        data
      })
      .then(response=>{
        this.alert = true
        this.alertType = 'info'
        this.alertMessage = `Registration Success, you can now login with your email and password`
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>

