<template>
  <div>
    <p>{{message}}</p>
    <form class="form">
      <input v-model="name" type="text" placeholder="username" required>
      <input v-model="email" type="text" placeholder="email" required>
      <input v-model="password" type="password" placeholder="password" required>
      <input v-model="image" type="text" placeholder="image">
      <button v-on:click="registering" type="submit">register</button>
      <p></p>
      <button v-on:click="toggleshowlogin" type="button">login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      image: '',
      message: 'create an account'
    }
  },
  methods: {
    registering() {
      self = this
      axios({
        method:'POST',
        url:'http://localhost:3000/register',
        data: {
          name: self.name,
          email: self.email,
          image: self.image,
          password: self.password
        }
      })
        .then( response => {
          this.message = `${this.name} has successfully registered! 
                          Please click "login" to enter our website`
          console.log(response);
          
        })
        .catch(err => {
          console.log(err);
          
        })
    },
    toggleshowlogin() {
      this.$emit('togglelogintrue', true)
    }
  }
}
</script>


<style scoped>
button {
  margin-bottom: 30px;
}

form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  display: block;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255,255,255,0.4);
  background-color: rgba(255,255,255,0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  text-align: center;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255,255,255,0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #2fad88;
}
form button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #2fad88;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
</style>
