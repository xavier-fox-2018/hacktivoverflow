<template>
  <div>
    <v-container class="pa-2">
      <v-container elevation-3>
        <v-layout  row class="py-5">
           <h1 class="display-2">Edit Answer</h1>
        </v-layout>
        <v-form class="pa-4">
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
  props: ['body', 'id'],
  data () {
    return {
      bodyEdit: this.body
    }
  },
  methods: {
    post () {
      this.$axios.put(`/answers/${this.id}`, {
        answer_body: this.bodyEdit
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$store.dispatch('getAllQuestions')
          this.$store.dispatch('getOwnQuestions')
          this.$emit('editedAnswer')
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
