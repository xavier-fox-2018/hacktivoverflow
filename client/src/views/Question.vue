<template>
    <div>
        <div class="row mb-3">
            <div class="col-lg-9">
                <div class="d-flex flex-column justify-content-center">
                    <button class="btn btn-primary d-block" data-toggle="collapse" data-target="#collapse-btn-1">Ask A Question</button>
                    <img class="ask mx-auto my-2" src="../assets/undraw_questions_75e0.svg" alt="questions">
                    <div class="card mb-3" v-if="isLogin">
                        <div class="collapse" id="collapse-btn-1">
                            <div class="card-body">
                                <form @submit.prevent="createQuestion()" class="mb-2">
                                    <div class="form-group">
                                        <input type="text" v-model="createdQuestion.title" class="form-control" placeholder="Title">
                                    </div>
                                    <div class="form-group">
                                        <vue-editor v-model="createdQuestion.description"></vue-editor>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block font-weight-bold">Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">Latest Questions</div>
                    <div class="card-body">
                        <div class="d-flex flex-column justify-content-start">
                            <ul class="navbar-nav">
                                <li class="nav-item mb-3" v-for="question in questions" @click="addCount(question._id)">
                                    <router-link :to="{ name: 'currentQuestion', params: { id: question._id }}">{{ question.title }}</router-link>
                                </li>
                            </ul>
                            <router-link class="text-danger" to="/questions">
                                See All Questions
                                <i class="far fa-question-circle ml-1"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <router-view :shouldUpdate="shouldUpdate" :checktoken="checktoken"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js';
import { mapState, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
    name: 'Question',
    props: ['checktoken'],
    components: {
        VueEditor
    },
    data() {
        return {
            createdQuestion: {
                title: '',
                description: ''
            },
            shouldUpdate: 0,
            keyword: '',
            questionId: this.$router.history.current.params.id
        }
    },
    computed: {
        ...mapState([
            'isLogin',
            'questions'
        ])
    },
    methods: {
        ...mapActions([
            'getQuestions'
        ]),
        createQuestion: function() {
            axios({
                method: 'POST',
                url: `${config.port}/questions`,
                data: {
                    title: this.createdQuestion.title,
                    description: this.createdQuestion.description
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getQuestions();
                    this.createdQuestion = {};
                    this.shouldUpdate += 1;
                    this.$router.push(`/questions/${result.data.question._id}`);
                })
                .catch((err) => {
                    console.log('Create Question Error: ', err);
                });
        },
        addCount: function(paramsId) {
            if (this.questionId !== paramsId) {
                axios({
                    method: 'PATCH',
                    url: `${config.port}/questions/addCount/${paramsId}`,
                    headers: {
                        'access-token': localStorage.getItem('token')
                    }
                })
                    .then((result) => {
                        this.getQuestions();
                        this.questionId = this.$router.history.current.params.id;
                    })
                    .catch((err) => {
                        console.log('Add View Count Error: ', err);
                    });
            }
        }
    },
    created() {
        this.getQuestions();
    }
}
</script>

<style>
.ask {
    width: 300px;
    height: 300px;
}
</style>

