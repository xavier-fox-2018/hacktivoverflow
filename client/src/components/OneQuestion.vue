<template>
    <div>
        <div class="d-flex justify-content-start mb-2">
            <button class="btn btn-link" @click="backToAll"><i class="fas fa-undo-alt"></i> Back</button>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <div v-if="isLogin && userEmail === question.poster.email" class="d-flex justify-content-end align-items-center mb-4">
                    <i class="fas fa-edit text-dark mr-3" data-toggle="modal" data-target="#editModal" id="btn-edit-delete"></i>
                    <i class="fas fa-minus-circle text-danger" id="btn-edit-delete" data-toggle="modal" data-target="#confirmModalDelete"></i>
                </div>
                <EditModal :questionId="question._id" :getonequestion="getOneQuestion"></EditModal>

                <div class="modal fade mt-5" id="confirmModalDelete">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="mb-4 mt-3">Are you sure you want to delete this question?</div>
                                <div class="mb-3">
                                    <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary font-weight-bold ml-5" data-dismiss="modal" @click="deleteQuestion(question._id)">Positive</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="d-flex justify-content-start ml-3 mr-3 mb-3 align-items-center">
                    <div class="d-flex flex-column justify-content-start align-items-start">
                        <div class="d-flex justify-content-around align-items-center mb-2">
                            <button class="btn btn-primary mr-3" @click="upvoteQuestion">
                                <i class="fas fa-arrow-circle-up"></i>
                            </button>
                            <div class="mr-2">{{ qUpvoteBadge }}</div>
                        </div>
                        <div class="d-flex justify-content-around align-items-center">
                            <button class="btn btn-danger mr-3" @click="downvoteQuestion">
                                <i class="fas fa-arrow-circle-down"></i>
                            </button>
                            <div class="mr-2">{{ qDownvoteBadge }}</div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-center ml-3">
                        <h4 class="card-title text-left mb-3 pt-2">{{ question.title }}</h4>
                        <p class="card-text text-justify mb-1" v-html="question.description"></p>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="font-weight-bold ml-3" v-if="question.poster">By {{ question.poster.username }}</div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <i class="far fa-lightbulb mr-2 mt-1" id="comment-symbol"></i>
                        <div class="lead font-weight-bold mr-3 mt-2">{{ answerBadge }}</div>
                    </div>
                </div>
                <div class="text-right mr-3" @click="showAnswerForm" style="cursor:pointer">Toggle Answers</div>
            </div>
        </div>
        <div class="card mb-5" v-if="answerForm">
            <div class="h3 text-left ml-4 mt-4 mb-3" id="answer-section-h">Answer Section</div>
            <div class="card-body">
                <textarea type="text" class="form-control mb-3" placeholder="Answer Here" v-model="answerContent"></textarea>
                <div class="d-flex justify-content-end mb-4">
                    <input @click="addAnswer" type="submit" class="btn btn-block btn-primary font-weight-bold" value="Submit">
                </div>
                <div class="d-flex flex-column">

                    <div v-for="answer in answers" class="d-flex justify-content-between align-items-center mb-3 border px-4 py-3">
                        <div class="d-flex justify-content-start ml-2 mr-3 mb-2 align-items-center">
                            <div class="d-flex flex-column justify-content-start align-items-start">
                                <div class="d-flex justify-content-around align-items-center mb-2">
                                    <button class="btn btn-primary mr-3" @click="upvoteAnswer(answer._id)">
                                        <i class="fas fa-arrow-circle-up"></i>
                                    </button>
                                    <div class="mr-2">{{ answer.upvotes.length }}</div>
                                </div>
                                <div class="d-flex justify-content-around align-items-center">
                                    <button class="btn btn-danger mr-3" @click="downvoteAnswer(answer._id)">
                                        <i class="fas fa-arrow-circle-down"></i>
                                    </button>
                                    <div class="mr-2">{{ answer.downvotes.length }}</div>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-start justify-content-center ml-3">
                                <div class="mb-2">{{ answer.content }}</div>
                                <div class="font-weight-bold">{{ answer.user.username }}</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center ml-auto align-items-center">
                            <i class="fas fa-edit text-dark" data-toggle="modal" data-target="#editModalAnswer" v-if="userEmail === answer.user.email" @click="editAnswers(answer._id, answer.content)" id="btn-edit-delete"></i>
                        </div>
                    </div>

                    <!-- Edit Answer Modal -->
                    <div class="modal fade" id="editModalAnswer">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Answer</h5>
                                    <button class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                <form>
                                    <div class="form-group d-flex flex-column">
                                        <label for="description" class="text-left">Content</label>
                                        <textarea class="form-control" id="message" rows="3" v-model="editAnswer.content">{{ editAnswer.content }}</textarea>
                                    </div>
                                </form>
                                </div>
                                <div class="modal-footer ">
                                    <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="updateAnswer">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditModal from '@/components/EditModal.vue';
