<template>
  <div>
    <div class="ui segment container">
        <!-- <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div> -->
        <h2>{{question.title}}</h2>
        <h1>{{question.content}}</h1>
        <div class="ui divider"></div>
        <div v-if="question.anom == 'false'">
          <img :src="question.user_id.image" style="border-radius: 50%;margin-right:21px;width:35px;height:35px;">
          <h4>From: {{question.user_id.name}}</h4>
        </div>
        <div v-else>
          <h4>From: Anonymous</h4>
        </div>
        <h4>{{getLocalDate(question.createdAt)}}</h4>
        

        <div class="ui vertical animated button" tabindex="0" style="visibility:hidden">
          <div class="hidden content">Upvote</div>
          <div class="visible content ui label">
            <i class="thumbs up icon"></i>
            <div class="detail">214</div>
          </div>
        </div>

        <button class="ui icon button" style="float:right;display:inline-block;cursor:pointer" @click="isPressedFunction">
          <i class="comments outline icon"></i>
        </button>
        <CreateAnswer :question_id="question._id" @trigerredPress="onChildClick" v-show="isPressed == true"></CreateAnswer>
      </div>
      <div v-if="answers.length !== 0">
        <div class="ui container">
          <h1>Answers:</h1>
        </div>
        <Answers :allanswers="answers" :question_idParent="question._id" @newdata="newDataFunc" @newAnswers="newDataFunc"></Answers>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Answers from '@/components/Answers.vue'
import CreateAnswer from '@/components/CreateAnswer.vue'
import axios from 'axios'
export default {
  name:"detail",
  data(){
    return {
       isPressed : false,
       question: {},
       answers : [],
       emailToken: localStorage.getItem('email'),
       email : ''
       
    }
  },
  created (){
    let self = this
    console.log(this.$route.params.id)
    axios.get(`${this.link}/questions/${this.$route.params.id}`,{
      headers:{
        token: localStorage.getItem("token")
      }
    })
    .then(({ data })=>{
      this.question = data
      this.email = data.user_id.email
      axios.get(`${this.link}/answers/${this.$route.params.id}`,{
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((response)=>{
          self.answers = response.data
        })
    })
    .catch((err) => {
        this.$router.replace('/')
    })
  },
  methods: {
    upvoteFunc(value){
      console.log('ini question id untuk upvote:', value)
      axios.post(`${this.link}/questions/upvote`, {
        id: String(value)
      },{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        axios.get(`${this.link}/questions`,{
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(({ data })=>{
          this.$store.dispatch('getQuestions',localStorage.getItem('token'))
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    downvoteFunc(value){
      console.log('ini question id untuk downvote:', value)
      axios.post(`${this.link}/questions/downvote`, {
        id: String(value)
      },{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        axios.get(`${this.link}/questions`,{
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(({ data })=>{
          this.$store.dispatch('getQuestions',localStorage.getItem('token'))
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    newDataFunc(value){
      this.answers = value
    },
    getLocalDate(value){
      var now= new Date(value), 
      ampm= 'AM', 
      h= now.getHours(), 
      m= now.getMinutes(), 
      s= now.getSeconds();
      if(h>= 12){
          if(h>12) h -= 12;
          ampm= 'PM';
      }

      if(m<10) m= '0'+m;
      if(s<10) s= '0'+s;
      return now.toLocaleDateString()+ ' ' + h + ':' + m + ' ' + ampm;
    },
    isPressedFunction(){
        if(!this.isPressed){
          this.isPressed = true
        }else {
          this.isPressed = false
        }
    },
    onChildClick(value){
      this.answers = value
      this.isPressed = false
    }
  },
  components:{
    Answers,
    CreateAnswer
  },
  computed:{
    ...mapState({
      link: state => state.link,
      questions: state => state.questions
    })
  }
}
</script>

<style>

</style>
