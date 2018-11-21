<template>
  <div class="ui blue inverted menu">
      <router-link to="/main" class="item">
          <img src="https://semantic-ui.com/images/wireframe/image.png" style="border-radius: 50%;margin-right:21px;">
          <p>Welcome, {{email}}</p>
      </router-link>
      <router-link to="/livechat" class="item">
          <i class="users icon"></i>
      </router-link>
      <a class="item" style="cursor:pointer;">
        <div class="ui search">
          <div class="ui icon input">
            <input id="myInput" v-model="search" class="prompt" type="text" placeholder="Search" @keyup="getSearchedQuestion({ token: token, search: search })">
            <i class="search icon"></i>
          </div>
          <div class="results"></div>
        </div>
      </a>
      
      
      <div class="right menu">
        <div class="item">
            <div class="ui primary button" v-on:click="signOut" @click="gsignOut">Sign Out</div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:"navbar",
  data(){
    return {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
      search: ''
    }
  },
  methods:{
    ...mapActions([
      'getSearchedQuestion'
    ]),
    signOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.$router.replace('/')
    },
    gsignOut(){
      window.gsignOut()
    }
  }
}
</script>

<style>

</style>
