<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" >Edit</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-text-field v-model="title" label="Title*" required></v-text-field>
              </v-flex>
              <v-flex  md12>

                <textarea v-model="body" name="Body" placeholder="Body" style="min-width: 500px" id="textarea" cols="30" rows="10"></textarea>
              </v-flex>
            
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submitQuestion">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    name: 'editQuest',
    data: () => ({
      dialog: false,
      title: '',
      body: ''
    }),
    props: ['questVal'],
    componenets: {
     
    },
    cretaed(){
       
    },
    mounted(){
  this.title = this.questVal.title,
        this.body = this.questVal.body
    },
    methods: {
        submitQuestion (){
            let data = {
                title: this.title,
                body: this.body,
                token: localStorage.getItem('token'),
                id: this.questVal._id
            }

            axios.put('http://localhost:3000/question/update', {
                title: this.title,
                body: this.body,
                token: localStorage.getItem('token'),
                id: this.questVal._id
            })
            .then(data => {
                this.dialog = false
                this.$emit('editedQuest')
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
