<template>
   <div>
    <v-container class="pa-2">
      <v-container elevation-3>
        <v-layout  row class="py-5">
           <h1 class="display-2">New Question</h1>
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
              v-model="question_body"
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
  data () {
    return {
      title: '',
      question_body: ''
    }
  },
  methods: {
    post () {
      this.$axios.post('questions', {
        title: this.title,
        question_body: this.question_body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$store.dispatch('getAllQuestions')
          this.$store.dispatch('getOwnQuestions')
          this.$router.push('/browse/myquestions')
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
