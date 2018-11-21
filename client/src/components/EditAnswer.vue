<template>
  <div class="container">
    <h1>Edit Answer</h1>
    <wysiwyg class="mt-2" v-model="answer.content"/>
    <b-button variant="success" class="mt-2" @click="update">Update</b-button>
  </div>
</template>
  
 <script>
import Axios from 'axios'

export default {
  data () {
    return {
      answer: { content: '' }
    }
  },
  methods: {
    update () {
      Axios({
        url: `http://localhost:3000/answers/${this.$route.params.id}`,
        method: 'put',
        data: {
          content: this.answer.content
        },
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
  },
  created () {
    Axios({
      url: `http://localhost:3000/answers/${this.$route.params.id}`,
      method: 'get',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.answer = response.data
        console.log(this.answer)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
