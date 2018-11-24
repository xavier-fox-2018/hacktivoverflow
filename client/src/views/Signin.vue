<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field 
                v-model="loginEmail" 
                prepend-icon="email"
                :rules="emailRules" 
                name="email" 
                label="Email" 
                type="email"
                required>
                </v-text-field>
              <v-text-field 
                v-model="loginPassword"
                :rules="passwordRules" 
                id="password" 
                prepend-icon="lock" 
                name="password" 
                label="Password" 
                type="password"
                required>
                </v-text-field>
            </v-form>
            <alert :alert="alert" :alertType="alertType" :alertMessage="alertMessage"></alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div id="my-signin2" class="mr-2"></div>
            <v-btn color="primary" @click="login">Sign In</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import Alert from '@/components/Alert.vue'
import config from '@/config.js'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
    components : {
      Alert
    },
    computed : {
      isLogin () {
        return this.$store.state.isLogin
      }
    },
    data (){
      return {
        loginEmail : '',
        loginPassword : '',

        alert : false,
        alertType : '',
        alertMessage : '',
        emailRules: [
        v => !!v || 'E-mail is required',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
        ],
      }
    },
    methods : {
      ...mapActions([
        'checkToken'
      ]),
      login(){
        let self = this

        let data = {
          email : this.loginEmail,
          password : this.loginPassword
        }

        axios({
          method : 'POST',
          url : `${config.port}/users/signin`,
          data
        })
        .then((response)=>{
          let token = response.data.token
          let username = response.data.name
          let userId = response.data.userId

          localStorage.setItem('token',token)
          localStorage.setItem('username',username)
          localStorage.setItem('userId',userId)

          this.loginEmail = ''
          this.loginPassword = ''

          this.$router.push('/')

          this.checkToken()
        })
        .catch((error)=>{
          this.alert = true
          this.alertType = "error"
          this.alertMessage = "Invalid Email / Password"

          setTimeout(function(){
            self.dismissAlert()
            }, 2000);
        })
      },
      dismissAlert(){
        this.alert = ''
        this.alertType = ''
        this.alertMessage = ''
      },
      onSuccess: function (googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;

        axios({
            method: 'POST',
            url: `${config.port}/users/googlelogin`,
            data: {
              googleToken: id_token
            }
        })
        .then((response) => {
          let token = response.data.token
          let username = response.data.name
          let userId = response.data.userId

          localStorage.setItem('token',token)
          localStorage.setItem('username',username)
          localStorage.setItem('userId',userId)

          this.loginEmail = ''
          this.loginPassword = ''

          this.checkToken()

          this.$router.push('/')
        })
        .catch((error) => {
          console.log('Google Login Error: ', error);
        });
      },
      onFailure: function(error){
        console.log('Render Google Login Buttono Error',error)
      },
      renderButton: function () {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 180,
          'height': 36,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': this.onSuccess,
          'onfailure': this.onFailure
        });
      }
    },
    mounted(){
      this.checkToken()
      this.renderButton()
    },
    watch : {
      isLogin: function (val) {
        if (this.isLogin === false) {
          localStorage.clear();
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
        }
      }
    }
}
</script>

