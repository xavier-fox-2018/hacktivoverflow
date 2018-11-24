<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-on:submit.prevent="register" ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="name"
                :rules="nameRules"
                :counter="10"
                label="Name" 
                v-model="registerName"
                required>
              </v-text-field>
              <v-text-field 
                v-model="registerEmail"
                :rules="emailRules" 
                prepend-icon="email" 
                name="email" 
                label="Email" 
                type="text"
                required>
              </v-text-field>
              <v-text-field 
                v-model="registerPassword" 
                id="password" 
                prepend-icon="lock" 
                name="password" 
                label="Password" 
                type="password"
                :rules="passwordRules"
                :counter="8"
                required>
              </v-text-field>
            </v-form>
            <alert :alert="alert" :alertType="alertType" :alertMessage="alertMessage"></alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round :disabled="!valid" color="primary" @click="register">Register</v-btn>
            <v-btn icon color="primary" @click="reset"><v-icon>autorenew</v-icon></v-btn>
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
      alertMessage : '',

      valid:true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters'
      ],
    }
  },
  methods : {
    register(){
      if (this.$refs.form.validate()) {
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
          this.alert = true
          this.alertType = 'error'
          this.alertMessage = error.response.data.message
          
          let self = this

          setTimeout(function(){
            self.alert = false
            self.alertType = ''
            self.alertMessage = ''
            }, 2000);
        })
      }
    },
    reset(){
      this.$refs.form.reset()
    }
  }
}
</script>

