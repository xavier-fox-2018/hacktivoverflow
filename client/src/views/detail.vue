<template>
    <div>
        <navbar/>
        <v-container>
        <h1 style="color:white">your question</h1>
        <your-question v-for="element in listQuestions" :key="element._id" :questions="element" @updateQuestions="updatedQuestions" @newestEdit="updatedQuestions" />
        </v-container>
        
    </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import yourQuestion from "../components/yourQuestion.vue";
import axios from "axios";
export default {
  name: "detail",
  components: {
    navbar,
    yourQuestion
  },
  data() {
    return {
      listQuestions: [],
      listComments: []
    };
  },
  methods: {
      updatedQuestions (){
        axios
      .post("http://localhost:3000/question/user", {
        token: localStorage.getItem("token")
      })
      .then(data => {
        //   console.log(data)
          this.listQuestions = data.data
        console.log(data)
      });
      }
  },
  mounted() {
    axios
      .post("http://localhost:3000/question/user", {
        token: localStorage.getItem("token")
      })
      .then(data => {
        //   console.log(data)
          this.listQuestions = data.data
      });
  }
};
</script>

<style>
</style>
