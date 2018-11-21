<template>
    <div class="row">
        <div class="col-md-2"></div>
    <div class="col-md-4">
        
        <div class="form-group">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control"  placeholder="Password">
        </div>
        <button @click="login" type="submit" class="btn btn-primary">Submit</button>

    </div>
    <div class="col-md-4"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            email : '',
            password : ''
        }
    },
    methods : {
        login : function(){
            axios.post('http://localhost:1313/users/login',{
                email : this.email,
                password : this.password

            })
            .then(data=>{
                console.log(data)
                localStorage.setItem('token',data.data.token)
                console.log('login berhasil')
                this.$emit('login')
                this.$router.push('/')
                
            })
            .catch(err=>{
                console.log(err)
            })
        
    }
}
}
</script>

