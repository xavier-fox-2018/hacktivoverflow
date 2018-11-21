<template>
  <div id="app">
    <div>
    <nav class="navbar navbar-light bg-info">
      <a class="navbar-brand">HacktivOverFlow</a>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <router-link to="/login">
          <button v-if="!token" class="btn btn-danger my-2 my-sm-0" type="submit">Login</button>
        </router-link>
       <router-link to="/register">
          <button v-if="!token"  class="btn btn-success my-2 my-sm-0" type="submit">Register</button>
        </router-link>
        <router-link to="/logout">
          <button @click="logout" v-if="token"  class="btn btn-secondary my-2 my-sm-0" type="submit">Logout</button>
        </router-link>
      </form>
    </nav>

    <div class="row">
      <div class="col-md-3">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> Tags </li> 
          <li class="list-group-item"> Users</li>
          <li class="list-group-item">Jobs</li>
        </ul>
      </div>
      <div class="col-md-9">
         <router-view @login="changeLogin" :token="token"></router-view>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  data(){
    return{
      token : localStorage.getItem('token')
    }
  },
  created() {
    this.token = localStorage.getItem('token')
  },
  methods:{
    changeLogin : function(){
      this.token = localStorage.getItem('token')
    },
    logout : function(){
      localStorage.removeItem('token')
      this.changeLogin()

    }
  }
}
</script>

