<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div class="container">
        <p class="navbar-brand" >hacktivOverflow</p>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Home</router-link> 
            </li>
            <li class="nav-item active">
                <router-link to="/newQuestion" class="nav-link" v-if="isLoggedIn">New Question</router-link> 
            </li>
            <li class="nav-item">
                <router-link to="/login" v-if="!isLoggedIn" class="nav-link" >Login</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-if="isLoggedIn" @click="logout">Logout</a>
            </li>
            <li class="nav-item">
                <router-link to="/register" v-if="!isLoggedIn" class="nav-link" >Register</router-link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['isLoggedIn']) 
    },

    methods: {
        logout: function() {
            localStorage.removeItem('accesstoken')
            localStorage.removeItem('userID')
            this.$store.dispatch('login')
            this.$router.push('/')
        }
    }

}
</script>