import config from '@/config.js';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'OneQuestion',
    props: ['id', 'checktoken'],
    components: {
        EditModal
    },
    data() {
        return {
            question: {},
            questionId: '',
            answers: [],
            answerContent: '',
            answerBadge: 0,
            answerForm: true,
            qUpvoteBadge: 0,
            qDownvoteBadge: 0,
            editAnswer: {
                id: '',
                content: ''
            }
        }
    },
    computed: {
        ...mapState([
            'isLogin',
            'userEmail'
        ])
    },
    methods: {
        ...mapActions([
            'checkLogin',
            'getQuestions'
        ]), 
        getOneQuestion: function() {
            axios({
                method: 'GET',
                url: `${config.port}/questions/${this.id}`
            })
                .then((question) => {
                    this.question = question.data;
                    this.qUpvoteBadge = this.question.upvotes.length;
                    this.qDownvoteBadge = this.question.downvotes.length;
                })
                .catch((err) => {
                    console.log('Get One Question Error: ', err);
                });
        },
        getAnswers: function() {
            axios({
                method: 'GET',
                url: `${config.port}/answers/${this.id}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((answers) => {
                    this.answers = answers.data;
                    this.answerBadge = this.answers.length;
                })
                .catch((err) => {
                    console.log('Get Question Answers Error: ', err);
                });
        },
        editAnswers: function(id, content) {
            this.editAnswer.id = id;
            this.editAnswer.content = content;
        },
        updateAnswer: function() {
            axios({
                method: 'PUT',
                url: `${config.port}/answers/${this.id}`,
                data: {
                    content: this.editAnswer.content,
                    id: this.editAnswer.id
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getAnswers();
                })
                .catch((err) => {
                    console.log('Update Answer Error: ', err);
                });
        },
        addAnswer: function() {
            axios({
                method: 'POST',
                url: `${config.port}/answers/${this.id}`,
                data: {
                    content: this.answerContent
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.answerContent = '';
                    this.getAnswers();
                })
                .catch((err) => {
                    console.log('Add Answer Error: ', err);
                });
        },
        showAnswerForm: function() {
            if (this.answerForm === true) {
                this.answerForm = false
            } else {
                this.answerForm = true
            }
        },
        backToAll: function() {
            this.$router.push('/questions')
        },
        deleteQuestion: function(questionId) {
            axios({
                method: 'DELETE',
                url: `${config.port}/questions/${questionId}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getQuestions();
                    this.backToAll();
                })
                .catch((err) => {
                    console.log('Delete Question Error: ', err);
                });
        },
        upvoteQuestion: function() {
            axios({
                method: 'PATCH',
                url: `${config.port}/questions/upvote/${this.id}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getOneQuestion();
                })
                .catch((err) => {
                    console.log('Upvote Question Error: ', err);
                });
        },
        upvoteAnswer: function(answerId) {
            axios({
                method: 'PATCH',
                url: `${config.port}/answers/upvote/${this.id}`,
                data: {
                    id: answerId
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getAnswers();
                })
                .catch((err) => {
                    console.log('Upvote Answer Error: ', err);
                });
        },
        downvoteQuestion: function(answerId) {
            axios({
                method: 'PATCH',
                url: `${config.port}/questions/downvote/${this.id}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getOneQuestion();
                })
                .catch((err) => {
                    console.log('Downvote Question Error: ', err);
                });
        },
        downvoteAnswer: function(answerId) {
            axios({
                method: 'PATCH',
                url: `${config.port}/answers/downvote/${this.id}`,
                data: {
                    id: answerId
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getAnswers();
                })
                .catch((err) => {
                    console.log('Downvote Answer Error: ', err);
                });
        }
    },
    created() {
        this.checkLogin();
        this.getOneQuestion();
        this.getAnswers();
        this.checktoken();
    },
    watch: {
        id(val) {
            this.questionId = val;

            axios({
                method: 'GET',
                url: `${config.port}/questions/${this.questionId}`
            })
                .then((question) => {
                    this.question = question.data;
                })
                .catch((err) => {
                    console.log('Get One Question Watch Error: ', err);
                });

            this.getAnswers();
        },
        question() {
            this.answerForm = true;
        },
        $route() {
            this.getOneQuestion();
        }
    }
}
</script>

<style>
#answer-section-h {
    font-family: 'Oswald', serif;
}

#btn-edit-delete {
    font-size: 20px;
    cursor: pointer;
}
</style>