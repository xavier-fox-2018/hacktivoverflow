<template>
  <div class="home">
    <div v-if="isLogin == false">
      <Login v-show="haveAccount == true" @notHaveAccount="change"></Login>
      <Register v-show="haveAccount == false" @haveAccount="change"></Register>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data(){
    return {
      haveAccount:true,
      isLogin: false
    }
  },
  computed:mapState({
    link: state => state.link
  }),
  methods:{
    change(){
      this.haveAccount = !this.haveAccount
    }
  },
  components:{
    Login,
    Register
  }
}
</script>
<style>
body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }
</style>

