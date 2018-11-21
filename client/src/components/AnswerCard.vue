<template>
  <div>
    <v-card class="pa-3">
        <v-layout row>
          <v-flex xs2>
            <v-avatar
            :tile="false"
            :size="75"
            >
            <img :src="answer.owner.profpic" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs10>
            <v-card-title primary-title>
              <div>
                <div>{{answer.owner.name}}</div>
                <div><em>answered at {{date}}</em></div>
              </div>
            </v-card-title>
          </v-flex>
          <v-layout justify-space-around>
          <v-btn icon small flat color="grey" @click="upvoteAnswer" :disabled="isAuthorized">
            <v-badge overlay small left bottom>
              <span>{{answer.upvotes.length}}</span>
              <v-icon flat small icon >thumb_up</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon small flat color="grey" @click="downvoteAnswer" :disabled="isAuthorized" >
            <v-badge overlay small right bottom>
              <span>{{answer.downvotes.length}}</span>
              <v-icon flat small icon >thumb_down</v-icon>
            </v-badge>
          </v-btn>
        </v-layout>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          {{answer.answer_body}}
          <v-spacer></v-spacer>
            <v-btn color="orange" small dark @click="editAnswer" v-if="isAuthorized">
              <v-icon class="pr-2">edit</v-icon> Edit
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-layout justify-space-around xs12>
      <edit-answer-form v-if="toggleEdit" :body="answer.answer_body" :id="answer._id" @editedAnswer="refreshAnswer"></edit-answer-form>
    </v-layout>
  </div>
</template>

<script>
import EditAnswerForm from '@/components/EditAnswerForm'
export default {
  name: 'AnswerCard',
  props: ['answer'],
  components: {
    EditAnswerForm
  },
  data () {
    return {
      toggleEdit: false
    }
  },
  computed: {
    date () {
      return Date(this.answer.createdAt).toString()
    },
    isAuthorized () {
      return this.answer.owner._id === this.$store.state.userDetail._id
    }
  },
  methods: {
    upvoteAnswer () {
      this.$axios.patch(`/answers/upvote/${this.answer._id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.refreshAnswer()
        })
        .catch(error => {
          console.log(error)
        })
    },
    downvoteAnswer () {
      this.$axios.patch(`/answers/downvote/${this.answer._id}`, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.refreshAnswer()
        })
        .catch(error => {
          console.log(error)
        })
    },
    editAnswer () {
      this.toggleEdit = !this.toggleEdit
    },
    refreshAnswer () {
      this.toggleEdit = false
      this.$emit('refreshAnswer')
    }
  }
}
</script>

<style>

</style>
