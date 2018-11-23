<template>
    <div class="login container" >
        <div class="row">
            <div class="col-6">
                <h3>Login</h3>
                <form>
                    <div class="form-group">
                        <label for="inputEmail">Email address</label>
                        <input type="email" class="form-control" placeholder="Enter email" v-model="loginData.email"> 
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="loginData.password"> 
                    </div>
                    <div class="row mx-2">
                        <button type="submit" class="btn btn-primary mr-4" v-on:click.prevent='login'> Login </button>
                        <div id="google-signin-button"></div>
                    </div> 
                    
                </form>
                <div class="alert alert-info" role="alert" v-show="alert">
                    <!-- {{ message }} -->
                </div>
            </div>
            <div class="col-6">
                <div class="alert alert-info" role="alert" v-show="alert">
                    {{ message }}
                </div>
            </div>
            
        </div>   
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            loginData: {
                email: "",
                password: ""
            },
            alert: false,
            message: ""
        }
    },
    computed: {
        ...mapState(['isLoggedIn']) // refer ke store.js di bag state
    }, 

    methods: {
        login: function() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.loginData.email,
                    password: this.loginData.password
                }
            })
            .then( response => {
                localStorage.setItem('accesstoken', response.data.accesstoken)
                localStorage.setItem('userID', response.data.userID)
                localStorage.setItem('name', response.data.name)
                this.$store.dispatch('login')
                this.$router.push('/')
            })
            .catch( err => {
                this.alert = true
                this.message = err.response.data.msg
            })
        },

        onSignIn: function(user) {
            const profile = user.getBasicProfile()
            console.log(profile);
        }
    },

    mounted() {
        gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
        })
    }
}
</script>
