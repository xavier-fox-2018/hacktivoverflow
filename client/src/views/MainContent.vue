<template>
  <div class='main-content'>
  <br>
    <div style='text-align:left;'><small id='back' style='color:blue; ' @click='backToHome'>Back to list Questions</small></div>
    <h3 style='color: darkblue; border-bottom:1px solid darkblue;'>Question:</h3>
    <h3>{{ question.title }}</h3>
    <small>Asked by {{ question.questioner.username }}</small>
    <hr>
      <p id="test">Posted on {{ changeDate(question.createdAt) }}</p>
    <hr>
    <div>
      <span style="background: grey; color: whitesmoke; cursor:pointer;" @click="textToSpeech">
        <i class="fa fa-volume-up">&nbsp;Text-to-Speech</i>
      </span>
        <audio v-if="speechOn" autoplay id="text-to-speech" @ended="onEnded">
          <source :src="pathAudioFile" type="audio/mpeg">
        </audio>
    </div>
    <div class='paragraf' id="paragraf" ref="paragraf" v-html="question.contents">
    </div><hr>
    <div class='tags'>
      <em>Tags: </em><span v-for='(tag, index) in question.tags' :key="index"><button class='btn btn-small btn-primary' disabled>{{tag}}</button>&nbsp;</span>
    </div>
    <div v-if='activeId === question.questioner._id'><br><br>
      <button class='btn-sm btn-primary' data-toggle="modal" data-target="#editModal">Edit question</button> &nbsp; <button class='btn-sm btn-danger' data-toggle="modal" data-target="#deleteModal">Delete question</button>
    </div>
    <hr>
    <notif :showmsg='showMsg' :showerr='showErr' :msg='msg' @notifMsg='showMsg = false' @notifErr='showErr=false' />
    <div class='row' id='icons'>
      <div class='col-sm-4'>
        <span style='color: red;' @click='addUpvote' v-if='!hasUpvoted'><i class="fa fa-thumbs-up">Upvote</i>  &nbsp;&nbsp;</span>
        <span style='color: grey; cursor:default; background-color:white; !important' v-if='hasUpvoted'><i class="fa fa-thumbs-up">Upvoted</i>  &nbsp;&nbsp;</span>
        <span  style='color: darkblue;' @click='addDownvote' v-if='!hasDownvoted'><i class="fa fa-thumbs-down" aria-hidden="true">Downvote</i> </span>
        <span style='color: grey; cursor:default; background-color:white; !important' v-if='hasDownvoted'><i class="fa fa-thumbs-down" aria-hidden="true">Downvoted</i> </span>
          <span></span>
      </div>
      <div class='col-sm-4'>
        <span style='color: blue;' @click='showShare'><i class="fa fa-share-alt" aria-hidden="true">Share</i> </span> 
      </div>
      <div class='col-sm-4'>
        Total vote: {{ question.userLikes.length - question.userDislikes.length }}
      </div>
    </div><br>
    <share v-if='shareOpen' :question='question' :user='question.questioner.username'></share>
    <answers :question='question' />

    <!-- MODAL EDIT -->
      <div class="modal fade " id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your question Here:</h5>
              
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="title">Insert question Title:</label>
                  <input class="form-control" type="text" name="title" id="" placeholder='Input Title here..' v-model='question.title' required>
                </div>
                  <label for="contents">Insert question Contents:</label>
                    <wysiwyg v-model='question.contents'/>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click='editQuestion(question._id)' data-dismiss="modal">Edit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    <!-- / MODAL EDIT -->
    <!-- MODAL Delete -->
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete This question ?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {{question.questioner.username}}, are you sure ?
              Do you really want to delete this question ??
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click='deleteQuestion(question._id)' data-dismiss="modal">Yes, Just Delete It!</button>
            </div>
          </div>
        </div>
      </div>
      <!-- / MODAL Delete -->
  </div>
</template>

