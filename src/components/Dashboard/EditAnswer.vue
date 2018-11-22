<template>
  <div class="content">
      <Error v-if="error_status" v-bind:error="error_msg"/>
      <h1>Edit Answer</h1>
     <div id="answerEditor">
      <form>
        <div class="form-group">
          <label for="title">Answer Title:</label>
          <input type="text" v-model="answer_title" :v-bind:value="this.answer_title" class="form-control" id="title" placeholder="Article Title">
        </div>
        <div class="form-group">
          <label for="body">Answer Description:</label>
          <textarea class="form-control" v-model="answer_description" :v-bind:value="this.answer_description" rows="10" id="body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="editAnswer()">Edit Answer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";
import {mapState} from 'vuex'

export default {
  name: "edit_Answer",
  props: [],
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      currentAnswer: {},
      answer_description: "",
      answer_title: ""
    };
  },
  methods: {
    editAnswer() {
        let data = {
            title: this.answer_title,
            description: this.answer_description,
            questionId: this.$route.params.answerId,
            userId: this.currentAnswer.poster._id
        }
        this.$store.dispatch('editAnswer_Action', data)
      }
  },
  computed: mapState({
    currentUserAnswerList: state => state.currentUserAnswerList,
  }),
  mounted: function() {
    // console.log(this.$store.state.currentUserAnswerList)
    this.$store.state.currentUserAnswerList.forEach(element => {
      if(element._id == this.$route.params.answerId) {
        this.currentAnswer = element
        this.answer_title = element.title
        this.answer_description = element.description
      }
    });
  },
};
</script>

<style>
.content {
  margin: 10px;
}
#answerEditor {
  width: 80%;
  border: 1px solid lightseagreen;
  margin: 0 auto;
  padding: 10px;
}
</style>
