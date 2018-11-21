<template>
  <v-flex xs12>
    <v-hover>
      <v-card
        v-if="question"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
      >
        <v-card-text>
          <h6 class="title">
            {{question.title}}
          </h6>
          <v-divider></v-divider>
          {{question.author.name}}
        </v-card-text>
        <v-card-actions>
          <p>ini nantinya view</p>
          <v-spacer></v-spacer>
          <v-btn outline round color="blue" :to="{name : 'questionDetail' , params : {questionId : question._id}}">READ MORE</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
export default {
    props : ['question'],
}
</script>

