<template>
  <div class="dashboard">
    <div v-if="isLogin">
      <div class="container">
        <h1>Ask, <small class="text-muted">and you might receive.</small></h1>
        
        <form v-on:submit.prevent="onSubmit">
          <div class="row">

            <div class="col-12">
              <div class="form-group">
                <input v-model="title" type="text" class="form-control" placeholder="Title">
              </div>
            </div>

            <div class="col-12">
              <VuEditor @VuEditorContent="VuEditorContent" id="VuEditor"/>
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-outline-warning btn-block" @click.prevent="SubmitAsk">Ask</button>
            </div>
          </div>
          

        </form>
      </div>
    </div>

    <!-- Handling if user is not logged in -->
    <div v-if="!isLogin">
      <h1>You're not authorized to view this page. Redirecting you back.</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from 'vuex'
import VuEditor from '@/components/VuEditor.vue'
import axios from 'axios'

export default {
  name: 'Ask',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  components: {
    VuEditor
  },
  methods: {
    VuEditorContent(val) {
      this.content = val
    },
    SubmitAsk() {
      console.log(this.title)
      console.log(this.content)

      // SEND THROUGH AXIOS
      if (!localStorage.getItem('token')) {}
      else {
        axios({
          method: 'post',
          url: this.axios_url + '/question',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: this.title,
            content: this.content
          }
        })
          .then(result => {
            if (result.data.message === "New question created") {
              this.$notify({
                title: 'New question successfully created',
                text: 'Please wait, we are redirecting you!',
                duration: 1500,
                type: 'success'
              });

              setTimeout(() => { 
                // User redirect
                this.$router.push('/dashboard')
              }, 2000);

            } else {
              this.$notify({
                title: '?????????????',
                text: '?!',
                duration: 1500,
                type: 'warn'
              });
            }
          })
          .catch()
      }
    }
  },
  mounted() {
  },
  computed: {
    ...mapState([
      'isLogin',
      'axios_url'
    ])
  },
  watch: {
    title(n, o) {
      n ? console.log(n) : null
    }
  }
}
</script>

<style>
#VuEditor {
  margin-bottom: 3em;
  margin-top: 3em;
}
</style>
