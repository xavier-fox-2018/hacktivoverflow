<template>
  <div class="home container">
    <router-view></router-view>
    <hr>
    <Question @show-modal="showModal($event)" v-for="question in allQuestions" :question="question" :key="question._id"></Question>

    <!-- Modal, cuma 1 dipake bareng2!-->
    <div class="modal fade" id="addAnswer" tabindex="-1" role="dialog"> 
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addAnswerLabel">Answer</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form>
                        <div class="form-group">
                            <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="answer.detail"></textarea>
                        </div>
                        <button type="submit" class="btn btn-dark" data-dismiss="modal" @click.prevent="postAnswer">Add Answer</button>
                        {{ currentQuestionId }}
                    </form>

                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      currentQuestionId: '',
      answer: {
        detail: ""
      }
    }
  },
  components: { Question },
  computed: {
    ...mapState(['isLoggedIn', 'allQuestions', 'userID'])
  },
  methods: {
    showModal (questionId) {
      this.currentQuestionId = questionId;
      $('#addAnswer').modal('show');
    },
    postAnswer: function() {
      console.log(this.answer.detail, this.currentQuestionId);
      axios({
        method: 'POST',
        url: `http://localhost:3000/answer/${this.currentQuestionId}`,
        data: {
          detail: this.answer.detail
        },
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then( response => {
        console.log(response);
      })
      .catch( err => {
        console.log(err);
        
      })  
    }
  }
}
</script>
