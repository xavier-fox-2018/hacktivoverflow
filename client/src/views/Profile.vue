<template>
    <div class="row mb-5" v-if="isLogin">
        <div class="col-lg-5">
            <div class="d-flex flex-column">
                <div class="card mb-3">
                    <div class="card-header">User Profile</div>
                    <div class="card-body">
                        <p>Username: {{ user.username }}</p>
                        <p class="mb-0">Email: {{ user.email }}</p>
                    </div>
                </div>

                <div class="card mb-3">
                    <div class="card-header">Your Questions</div>
                    <div class="card-body">
                        <div class="d-flex flex-column justify-content-start">
                            <ul class="navbar-nav">
                                <li class="nav-item mb-3" v-for="question in questions">
                                    <router-link :to="{ name: 'currentQuestion', params: { id: question._id }}">{{ question.title }}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="font-weight-light mb-3">Achievements</h5>
                        <div class="d-flex px-2 mb-3 justify-content-between border align-items-center" v-for="achievement in achievements">
                            <div class="d-flex ml-3 flex-column align-items-start justify-content-center span-div">
                                <span class="font-weight-bold">{{ achievement.name }} </span>
                                <span class="text-justify span-subtitle" v-if="achievement.name === 'Popular Question'">One of your question get more than 10 viewcounts</span>
                                <span class=" text-justify span-subtitle" v-if="achievement.name === 'Superman'">One of your question get more than 10 upvotes</span>
                            </div>
                            <img class="achievement mr-3" v-if="achievement.name === 'Popular Question'" src="../assets/undraw_content_vbqo.svg" alt="popular-content">
                            <img class="achievement mr-3" v-if="achievement.name === 'Superman'" src="../assets/undraw_superhero_kguv.svg" alt="superman">
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-7">
            <div class="d-flex flex-column">
                <div v-for="question in questions" class="card mb-4">
                    <div class="card-body">
                        <div v-if="isLogin && userEmail === question.poster.email" class="d-flex justify-content-end align-items-center mb-3">
                            <i class="fas fa-fingerprint text-danger mr-2" id="btn-fingerprint"></i>
                            Your Question
                        </div>
                        <h4 class="card-title text-left ml-2 mb-4">{{ question.title }}</h4>
                        <p class="card-text text-left ml-2 mb-4">{{ question.description }}</p>
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div class="font-weight-bold ml-2">By {{ question.poster.username }}</div>
                            <div class="font-weight-bold mr-2">View Count: {{ question.viewCount }}</div>
                        </div>
                        <button class="btn btn-block font-weight-bold" id="btn-post" @click="goToLink(question._id)">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Profile',
    props: ['checktoken'],
    data() {
        return {
            questions: [],
            user: {},
            shouldUpdate: 0,
            achievements: []
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
            'checkLogin'
        ]),
        getUserProfile: function() {
            axios({
                method: 'GET',
                url: `${config.port}/users/profile`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((user) => {
                    this.user = user.data;
                    this.achievements = user.data.achievements;
                })
                .catch((err) => {
                    console.log('Get Profile Error: ', err);
                });
        },
        goToLink: function(paramsId) {
            this.$router.push(`/questions/${paramsId}`);
        },
        getUserQuestion: function() {
            axios({
                method: 'GET',
                url: `${config.port}/questions/ownquestions/user`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((questions) => {
                    this.questions = questions.data;
                })
                .catch((err) => {
                    console.log('Get User Questions Error: ', err);
                });
        }
    },
    created() {
        this.checkLogin();
        this.getUserQuestion();
        this.getUserProfile();
    },
    mounted() {
        this.checktoken();
    }
}
</script>

<style scoped>
.achievement {
    width: 150px;
    height: 150px;
}

.span-subtitle {
    font-size: 14px;
}

.span-div {
    width: 180px;
}
</style>