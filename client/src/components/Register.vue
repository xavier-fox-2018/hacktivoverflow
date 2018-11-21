<template>
  <div class="ui container">
    <div class="ui middle aligned center aligned grid" >
      <div class="column">
        <h2 class="ui image header">
          <div class="content">
            Register
          </div>
        </h2>
        <form action="https://s.codepen.io/voltron2112/debug/PqrEPM?" method="get" class="ui large form">
          <div class="ui stacked secondary  segment">
            <div class="field" :class="{error: nameError}">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="Name" v-model="user.name">
              </div>
            </div>
            <div class="field" :class="{error: emailError}">
              <div class="ui left icon input">
                <i class="envelope icon"></i>
                <input type="email" name="email" placeholder="E-mail address" v-model="user.email">
              </div>
            </div>
            <div class="field" :class="{error: passError}">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="user.password">
              </div>
            </div>
            <!-- <div class="field">
                <label for="file" class="ui icon button">
                    <i class="file icon"></i>
                    Open File</label>
                <input type="file" id="file" style="display:none">
            </div> -->
            <div class="ui fluid large blue submit button" @click="register">Register</div>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          Already have an account? <a href="" style="color:#2185d0" @click="haveAccount">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name:"register",
  data(){
    return{
      user: {},
      nameError : false,
      emailError: false,
      passError: false
    }
  },
  computed:mapState({
    link: state => state.link
  }),
  methods:{
    haveAccount(e){
      e.preventDefault()
      this.$emit('haveAccount')
    },
    register(){
      if (this.user.name == undefined || this.user.email == undefined || this.user.password == undefined) {
        if (this.user.name == undefined) {
          this.nameError = true
        }
        if (this.user.email == undefined) {
          this.emailError = true
        }
        if (this.user.password == undefined) {
          this.passError = true
        }
      }else{
        axios.post(`${this.link}/users/signup`,this.user,{})
          .then(()=>{
            this.user = {}
            this.$emit('haveAccount')
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>

</style>
