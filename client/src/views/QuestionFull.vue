<template>
  <div class="QuestionFull">
    <div v-if="isLogin">
      <div class="container">
        <div class="row">
          <div class="col-8 text-left">

            <!-- Ini questionnya -->
            <h3>{{ title }}</h3>
            <hr>
            <p class="card-text text-right text-muted">
              Asked by {{ user.firstName }} {{ user.lastName }} on {{getLocalDate(created)}}
            </p>
            <p v-html="content" />

            <!-- Ini answernya -->
            <h5>{{ answers.length }} Answers</h5>
            <hr>
            <hr>
            <AnswerCard
              :answer="answer"
              :key="index"
              v-for="(answer, index) in answers"
              @VoteSuccess="VoteSuccess"
            />
            <hr>

            <!-- Ini answer block -->
            <hr>
            <form v-on:submit.prevent="onSubmit">
              <div class="row">
                <div class="col-8">
                  <h5>Help a buddy?</h5>
                </div>
                <div class="col-4 text-right">
                  <button type="button" class="btn btn-outline-primary" @click.prevent="AnswerSubmit">Answer</button>
                </div>
              </div>
              <VuEditor @VuEditorContent="VuEditorContent" id="VuEditor"/>
            </form>

            <hr>
            <hr>

            <h5>Preview</h5>
            <div class="container bg-light">
              <div v-html="answerContent"></div>
            </div>

          </div>

          <div class="col-4">

            <!-- Nanti dulu, urusin yang penting-penting dulu aja -->
            <!-- <div class="card" style="width: 10rem">
              <img class="card-img-top" src="https://www.biography.com/.image/t_share/MTIwNjA4NjMzMjIxNzExMzcy/napoleon-i-9420291-2-402.jpg" alt="Card image cap">
              <div class="card-body text-right">
                <p class="card-text">{{ user.firstName }} {{ user.lastName }}</p>
              </div>
            </div> -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import axios from 'axios'
import VuEditor from '@/components/VuEditor.vue'
import AnswerCard from '@/components/AnswerCard.vue'

export default {
  name: 'QuestionFull',
  components: {
    VuEditor,
    AnswerCard
  },
  data() {
    return {
      title: '',
      content: '',
      user: {},
      created: '',
      createdFormatted: '',
      answers: [],
      id: '',
      answerContent: ''
    }
  },
  methods: {
    VoteSuccess() {
      this.populateAnswers()
    },
    getLocalDate(value){
      var now= new Date(value), 
      ampm= 'AM', 
      h= now.getHours(), 
      m= now.getMinutes(), 
      s= now.getSeconds();
      if(h>= 12){
          if(h>12) h -= 12;
          ampm= 'PM';
      }

      if(m<10) m= '0'+m;
      if(s<10) s= '0'+s;
      return now.toLocaleDateString()+ ' ' + h + ':' + m + ' ' + ampm;
    },
    AnswerSubmit() {
      if (!localStorage.getItem('token')) {}
      else {
        axios({
          method: 'post',
          url: this.axios_url + '/answer',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            content: this.answerContent,
            questionId: this.$route.params.questionId
          }
        })
          .then(result => {
            console.log(result.data)
            this.populateAnswers()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    VuEditorContent(val) {
      this.answerContent = val
    },
    populateAnswers() {
      axios({
        method: 'get',
        url: this.axios_url + '/question/' + this.$route.params.questionId
      })
        // masukin semua
        .then(result => {
          const question = result.data.data
          this.title = question.title
          this.content = question.content
          this.user = question.userId
          this.created = question.created
          this.answers = question.answers
          this.id = question._id
  
          const day = new Date(this.created).getDate()
          const month = new Date(this.created).getMonth() + 1
          const year = new Date(this.created).getFullYear()
  
          this.createdFormatted = day + '/' + month + '/' + year
        })
        .catch()
    }
  },
  mounted() {
    this.populateAnswers()
  },
  computed: {
    ...mapState([
      'isLogin',
      'axios_url'
    ])
  }
}
</script>

<style>
#VuEditor {
  margin-bottom: 3em;
  margin-top: 3em;
}
</style>
