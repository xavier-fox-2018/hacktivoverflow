<template>
  <div>
    <v-tabs centered>
      <v-tab to="/browse/questions">
        All Questions
      </v-tab>
      <v-tab to="/browse/myquestions">
        Your Questions
      </v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
