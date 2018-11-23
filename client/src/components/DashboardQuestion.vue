<template>
  <div class="question-card list-group">
    <router-link :to="{ path: question.userId._id + '/' + question._id }">
      <a href="#" class="text-left list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">

          <!-- Title -->
          <h5 class="mb-1 text-truncate">{{ question.title }}</h5>

          <!-- When -->
          <small>{{ questionDate }}</small>
        </div>

        <!-- By -->
        <small>By 
          <router-link :to="{ path: question.userId._id }">
            <a href="#">
              {{ question.userId.firstName }} {{ question.userId.lastName }}
            </a> 
          </router-link>
          with {{ question.answers.length }} answer(s)
        </small>
      </a>
    </router-link>
</div>
</template>

<script>

export default {
  name: "DashboardQuestion",
  props: ['question'],
  computed: {
  },
  data() {
    return {
      questionDate: ''
    }
  },
  mounted() {
    const day = new Date(this.question.created).getDate()
    const month = new Date(this.question.created).getMonth() + 1
    const year = new Date(this.question.created).getFullYear()
    console.log(this.question)

    console.log(day, month, year)
    this.questionDate = day + '/' + month + '/' + year
  }
}
</script>

<style>
.question-content {
  max-height: 10em;
  overflow: hidden;
}

.question-card {
  margin-bottom: 2%;
}
</style>
