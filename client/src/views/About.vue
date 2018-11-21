<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name : 'about',
  created() {
    // console.log(this.$route.params.id)
    console.log('bbbbbbbbbb')
  },
  // watch:{
  //   $route : function(){
  //     console.log('wtttt')
  //     let id = this.$route.params.id
  //     //hit data dari server
  //     //this.data = result
  //   }
  // }
}
</script>

