<template>
  <div style="margin:10px">
      <div class="ui segment container" v-for="(answer,index) in allanswers" :key="index">
        <!-- <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div> -->
        {{answer.content}}
        <div class="ui divider"></div>
        <img :src="answer.user_id.image" style="border-radius: 50%;margin-right:21px;width:35px;height:35px;">
        <h4>From: {{answer.user_id.name}}</h4>
        <div v-if="answer.user_id.email !== email">
          <div class="ui vertical animated button" tabindex="0" @click="downvoteFunc(answer._id)">
            <div class="hidden content">Unvote</div>
            <div class="visible content">
              <i class="thumbs down icon"></i>{{answer.downvotes.length}}
            </div>
          </div>
          <div class="ui vertical animated button" tabindex="0" @click="upvoteFunc(answer._id)">
            <div class="hidden content">Upvote</div>
            <div class="visible content">
              <i class="thumbs up icon"></i>{{answer.upvotes.length}}
            </div>
          </div>
        </div>
        <div class="ui vertical animated button" tabindex="0" style="visibility:hidden" v-if="answer.user_id.email == email">
            <div class="hidden content">Upvote</div>
            <div class="visible content">
              <i class="thumbs up icon"></i>
            </div>
        </div>

        <router-link :to="{ path:'editanswer/' + answer._id }" class="ui vertical animated button" tabindex="0" style="float:right;display:inline-block;cursor:pointer" v-if="answer.user_id.email == email" v-on:click="isPressed = true">
          <div class="hidden content">Edit</div>
          <div class="visible content">
            <i class="edit outline icon"></i>
          </div>
        </router-link>
        <div class="ui vertical animated button" tabindex="0" style="float:right;display:inline-block;cursor:pointer" v-if="answer.user_id.email == email" v-on:click="deleteAnswer(answer._id)">
          <div class="hidden content">Delete</div>
          <div class="visible content">
            <i class="trash alternate outline icon"></i>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'answers',
  data(){
    return {
      email: localStorage.getItem('email'),
      isPressed: false
    }
  },
  props:['allanswers', 'question_idParent'],
  mounted(){
  },
  computed:{
    ...mapState[{
      link: state => state.link
    }]
  },
  methods:{
    upvoteFunc(value){
      console.log('ini question id untuk upvote:', value)
      axios.post(`http://localhost:3000/answers/upvote`, {
        id: String(value)
      },{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        axios.get(`http://localhost:3000/answers/${this.question_idParent}`,{
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(({ data })=>{
          this.$emit('newAnswers',data)
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    downvoteFunc(value){
      console.log('ini question id untuk downvote:', value)
      axios.post(`http://localhost:3000/answers/downvote`, {
        id: String(value)
      },{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        axios.get(`http://localhost:3000/answers/${this.question_idParent}`,{
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(({ data })=>{
          this.$emit('newAnswers',data)
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    deleteAnswer(value){
      axios.delete(`http://localhost:3000/answers/${value}`,{
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        axios.get(`http://localhost:3000/answers/${this.question_idParent}`,{
          headers:{
            token: localStorage.getItem('token')
          }
        })
        .then(({ data })=>{
          console.log(value)
          this.$emit('newdata',data)
        })
      })
      .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
