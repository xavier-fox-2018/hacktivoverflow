<template>
  <div>
    <v-container class="pa-2">
      <v-container elevation-3>
        <v-layout  row class="py-5">
           <h1 class="display-2">Edit Question</h1>
        </v-layout>
        <v-form class="pa-4">
          <v-layout row>
            <v-text-field
              label="Ask your question here"
              v-model="title"
              required
              light
              @keydown.enter.prevent
            >
            </v-text-field>
          </v-layout>
          <v-layout row>
            <v-textarea
              label="Provide more details"
              v-model="bodyEdit"
              light
            >
            </v-textarea>
          </v-layout>
        </v-form>
        <v-layout row justify-center >
          <v-btn color="blue lighten-1" large dark @click="post">
            <v-icon>create</v-icon>Post
          </v-btn>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['title', 'body'],
  data () {
    return {
      titleEdit: this.title,
      bodyEdit: this.body
    }
  },
  methods: {
    post () {
      this.$axios.put(`/questions/${this.$route.params.id}`, {
        title: this.titleEdit,
        question_body: this.bodyEdit
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$store.dispatch('getAllQuestions')
          this.$store.dispatch('getOwnQuestions')
          this.$emit('editedDetail')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
