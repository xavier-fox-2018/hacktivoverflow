<template>
    <v-container grid-list-md fluid class="grey lighten-4">
        <v-layout row wrap v-if="question">
            <v-flex xs12>
                <v-card>
                    <v-card-text>
                        <h5 class="headline text-xs-center">{{question.title}}</h5>
                    <v-divider class="my-2"></v-divider>
                    <h6 class="subheading">{{question.description}}</h6>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap align-end justify-end fill-height>
                            <v-btn @click="togglePostAnswer" class="ma-2" round outline color="blue">post answer</v-btn>
                            <v-spacer></v-spacer>
                            <div v-if="question.author._id !== userId" class="ma-2">
                                <v-btn @click="upvoteQuestion" outline round color="blue">
                                    <v-icon>
                                        thumb_up
                                    </v-icon>
                                    &nbsp;{{question.upvotes.length}}
                                </v-btn>
                                <v-btn @click="downvoteQuestion" outline round color="blue">
                                    <v-icon>
                                        thumb_down
                                    </v-icon>
                                    &nbsp;{{question.downvotes.length}}
                                </v-btn>
                            </div>
                            <div v-if="question.author._id === userId" class="ma-2">
                                <v-btn disabled outline round color="blue">
                                    <v-icon>
                                        thumb_up
                                    </v-icon>
                                    &nbsp;{{question.upvotes.length}}
                                </v-btn>
                                <v-btn disabled outline round color="blue">
                                    <v-icon>
                                        thumb_down
                                    </v-icon>
                                    &nbsp;{{question.downvotes.length}}
                                </v-btn>
                            </div>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <br>
        <v-layout v-if="postAnswer" row wrap>
            <post-answer-card :getQuestion="getQuestion"></post-answer-card>
        </v-layout>
        <br>
        <!-- <v-divider></v-divider> -->
        <!-- <br> -->
        <v-layout row wrap>
            <answer-card :getQuestion="getQuestion" :answer="answer" v-for="answer in question.answers" :key="answer._id"></answer-card>
        </v-layout>
    </v-container>
</template>

<script>
import config from '@/config.js'
import AnswerCard from '@/components/AnswerCard.vue'
import PostAnswerCard from '@/components/PostAnswerCard.vue'


export default {
    name : 'Question',
    computed : {
        userId () {
            return this.$store.state.userId
        }
    },
    components : {
        AnswerCard,
        PostAnswerCard
    },
    data (){
        return {
            question : '',
            postAnswer : false
        }
    },
    methods : {
        getQuestion (){
            axios({
                method : 'GET',
                url : `${config.port}/questions/${this.$route.params.questionId}`
            })
            .then(response=>{
                this.question = response.data.data
            })
            .catch(error=>{
                console.log(error)
            })
        },
        upvoteQuestion(){
            axios({
                method : 'POST',
                url : `${config.port}/actions/upvotequestion/${this.$route.params.questionId}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.getQuestion()
            })
            .catch(error=>{
                console.log(error)
            })
        },
        downvoteQuestion(){
            axios({
                method : 'POST',
                url : `${config.port}/actions/downvotequestion/${this.$route.params.questionId}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.getQuestion()
            })
            .catch(error=>{
                console.log(error)
            })
        },
        togglePostAnswer(){
            if(this.postAnswer){
                this.postAnswer = false
            }else if(!this.postAnswer){
                this.postAnswer = true
            }
        }
    },
    mounted(){
        this.getQuestion()
    }
}
</script>

