<template>
<section id="authors" class="my-5">
    <div class="container">
      <div class="row">
        <div class="col">
            <div class="info-header mb-5 mt-5 pr-0 mx-auto">
                <h1 class="text-primary pb-3 text-center">My Questions</h1>
            </div>  
             <router-link :to="'/questions/post'">
                <button class="btn btn-primary ml-5">Ask a Question</button>
            </router-link>           
        </div>
       
      </div>
      <div class="row">
        <div class="col-5">
            <div class="col-lg-12 col-md-12 mt-3" v-for="question in myQuestions" :key="question._id" style="">
                <div class="card">
                    <div class="card-header">
                        <router-link :to="'/myquestions/'+question._id">
                            {{ question.title }}
                        </router-link>                    
                    </div>
                    <div class="card-body">
                             <router-link :to="'/myquestions/'+question._id">
                                 <button class="btn btn-success btn-sm ml-3">More</button> 
                             </router-link>                                
                            <button class="btn btn-primary btn-sm ml-3" data-toggle="modal" data-target="#editModal" @click="update(question._id)">Update</button>    
                            <button class="btn btn-danger btn-sm ml-3" @click="deletes(question._id)">delete</button> 
                    </div>
                </div>
            </div>
        </div>
        <ModalEdit :data="toedit" @onupdate="onupdate"></ModalEdit>
        <div class="col-7">
            <router-view :updatedetail="updatedetail"></router-view>
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
import ModalEdit from '@/components/ModalEdit'

export default {
    props: ['checkToken'],
    data(){
        return{
            toedit: '',
            updatedetail: false
        }
    },
    components: {
        ModalEdit
    },
    computed: {
        myQuestions(){
            return this.$store.state.myQuestions
        }
    },
    methods: {
        deletes(id){
            axios({
                method: 'DELETE',
                url: config+'/questions/'+id,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.getQuestion()
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        update(id){
            axios({
                method: 'GET',
                 url: config+'/questions/'+id,
                 headers:{
                     token: localStorage.getItem('token')
                 }
            })
            .then(({data}) => {
                this.toedit = data.data
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        getQuestion(){
            axios({
            method: 'GET',
            url: config+'/myquestions',
            headers: {
                token: localStorage.getItem('token')
            }
            })
            .then(({data}) => {
            //    console.log(data.data)
               this.$store.state.myQuestions = data.data                
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        onupdate(){
            this.getQuestion()
            this.updatedetail = true
        }
    },
    created(){
       this.getQuestion()
       this.checkToken()
    }
}
</script>

