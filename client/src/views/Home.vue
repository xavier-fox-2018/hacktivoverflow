<template>
<div>
<div class="row">
  <div class="col-9">
   <router-view :token="token"></router-view>
  </div>
  <!-- <div class="col-6">
  <router-view></router-view>
  </div> -->
</div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  props :['token'],
  name: 'home',
  components: {  

  }
}
</script>
