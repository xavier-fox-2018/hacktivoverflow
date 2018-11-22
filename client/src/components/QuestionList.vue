<template>
  <div id="questionlist">
    <AskQuestion class="w-50 mx-auto"/>
    <div v-for="(item, index) in listOfQuestion" :key="index" class="mt-5">
      <h4><router-link class="text-dark" :to="'/question/' + item._id">{{ item.title }}</router-link></h4>
      <p>Asked by {{ item.author.name }}</p>
      <p>Votes: {{ countVotes(item.votes) }}</p>
      <p>Answers: {{ item.answers.length }}</p>
      <router-link 
        class="text-success"
        :to="'/edit/question/' + item._id" 
        v-if="item.author.name == name"
      >Edit</router-link> &nbsp;
      <a href="#"
         @click="deleteAnswer(item._id)"
         v-if="item.author.name == name"
         class="text-success"
      >Delete</a>
    <hr>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AskQuestion from '@/components/AskQuestion.vue'
import Axios from 'axios'

export default {
  data () {
    return {
      name: localStorage.getItem('name') || ''
    }
  },
  components: {
    AskQuestion
  },
  methods: {
    countVotes (arr) {
      let result = 0
      arr.forEach(element => result += element.value)
      return result
    },
    deleteAnswer (id) {
      if (confirm('Are you sure want to delete this question?')) {
        console.log(id)
        Axios({
          url: `http://overflow-server.pemmz-palzu.site/questions/${id}`,
          method: 'delete',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    ...mapState([
      'listOfQuestion'
    ])
  }
}
</script>
