<template>
  <div class="content">
     <Error v-if="error_status" v-bind:error="error_msg"/>
     <div class="container-fluid">
            <div class="row" style="justify-content: flex-start">
              <table id="table_task" class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th>Answer Title</th>
                    <th>Question Title</th>
                    <th># of Votes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(answer, index) in currentUserAnswerList" :key="index">
                    <td>{{answer.title}}</td>
                    <td>{{answer.question.title}}</td>
                    <td>{{answer.votes.length}}</td>
                    <td>
                      <router-link :to="`/dashboard/answers/view/${answer._id}`" >View</router-link> |
                      <router-link :to="`/dashboard/answers/edit/${answer._id}`"> Edit </router-link> 
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";
import {mapState} from 'vuex'

export default {
  name: "user_Answers",
  components: {
    Error
  },
  props: [""],
  data() {
    return {
      answerList: [],
      error_status: false,
      error_msg: ""
    };
  },
  methods: {

  },
  mounted: function() {
    this.$store.dispatch('getAllAnswers')
  },
  computed: mapState({
    currentUserAnswerList: state => state.currentUserAnswerList
  })
};
</script>

<style scoped>
.content {
  margin: 10px;
}
#delete {
  color: red;
}
#delete:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
