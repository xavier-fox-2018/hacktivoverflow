<template>
  <v-flex xs10 offset-xs1>
    <v-card>
        <v-alert v-if="alert" v-model="alert" dismissible :type="alertType">
            {{alertMessage}}
        </v-alert>
        <v-card-text>
            <v-text-field
                v-model="inputTitle"
                label="Title"
            ></v-text-field>
        </v-card-text>
        <v-textarea
            class="pa-3"
            name="input-7-4"
            label="Write Your Question Here"
            v-model="inputQuestion"
        ></v-textarea>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submitQuestion" outline round color="blue" class="ma-1">Submit</v-btn>
        </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import config from '@/config.js'

export default {
    props : ['getQuestions'],
    data (){
        return {
            inputTitle : '',
            inputQuestion : '',
            alert : '',
            alertType : '',
            alertMessage : ''
        }
    },
    methods : {
        submitQuestion(){
            let data = {
                title : this.inputTitle,
                description : this.inputQuestion
            }

            axios({
                method : 'POST',
                url : `${config.port}/questions/create`,
                headers : {
                    token : localStorage.getItem('token')
                },
                data
            })
            .then(response=>{
                this.inputTitle = ''
                this.inputQuestion = ''
                this.alert = true
                this.alertType = 'info'
                this.alertMessage = 'Question Posted'
                this.getQuestions()
                
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

