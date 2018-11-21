<template>
  <v-toolbar dark color="indigo" app>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text" >
      <v-icon>record_voice_over</v-icon>
      <span class="white--text hidden-xs-only">H<small>acktivOverflow</small></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/login" v-if="!isLogin">
      <v-btn flat>
      <v-icon>fingerprint</v-icon>
      <span >Login</span>
      </v-btn>
    </router-link>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <v-tooltip left>
      <v-menu left slot="activator" min-width=200>
        <v-avatar slot="activator" v-if="isLogin">
          <img
            :src="user.profpic"
          >
        </v-avatar>
        <v-btn flat icon slot="activator" v-else>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list >
          <v-list-tile>
            <v-list-tile-title v-if="isLogin">Hello, {{user.name}}</v-list-tile-title>
            <v-list-tile-title v-else>Hello, Guest</v-list-tile-title>
          </v-list-tile>
          <v-divider/>
          <v-list-tile  v-if="isLogin">
              <v-btn outline @click="logout">
                <v-icon >exit_to_app</v-icon>
                Logout
              </v-btn>
          </v-list-tile>
          <v-list-tile v-else>
            <router-link to="/register">
              <v-btn flat>
              <v-icon>save_alt</v-icon>
              <span >Register</span>
              </v-btn>
            </router-link>
          </v-list-tile>
          <v-divider/>
        </v-list>
      </v-menu>
      <span>More</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      pageName: 'test'
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.dispatch('toggleDrawer')
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.dispatch('checkLoginStatus')
      this.$store.dispatch('getUserDetail')
      this.$store.dispatch('resetOwnQuestions')
      window.gsignout()
    },
    changeProfpic () {

    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    user () {
      return this.$store.state.userDetail
    }
  }
}
</script>
