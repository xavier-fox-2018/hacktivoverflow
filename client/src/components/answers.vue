<template>
   <div class='answers'>
    <h3>Answers:</h3>
    <p>There are currently {{allAnswers.length}} answers</p>
    <div v-if="allAnswers.length > 0">
      <!--  -->
      <div v-for='answer in allAnswers' :key="answer._id">
        <answerlist class='answerBox' :answer='answer'  :showall='showAllAnswer' />
      </div>
    </div>
    <div v-else>
      <div class='answerBox'>No Answers yet!</div>
    </div>
    <hr>
    <div v-if="isLogin">
      <h3>Your Answer:</h3>
      <hr>
      <wysiwyg v-model='submitedAnswer'/>
      <br>
      <button @click='submitAnswer'>Submit Answer</button>
    </div>
    
  </div>
</template>

<script>
import answerlist from "@/components/oneAnswer.vue";
import {mapActions, mapState} from "vuex"
import portUrl from '../../config-host.js'

export default {
  props: ["question"],
   components: {
      answerlist
    },
  data() {
    return {
      submitedAnswer: '',
      newAnswer: '',
      allAnswers: [],
      answerId: ''
    }
  },
  methods: {
   
    submitAnswer() {
      let id = this.$router.history.current.params.id
      let self = this
      axios.post(`${portUrl}/answers`, {
        user: localStorage.getItem('userId'),
        answer: self.submitedAnswer,
        question: id
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((result) => {
        // console.log('hasil dari submit answer--',result.data)
        self.showAllAnswer()
        self.answer=''
      }).catch((err) => {
        console.log(err)
      });
    },
    showAllAnswer() {
      self.allAnswers = []
      self = this
      let id = this.$router.history.current.params.id
      axios.get(`${portUrl}/answers/${id}`)
      .then((result) => {
        self.allAnswers = result.data
        self.colorChange = Array(self.allAnswers.length).fill('red')
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  created() {
    this.showAllAnswer()
  },
  computed: {
    ...mapState(["formatedDate", "isLogin"])
  }
}
</script>

<style scoped>

</style>
