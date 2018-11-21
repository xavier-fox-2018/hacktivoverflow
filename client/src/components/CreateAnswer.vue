<template>
  <div class="ui form">
      <div class="field">
        <label>Answers</label>
        <wysiwyg v-model="answer"/>
      </div>
      <button class="ui icon button"  v-on:click="addAnswer">
        <i class="paper plane outline icon"></i>
      </button>
  </div>
</template>

<script>
import wysiwyg from "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name : "Addcomment",
  data(){
    return {
      answer: ''
    }
  },
  props:['question_id'],
  computed:{
    ...mapState({
      link: state => state.link
    })
  },
  methods: {
    addAnswer(){
      console.log(this.link)
      let obj ={
        content: this.answer,
        question_id: this.question_id
      }
      axios.post(`${this.link}/answers`,obj,{
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data })=>{
          console.log('ini yg diinput', data)
          axios.get(`${this.link}/answers/${this.question_id}`,{
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then((response)=>{
            this.answer = ''
            this.$emit('trigerredPress',response.data)
          })
        })
        .catch(()=>{
          this.$router.replace('/')
        })
    }
  }
}
</script>
