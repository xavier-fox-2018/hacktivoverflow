<template>
  <div class="home">
    <Banner/>
    <QuestionList/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Banner from '@/components/Homepage/Banner.vue'
import QuestionList from '@/components/Homepage/QuestionList.vue'

export default {
  name: 'home',
  components: {
    Banner,
    QuestionList
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  }
}
</script>
