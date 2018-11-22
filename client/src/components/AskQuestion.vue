<template>
  <div id="ask">
    <h1>Ask a Question</h1>
    <b-form-input type="text" v-model="title" placeholder="Enter title..."></b-form-input>
    <wysiwyg class="mt-2" v-model="content"/>
    <b-button variant="success" class="mt-2" @click="ask">Ask</b-button>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    ...mapActions ([
      'getQuestionList'
    ]),
    ask () {
      if (localStorage.getItem('token')) {
        Axios({
          url: 'http://overflow-server.pemmz-palzu.site/questions',
          method: 'post',
          data: {
            content: this.content,
            title: this.title
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            this.content = ''
            this.title = ''
            this.$store.dispatch('getQuestionList')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push('/signin')
      }
    }
  }
}
</script>
