<template>
  <b-container class="home">
    <div class="mt-5">
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      question: ''
    }
  },
  methods: {
    ...mapActions([
      'getQuestionList'
    ])
  },
  created () {
    this.$store.dispatch('getQuestionList')
  }
}
</script>
