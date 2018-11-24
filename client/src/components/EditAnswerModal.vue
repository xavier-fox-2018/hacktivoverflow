<template>
     <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Answer</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-textarea
                    class="pa-3"
                    name="input-7-4"
                    label="Answer"
                    v-model="inputAnswer"
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
    props : ['dialog','answer'],
    methods : {
        dismissDialog(){
            this.$emit('dismiss-dialog',false)
            console.log(this.answer)
        },
        dismissDialogAndSave(){
            let data = {
                description : this.inputAnswer
            }

            this.$emit('dismiss-dialog-and-save',data)
        }
    },
    data (){
        return {
            inputAnswer : ''
        }
    },
    mounted (){
        this.inputAnswer = this.answer.description
    },
    watch : {
        answer : function(val){
            this.inputAnswer = this.answer.description
        }
    }
}
</script>

<style>

</style>
