<template>
  <div>
    <!-- Modal Component -->
    <b-modal :id="id"
             ref="modal"
             :title="title"
             @ok="handleOk"
             >
      <div class="alert alert-danger" role="alert" v-show="errEmail">
        Please input a valid email!
      </div>
      <div class="alert alert-danger" role="alert" v-show="errPassword">
        Password must be at least 8 characters
      </div>
      <form @submit.stop.prevent="handleSubmit">
        <form-group label="email" type="email" v:model="user.email" validate="validateEmail" @get-value="user.email=$event"></form-group>
        <form-group label="password" type="password" @get-value="user.password=$event"></form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import FormGroup from '@/components/form-group.vue'
import {mapActions, mapState} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errEmail : false,
      errPassword: false,
    }
  },
  methods: {
    ...mapActions(['login']),
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (this.validateEmail(this.user.email)==false) {
        this.errEmail = true
      } else if(this.user.password.length < 8) {
        this.errPassword = true
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.login(this.user)
      this.$refs.modal.hide()
    },
    validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }
  }, 
  components: {
    FormGroup
  },
  computed: mapState(['user']),
  props: ['title', 'id']
}
</script>

<!-- modal-prevent-1.vue -->