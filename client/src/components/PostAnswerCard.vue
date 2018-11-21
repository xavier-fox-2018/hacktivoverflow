<template>
  <v-flex xs10 offset-xs1>
    <v-card>
        <v-alert v-if="alert" v-model="alert" dismissible :type="alertType">
            {{alertMessage}}
        </v-alert>
        <v-textarea
          class="pa-3"
          outline
          name="input-7-4"
          label="Write Your Answer Here"
          v-model="inputAnswer"
        ></v-textarea>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submitAnswer" outline round color="blue" class="ma-1">Submit</v-btn>
        </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import config from '@/config.js'

export default {
    props : ['getQuestion'],
    data (){
        return {
            inputAnswer : '',
            alert : '',
            alertType : '',
            alertMessage : ''
        }
    },
    methods : {
        submitAnswer(){
            let data = {
                description : this.inputAnswer
            }

            axios({
                method : 'POST',
                url : `${config.port}/answers/${this.$route.params.questionId}`,
                headers : {
                    token : localStorage.getItem('token')
                },
                data
            })
            .then(response=>{
                this.getQuestion()
                this.inputAnswer = ''
                this.alert = true
                this.alertType = 'info'
                this.alertMessage = 'Answer Posted'
            })
            .catch(error=>{
                this.alert = true
                this.alertType = 'error'
                this.alertMessage = `${error.response.data.message}`
                
            })
        }
    }
}
</script>

