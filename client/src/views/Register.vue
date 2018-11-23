<template>
<div class="container">
  

  <form v-on:submit.prevent="onSubmit">
    <div class="row">

    <div class="col-md-6 col-sm-12">
      <div class="form-group">
        <label>First Name</label>
        <input v-model="firstName" type="text" class="form-control" placeholder="Enter first name">          
      </div>
    </div>

    <div class="col-md-6 col-sm-12">
      <div class="form-group">
        <label>Last Name</label>
        <input v-model="lastName" type="text" class="form-control" placeholder="Enter last name">
      </div>
    </div>

    <div class="col-12">
      <div class="form-group">
        <label>Email address</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </div>

    <div class="col-12">
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-outline-warning btn-block" @click.prevent="RegisterUser">Submit</button>
    </div>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Register',
  components: {

  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    RegisterUser() {
      // console.log(this.firstName, this.lastName, this.email, this.password)
      axios({
        method: 'post',
        url: this.axios_url + '/user/register',
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        }
      })
      .then(result => {
        console.log(result.data)
        if (result.data.message === 'Success') {
          this.$notify({
            title: 'New user successfully created!',
            duration: 3000,
            type: 'success'
          });
        }
      })
      .catch(err => console.log(err))
    }
  },
  computed: {
    ...mapState([
      'axios_url'
    ])
  }
}
</script>

<style>

</style>
