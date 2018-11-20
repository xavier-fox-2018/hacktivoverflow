<template>
  <v-app id="app">
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
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Stuck Overflow</v-toolbar-title>
      <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down ml-5">
      </v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="blue" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<style>

</style>

<script>

export default {
  data: () => ({
    drawer: null,
    menuItems : [
      {
        icon : 'home', title : 'Home', path : '/'
      },
      {
        icon : '360', title : 'Test', path : '/test'
      },
      {
        icon : 'contact_mail', title : 'About', path : '/about'
      },
    ]
  }),
  props: {
    source: String
  }
}
</script>
