<template>
    <div class="mt-3">
        <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="h2 mb-4 text-left">Questions Asked</div>
            <div class="d-flex justify-content-end mb-4">
                <div class="form-inline col-md-12 d-flex justify-content-end p-0">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                        <input type="text" v-model="keyword" class="form-control mr-1" placeholder="Search All Questions">
                    </div>
                    <button class="btn btn-outline-dark ml-2" @click="searchQuestion">Search</button>
                </div>
            </div>
        </div>
        <div v-for="question in questions" class="card mb-4">
            <div class="card-body">
                <div v-if="isLogin && userEmail === question.poster.email" class="d-flex justify-content-end align-items-center mb-2">
                    <i class="fas fa-fingerprint text-danger mr-2" id="btn-fingerprint"></i>
                    Your Question
                </div>
                <h4 class="card-title text-left mb-4 ml-2">{{ question.title }}</h4>
                <p class="card-text text-left mb-4 ml-2" v-html="question.description"></p>
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="font-weight-bold ml-2">From {{ question.poster.username }}</div>
                    <div class="font-weight-bold mr-2">View Count: {{ question.viewCount }}</div>
                </div>
                <button class="btn btn-block font-weight-bold" id="btn-post" @click="goToLink(question._id)">
                    Click to reply
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AllQuestions',
    props: ['shouldUpdate'],
    data() {
        return {
            keyword: ''
        }
    },
    computed: {
        ...mapState([
            'isLogin',
            'userEmail',
            'questions'
        ])
    },
    methods: {
        ...mapActions([
            'checkLogin',
            'getQuestions',
            'changeQuestions'
        ]),
        goToLink: function(paramsId) {
            axios({
                method: 'PATCH',
                url: `${config.port}/questions/addCount/${paramsId}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getQuestions();
                    this.$router.push(`/questions/${paramsId}`);
                })
                .catch((err) => {
                    console.log('Add View Count Error: ', err);
                });
        },
        searchQuestion: function() {
            axios({
                method: 'GET', 
                url: `${config.port}/questions/search/${this.keyword}` 
            })
                .then((questions) => {
                    this.changeQuestions(questions.data);
                })
                .catch((err) => {
                    console.log('Search Question Error: ', err);
                });
        }
    },
    created() {
        this.checkLogin();
        this.getQuestions();
    },
    watch: {
        shouldUpdate() {
            this.getQuestions();
        },
        keyword() {
            if (this.keyword.length === 0) {
                this.getQuestions();
            } else {
                this.searchQuestion();
            }
        }
    }
}
</script>

<style>
#btn-fingerprint {
    color: #3a606e;
}
</style>