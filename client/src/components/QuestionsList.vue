<template>
  <v-layout wrap justify-center>
    <v-flex xs6>
      <v-list three-line>
        <div v-for="(question, index) in allQuestions" :key="index">
          <question-preview :question="question" :index="index"></question-preview>
        </div>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import QuestionPreview from '@/components/QuestionPreview'
export default {
  name: 'QuestionsList',
  components: {
    QuestionPreview
  },
  computed: {
    allQuestions () {
      return this.$store.state.allQuestions
    }
  }
}
</script>

<style>

</style>
