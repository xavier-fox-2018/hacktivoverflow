<template>
<div>

  <!-- <login-form/> -->
    <router-view/>    
</div>
</template>

<script>
  import loginForm from '../components/login.vue'

  export default {
    components: {
      loginForm
    },
  }
</script>
