<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div class="container">
            <a class="navbar-brand" href="#">H8-Overflow</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <a href="javascript:void(0)" class="nav-link" v-b-modal.modalLogin v-if="!loginStatus">Login</a>
                </li>
                <li class="nav-item">
                    <a href="javascript:void(0)" class="nav-link" v-b-modal.modalRegister v-if="!loginStatus">Register</a>
                </li>
                <li class="nav-item" v-if="loginStatus">
                    <a href="javascript:void(0)" class="nav-link" >{{name}}(Logout)</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        <login-modal id="modalLogin"></login-modal>
        <register-modal id="modalRegister"></register-modal>
    </div>
</template>

<script>
import LoginModal from '@/components/login-modal.vue'
import RegisterModal from '@/components/register-modal.vue'
import {mapState} from 'vuex'
export default {
   components: {
       LoginModal,
       RegisterModal
   },
   computed: {
       ...mapState(['loginStatus', 'name'])
   }
}
</script>

<style>
#navbar{
    margin-bottom: 1%;
}
</style>

