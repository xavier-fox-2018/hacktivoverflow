<template>
    <div>
       <div class="col-md-4">
           <div class="form-group">
            <label for="">Username</label>
            <input v-model="username" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter username">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
  
  <div class="form-group">
    <label for="">Email</label>
    <input v-model="email" type="email" class="form-control" placeholder="Email">
  </div>

  <div class="form-group">
    <label for="">Password</label>
    <input v-model="password" type="password" class="form-control" placeholder="Password">
  </div>
 <button @click="login" type="submit" class="btn btn-primary">Submit</button>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username : '',
            email : '',
            password : ''
        }
    },
    methods : {
       login : function(){
           axios.post('http://localhost:1313/users/login',{
               username : this.username,
               email : this.password,
               password : this.password
           })
                .then(response=>{
                    console.log('berhasil register')
                    
                })
                .catch(err=>{
                    console.log(err)
                })
       }
    }
}
</script>

