<template>
  <div class="content">
     <Error v-if="error_status" v-bind:error="error_msg"/>
     <div class="container-fluid">
            <div class="row" style="justify-content: flex-start">
              <table id="table_task" class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th>Title</th>
                    <th>Created Date</th>
                    <th># of Answers</th>
                    <th># of Votes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(question, index) in questionList" :key="index">
                    <td>{{question.title}}</td>
                    <td>{{question.createdDate}}</td>
                    <td>{{question.answers.length}}</td>
                    <td>{{question.votes.length}}</td>
                    <td>
                      <router-link :to="`/dashboard/questions/view/${question._id}`" >View</router-link> |
                      <router-link :to="`/dashboard/questions/edit/${question._id}`"> Edit </router-link> | 
                      <a id="delete" @click="remove(question._id, question.op._id)">Delete</a></td>
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

export default {
  name: "user_Questions",
  components: {
    Error
  },
  props: [""],
  data() {
    return {
      questionList: [],
      error_status: false,
      error_msg: ""
    };
  },
  methods: {
    remove: function(questionId, userId) {
      let data = {
        questionId: questionId,
        userId: userId
      };
      this.$store.dispatch("removeQuestion_Action", data).then(() => {
        this.getUserQuestion()
      });
      this.questionList = []
    },
    getUserQuestion: function() {
      this.$store.dispatch("decode");
      axios({
        method: "get",
        url: "http://35.194.200.110:3000/ho/question"
      })
        .then(response => {
          this.$store.dispatch("storeQuestions_Action", response.data.data).then(() => {
            console.log(this.$store.state.questionList);
            this.$store.state.questionList.forEach(question => {
              if (question.op._id == this.$store.state.decoded._id) {
                this.questionList.push(question);
              }
            });
          }) 
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    console.log('getting questions')
    this.getUserQuestion()
  }
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
