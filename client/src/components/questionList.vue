<template>
    <div>
        <navbar/>
    <v-container>
        <h1>Questions</h1>
        <v-layout row >
            <v-flex >
        <div v-for="element in allQuestions" :key="element._id">
      <v-card style="border-radius:20px; padding-bottom:10px; margin-bottom: 10px">
        <v-list >
            <v-subheader>
                {{element.createdAt }}
                <v-spacer/>
                    {{element.title}}
                <v-spacer/>
                
            </v-subheader>
            <v-divider :inset="true"></v-divider>
            <v-layout row>
                <v-flex md3>
            <v-list-tile avatar >
              <v-list-tile-avatar>
                <img :src="element.userId.picture">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title >{{element.userId.name}}</v-list-tile-title>
                <v-list-tile-sub-title>
                    
                     </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <div class="d-flex">
               
                    <v-spacer/>
                    <i style="cursor:pointer" @click="upvote(element)"  class=" fa fa-arrow-up" aria-hidden="true"></i>
                    <p>{{element.upvote.length - element.downvote.length}}</p>
                    <i @click="downvote(element)" style="cursor:pointer" class=" fa fa-arrow-down" aria-hidden="true"></i>
            </div>
                </v-flex>
                <v-flex md9>
                    {{element.body}}
                </v-flex>
            </v-layout>
            <v-layout row class="d-flex">
                <detail-modal :questionDetail="element" />
            </v-layout>
            
        </v-list>
      </v-card>
        </div>
     
    </v-flex>
        </v-layout>
         <v-snackbar style="text-align:center" color="#F44336" :top=true :timeout=2000 v-model="show">
         <p>{{msg}}</p>
       </v-snackbar>

    </v-container>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import navbar from './navbar.vue'
import detailModal from './modalDetail.vue'
export default {
    name:'questionList',
    components: {
        navbar,
        detailModal,
    },
    data (){
        return {
            upVoted: 'color:red',
            show: false,
            msg: ''
        }
    },
    methods: {
        upvote(e){
            if(e.userId.email === localStorage.getItem('user')){
                this.msg ='you can not vote yourself'
                this.show = true
            } else {
                let data = {
                    token : localStorage.getItem('token'),
                    questionId: e._id
                }
                
                this.$store.dispatch('upvoteQuestion', data)
            }
        },
        downvote(e){
             if(e.userId.email === localStorage.getItem('user')){
                this.msg ='you can not vote yourself'
                this.show = true
            } else {
                let data = {
                    token : localStorage.getItem('token'),
                    questionId: e._id
                }
                this.$store.dispatch('downvoteQuestion', data)
            }
        }
    },
    mounted(){
      this.$store.dispatch('getAllAnswer')

    },
    computed: {
        ...mapState([
            'allQuestions',
            'allAnswer',
           
        ]),
    }
}
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);


</style>
