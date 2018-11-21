<template>
<div>
  <div class="home">
     <mynavbar :jtoken = "jtoken" @logout="logout" @login="login"></mynavbar>
     <formtanya :jtoken ="jtoken"></formtanya>
     <router-view :jtoken="jtoken" :user_id="user_id"></router-view>
  </div>
</div>
</template>

<script>
// @ is an alias to /src

import mynavbar from '@/components/mynavbar.vue'
import formtanya from '@/components/form-tanya.vue'


export default {
  name: 'home',
  components : { mynavbar, formtanya },
  data(){
    return {
      jtoken : localStorage.getItem('token') ? localStorage.getItem('token') : false,
      user_id : localStorage.getItem('user_id') ? localStorage.getItem('user_id') : false
    }
  },
  methods : {
    login : function(){
      this.jtoken = localStorage.getItem('token')
      this.user_id = localStorage.getItem('user_id')
    },
    logout : function(){
      this.jtoken = false
      this.user_id = false
    },
   
  },
}
</script>
