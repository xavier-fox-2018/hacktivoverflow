<template>
    <div class="">
        <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="h2 mb-3 text-left">Questions Asked</div>
            <div class="d-flex justify-content-end mb-3">
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
                <div v-if="isLogin && userEmail === question.poster.email" class="d-flex justify-content-end align-items-center mb-4">
                    <i class="fas fa-fingerprint text-danger mr-2" id="btn-fingerprint"></i>
                    Your Question
                </div>
                <h4 class="card-title text-left mb-5">{{ question.title }}</h4>
                <p class="card-text text-left mb-5">{{ question.description }}</p>
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="font-weight-bold">From {{ question.poster.username }}</div>
                    <i class="far fa-lightbulb mr-1" id="comment-symbol"></i>
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

export default {
    name: 'AllQuestions',
    props: ['shouldUpdate', 'isLogin', 'userEmail', 'getquestions'],
    data() {
        return {
            questions: [],
            question: {
                title: '',
                description: ''
            },
            keyword: ''
        }
    },
    methods: {
        getQuestions: function() {
            axios({
                method: 'GET',
                url: `${config.port}/questions`
            })
                .then((questions) => {
                    this.questions = questions.data;
                })
                .catch((err) => {
                    console.log('Get All Questions Error: ', err);
                })
        },
        goToLink: function(paramsId) {
            this.$router.push(`/questions/${paramsId}`);
        },
        searchQuestion: function() {
            axios({
                method: 'GET', 
                url: `${config.port}/questions/search/${this.keyword}` 
            })
                .then((questions) => {
                    this.questions = questions.data;
                })
                .catch((err) => {
                    console.log('Search Question Error: ', err);
                });
        }
    },
    created() {
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
#btn-edit-delete {
    font-size: 20px;
    cursor: pointer;
}

#btn-fingerprint {
    color: #3a606e;
}
</style>