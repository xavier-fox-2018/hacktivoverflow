<template>
<section id="authors" class="my-5">
    <div class="container">
      <div class="row">
        <div class="col">
            <div class="info-header mb-5 mt-5 pr-0 mx-auto">
                <h1 class="text-primary pb-3 text-center">{{ question.title }}</h1>
            </div>        
        </div>
       
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 mt-3">
          <div class="card">               
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                    <p v-html="question.description"></p>
                    <footer class="blockquote">
                         <p class="btn btn-sm btn-success" @click="vote">Vote &nbsp; <span>{{ question.upVote.length}}</span></p> 
                         <p class="btn btn-sm btn-warning ml-3" @click="downVote">Down Vote &nbsp; <span>{{ question.downVote.length}}</span></p>
                    </footer>
                    </blockquote>
                </div>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
             <h4 class="mt-4">Solutions</h4>   
           <Solution v-for="comment in comments" :key="comment._id" :comment="comment" @voteup="voteup($event)" @votedown="votedown($event)"></Solution>
          <div class="mt-3">
               <h4 class="text-center">Give your solutions</h4>          
                    <form @submit.prevent="commentFunc">
                        <div class="form-group">
                            <VueEditor type="text"  class="form-control" v-model="comment"></VueEditor>
                        </div>                       
                        <button class="btn btn-primary">Post Solution</button>
                    </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import config from '@/config.js'
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import Solution from '@/components/Solution'
import { VueEditor } from 'vue2-editor'

export default {
    components: {
        Solution,
        VueEditor
    },
   data(){
       return {
           question: {},
           comment: '',
           comments: []
       }
   },
   methods: {
       votedown(id){
         axios({
               method: 'PATCH',
               url: config+'/downvoteanswer/'+id,
               headers: {
                   token: localStorage.getItem('token')
               }
           })
           .then(({data}) => {
               this.getQuestionDetail()
                this.getAllComments()
           })
           .catch(err => {
               console.log(err.response)
           })
       },
       voteup(id){
           axios({
               method: 'PATCH',
               url: config+'/voteanswer/'+id,
               headers: {
                   token: localStorage.getItem('token')
               }
           })
           .then(({data}) => {
               this.getQuestionDetail()
                this.getAllComments()
           })
           .catch(err => {
               console.log(err.response)
           })
       },
       vote(){
           axios({
               method: 'PATCH',
               url: config+'/votequestion/'+this.$route.params.id,
               headers: {
                   token: localStorage.getItem('token')
               }
           })
           .then(({data}) => {
               this.getQuestionDetail()
           })
           .catch(err => {
               console.log(err.response)
           })
       },
       downVote(){
            axios({
               method: 'PATCH',
               url: config+'/downvotequestion/'+this.$route.params.id,
               headers: {
                   token: localStorage.getItem('token')
               }
           })
           .then(({data}) => {
               this.getQuestionDetail()
           })
           .catch(err => {
               console.log(err.response)
           })
       },
       getQuestionDetail(){
           axios({
               method: 'GET',
               url: config+'/questions/'+this.$route.params.id
           })
           .then(({data}) => {
               console.log(data.data)
               this.question = data.data
           })
           .catch(err => {
               console.log(err.response)
           })
       },
       commentFunc(){
          if (this.comment.length > 0){
               axios({
                    method: 'POST',
                    url: config+'/comments/'+this.$route.params.id,
                    data: {
                        comment: this.comment
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
                    console.log(data.message)
                    this.comment = ''
                     this.getAllComments()
                })
                .catch(err => {
                    console.log(err)
                })
          } else {
              console.log('comment empty')
          }
       },
       getAllComments(){
           axios({
               method: 'GET',
               url: config+'/comments/'+this.$route.params.id,
               headers: {
                   token: localStorage.getItem('token')
               }
           })
           .then(({data} ) => {
               console.log(data.data)
               this.comments = data.data
           })
           .catch(err => {
               console.log(err.response)
           })
       }
   },
   created(){
       this.getQuestionDetail()
       this.getAllComments()
   }
}
</script>

