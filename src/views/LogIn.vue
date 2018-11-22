<template>
    <div>
        <Error v-if="error_status" v-bind:error="error_msg"/>
        <form id="login">
            <h1>Login</h1>
            <input type="email" name="email" v-model="input.email" placeholder="Email" />
            <br><br>
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <br><br>
            <button @click.prevent="login()">Login</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Error from '@/components/Error.vue';

export default {
  name: "login",
  components: {
      Error,
  },
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      error_status: false,
      error_msg: "",
    };
  },
  methods: {
    login() {
        let email = this.input.email
        let password = this.input.password
        console.log(email,password)
        axios({
            method:"post",
            url: "http://35.194.200.110:3000/ho/signin",
            data: {
                email:email,
                password:password
            }
        })
        .then((response) => {
            console.log(response)
            this.error_status = false
            localStorage.setItem('token', response.data.token)
            this.$store.dispatch("decode");
            this.$emit('loggedin')
            this.$router.push('questions')
        })
        .catch((err) => {
            console.log(err.response)
            this.error_msg = err.response.data.message
            this.error_status = true
      })
    }
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}
</style>