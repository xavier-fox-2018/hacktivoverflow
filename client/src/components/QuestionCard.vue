<template>
  <v-flex xs10 offset-xs1>
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
          
            by {{question.author.name}}
          
        </v-card-text>
        <v-card-actions>
          <div class="text-xs-center">
            <v-chip label><v-icon left>chat</v-icon>{{question.answers.length}}</v-chip>
            <v-chip label><v-icon left>thumb_up</v-icon>{{question.upvotes.length}}</v-chip>
            <v-chip label><v-icon left>thumb_down</v-icon>{{question.downvotes.length}}</v-chip>
            <v-chip label><v-icon left>access_time</v-icon>{{ question.createdAt | moment("from", "now") }}</v-chip>
          </div>
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

