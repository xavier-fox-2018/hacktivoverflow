<template>
  <div>
    <v-divider v-if="index"></v-divider>
    <v-list-tile avatar @click="details(question._id)">
      <v-list-tile-avatar>
        <img :src="question.owner.profpic">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="question.title"></v-list-tile-title>
        <v-list-tile-sub-title v-html="question.question_body"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  props: ['question', 'index'],
  methods: {
    details (id) {
      this.$router.push(`/questions/${id}`)
    }
  }
}
</script>

<style>

</style>
