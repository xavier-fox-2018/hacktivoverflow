<template>
  <div class="container">
      <!-- sign-up form Modal-->
    <div id="signupModal" class="modal">
      <span data-dismiss="modal" class="close" title="Close Modal">times;</span>
      <form class="modal-content" @submit.prevent="signUp">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr>
          <label for="email"><b>Email</b></label>
          <input type="text" v-model="signup.email" placeholder="Enter Email" name="email" required>

          <label for="psw"><b>Password</b></label>
          <input type="password" v-model="signup.password" placeholder="Enter Password" name="psw" required>

          <label for="full name"><b>Full Name:</b></label>
          <input type="text" v-model="signup.name" name="fullName" required>

          <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

          <div class="clearfix">
            <button type="button" data-dismiss="modal" class="cancelbtn">Cancel</button>
            <button type="submit" class="signup">Sign Up</button>
          </div>
      </form>
    </div>
    <form style="border:1px solid #ccc" @submit.prevent="signIn">
        <h1>Sign In</h1>
        <p>Please sign in to Hacktiv Overflow.</p>
        <hr>

        <label for="email" ><b>Email</b></label>
        <input type="text" v-model="signin.email" placeholder="Enter Email" name="email" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" v-model="signin.password" placeholder="Enter Password" name="psw" required>
<!--         
        <label>
          <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
        </label> -->
        <div class="clearfix">
          <button type="submit" class="signup"> Sign In</button>

        </div>
    </form>
    <div class="clearfix">
        <div class="btn" @click="onSignIn">Sign Ins</div>
        <div id="message" > {{message}}</div>
        <button class="signup btn" data-toggle="modal" data-target="#signupModal">Register</button>
    </div>
  </div>
</template>

<script>

export default{
  name:'signin',
  data(){
    return{
      signup:{
        name:'',
        email:'',
        password:''
      },
      signin:{
        email:'',
        password:''
      },
      message:''
    }
  },
  methods:{
    signUp() {
      const auth = firebase.auth();
      auth.createUserWithEmailAndPassword(this.signup.email,this.signup.password)
      .then(result => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: "Jane Q. User",
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
      })      
      .catch(err => {
        console.log('---',err)
      })
    },
    signIn() {
      let self=this;
      const auth = firebase.auth();
      auth.signInWithEmailAndPassword(this.signin.email,this.signin.password)
      .then(result => {
        this.message='successfully signed in. Redirecting you to main page in 2 seconds.'
        //redirect to main page,
        setTimeout(function() {
          self.$router.push('/home');
        }, 1300);
      })      
      .catch(err => {
        this.message=err.message;
      })
    },
    onSignIn(googleUser) {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('xxxxxx',user)
        // ...
      }).catch(function(error) {
        console.log('xxxxxx',error)

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }
}

</script>

<style>
.container {
  height: 100vh;
  width: 100vw;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%);
}
</style>
