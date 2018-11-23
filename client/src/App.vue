<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
    </div> 
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'

export default {
  components: { Navbar },

  computed: {
      ...mapState(['isLoggedIn']) 
  },

  mounted() {
    this.$store.dispatch('login')
    this.$store.dispatch('getAllQuestions')
  }
  
}
</script>
