<template>
<section id="showcase" class="py-5">
    <div class="primary-overlay text-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-center">
            <h1 class="display-2 mt-5 pt-5">
              Learn, Share, Build
            </h1>
            <p class="lead">
                Each month, over 50 million developers come to Stack Overflow to learn, share their knowledge, and build their careers.
                Join the world’s largest developer community.
            </p>
          </div>
          <div class="col-lg-5 mt-5 ml-5" style="height: 100vh">
             <div class="card bg-primary text-center card-form">
              <div class="card-body" v-show="signup">
                <h3>Sign Up Today</h3>
                <p>Please fill out this form to register</p>
                <form @submit.prevent="register">
                  <div class="form-group">
                    <input type="text" class="form-control form-control-lg" placeholder="Username">
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg" placeholder="Email">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" placeholder="Password">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" placeholder="Confirm Password">
                  </div>
                  <input type="submit" value="Submit" class="btn btn-outline-light btn-block">

                  <div class="form-group mt-2">
                  <span>Already have an account ?</span>
                  <button class="btn btn-warning btn-block" @click="showFormLogin">Login</button>
                  </div>
                  </form>
              </div>

              <!-- Login -->
               <div class="card-body" v-if="login">
                <h3>Login Now</h3>
                <p>Please fill out this form to Login</p>
                <form @submit.prevent="login">
                  <div class="form-group">
                    <input type="text" class="form-control form-control-lg" placeholder="Username">
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg" placeholder="Email">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" placeholder="Password">
                  </div>
                  <input type="submit" value="Submit" class="btn btn-outline-light btn-block">

                  <div class="form-group mt-2">
                  <span>Don't have an account yet ?</span>
                  <button type="submit"  class="btn btn-warning btn-block" @click="showFormSignUp">Register</button>
                  </div>
                  </form>
              </div>
            </div>
          </div>
  
      </div>
    </div>
    </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            signup: true,
            login: false
        }
    },
    methods: {
        showFormLogin(){           
            this.login = true
            this.signup = false
        },
         showFormSignUp(){
            this.login = false
            this.signup = true
        }
    }
}
</script>

