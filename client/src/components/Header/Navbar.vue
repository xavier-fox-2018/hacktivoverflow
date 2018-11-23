<template>
<div>
    <div class="container-fluid">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-secondary">
            <a class="navbar-brand" href="#"><i class="fab fa-vuejs"></i> Hacktiv-OverFlow </a> 
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link active">Home</router-link> <span class="sr-only">(current)</span>
                    <!-- <router-link to="/forum" class="nav-item nav-link active">Forum</router-link> -->
                    <router-link to="/question" v-if="isLogin" class="nav-item nav-link active">My Question</router-link>
                    <!-- <router-link to="/about" class="nav-item nav-link active">About</router-link> -->
                </div>
                
            </div>
                <div>
                    <input class="form-control mr-sm-5" type="search" placeholder="Search" v-model="search" aria-label="Search">
                </div>
            <!-- tn btn-secondary mr-2 ml-2 tombol -->
            <button class="btn btn-outline-secondary text-white" v-if="isLogin" data-toggle="modal" data-target="#modalUserSignIn">{{user.name}}</button>
            <button class="btn btn-outline-secondary text-white" v-if="isLogin" @click="doLogout" type="submit">signout</button>
            <Button v-if="!isLogin" target="#loginModal" button="signin"/>
            <Button v-if="!isLogin" target="#signupModal" button="get started"/>
        </nav>    
    </div>

 <!-- Modal Login -->
 
    <div class="login">
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Welcome back!</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control"  aria-describedby="emailHelp" v-model="email" required autofocus>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="password" required>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" >
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <!-- <Button @click="doLogin" button="signin"/> -->
                        <!-- <input type="submit" @click.prevent="doLogin" value="submit"> -->
                        <button class="btn btn-outline-secondary my-2 my-sm-0 text-dark" data-dismiss="modal" @click.prevent="doLogin" type="submit">signin</button>
                    </form>   
                </div>
                    <div class="modal-footer">
                        <small id="emailHelp" class="form-text text-muted">Sign in to access your personalized homepage, follow authors and topics you love, and clap for stories that matter to you.</small>
                        <Button data-dismiss="modal" button="close"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <!-- Modal SignUp -->

    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Join Hacktiv Overflow</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Full Name</label>
                        <input type="text" class="form-control" aria-describedby="nameHelp" v-model="name" autofocus required>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control"  aria-describedby="emailHelp" v-model="email" >
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" v-model="password" required>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                   <button class="btn btn-outline-secondary my-2 my-sm-0 text-dark" data-dismiss="modal" @click.prevent="doSignup" type="submit">signup</button>
                </form>   
            </div>
                <div class="modal-footer">
                    <small id="emailHelp" class="form-text text-muted">Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more.</small>
                    <Button data-dismiss="modal" button="close"/>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="modalUserSignIn" tabindex="-1" role="dialog" aria-labelledby="modalUserSignInLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header  bg-secondary text-white">
                <h5 class="modal-title" id="modalUserSignInLabel"> Hallo, {{user.name}} </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Button from '@/components/Button.vue'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'navbar',
    components: {
        Button,  
    },
    data(){
        return{
            name: '',
            email: '',
            password: '',
            search: ''
        }
    },
    computed: {
        ...mapState(['isLogin', 'user', 'questions']),
        // searchProducts() {
        //     return this.questions.filter(post => {
        //       return post.title.toLowerCase().includes(this.search.toLowerCase())
        //     })
        // }
    },

    methods: {
        ...mapActions(['loginIn', 'registerIn', 'destroyLogin']),

        doLogin(){
            // console.log(`masukk log`);
            let data = { email: this.email, password: this.password}
            this.loginIn(data)
            this.email = ''
            this.password = ''
        },

        doSignup(){
            let register = { name: this.name, email: this.email, password: this.password }
            this.registerIn(register)
            this.name = ''
            this.email = ''
            this.password = ''
        },

        doLogout(){
            localStorage.removeItem('token')
            this.destroyLogin()
        },
    }
}
</script>

<style>

</style>
