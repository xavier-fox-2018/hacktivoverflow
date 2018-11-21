<template>
  <div>
    <p>login to account</p>
    <form class="form">
			<input v-model="email" type="text" placeholder="email" required>
			<input v-model="password" type="password" placeholder="password" required>
			<button v-on:click="loggingin" type="button" >login</button>
      <p></p>
      <button v-on:click="toggleshowlogin" type="button" >register</button>
		</form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email:'',
      password: ''
    }
  },
  methods: {
    loggingin() {
      let self = this
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: self.email,
          password: self.password
        }
      })
        .then(response => {
          console.log('Bisaaaaaaa');
          console.log('Heii ini datanya' + JSON.stringify(response.data))

          localStorage.setItem('token', response.data.token)
          this.$router.push({name: 'Homepage'})
          self.getUserData()
        })
        .catch(err => {
          console.log(err);
          
        })
    },
    toggleshowlogin() {
      this.$emit('toggleloginfalse', false)
    },
    getUserData() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/data',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          console.log('ini data dari login ' + data);
          this.$emit('getuserdata', data)
          
        })
        .catch(err => {
          console.log(err);
          
        })
    }
  }

}
</script>


<style scoped>

</style>
