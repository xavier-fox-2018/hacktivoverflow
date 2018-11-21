<template>
  <div>
    <Navbar></Navbar>    
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
export default {
  name:"mains",
  data(){
    return {

    }
  },
  beforeCreate(){
    axios.get(`http://localhost:3000/verify`,{
      headers:{
        token : localStorage.getItem('token')
      }
    })
    .then(()=>{

    })
    .catch((err)=>{
      this.$router.replace('/')
    })
  },
  components:{
    Navbar
  }
  

}
</script>

<style>

</style>
