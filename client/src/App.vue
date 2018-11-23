<template>
  <v-app style="background: black">
 
    <home v-if="isLoginUser == false"/>
    <Main v-if="isLoginUser == true"/>
    <!-- <router-view/> -->

  </v-app>
</template>

<script>
import home from "./views/Home.vue";
import Main from "./views/main.vue"
import { mapState } from "vuex";



export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    home,
    Main,

  },
  computed: {
    ...mapState([
      "isLoginUser"
      ])
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("setStatusUser");
    }
  }
};
</script>
