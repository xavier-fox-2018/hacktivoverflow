<template>
  <div class="dashboard">
    <div v-if="isLogin">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div class="list-group">
              <DashboardQuestion 
                v-for="(question, index) in questions" 
                :key="index"
                :question="question"
              />
            </div>
          </div>
        </div>
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
import DashboardQuestion from '@/components/DashboardQuestion.vue'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    DashboardQuestion
  },
  methods: {
    ...mapMutations([
      'LOGIN_CHANGE',
      'POPULATE_QUESTIONS'
    ]),
    loginChange(val) {
      this.LOGIN_CHANGE(val)
    },
    populateQuestions(val) {
      console.log(`udah masuk ke populateQuestions`)
      this.POPULATE_QUESTIONS(val)
    }
  },
  mounted() {
    if (!this.isLogin) {
      setTimeout(() => { 
        // User redirect
        this.$router.push('/')
      }, 2000);
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'axios_url',
      'questions'
    ])
  },
  created() {
    // GET ALL QUESTIONS
    axios({
      method: 'get',
      url: this.axios_url + '/question'
    })
      .then(result => {
        this.populateQuestions(result.data.data)
      })
      .catch()
  }
}
</script>
