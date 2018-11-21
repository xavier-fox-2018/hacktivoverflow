<template>
<section id="authors" class="my-5 text-center">
    <div class="container">
      <div class="row">
        <div class="col">
            <div class="info-header mb-5 mt-5 pr-0 mx-auto">
                <h1 class="text-primary pb-3">Top Questions</h1>
            </div>  
             <router-link :to="'/questions/post'">
                <button class="btn btn-primary ml-5">Ask a Question</button>
            </router-link>           
        </div>
       
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 mt-3" v-for="question in questions" :key="question._id" v-if="questions.length > 0" style="">
          <div class="card">
                <div class="card-header">
                    <router-link :to="'/questions/'+question._id">
                        {{ question.title }}
                    </router-link>
                  
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                    <p v-html="question.description"></p>
                    <footer class="blockquote-footer">{{ question.user.name }}</footer>
                    </blockquote>
                </div>
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

export default {
    computed: {
        questions(){
            return this.$store.state.questions
        }
    },
    methods: {
        getQuestion(){
            axios({
            method: 'GET',
            url: config+'/questions'
            })
            .then(({data}) => {
               console.log(data.data)
               this.$store.state.questions = data.data                
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    },
    created(){
       this.getQuestion()
    }
}
</script>

