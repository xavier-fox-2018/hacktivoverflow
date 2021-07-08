<template>
    <div>
        <h3>Please Login</h3>
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" />
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" />
        <button class="btn btn-primary" @click="login">Login</button>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            login() {
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/users/login',
                    data: {
                        email: this.email,
                        password: this.password,
                    }
                })
                    .then(resolve => {
                        localStorage.setItem('token', resolve.data.token);
                        this.$store.dispatch('setToken');
                        this.$router.push('/');
                    })
                    .catch(reject => {
                        console.log(reject);
                    });
            },
        },
    };
</script>
