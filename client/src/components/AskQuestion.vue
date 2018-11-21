<template>
  <form class="ui form container">
      <h2>Ask A Question</h2>
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
          <input type="checkbox" name="newsletter" v-model="ask.anom">
          <label>Ask Anonymously</label>
        </div>
      </div>
      <button class="ui blue button" type="submit" @click="askQuestion">Ask</button>
    </form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import wysiwyg from "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
export default {
  name:'ask_questions',
  data(){
    return {
      ask:{}
    }
  },
  computed:{
    ...mapState({
      link: state => state.link,
    })
  },
  methods:{
    askQuestion(e){
      e.preventDefault()
      if (this.ask.anom !== true) {
        this.ask.anom = false
      }
      console.log(this.ask)
      axios.post(`${this.link}/questions`,this.ask,{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) =>{
        this.ask = {}
        this.$store.dispatch('addQuestions',data)
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
