<template>
  <v-app>
    <toolbar-top app />
    <v-content>
    <router-view/>
    </v-content>
    <drawer-left app />
    <v-footer color="indigo" app>
      <span class="white--text">&copy; Arjuna Sarumpaet 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import ToolbarTop from '@/components/ToolbarTop'
import DrawerLeft from '@/components/DrawerLeft'
export default {
  name: 'App',
  components: {
    ToolbarTop,
    DrawerLeft
  },
  data () {
    return {
      //
    }
  },
  mounted () {
    this.$store.dispatch('getAllQuestions')
    this.$store.dispatch('checkLoginStatus')
    this.$store.dispatch('getUserDetail')
    this.$store.dispatch('getOwnQuestions')
  }
}
</script>

<style>
a {
  text-decoration: none
}
</style>
