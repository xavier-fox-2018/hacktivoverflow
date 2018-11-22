<template>
  <div class="pageContent">
    <div class="title row">
      <div class="col-1">
        <div v-if="questionUpVote >= questionDownVote">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{questionUpVote - questionDownVote}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{questionDownVote - questionUpVote}}
        </div>
      </div>
      <div class="col-11">
        <h1>{{questionDetail.title}}</h1>
        <p class="subtitle">
          <font-awesome-icon icon="user"/> {{questionDetail.op.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{questionDetail.createdDate}}</p>
        </div>
    </div>
    <div class="separator"></div>
    <div class="question">
      {{questionDetail.description}}
    </div>
    <div class="votes">
      <font-awesome-icon icon="thumbs-up" class="pointer" style="color:green" @click="upVoteQ()"/>
      {{questionUpVote}}
      &nbsp;
      <font-awesome-icon icon="thumbs-down" class="pointer" style="color:maroon" @click="downVoteQ()"/>
      {{questionDownVote}}
    </div>
    <div class="separator"></div>
    <h3>Answers</h3>
    <div class="addAnswer">
      <h4>Have Something to Share?</h4>
      <Error v-if="error_status" v-bind:error="error_msg"/>
      <form>
        <div class="form-group">
          <label for="question_title">Answer Title</label>
          <input type="text" class="form-control" v-model="addA_title" placeholder="Enlighten Us, Teacher">
        </div>
        <div class="form-group">
          <label for="question_description">Answer Description</label>
          <input type="text" class="form-control" v-model="addA_description" placeholder="Description . . .">
        </div>

        <button v-if="token" type="submit" class="btn btn-primary" @click.prevent="addAnswer()">Submit</button>
        <div v-else>
          <button disabled class="btn btn-primary">Submit</button>
          <p>Only registered user may submit an Answer!</p>
        </div>
      </form>
    </div>
    <div class="separator"></div>
    <div class="title row answer" v-for="(answer,index) in questionDetail.answers" :key="index">
      <div class="col-1">
        <div v-if="countVote(answer, 1) >= countVote(answer, -1)">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{countVote(answer, 1) - countVote(answer, -1)}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{countVote(answer, -1) - countVote(answer, 1)}}
        </div>
      </div>
      <div class="col-11">
        <h3>{{answer.title}}</h3>
        <p class="subtitle">
          <font-awesome-icon icon="user"/> {{answer.poster.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{answer.createdDate}}</p>
        </div>
        <div>{{answer.description}}</div>
        <div class="votes">
          <font-awesome-icon icon="thumbs-up" class="pointer" style="color:green" @click="upVoteA(answer._id)"/>
          {{countVote(answer, 1)}}
          &nbsp;
          <font-awesome-icon icon="thumbs-down" class="pointer" style="color:maroon" @click="downVoteA(answer._id)"/>
          {{countVote(answer, -1)}}
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Error from '@/components/Error.vue';
import {mapState} from 'vuex'

export default {
  name: "question-detail",
  components: {
    Error,
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      addA_title: "",
      addA_description:"",
      error_status: false,
      error_msg: "",
    }
  },
  computed: mapState({
    questionDetail: state => state.viewedQuestion,
    questionUpVote: state => state.questionUpVote,
    questionDownVote: state => state.questionDownVote,
    answerUpVote: state => state.answerUpVote,
    answerDownVote: state => state.answerDownVote
  }),
  methods: {
    countVote(data, sign) {
      // filter semua data nya yang sign === sign (-1, 1)
      let filter = data.votes.filter((datum) => datum.vote == sign)
      return filter.length
    },
    upVoteQ: function() {
      let token = localStorage.getItem("token");
      if(token) {
        let data = {
          questionId: this.$route.params.questionId,
          vote: 1,
          token: token,
          route: 'question' 
        }
        this.$store.dispatch("voteQ_Action", data)      
      } else {
        alert('Only Registered user can vote')
      }
    },
    downVoteQ: function() {
      let token = localStorage.getItem("token");
      if(token) {
        let data = {
          questionId: this.$route.params.questionId,
          vote: -1,
          token: token,
          route: 'question' 
        }
        this.$store.dispatch("voteQ_Action", data)      
      } else {
        alert('Only Registered user can vote')
      }
    },
    upVoteA: function(id) {
      let token = localStorage.getItem("token");
      if(token) {
        let data = {
          questionId: this.$route.params.questionId,
          answerId: id,
          vote: 1,
          token: token,
          route: 'answer' 
        }
        this.$store.dispatch("voteA_Action", data)      
      } else {
        alert('Only Registered user can vote')
      }
    },
    downVoteA: function(id) {
      let token = localStorage.getItem("token");
      if(token) {
        let data = {
          questionId: this.$route.params.questionId,
          answerId: id,
          vote: -1,
          token: token,
          route: 'answer' 
        }
        this.$store.dispatch("voteA_Action", data)      
      } else {
        alert('Only Registered user can vote')
      }
    },
    addAnswer: function() {
      let data = {
          title: this.addA_title,
          description: this.addA_description,
          questionId: this.$route.params.questionId
        }
      this.$store.dispatch('addAnswer_Action', data)
    }
  }
};
</script>

<style scoped>
.title, .question {
  text-align: left;
  margin-left: 20px;
  margin-bottom: 20px
}
.separator {
  border: 1px solid lightgray;
  margin: 10px
}
.pageContent {
  margin-left: 180px
}
.votes {
  text-align: left;
  margin-left: 20px
}
.answer {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid lightseagreen;
}

.pointer {
  cursor: pointer;
}
</style>
