<template>
    <v-flex xs3>
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto">
                <v-card-title class="text-xs-center">
                    <h6 class="title text-truncate">
                        {{question.title}}
                    </h6>
                </v-card-title>
                <v-card-actions>
                    <v-layout row wrap align-center justify-center>
                        <v-btn :to="{name : 'questionDetail' , params : {questionId : question._id}}" fab dark outline color="primary" class="ma-1">
                            read
                        </v-btn>
                        <v-btn @click="showEditQuestionModal" fab dark outline color="green" class="ma-1">
                            <v-icon dark>edit</v-icon>
                        </v-btn>
                        <v-btn @click="deleteQuestion" fab dark outline color="red" class="ma-1">
                            <v-icon dark>delete</v-icon>
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-hover>
    </v-flex>
</template>

<script>
import config from '@/config.js'

export default {
    props : ['question','getMyQuestions'],
    methods : {
        deleteQuestion(){
            axios({
                method : 'DELETE',
                url : `${config.port}/questions/${this.question._id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.getMyQuestions()
            })
            .catch(error=>{
                console.log(error)
            })
        },
        showEditQuestionModal(){
            this.$emit('show-edit-question-modal',this.question)
        }
    }
}
</script>
