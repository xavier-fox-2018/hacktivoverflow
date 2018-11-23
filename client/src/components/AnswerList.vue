<template>
   <v-layout wrap justify-center>
    <v-flex xs12 v-for="answer in allanswers" :key="answer._id">
      <answer-card :answer="answer" @refreshAnswer = "refreshAnswerAgain"></answer-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AnswerCard from '@/components/AnswerCard'
export default {
  props: ['allanswers'],
  components: {
    AnswerCard
  },
  methods: {
    refreshAnswerAgain () {
      this.$emit('finalRefresh')
    }
  }
}
</script>

<style>

</style>
