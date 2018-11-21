<template>
  <div id="answerForm" class="mt-5">
    <h1>Post Your Answer</h1>
    <wysiwyg v-model="content"/>
    <b-button type="submit" @click="postAnswer" class="mt-2" variant="success">Post Answer</b-button>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    postAnswer () {
      Axios({
        url: `http://overflow-server.pemmz-palzu.site/answers/${this.$route.params.id}`,
        method: 'post',
        data: {
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          this.content = ''
          this.$emit('post-answer')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
