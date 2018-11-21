<template>
     <div class="navbar bg-dark fixed-top shadow-sm">
      <div class="container">
        <a class="navbar-brand">
          <img src="../assets/New Project (4).png" height="50" class="d-inline-block align-top" alt="">
        </a>
        <!-- <input type="text" placeholder="search"> -->
        <!-- <div class="header-right"> -->
          <div>
            <button>Chat</button>
            <button v-on:click="logout" class="my-left-margin">Logout</button>
          </div>
        <!-- </div> -->
      </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods : {
      logout() {
        console.log('aku, logot, ke pencet');
        
        localStorage.removeItem('token')
        this.$router.push({name: 'Loginpage'})
      }
    }
}
</script>

<style scoped>
.navbar {
  background: rgb(248, 248, 248) !important;
  height: 60px;
  display: flex !important;
}
.my-left-margin {
  margin-left: 7px;
}

input {
  display: block;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255,255,255,0.4);
  background-color: rgba(0, 255, 149, 0.425);
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
input:hover {
  background-color: rgba(255,255,255,0.4);
}
input:focus {
  background-color: white;
  width: 300px;
  color: #2fad88;
}
button {
  appearance: none;
  outline: 0;
  background-color: #0099ff;
  border: 0;
  padding: 10px 15px;
  color: white;
  border-radius: 3px;
  width: 100px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
  margin-bottom: 0;
}
button:hover {
  background-color: #0066ff;
}
</style>
