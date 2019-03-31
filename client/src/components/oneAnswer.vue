<template>
  <div>
    <div >
      <div>posted on: {{ changeDate(answer.createdAt) }}</div>
      <div style='text-align:left; padding-left:5px;'>{{ answer.user.username }} Answered:</div>
      <div style='text-align:right ; padding-right:5px;' v-html="answer.answer"></div>
      <div style="display: flex;"><br><hr>
        <div style="justify-content:flex-start;">
          <span style=' color: red;' @click='commentUpvote(answer._id)' ><i class="fa fa-thumbs-up">Upvote</i>  &nbsp;&nbsp;</span>
          <span style=' color: darkblue;' @click='commentDownvote(answer._id)' ><i class="fa fa-thumbs-down" aria-hidden="true">Downvote</i> </span>
        </div>
        <div style="justify-content:flex-end;">
          <span style=''>&nbsp; Total vote: {{totalAnswerVote(answer)}}</span>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" data-toggle="modal" :data-target="'#editAnswer'+answer._id" v-if="answer.user._id == userId"><small> Edit Answer</small></button>
    </div>

    <!-- MODAL EDIT ANSWER -->
      <div class="modal fade" :id="'editAnswer'+answer._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your Answer Here:</h5>
              
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label for="contents">Edit here:</label>
              <wysiwyg v-model='newAns'/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click='editAnswer' data-dismiss="modal">Edit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    <!-- // -->
  </div>
</template>

<script>
import portUrl from '../../config-host.js'
import {mapActions, mapState} from "vuex"

export default {
  props: ["answer", "showall"],
  data() {
    return {
      answerId: this.answer._id,
      newAns: this.answer.answer,
      userId: ''
    }
  },
  created() {
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    ...mapActions(["getDate"]),
    changeDate(isoDate) {
      this.getDate(isoDate)
      return this.formatedDate
    },
     commentUpvote(answerId) {
      let self = this
      axios.put(`${portUrl}/answers/upvote/${answerId}`, {}, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((result) => {
        console.log('success upvote-->', result)
        self.showall()
      }).catch((err) => {
        console.log('fail upvote-->', err)
      });
    },
    commentDownvote(answerId) {
      let self = this
      axios.put(`${portUrl}/answers/downvote/${answerId}`, {}, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((result) => {
        console.log('success downvote-->', result)
        self.showall()
      }).catch((err) => {
        console.log('fail downvote-->', err)
      });
    },
    totalAnswerVote(answer) {
      return answer.userLike.length - answer.userDislike.length
    },
    editAnswer() {
      let self = this
      axios.put(`${portUrl}/answers/${this.answerId}`, {
        question: self.$router.history.current.params.id,
        answer: self.newAns
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then((result) => {
        self.showall()
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  computed: {
    ...mapState(["isLogin", "formatedDate"])
  }
}
</script>

<style scoped>

</style>
