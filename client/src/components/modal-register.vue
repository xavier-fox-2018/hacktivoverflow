<template>
    <div class="modal" id="modalRegister">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white ">
                        <h3 class="mx-auto">Register </h3>
                </div>
                <div class="modal-body">
                    <p v-if="form_register.succes" class="alert alert-success">
                        <strong> Succes registered! </strong>
                        <button class="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </p>
                    <p  v-if="form_register.error" class="alert alert-danger">{{ form_register.error}}
                        <button class="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </p>
                    <div class="form-group">
                        <label for="name"> Name : </label>
                        <input v-model="form_register.name" type="text" class="form-control" id="name" placeholder="enter your name ....">
                        <small id="name_muted" class="form-text text-muted"> field name must be filled</small>
                    </div>
                    <div class="form-group">
                        <label for="email"> Email : </label>
                        <input  v-model="form_register.email" type="email" class="form-control" id="email" placeholder="enter your email ....">
                        <small id="email_muted" class="form-text text-muted"> field email must be filled</small>
                    </div>
                        <div class="form-group">
                        <label for="email"> Password : </label>
                        <input  v-model="form_register.password" type="password" class="form-control" id="password" placeholder="enter your password ....">
                        <small id="password_muted" class="form-text text-muted"> field password must be filled</small>
                    </div>

                </div>
                <div class="modal-footer">
                    <button @click="clear" class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                    <button @click="register" class="btn btn-primary" type="button">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form_register : {
                succes : '',
                error : '',
                email : '',
                name : '',
                password: ''
            }
        }
    },
    methods : {
        clear : function(){
            this.form_register.succes = ''
            this.form_register.error = ''
            this.form_register.email = ''
            this.form_register.name = ''
            this.form_register.password = ''
        },
        register : function(){
            axios({
                 method : 'POST',
                  url : 'http://localhost:3000/users/register',
                  data : {
                      name : this.form_register.name,
                      email : this.form_register.email,
                      password : this.form_register.password
                  } 
                })
            .then( ({ data }) => {
                this.clear() 
                this.form_register.succes = 'Succes Registrasi, silakan login!'
            })
            .catch( ( { response }) =>{
                this.form_register.error = response.data.message
            })
        }
    }
    
}
</script>
