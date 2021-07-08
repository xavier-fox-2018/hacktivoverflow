<template>
    <div>
        <h3>Please Register</h3>
        <label>Full Name</label>
        <input type="text" class="form-control" v-model="name" />
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" />
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" />
        <label>Type Password</label>
        <input type="password" class="form-control" />
        <button class="btn btn-primary" @click="login">Save</button>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
            };
        },
        methods: {
            login() {
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/users/register',
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                    }
                })
                    .then(resolve => {
                        this.$router.push('/login');
                    })
                    .catch(reject => {
                        console.log(reject);
                    });
            },
        },
    };
</script>