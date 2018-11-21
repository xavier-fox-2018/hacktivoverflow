<template>
  <div class="container">
    <h1>{{questionDetail.title}}</h1>
    <div class="border border-dark p-3">
      <div v-html="questionDetail.content"></div>
      <p>Asked by {{author}}</p>
      <p>Votes: {{countVotes(questionVotes)}}</p>
      <b-button @click="upVote(questionDetail._id, 'questions')" type="button" variant="primary"><i class="fas fa-chevron-circle-up"></i></b-button> &nbsp;
      <b-button @click="downVote(questionDetail._id, 'questions')" type="button" variant="danger"><i class="fas fa-chevron-circle-down"></i></b-button>
      <div v-for="(answer, index) in questionDetail.answers" :key="index" class="border border-dark p-3 mt-3">
        <p v-html="answer.content"></p>
        <p>Answered by {{answer.writer.name}}</p>
        <p>Votes: {{countVotes(answer.votes)}}</p>
        <b-button @click="upVote(answer._id, 'answers')" type="button" variant="primary"><i class="fas fa-chevron-circle-up"></i></b-button> &nbsp;
        <b-button @click="downVote(answer._id, 'answers')" type="button" variant="danger"><i class="fas fa-chevron-circle-down"></i></b-button>
        <div class="mt-2">
          <router-link :to="'/edit/answer/' + answer._id" v-if="name == author">Edit</router-link>
        </div>
      </div>
      <AnswerForm @post-answer="getQuestionDetail"/>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import AnswerForm from '@/components/AnswerForm.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      questionDetail: {},
      author: '',
      questionVotes: [],
      name: localStorage.getItem('name')
    }
  },
  components: {
    AnswerForm
  },
  methods: {
    ...mapActions ([
      'getQuestionList'
    ]),
    upVote (id, type) {
      Axios({
        url: `http://localhost:3000/${type}/vote/${id}`,
        method: 'post',
        data: {
          value: 1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.dispatch('getQuestionList')
          this.getQuestionDetail()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    downVote (id, type) {
      Axios({
        url: `http://localhost:3000/${type}/vote/${id}`,
        method: 'post',
        data: {
          value: -1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.dispatch('getQuestionList')
          this.getQuestionDetail()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    countVotes (arr) {
      let result = 0
      arr.forEach(element => result += element.value)
      return result
    },
    getQuestionDetail () {
      Axios({
        url: `http://localhost:3000/questions/${this.$route.params.id}`,
        method: 'get'
      })
        .then(response => {
          console.log(response.data)
          this.questionDetail = response.data
          this.author = response.data.author.name
          this.questionVotes = response.data.votes
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getQuestionDetail()
  }
}
</script>
