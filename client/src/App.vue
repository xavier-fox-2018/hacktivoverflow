<template>
    <div id="app">
        <nav class="navbar navbar-expand-sm navbar-light mb-5 mt-3">
            <div class="container">
                <a id="home-nav" class="lead text-secondary">
                    HacktivXOverflow
                </a>
                <div class="collapse navbar-collapse" id="div-main-nav">
                    <ul class="navbar-nav font-weight-bold ml-auto" id="main-nav">
                        <li class="nav-item mr-2">
                            <router-link id="nav-link-btn" to="/questions" class="nav-link">
                                Questions
                                <i class="fas fa-code ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item mr-2" v-if="!isLogin">
                            <router-link id="nav-link-btn" to="/register" class="nav-link">
                                Register
                                <i class="fas fa-scroll ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="!isLogin">
                            <router-link id="nav-link-btn" to="/" class="nav-link">
                                Login
                                <i class="fas fa-user-astronaut ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item mr-2" v-if="isLogin">
                            <router-link id="nav-link-btn" to="/profile" class="nav-link">
                                Profile
                                <i class="fas fa-user-ninja ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="isLogin">
                            <a class="nav-link" @click="logout" style="cursor: pointer">
                                Log Out
                                <i class="fas fa-sign-out-alt ml-1"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container pt-1">
            <router-view :checktoken="checkToken"/>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    methods: {
        ...mapActions([
            'changeIsLogin'
        ]),
        checkToken: function() {
            let token = localStorage.getItem('token');
            if (token) {
                this.changeIsLogin(true);
                if (this.$router.history.current.name === 'register' || this.$router.history.current.name === 'login') {
                    this.$router.push('/questions');
                }
            } else {
                this.changeIsLogin(false);
                if (this.$router.history.current.name !== 'login' && this.$router.history.current.name !== 'register' && this.$router.history.current.name !== 'questions') {
                    this.$router.push('/');
                }
            }
        },
        logout: function() {
            localStorage.clear();
            this.checkToken();
            this.$router.push('/');
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out');
            });
        }
    },
    created() {
        this.checkToken();
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    width: 250px;
    padding: 10px;
}

#top-nav {
    background-color: #133337 !important;
}

#home-nav {
    font-family: 'Titillium Web', sans-serif;
    font-size: 30px;
    cursor: pointer;
}

#search-nav {
    border-color: #cccccc;
    -webkit-box-shadow: none;
    box-shadow: none;
}

#main-nav {
    font-family: Lato;
    font-size: 18px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#comment-symbol {
    font-size: 20px;
}

.link_active {
    outline: 0;
}

.myLink {
    outline: 0;
}

.nav-link:hover {
    /* color: #3B5998 !important; */
    color: #EF8236 !important;
}

@media (min-width: 34em) {
    .card-columns {
        -webkit-column-count: 1;
        -moz-column-count: 1;
        column-count: 1;
    }
}

#btn-post:hover {
    background-color: #ffa500;
    color: white;
}

#btn-post {
    background-color: #133337;
    color: white;
}

#span-comment {
    font-size: 18px;
}
</style>