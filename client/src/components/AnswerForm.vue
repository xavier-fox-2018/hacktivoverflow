<template>
  <v-container class="white" elevation-3 fluid>
    <v-layout  row class="">
        <h1 class="title">Post New Answer</h1>
    </v-layout>
    <v-form class="">
      <v-layout row>
        <v-textarea
          label="Your Answer"
          v-model="answer_body"
          light
        >
        </v-textarea>
      </v-layout>
    </v-form>
    <v-layout row justify-center >
      <v-btn color="orange lighten-1" large dark @click="postAnswer">
        <v-icon>create</v-icon>Post Answer
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      answer_body: ''
    }
  },
  methods: {
    postAnswer () {
      this.$axios.post(`/answers/${this.$route.params.id}`, {
        answer_body: this.answer_body
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.answer_body = ''
          this.$emit('postedAnswer')
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
