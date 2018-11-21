<template>
  <div class="ui container">
    <div class="ui middle aligned center aligned grid" >
      <div class="column">
        <h2 class="ui image header">
          <div class="content">
            Log-in to your account
          </div>
        </h2>
        <form action="https://s.codepen.io/voltron2112/debug/PqrEPM?" method="get" class="ui large form">
          <div class="ui stacked secondary  segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="envelope icon"></i>
                <input type="text" name="email" placeholder="E-mail address" v-model="user.email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="user.password">
              </div>
            </div>
            <div id="my-signin2" class="g-signin2" data-onsuccess="onSignIn" style="display:inline-block" data-width="300" data-height="50" data-longtitle="true"></div>
            <div class="ui fluid large blue submit button" @click="login">Login</div>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          New to us? <a href="" style="color:#2185d0" @click="register">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name:"login",
  data(){
    return {
      user: {}
    }
  },
  computed:mapState({
    link: state => state.link
  }),
  methods: {
    register(e){
      e.preventDefault()
      this.$emit('notHaveAccount')
    },
    // onSignIn(googleUser) {
    //     var id_token = googleUser.getAuthResponse().id_token;
    //     let body = {
    //       gtoken: id_token
    //     }
    //     console.log(id_token)
    //     // axios.post(`http://localhost:3000/users/gsignin`, body, {})
    //     //     .then(function(response) {
    //     //       console.log('cek ini', response)
    //     //       // localStorage.setItem('token', response)
    //     //       // localStorage.setItem('token', data.token)
    //     //       // localStorage.setItem('email', data.email)
    //     //       // this.$store.dispatch('getQuestions',localStorage.getItem('token'))
    //     //       // this.$router.push('main')
    //     //         // window.location.href = "http://localhost:8080/dashboard.html";
    //     //     })
    //     //     .catch(function(error) {
    //     //         console.log(error)
    //     //     })
    // },
    login(){
      axios.post(`${this.link}/users/signin`, {
        email: this.user.email,
        password: this.user.password
      }, {})
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          this.$store.dispatch('getQuestions',localStorage.getItem('token'))
          this.$router.push('main')
        })
        .catch((err) => {
          // this.$emit('isLoginEvent', false)
        })
    }
  }
}
</script>

<style>

</style>
