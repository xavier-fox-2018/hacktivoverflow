<template>

  <div class="modal fade" id="modalSignUpForm" tabindex="-1" role="dialog" aria-labelledby="modalSignUpForm"
  aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Register</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="md-form mb-4">
            <i class="fa fa-lock prefix grey-text"></i>
            <label data-error="wrong" data-success="right">Name</label>
            <br>
            <input type="text" v-model="name" size="45" >
          </div>

          <div class="md-form mb-4">
            <i class="fa fa-lock prefix grey-text"></i>
            <label data-error="wrong" data-success="right">Username</label>
            <br>
            <input type="text" v-model="username" size="45">
          </div>

          <div class="md-form mb-4">
            <i class="fa fa-lock prefix grey-text"></i>
            <label data-error="wrong" data-success="right">Picture</label>
            <br>
            <input type="text" v-model="picture" size="45">
          </div>

          <div class="md-form mb-4">
            <i class="fa fa-lock prefix grey-text"></i>
            <label data-error="wrong" data-success="right">Gender</label>
            <br>
            <input type="text" v-model="gender" size="45">
          </div>

          <div class="md-form mb-4">
            <i class="fa fa-envelope prefix grey-text"></i>
            <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
            <br>
            <input type="email" v-model="email" size="45">
          </div>

          <div class="md-form mb-4">
            <i class="fa fa-lock prefix grey-text"></i>
            <label data-error="wrong" data-success="right" for="defaultForm-pass">Your password</label>
            <br>
            <input type="password" v-model="password" size="45">
          </div>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button data-dismiss="modal">Cancel</button>
          <button @click="signup" data-dismiss="modal">SignUp</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'

export default {
  // name: "modal_login",
  props: ['checkLogin'],
  data () {
    return {
      name: '',
      username: '',
      picture: '',
      gender: '',
      email: '',
      password: '',
      
      names: [],
      tes: '',
      
    }
  },
  methods: { 
    signup() {
      axios({
        method: 'POST',
        url: `${config.port}/user/signup`,
        data: {
          name: this.name,
          username: this.username,
          picture: this.picture,
          gender: this.gender,
          email: this.email,
          password: this.password
        },
      })
      .then((response) => {
        console.log('======= ini response dari client',response);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        this.checkLogin()
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
}
</script>

