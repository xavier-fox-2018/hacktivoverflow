<template>
    <v-content>
				<v-container>
          <v-stepper v-model="step" vertical>
            <v-stepper-header>
              <v-stepper-step step="1" :complete="step > 1">Your Information</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="step > 2">Upload your photo</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Your Interest</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                  
                 <v-text-field label="Name" v-model="registration.name" required></v-text-field>
                 <v-text-field label="Email" type="text" v-model="registration.email" required></v-text-field>
                 <v-text-field label="password" type="password" v-model="registration.password" required></v-text-field>
                                    
                <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                  <input type="file" @change="onPicture" name="" id="">
                  <v-spacer/>
        
                <v-btn flat @click.native="step = 1">Previous</v-btn>
                <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                
                
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-select label="Shirt Size" v-model="registration.interest" 
                          :items="category" required></v-select>
                
                <v-btn flat @click.native="step = 2">Previous</v-btn>
                <v-btn color="primary" @click.prevent="submit">Save</v-btn>
                
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>         
              
        </v-container>    
    
    </v-content>

</template>

<script>
import axios from 'axios'
export default {

    name: 'registerForm',
data: () => ({
      step:1,
      registration:{
        name:null,
        email:null,
        password:null,
        file: null,
        interest: 'Books'
      },
      category:['Books','Game','Television','Politics']
  }),
  methods:{
      onPicture (e){
          this.registration.file = e.target.files[0]
      },
    submit() {
      let data = new FormData()
      data.append('name', this.registration.name)
      data.append('email', this.registration.email)
      data.append('password', this.registration.password)
      data.append('img', this.registration.file)
      data.append('interest', this.registration.interest)

      axios.post('http://localhost:3000/users/register', data)
      .then(data => {
          this.$router.push('/')
      })
      .catch(err => {
          console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
