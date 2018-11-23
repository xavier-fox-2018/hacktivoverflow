<template>
<section id="showcase" class="py-5">
    <div class="primary-overlay text-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-center">
            <h1 class="display-2 mt-5 pt-5">
              Learn, Share, Build
            </h1>
            <p class="lead">
                Each month, over 50 million developers come to Stack Overflow to learn, share their knowledge, and build their careers.
                Join the world’s largest developer community.
            </p>
          </div>
          <div class="col-lg-5 mt-5 ml-5" style="height: 100vh">
             <div class="card bg-primary text-center card-form">
              <div class="card-body" v-show="signup">
                <Alert :message="message" :alert="alert" v-if="message && alert"></Alert>
                <h3>Sign Up Today</h3>
                <p>Please fill out this form to register</p>
                <form @submit.prevent="registerFunc">
                  <div class="form-group">
                    <input type="text" class="form-control form-control-lg" placeholder="name" v-model="dataRegister.name">
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg" placeholder="Email" v-model="dataRegister.email">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="dataRegister.password1">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" placeholder="Confirm Password" v-model="dataRegister.password2">
                  </div>
                  <input type="submit" value="Submit" class="btn btn-outline-light btn-block">
                  </form>
                    <div class="form-group mt-2">
                  <span>Already have an account ?</span>
                  <button class="btn btn-warning btn-block" @click="showFormLogin">Login</button>
                  </div>
              </div>

              <!-- Login -->
               <div class="card-body" v-if="login">
                  <Alert :message="message" :alert="alert" v-if="message && alert"></Alert>
                <h3>Login Now</h3>
                <p>Please fill out this form to Login</p>
                <form @submit.prevent="loginFunc">
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg" placeholder="Email" v-model="dataLogin.email">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="dataLogin.password">
                  </div>
                  <input type="submit" value="Login" class="btn btn-outline-light btn-block">
                  </form>
                   <div class="form-group mt-2">
                  <span>Don't have an account yet ?</span>
                  <button type="submit"  class="btn btn-warning btn-block" @click="showFormSignUp">Register</button>
                  </div>
              </div>
            </div>
          </div>
  
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import config from '@/config.js'
import { mapActions } from 'vuex';
import Alert from '@/components/Alert'

export default {
    components: {
      Alert
    },
    data(){
        return {
            signup: true,
            login: false,
            dataLogin: {
              email: '',
              password: ''
            },
            dataRegister: {
              name: '',
              email: '',
              password1: '',
              password2: ''
            },
            message: '',
            alert: ''
        }
    },
    methods: {
      ...mapActions([
          'setLogin',
          'checkLogin'
      ]),
        showFormLogin(){
            this.message = ''
            this.alert = ''           
            this.login = true
            this.signup = false
        },
        showFormSignUp(){
            this.message = ''
            this.alert = ''
            this.login = false
            this.signup = true
             console.log(this.$store)
        },

        registerFunc(){
          if (this.dataRegister.password1 === this.dataRegister.password2 && this.dataRegister.email.length > 0 && this.dataRegister.name.length > 0) {
              axios({
                method: 'POST',
                url: config + '/register',
                data: {
                  name: this.dataRegister.name,
                  email: this.dataRegister.email,
                  password: this.dataRegister.password1
                }
              })
              .then(({data}) => {
                 console.log(data.data)
                 this.dataRegister.name = ''
                 this.dataRegister.email  = ''
                 this.dataRegister.password1 = ''
                 this.dataRegister.password2 = ''
                 this.message = 'suceess register'
                 this.alert = 'alert-success'
              })
              .catch(err => {
                 this.message =  err.response.data.message
                 this.alert = 'alert-danger'
              })
          } else {
            this.message = 'please fill all forms and makes sure password match'
            this.alert = 'alert-danger'
          }
        },

        loginFunc(){
          if (this.dataLogin.email.length > 0 && this.dataLogin.password.length > 0) {
            axios({
              method: 'POST',
              url: config+'/login',
              data: {
                email: this.dataLogin.email,
                password: this.dataLogin.password
              }
            })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', response.data.data.user)
                localStorage.setItem('email', response.data.data.email)
                this.setLogin()
                this.dataLogin.email = ''
                this.dataLogin.password = ''
                this.$router.push('/myquestions')
            })
            .catch(err => {
              console.log('====', this.message)
              this.message =  err.response.data.message || err.response.data.err
              this.alert = 'alert-danger'
            })
          } else {
             this.message = 'please fill all forms'
             this.alert = 'alert-danger'
          }
        }
    },

    created(){
      this.checkLogin()
    }
}
</script>

