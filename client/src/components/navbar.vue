<template>
    <v-container>
    <v-toolbar dark>
        <v-toolbar-title>
           <router-link to="/main"> <h2 style="color: white; cursor:pointer">Quiya</h2> </router-link>
        </v-toolbar-title>
        <v-spacer/>
         <v-avatar
          color="grey lighten-4"
        >
          <img :src="userImg" alt="avatar">
        </v-avatar>
        <v-spacer/>
        <v-toolbar-items>
   <v-btn flat> <router-link to="main/detail">  your question</router-link></v-btn>
      <!-- <v-btn flat>Add new question</v-btn> -->
      <v-btn flat>
      <new-question/>
      </v-btn>

      <v-btn flat  @click="logOut">Logout</v-btn>
            
      
    </v-toolbar-items>
          
    </v-toolbar>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
import newQuestion from './newQuestion.vue'
export default {
  name: "navbar",
  components: {
    newQuestion
  },
  data (){
    return{
      userImg: localStorage.getItem('picture')
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$store.dispatch('setStatusUserOut')
      this.$router.push('/')
    },
  },
  mounted (){

  },
  computed: {
    ...mapState([
      ''
    ])
  }
};
</script>

<style scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);
</style>
