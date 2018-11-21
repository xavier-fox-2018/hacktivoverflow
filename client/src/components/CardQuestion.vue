<template>
    <div id="allcards" style="margin:10px">
      <div id="eachcard" class="ui segment container" v-for="(question,index) in questions" :key="index">
        <!-- <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div> -->
        <h2>{{question.title}}</h2>
        <router-link :to="'/main/'+ question._id" class="item">
            <h1 id="questionunique">{{question.content}}</h1>
        </router-link>

        <div class="ui divider"></div>
        <div v-if="question.anom == 'false'">
          <img :src="question.user_id.image" style="border-radius: 50%;margin-right:21px;width:35px;height:35px;">
          <h4>From: {{question.user_id.name}}</h4>
        </div>
        <div v-else>
          <h4>From: Anonymous</h4>
        </div>
        <h4>{{getLocalDate(question.createdAt)}}</h4>
        <div class="ui vertical animated button" tabindex="0" v-if="question.user_id.email !== email" @click="downvoteFunc(question._id)">
          <div class="hidden content">Unvote</div>
          <div class="visible content label">
            <i class="thumbs down icon"></i>{{question.downvotes.length}}
          </div>
        </div>
        <div class="ui vertical animated button" tabindex="0" v-show="question.user_id.email !== email" @click="upvoteFunc(question._id)">
          <div class="hidden content">Upvote</div>
          <div class="visible content label">
            <i class="thumbs up icon"></i>{{question.upvotes.length}}
          </div>
        </div>

        <div class="ui vertical animated button" tabindex="0" style="visibility:hidden">
          <div class="hidden content">Upvote</div>
          <div class="visible content ui label">
            <i class="thumbs up icon"></i>
            <div class="detail">214</div>
          </div>
        </div>


        <router-link :to="{ path:'main/editquestion/' + question._id }" class="ui vertical animated button" tabindex="0" style="float:right;display:inline-block;cursor:pointer" v-if="question.user_id.email == email">
          <div class="hidden content">Edit</div>
          <div class="visible content">
            <i class="edit outline icon"></i>
          </div>
        </router-link>

        

        <div class="ui vertical animated button" tabindex="0" style="float:right;display:inline-block;cursor:pointer" v-if="question.user_id.email == email" v-on:click="deleteQuestion(question._id)">
          <div class="hidden content">Delete</div>
          <div class="visible content">
            <i class="trash alternate outline icon"></i>
          </div>
      </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name:"card_question",
  data(){
    return {
      email: localStorage.getItem('email')
    }
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
    deleteQuestion(value){
      axios.delete(`${this.link}/questions/${value}`,{
        headers: {
          token : localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        this.$store.dispatch('getQuestions',localStorage.getItem('token'))
      })
      .catch((err)=>{
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style>

</style>
