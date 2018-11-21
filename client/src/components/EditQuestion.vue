<template>
  <div style="margin:10px">
      <form class="ui form container">
        <h2>Update A Question</h2>
        <div class="two fields">
          <div class="field">
            <label>Title</label>
            <input type="text" name="shipping[first-name]" placeholder="Title" v-model="ask.title">
          </div>
          <div class="field" style="visibility:hidden">
            <input type="text" name="shipping[last-name]" placeholder="Last Name">
          </div>
        </div>
        <div class="field">
          <label>What's your Question?</label>
          <wysiwyg v-model="ask.content"/>
        </div>
        <div class="field">
          <div class="ui slider checkbox">
            <input type="checkbox" name="newsletter" v-model="anom">
            <label>Ask Anonymously</label>
          </div>
        </div>
        <button class="ui blue button" type="submit" @click="updateQuestion">Update</button>
      </form>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import wysiwyg from "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
export default {
  name:"editquestion",
  data(){
    return {
      ask: {},
      email: localStorage.getItem('email'),
      anom: false
    }
  },
  created(){
    console.log(this.$route.params.id)
    axios.get(`${this.link}/questions/${this.$route.params.id}`,{
      headers:{
        token: localStorage.getItem('token')
      }
    })
    .then(({ data })=>{
      this.ask = data
      // console.log('ini data baru', data)
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
    updateQuestion(e){
      e.preventDefault();
      console.log('ini v-model',this.anom)
      this.ask.anom = String(this.anom)
      axios.put(`${this.link}/questions/${this.$route.params.id}`,this.ask, {
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        this.$router.push('/main')
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
