<template>
  <v-app id="keep">
    <!-- navigation drawer -->
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- navigation drawer -->
    <!-- navbar -->
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Stuck Overflow</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field 
        @focus="redirectToHome"
        v-model="search"
        flat 
        solo-inverted 
        hide-details 
        prepend-inner-icon="search" 
        label="Search" 
        class="hidden-sm-and-down">
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn v-if="!isLogin" :to="{name : 'signin'}" round dark outline color="white">
        Sign In
      </v-btn>
      <v-btn v-if="!isLogin" :to="{name : 'signup'}" round dark outline color="white">
        Sign Up
      </v-btn>
      <v-btn v-if="isLogin" round outline color="white" @click="signOut">
        Sign Out
      </v-btn>
    </v-toolbar>
    <!-- navbar -->
    <!-- main content -->
    <v-content class="grey lighten-4">
      <router-view :search="search"></router-view>
    </v-content>
    <!-- main content -->
    <!-- footer -->
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2018 fmurtadho</span>
    </v-footer>
    <!-- footer -->
  </v-app>
</template>

<style>

</style>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name : 'APP',
  computed : {
    ...mapState([
      'isLogin','userId','username'
    ])
  },
  data: () => ({
    search : '',
    drawer: null,
    menuItems : [
      {
        icon : 'home', title : 'Home', path : '/'
      },
      {
        icon : 'format_list_bulleted', title : 'My Question', path : '/myquestion'
      },
      {
        icon : 'contact_mail', title : 'About', path : '/about'
      },
    ]
  }),
  props: {
    source: String
  },
  methods : {
    ...mapActions([
      'signOut','checkToken'
    ]),
    redirectToHome(){
      this.$router.push('/')
    }
  },
  mounted () {
    this.checkToken()
  },
}
</script>
