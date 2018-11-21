<template>
  <div class="container">
    <h1>Edit Question</h1>
    <h2>Title</h2>
    <b-form-input type="text" v-model="question.title"></b-form-input>
    <h2>Content</h2>
    <wysiwyg class="mt-2" v-model="question.content"/>
    <b-button variant="success mt-2" @click="update">Update</b-button>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      question: {}
    }
  },
  methods: {
    update () {
      Axios({
        url: `http://overflow-server.pemmz-palzu.site/questions/${this.$route.params.id}`,
        method: 'put',
        data: {
          title: this.question.title,
          content: this.question.content
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
      url: `http://overflow-server.pemmz-palzu.site/questions/${this.$route.params.id}`,
      method: 'get'
    })
      .then(response => {
        this.question = response.data
        console.log(this.question)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
