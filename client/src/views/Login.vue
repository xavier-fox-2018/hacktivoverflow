<template>
        <div class="col py-5 bg-info">
            <div class="col-5 mx-auto p-5 bg-light">
                <form class="py-4">
                    <h3>Sign In User</h3>
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" class="form-control" v-model="loginModel.email" id="loginEmail"
                            autocomplete="email" placeholder="your@example.com">
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" v-model="loginModel.password" autocomplete="current-password" class="form-control"
                            placeholder="Password" aria-describedby="logPass">
                    </div>
                    <input name="loginBtn" @click.prevent="login" id="loginBtn" class="btn btn-success pull-right" type="submit"
                        value="Login">

                    <div>
                        <div id="google-signin-button" class="g-signin2" data-onsuccess="onSignIn">sign in</div>
                    </div>

                </form>
            </div>
        </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ['logNotification'],
    data () {
        return {
            loginModel : {
                email : '',
                password : ''
            }
        }
    },
    mounted() {
    
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })

    },
    methods: {
        ...mapActions(['setUser']),

        login() {
            this.$server.post('/login', this.loginModel)
            .then((result) => {
                this.logNotification(result.data.message,'success',2000)
                localStorage.setItem('token', result.data.token)
                this.$emit('fetchUser', result.data.user)
                this.setUser(result.data.user)
                this.$router.push('/')
            }).catch((err) => {
                this.logNotification(err.response.data.message,'danger',5000)
                
            });
        },

        onSignIn(googleUser) {
            let id_token = googleUser.getAuthResponse().id_token;

            this.$server.post('/gsignin',{
                    googleToken: id_token
                })
                .then((result) => {
                    this.logNotification(result.data.message,'success',2000)
                    localStorage.setItem('token', result.data.token)
                    this.$emit('fetchUser', result.data.user)
                    this.setUser(result.data.user)
                    this.$router.push('/')
                }).catch((err) => {
                    this.logNotification(err.response.data.message,'danger',5000)
                });
        }
    }
}
</script>

<style scoped>
    .container-fluid {
        min-height: 500px;   
    }

</style>