<script>
  import share from '@/components/share.vue'
  import notif from '@/components/notifMessage.vue'
  import answers from '@/components/answers.vue';
  import portUrl from '../../config-host.js'
  import {mapActions, mapState} from "vuex"

  export default {
    // props: ['getDate'],
    components: {
      share, notif, answers
    },
    data() {
      return {
        question: '',
        activeId: localStorage.getItem('userId'),
        views: null,
        removeList: '',
        shareOpen: false,
        showAnswer: false,
        hasUpvoted: false,
        hasDownvoted: false,
        hasDownvotedAns: false,
        hasUpvotedAns: false,
        colorChange: [],
        showMsg: false,
        showErr: false,
        msg: 'test',
        speechOn: false,
        pathAudioFile: '',
        text: 'Error when reading the HTML'
      }
    },
    methods: {
      ...mapActions(["getIsLogin", "getUsername", "getUserId", "getDate"]),
      addUpvote() {
        let questionId = this.$router.history.current.params.id
        this.hasUpvoted = true
        if(this.hasDownvoted) {
          this.hasDownvoted = false
        }
        let self = this
        axios.put(`${portUrl}/questions/upvote/${questionId}`, {}, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((result) => {
          console.log('success upvote YAY-->', result)
          self.getQuestion()
        }).catch((err) => {
          console.log('fail upvote-->', err.message)
          self.msg = err.response.data.message || err.response.data.error || err.response.data
          if(err.response.data.error == "You are not authorized to access this API" ) {
            self.msg = 'Please Login first'
          }
          self.showErr =true
        });
      },
      addDownvote() {
        // console.log(this.question)
        let questionId = this.$router.history.current.params.id
        this.hasDownvoted = true
        if(this.hasUpvoted) {
          this.hasUpvoted = false
        }
        let self = this
        axios.put(`${portUrl}/questions/downvote/${questionId}`, {}, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((result) => {
          console.log('success Downvote-->', result)
          self.getQuestion()
        }).catch((err) => {
          console.log('fail Downvote-->', err)
          self.msg = err.response.data.message || err.response.data.error || err.response.data
          if(err.response.data.error == '"error": "You are not authorized to access this API"' ) {
            self.msg = 'Please Login first'
          }
          self.showErr =true
        });
      },
      backToHome() {
        this.$router.push({ path: `/` })
      },
      getQuestion() {
        let id = this.$router.history.current.params.id
         console.log('get question--', id)
        let self = this
        axios.get(`${portUrl}/questions/${id}`)
        .then((result) => {
          self.question = result.data
          self.showAnswer = false
          self.getContent()
        }).catch((err) => {
          console.log(err)
        });
      },
      editQuestion(id) {
        console.log(this.question.userLikes, this.question.userDislikes)
        let self = this
        axios.put(`${portUrl}/questions/${id}`, {
          title: self.question.title,
          contents: self.question.contents,
          tags: self.question.tags,
          userLikes: self.question.userLikes,
          userDislikes: self.question.userDislikes,
          views: self.question.views
        }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((result) => {
          console.log('success edit', result)
          self.getQuestion(id)
        }).catch((err) => {
          console.log(err)
        });
      },
      deleteQuestion(id) {
        console.log('masukkk kedelete...', id)
        let self = this
        axios.delete(`${portUrl}/questions/${id}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((result) => {
          self.getQuestion(id)
          this.$router.push({name:'home'})
          this.getQuestion()
        }).catch((err) => {
          console.log(err)
        });
      },
      showAnswerForm(id) {
        this.showGlobalChat = false
        this.showAnswer = true
        this.showAllAnswer(id)
      },
      showShare() {
        if(this.shareOpen) {
          this.shareOpen = false
        } else {
        this.shareOpen = true
        }
      },
      populateAnswerToQuestion(answerId) {
        let self = this
        axios.put(`${portUrl}/questions/${this.$router.history.current.params.id}`, {
          
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      },
      changeDate(isoDate) {
        this.getDate(isoDate)
        return this.formatedDate
      },
      getContent() {
        console.log('get content---')
        var element = document.getElementById("test").innerText;
        this.text = this.question.contents.innerText.
        console.log(element, 'text:', this.text)
      },
      textToSpeech() {
        let self = this
        var element = document.getElementById("paragraf");
        self.text = element.innerText;
        console.log('in text to speech...', self.text, '//', self.question._id)
        axios.post(`${portUrl}/questions/text-to-speech`, {
          text: self.text,
          id: self.question._id
        }).then((result) => {
          console.log('result text to mp3', result.data.text)
          setTimeout(()=>{
            self.pathAudioFile = `http://localhost:3000/text-to-speech/${self.question._id}`
            console.log(self.pathAudioFile)
            self.speechOn = true
          }, 500)
        }).catch((err) => {
          console.log(err.response)
        });

      },
      onEnded() {
        this.pathAudioFile = ''
        this.speechOn = false
        this.text = ''
      }
    },
    mounted() {
      // this.getContent()
    },
    created() {
      this.getQuestion()
      this.showAnswer = false
    },
    computed: {
      ...mapState(["isLogin", "formatedDate"])
    },
    watch: {
      question: function(val) {
        self.question = val
      },
      showAnswer: function(val) {
        console.log('status showanswer-->', val)
      }
    }
  }
</script>

<style >
.main-content {
  background-color: white;
  padding: 20px;
  border-radius: 5%;
}
#image {
  min-height: 400px;
  width: 100%;
}
.paragraf {
  text-align: justify;
  text-justify: inter-word;
  width: 100%
}
span i:hover{
  cursor: pointer;
  background-color: lightgrey;
}
.answerBox {
  border: 1px solid brown;
  margin: 5px auto;
  min-width:700px;
  background-color: #e6e6fa;
}
#back:hover {
  cursor:pointer;
  border-bottom: 1px solid blue;
}
.tags {
  text-align: left;
  cursor: default;
}
.deactivated:hover{
  background-color: white;
  cursor:default;
}

</style>