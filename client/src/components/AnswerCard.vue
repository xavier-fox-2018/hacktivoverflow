<template>
<div>
  <div class="container">
    <hr>
    <div class="row card-row">

      <!-- Ini spot untuk upvote downvote -->
      <div class="col-2 text-center">
        <div v-if="answer.userId._id != userLoggedIn.id">
          <button type="button" class="btn btn-outline-primary" @click="upvote(answer._id)">▲</button>
          <h5>{{ totalVote }}</h5>
          <button type="button" class="btn btn-outline-danger" @click="downvote(answer._id)">▼</button>
        </div>

        <div v-if="answer.userId._id == userLoggedIn.id">
          <button type="button" class="btn btn-outline-danger" @click="deleteAnswer">Delete</button>
        </div>
      </div>


      <!-- Ini questionnya -->
      <div class="col-10 text-left">
        <p class="card-text text-right text-muted">
          Answered by {{ answer.userId.firstName }} {{ answer.userId.lastName }} on {{ getLocalDate(answer.created) }} 
        </p>
        <p v-html="answer.content" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {
  name: "AnswerCard",
  props: ["answer"],
  methods: {
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
    upvote(val) {
      console.log(this.answer._id)
      axios({
        method: 'post',
        url: this.axios_url + '/answer/upvote/' + this.answer._id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
        this.$emit("answerSubmitted")
        console.log(`berhasil upvote`)
        })
        .catch(err => console.log(err.data))
    },
    downvote(val) {
      axios({
        method: 'post',
        url: this.axios_url + '/answer/downvote/' + this.answer._id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result => {
      this.$emit("answerSubmitted")
        console.log(`berhasil downvote`)
      })
      .catch(err => console.log(err.data))
    },
    deleteAnswer() {
      console.log(this.answer._id)
      axios.delete(this.axios_url + '/answer/' + this.answer._id,
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result => console.log(result.data))
      .catch(err => console.log(err.data))
    }
  },
  data() {
    return {
      created: '',
      createdFormatted: '',
      userLoggedIn: {},
      totalVote: 0
    }
  },
  mounted() {
    this.totalVote = Number(this.answer.upvote.length) - Number(this.answer.downvote.length)
    this.userLoggedIn = jwt.decode(localStorage.getItem('token'))
    console.log(`ini userLoggedIn:`, this.userLoggedIn)
  },
  computed: {
    ...mapState([
      'isLogin',
      'axios_url'
    ])
  },
  watch: {
    answer(n) {
      console.log(n)
    }
  }
}
</script>

<style>
.btn-outline-primary {
  margin-bottom: 12%;
}

.card-row {
  margin-top: 6%;
}
</style>
