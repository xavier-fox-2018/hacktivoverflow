<template>
    <div>
        <div class="card">
            <h5 class="card-header"> {{ question.title }} </h5> 
            <div class="card-body">
                <p class="card-text"> by: {{ question.userID }} </p>
                <p class="card-text"> {{ question.detail }} </p>
                <button class="btn btn-primary mr-2" @click="upvote"> Upvote </button> 
                {{ question.upvote.length }}
                <button class="btn btn-primary" @click="downvote"> Downvote </button>
                {{ question.downvote.length }}

                <button class="btn btn-danger mr-2" v-on:click="deleteQuestion" v-if="question.userID === userID" > Delete </button>
                <button class="btn btn-warning" v-if="question.userID === userID" @click="$emit('show-modal-edit-question', question._id)"> Edit </button>
                <button class="btn btn-info ml-3" v-if="isLoggedIn" @click="$emit('show-modal-add-answer', question._id)"> Add Answer </button>

            </div>
            
            <div class="container">
                <h3>Answers: </h3>
                <div class="card" v-for="answer in answers" :key="answer._id">
                    <div class="card-body">
                        {{ answer.detail }}
                        <button class="btn btn-link" @click="showModalEditAnswer(answer._id)"> Edit Answer </button>
                    </div>
                </div>
            </div>




            <div class="modal fade" id="editAnswer" tabindex="-1" role="dialog"> 
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" >Edit Answer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <form>
                                <div class="form-group">
                                    <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="inputEditAnswer.detail"></textarea>
                                </div>
                                <button type="submit" class="btn btn-dark" data-dismiss="modal" @click.prevent="editAnswer()">Edit Answer</button>
                                {{ currentAnswerID }}
                            </form>

                        </div>
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
            answers: [],
            currentAnswerID: "",
            inputEditAnswer: {
                detail: ""
            },
            updatedAnswer: {}
        }
    },
    methods: {
        showModalEditAnswer(answerID) {
            this.currentAnswerID = answerID;
            $('#editAnswer').modal('show');
        },

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
                console.log(response.data.deletedQuestion);
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

        upvote: function() {
            axios({
                method: 'PATCH',
                url: `http://localhost:3000/question/upvote/${this.question._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                console.log(response.data.msg);
                this.$store.dispatch('getAllQuestions') // pake dispatch emangnya?
            })
            .catch( err => {
                console.log(err);
            })
        },

        downvote: function() {
            axios({
                method: 'PATCH',
                url: `http://localhost:3000/question/downvote/${this.question._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                console.log(response.data.msg);
                this.$store.dispatch('getAllQuestions') // pake dispatch emangnya?
            })
            .catch( err => {
                console.log(err);
            })
        },

        editAnswer: function() {
            // console.log(this.currentAnswerID, this.inputEditAnswer);
            axios({
                method: 'PUT',
                url: `http://localhost:3000/answer/${this.currentAnswerID}`,
                data: {
                    detail: this.inputEditAnswer.detail
                },
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                console.log(response.data.newAnswer);
                // this.updatedAnswer = response.data.newAnswer
                // this.$store.dispatch('getAllQuestions')

            })
            .catch( err => {
                console.log(err);
            })
        }
    },

    mounted() {
        this.getAnswers()
    }

}
</script>
