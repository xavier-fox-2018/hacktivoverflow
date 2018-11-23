<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" flat >Add Question</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add Question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-text-field v-model="title" label="Title*" required></v-text-field>
              </v-flex>
              <v-flex  md12>

                <textarea v-model="body" name="Body" placeholder="Body" style="min-width: 500px" id="textarea" cols="30" rows="10"></textarea>
            <!-- <vue-editor>
            </vue-editor> -->
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
import { VueEditor } from 'vue2-editor'
export default {
    name: 'newQuestion',
    data: () => ({
      dialog: false,
      title: '',
      body: ''
    }),
    props: ['titleModal'],
    components: {
     VueEditor
    },
    methods: {
        submitQuestion (){
            let data = {
                title: this.title,
                body: this.body,
                token: localStorage.getItem('token')
            }
            this.$store.dispatch('addQuestion', data )
            this.dialog=false
        }
    }
}
</script>

<style>

</style>
