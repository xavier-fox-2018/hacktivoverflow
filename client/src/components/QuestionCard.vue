<template>
  <v-flex xs12>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
      >
        <v-card-text>
          <h6 class="title">
            {{question.title}}
          </h6>
          <v-divider></v-divider>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <p>ini nantinya view</p>
          <v-spacer></v-spacer>
          <v-btn :to="{name : 'questionDetail' , params : {questionId : question._id}}">READ MORE</v-btn>
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

