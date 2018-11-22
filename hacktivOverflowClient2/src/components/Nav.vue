 <!-- Navigation -->
<template>
  <div class="nav-container">
    <!--nav -->
    <nav class="navbar navbar-expand-lg fixed-top">
      <h3>Hacktiv Overflow</h3>
      <img src="../assets/hacktiv8_logo.png">
      <span>{{$store.state.navMessage}}</span>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <!-- modal toggler-->
          <li class="nav-item active" data-toggle="modal" data-target="#taskModal">
            <a class="btn btn-primary btn-sm" href="#" @click.prevent="handleSignOut"> Sign Out </a>
          </li>
        </ul>
      </div>
    </nav> 
  </div>
</template>  
<style>
 .navbar {
   background-color: rgba(0,0,0,0.9);
   color:whitesmoke;
 }
</style>
<script>
  export default {
    name: 'Nav',
    props:[],
    methods:{
     handleSignOut() {
       this.$store.dispatch("signOut")
     }
    }
  }
</script>
   
