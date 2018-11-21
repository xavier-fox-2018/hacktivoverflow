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
                prepend-icon="person" 
                name="login" 
                label="Login" 
                type="text">
                </v-text-field>
              <v-text-field 
                v-model="loginPassword" 
                id="password" 
                prepend-icon="lock" 
                name="password" 
                label="Password" 
                type="password">
                </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from '@/config.js'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed : mapState([
      'isLogin','userId','username'
    ]),
    data (){
      return {
        loginEmail : '',
        loginPassword : ''
      }
    },
    methods : {
      ...mapActions([
        'checkToken'
      ]),
      login(){
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
          console.log(error)
        })
      }
    },
    mounted(){
      this.checkToken()
    }
}
</script>

