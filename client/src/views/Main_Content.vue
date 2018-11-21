<template>
  <div>
    <AskQuestion></AskQuestion>

    <CardQuestion></CardQuestion>
  </div>
</template>

<script>
import AskQuestion from '@/components/AskQuestion.vue'
import CardQuestion from '@/components/CardQuestion.vue'
export default {
  name:'main_content',
  components:{
    AskQuestion,
    CardQuestion
  }
}
</script>

<style>

</style>
