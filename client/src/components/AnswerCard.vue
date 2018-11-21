<template>
<div>
  <div class="container">
    <div class="row">

      <!-- Ini spot untuk upvote downvote -->
      <div class="col-2 text-center">
        <button type="button" class="btn btn-outline-primary" @click="upvote(answer._id)">▲</button>
        <h5>{{ totalVote }}</h5>
        <button type="button" class="btn btn-outline-danger" @click="downvote(answer._id)">▼</button>
      </div>


      <!-- Ini questionnya -->
      <div class="col-10 text-left">
        <p class="card-text text-right text-muted">
          Answered by {{ answer.userId.firstName }} {{ answer.userId.lastName }} on {{ getLocalDate(answer.created) }} 
        </p>
        <p v-html="answer.content" />
      </div>
    </div>
    <hr>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

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
      
    },
    downvote(val) {
      console.log(val)
    }
  },
  data() {
    return {
      created: '',
      createdFormatted: '',
      totalVote: 0
    }
  },
  mounted() {
    // console.log(`masuk entot`)
    console.log(this.answer.vote)
    for (let i = 0; i < this.answer.vote.length; i++) {
      this.totalVote += this.answer.vote[i].votes
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'axios_url'
    ])
  },
  watch: {
  }
}
</script>

<style>
.btn-outline-primary {
  margin-bottom: 12%;
}
</style>
