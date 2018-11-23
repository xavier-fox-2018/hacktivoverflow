<template>
    
     <v-container grid-list-xl text-xs-center>
       <v-layout row wrap>
         <v-flex xs4 offset-xs4>
           <v-card dark color="dark" elevation-24 style="padding: 20px; border: 1px; border-radius: 50px;">
             <v-card-text>
               <h4 class="display-2 font-weight-bold">Login</h4>
               <hr>
               <br>
               <v-form>
                 <v-text-field 
                   clearable
                   v-model="email"
                   label="Email"
                   prepend-icon="face"
                   type="email"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                   counter="50"
                 >
                 </v-text-field>
                 <v-text-field 
                   clearable
                   v-model="password"
                   label="Password"
                   prepend-icon="lock"
                   type="password"
                   @click:prepend="prependClicked"
                   color="white"
                   @click:append-outer="appendClicked"
                 >
                 </v-text-field>
              </v-form>
              <br>
               <v-btn color="grey darken-2" @click="submitLogin" large>Enter</v-btn>

               <div id="g-signin-btn"></div>
               <p style="margin-bottom: 0;  padding-bottom: 0">didnt have account?</p>
              <router-link to="/register">  <p><u style="color: #2196F3; cursor:pointer"> sign up</u></p></router-link>
             </v-card-text>

       <v-snackbar style="text-align:center" color="#F44336" :top=true :timeout=2000 v-model="show">
         <p>WRONG PASSWORD/USERNAME</p>
       </v-snackbar>
           </v-card>
         </v-flex>
       </v-layout>
       
       
     </v-container>
 
</template>

<script>


import axios from "axios";
export default {
  name: "loginForm",
  data() {
    return {
      show: false,
      email: "",
      password: "",
    };
  },
  methods: {
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      // console.log(id_token)
      axios.post('http://localhost:3000/users/login', {
        token: id_token
      })
      .then(data => {
        
         localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", data.data.user);
          localStorage.setItem("picture", data.data.picture);
          localStorage.setItem("name", data.data.name);

          this.$store.dispatch("setStatusUser");
          this.$router.push("/main");
      })
      .catch(err => {
        console.log(err)
      })
    },
    submitLogin() {
      axios
        .post("http://localhost:3000/users/login", {
          email: this.email,
          password: this.password
        })
        .then(data => {
          // console.log(data)
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", data.data.user);
          localStorage.setItem("picture", data.data.picture);
          localStorage.setItem("name", data.data.name);

          this.$store.dispatch("setStatusUser");
          this.$router.push("/main");
        })
        .catch(err => {
          console.log(err);
          this.show = true;
        });
    },

    prependClicked() {
      console.log("prepend clicked");
    },
    appendClicked() {
      console.log("append clicked", this.email);
    }
  },
  mounted (){
    gapi.signin2.render('g-signin-btn', {
      onsuccess: this.onSignIn
    })
  }
};
</script>

<style>
</style>
