<template>
    <v-dialog v-if="question" v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
               <v-text-field
                v-model="inputTitle"
                label="Title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                    class="pa-3"
                    name="input-7-4"
                    label="Question"
                    v-model="inputQuestion"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dismissDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dismissDialogAndSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props : ['dialog','question'],
    methods : {
        dismissDialog(){
            this.$emit('dismiss-dialog',false)
        },
        dismissDialogAndSave(){
            let data = {
                title : this.inputTitle,
                description : this.inputQuestion
            }
            this.$emit('dismiss-dialog-and-save',data)
        }
    },
    data (){
        return {
            inputTitle : 'Please wait....',
            inputQuestion : 'Please wait....'
        }
    },
    mounted (){
        this.inputTitle = this.question.title
        this.inputQuestion = this.question.description
    },
    watch : {
        question : function(val){
            this.inputTitle = this.question.title
            this.inputQuestion = this.question.description
        }
    }
}
</script>

