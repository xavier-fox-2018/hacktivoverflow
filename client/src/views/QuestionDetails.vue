<template>
  <div>
      <v-container elevation-3 align-content-center>
          <v-layout row>
            <h1 class="headline" text-xs-center>{{question.title}}</h1>
            <v-spacer></v-spacer>
            <v-avatar
              :size="100">
              <img
                :src="question.owner.profpic"
              >
            </v-avatar>
          </v-layout>
          <v-layout row class="py-3 " >
            <em class="caption">Asked by {{question.owner.name}}, at {{date}}</em>
          </v-layout>
        <v-layout class="pt-4" justify-left>
            <p v-html="question.question_body"></p>
        </v-layout>
        <v-layout justify-center>
          <v-menu
            transition="scale-transition"
            bottom
            right
          >
            <v-btn flat dark color="blue" slot="activator" v-if="isAuthorized"
            >
              More
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-btn color="orange" small dark @click.native="editQuestion">
                  <v-icon class="pr-2">edit</v-icon> Edit
                </v-btn>
              </v-list-tile>
              <v-list-tile>
                <v-btn color="red" small dark @click.native="deleteQuestion">
                  <v-icon class="pr-2">delete</v-icon> Delete
                </v-btn>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
        <v-divider></v-divider>
        <v-layout justify-space-around>
          <v-btn icon small flat color="grey" @click="upvoteQuestion" :disabled="isAuthorized">
            <v-badge overlay small left bottom>
              <span>{{question.upvotes.length}}</span>
              <v-icon flat small icon >thumb_up</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon small flat color="grey" @click="downvoteQuestion" :disabled="isAuthorized" >
            <v-badge overlay small right bottom>
              <span>{{question.downvotes.length}}</span>
              <v-icon flat small icon >thumb_down</v-icon>
            </v-badge>
          </v-btn>
        </v-layout>
        <v-layout justify-space-around>
          <edit-question-form v-if="editToggle" :title="question.title" :body="question.question_body" @editedDetail="getDetails"></edit-question-form>
        </v-layout>
      </v-container>
      <v-container v-if="this.$store.state.isLogin">
        <answer-form @postedAnswer="getAnswers">
        </answer-form>
      </v-container>
      <v-container elevation-1 mt-3>
        <answer-list :allanswers = "allanswers" @finalRefresh="getAnswers"></answer-list>
      </v-container>
  </div>
</template>

<script>
import AnswerList from '@/components/AnswerList'
import AnswerForm from '@/components/AnswerForm'
import EditQuestionForm from '@/components/EditQuestionForm'
export default {
  components: {
    AnswerList,
    AnswerForm,
    EditQuestionForm
  },
  data () {
    return {
      allanswers: [],
      editToggle: false
    }
  },
  methods: {
    getAnswers () {
      this.$axios.get(`/answers/${this.$route.params.id}`)
        .then(response => {
          this.allanswers = response.data.result
          this.$store.dispatch('getQuestionDetails', this.$route.params.id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDetails () {
      this.$store.dispatch('getQuestionDetails', this.$route.params.id)
      this.editToggle = false
    },
    upvoteQuestion () {
      this.$axios.patch(`/questions/upvote/${this.question._id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$store.dispatch('getQuestionDetails', this.$route.params.id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    downvoteQuestion () {
      this.$axios.patch(`/questions/downvote/${this.question._id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$store.dispatch('getQuestionDetails', this.$route.params.id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editQuestion () {
      this.editToggle = true
    },
    deleteQuestion () {
      if (confirm('are you sure you want to delete this question?')) {
        this.$axios.delete(`questions/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$store.dispatch('getAllQuestions')
            this.$store.dispatch('getOwnQuestions')
            this.$router.push('/browse/myquestions')
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    question () {
      return this.$store.state.detailQuestion
    },
    date () {
      return Date(this.question.createdAt).toString()
    },
    isAuthorized () {
      return this.question.owner._id === this.$store.state.userDetail._id
    }
  },
  created () {
    this.getDetails()
    this.getAnswers()
  }
}
</script>

<style>

</style>
