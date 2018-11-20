<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {
     Navbar: () => import('@/components/Navbar')
  }
}
</script>
