<template>
    <div>
        <v-card style="text-align: center; margin-bottom:20px">
            <v-card-title>
                <h1>{{questions.title}}</h1>
            </v-card-title>
            <v-card-text>
                <p>{{questions.body}}</p>
            </v-card-text>
            upvoted: {{questions.upvote.length}}
            <br>
            downvoted: {{questions.downvote.length}}
            <br>
            <!-- <v-btn @click="showDetail">
                edit
            </v-btn> -->
            <edit-quest :questVal="questions" @editedQuest="editedQuestion"/>
            <v-btn @click="deleteQuestion">
                delete
            </v-btn>
            <v-btn>
                detail
            </v-btn>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import editQuest from './editQuest.vue'

export default {
  name: "yourQuestion",
  components: {
      editQuest
  },
  props: ["questions"],
  methods: {
    deleteQuestion() {
      axios
        .delete("http://localhost:3000/question", {
          data: {
            token: localStorage.getItem("token"),
            id: this.questions._id
          }
        })
        .then(data => {
        //   console.log(data);
          this.$emit('updateQuestions')
        })
        .catch(err => {
          console.log(err);
        });
    },
    editedQuestion (){
        this.$emit('newestEdit')
    },
  showDetail(){

  }
  },
};
</script>

<style>
</style>
