<template>
  <div class="home container">
    <router-view></router-view>
    <hr>
    <Question @show-modal-edit-question="showModalEditQuestion($event)"  @show-modal-add-answer="showModalAddAnswer($event)" v-for="question in allQuestions" :question="question" :key="question._id"></Question>

    <!-- Modal Add Answer, cuma 1 dipake bareng2!-->
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

    <!-- <ModalAddAnswer :answer="answer" :currentQuestionId="currentQuestionId"></ModalAddAnswer> -->


    <!-- Modal Edit Question -->

    <div class="modal fade" id="editQuestion" tabindex="-1" role="dialog"> 
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Edit Question</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Enter title" v-model="editQuestion.title"> 
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="editQuestion.detail"></textarea>
                        </div>
                        <button type="submit" class="btn btn-dark" data-dismiss="modal" @click.prevent="updateQuestion">Edit Question</button>
                        {{ currentQuestionId }}
                    </form>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal edit answer: -->







  </div>
</template>

<script>
import Question from '@/components/Question'
import ModalAddAnswer from '@/components/ModalAddAnswer'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      currentQuestionId: '',
      answer: {
        detail: ""
      },
      editQuestion: {
        title: "",
        detail: ""
      }
    }
  },
  components: { Question, ModalAddAnswer },
  computed: {
    ...mapState(['isLoggedIn', 'allQuestions', 'userID'])
  },
  methods: {
    showModalAddAnswer (questionId) {
      this.currentQuestionId = questionId;
      $('#addAnswer').modal('show');
    },

    showModalEditQuestion (questionId) {
      this.currentQuestionId = questionId;
      $('#editQuestion').modal('show');
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
    },

    updateQuestion: function() {
      console.log(this.editQuestion);
      axios({
        method: 'PUT',
        url: `http://localhost:3000/question/${this.currentQuestionId}`,
        data: {
          title: this.editQuestion.title,
          detail: this.editQuestion.detail
        },
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then( response => {
        console.log(response);
        this.$store.dispatch('getAllQuestions')
      })
      .catch( err => {
        console.log(err);
        
      })
    }

  }
}
</script>

