<template>
    <v-flex offset-xs1 xs10>
        <v-card>
            <v-card-title>
                <h6 class="title">
                    {{answer.author.name}}
                </h6>
            </v-card-title>
            <v-card-text>
                {{answer.description}}
            </v-card-text>
            <v-card-actions>
                <v-layout row wrap align-end justify-end fill-height>
                    <v-chip color="blue" outline class="ma-2">
                        <v-avatar>
                            <!-- <v-icon>
                                access_time
                            </v-icon> -->
                            <img
                                :src="answer.author.avatar"
                                alt="Avatar"
                            >
                        </v-avatar>
                        {{ answer.createdAt | moment("from", "now") }}
                    </v-chip>
                    <v-spacer></v-spacer>
                    <div v-if="answer.author._id !== userId" class="ma-2">
                        <v-btn @click="upvoteAnswer" outline round color="blue">
                            <v-icon>
                                thumb_up
                            </v-icon>
                            &nbsp;{{answer.upvotes.length}}
                        </v-btn>
                        <v-btn @click="downvoteAnswer" outline round color="blue">
                            <v-icon>
                                thumb_down
                            </v-icon>
                            &nbsp;{{answer.downvotes.length}}
                        </v-btn>
                    </div>
                    <div v-if="answer.author._id === userId" class="ma-2">
                        <v-btn @click="showEditAnswerModal" outline round color="blue">
                            Edit
                        </v-btn>
                        <v-btn disabled outline round color="blue">
                            <v-icon>
                                thumb_up
                            </v-icon>
                            &nbsp;{{answer.upvotes.length}}
                        </v-btn>
                        <v-btn disabled outline round color="blue">
                            <v-icon>
                                thumb_down
                            </v-icon>
                            &nbsp;{{answer.downvotes.length}}
                        </v-btn>
                    </div>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
import config from '@/config.js'

export default {
    props : ['answer','getQuestion'],
    computed : {
        userId () {
            return this.$store.state.userId
        }
    },
    methods : {
        upvoteAnswer(){
            axios({
                method : 'POST',
                url : `${config.port}/actions/upvoteanswer/${this.answer._id}`,
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
        downvoteAnswer(){
            axios({
                method : 'POST',
                url : `${config.port}/actions/downvoteanswer/${this.answer._id}`,
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
        showEditAnswerModal(){
            this.$emit('show-edit-answer-modal',this.answer)
        }
    }
}
</script>

