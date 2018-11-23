<template>
  <v-navigation-drawer
    floating
    temporary
    dark
    v-model="drawerState"
    class="drawer"
    app>
    <v-list class="pt-0" >
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/createquestion" >
        <v-list-tile-action >
          <v-icon>not_listed_location</v-icon>
        </v-list-tile-action>
        <v-list-tile-content >
          <v-list-tile-title>Ask a Question!</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to='/browse' >
        <v-list-tile-action >
          <v-icon>whatshot</v-icon>
        </v-list-tile-action>
        <v-list-tile-content >
          <v-list-tile-title>Browse Questions</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {

  },
  computed: {
    drawerState: {
      get () {
        return this.$store.state.drawerState
      },
      set (value) {
        this.$store.dispatch('changeDrawerState', value)
      }
    }
  }
}
</script>

<style>

</style>
