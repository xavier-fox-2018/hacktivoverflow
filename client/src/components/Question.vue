<template>
    <div>
        <div class="card">
            <h5 class="card-header"> {{ question.title }} </h5> 
            <div class="card-body">
                <p class="card-text"> by: {{ question.userID }} </p>
                <p class="card-text"> {{ question.detail }} </p>
                <button class="btn btn-primary mr-2"> Upvote </button> 
                {{ question.upvote.length }}
                <button class="btn btn-primary"> Downvote </button>
                {{ question.downvote.length }}

                <button class="btn btn-danger mr-2" v-on:click="deleteQuestion" v-if="question.userID === userID" > Delete </button>
                <button class="btn btn-warning" v-if="question.userID === userID"> Edit </button>
                <button class="btn btn-info ml-3" v-if="isLoggedIn" @click="$emit('show-modal', question._id)"> Add Answer </button>

            </div>
            
            <div class="container">
                <h3>Answers: </h3>
                <div class="card" v-for="answer in answers" :key="answer._id">
                    <div class="card-body">
                        {{ answer.detail }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    props: ['question'], 
    computed: {
        ...mapState(['userID', 'isLoggedIn'])
    },
    data() {
        return {
            err: "", 
            message: "",
            answers: []
        }
    },
    methods: {
        deleteQuestion: function() {
            console.log(this.question._id);
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/question/${this.question._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                console.log(response);
                this.$store.dispatch('getAllQuestions') // mstinya splice aja, ato push klo add question
            })
            .catch( err => {
                console.log(err);
                this.err = err
            })
        },

        getAnswers: function() { // belum reactive
            axios({
                method: 'GET',
                url: `http://localhost:3000/answer/${this.question._id}`
            })
            .then( response => {
                console.log(response.data)
                this.answers = response.data
            })
            .catch( err => {
                console.log(err)
            })
        },
    },

    mounted() {
        this.getAnswers()
    }
}
</script>
