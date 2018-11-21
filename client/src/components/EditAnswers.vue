<template>
  <div style="margin:10px">
      <form class="ui form container">
        <h2>Update Answer</h2>
        <div class="field">
          <label>What's your Answer?</label>
          <wysiwyg v-model="answer.content"/>
        </div>
        <button class="ui blue button" type="submit" @click="updateAnswer">Update</button>
      </form>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import wysiwyg from "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
export default {
  name:"editanswer",
  data(){
    return {
      answer: {},
      email: localStorage.getItem('email')
    }
  },
  created(){
    console.log(this.$route.params.id)
    axios.get(`${this.link}/answers/one/${this.$route.params.id}`,{
      headers:{
        token: localStorage.getItem('token')
      }
    })
    .then(({ data })=>{
      this.answer = data
      console.log('ini data baru', data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  mounted(){
    this.$store.dispatch('getQuestions',localStorage.getItem('token'))
  },
  computed:{
    ...mapState({
      link: state => state.link,
      questions: state => state.questions
    })
  },
  methods:{
    updateAnswer(e){
      e.preventDefault();
      axios.put(`${this.link}/answers/${this.$route.params.id}`,this.answer, {
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        this.$router.push(`/main/${this.answer.question_id}`)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
