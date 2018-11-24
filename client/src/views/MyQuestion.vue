<template>
    <v-container grid-list-md fluid class="grey lighten-4">
        <alert :alert="alert" :alertType="alertType" :alertMessage="alertMessage"></alert>
        <v-layout row wrap v-if="isLogin">
            <my-question-card @show-edit-question-modal="showDialog" :getMyQuestions="getMyQuestions" :question="question" v-for="question in questions" :key="question._id"></my-question-card>
        </v-layout>
        <v-layout row justify-center>
            <edit-question-modal v-if="question" :question="question" @dismiss-dialog-and-save="dismissDialogAndSave" @dismiss-dialog="dismissDialog" :dialog="dialog"></edit-question-modal>
        </v-layout>
    </v-container>
</template>
<script>
import config from '@/config.js'
import MyQuestionCard from '@/components/MyQuestionCard.vue'
import EditQuestionModal from '@/components/EditQuestionModal.vue'
import Alert from '@/components/Alert.vue'


export default {
    components : {
        MyQuestionCard,
        EditQuestionModal,
        Alert
    },
    data (){
        return {
            questions : '',
            question : '',
            dialog : false,

            alert : false,
            alertType : '',
            alertMessage : ''
        }
    },
    computed : {
        isLogin (){
            return this.$store.state.isLogin
        }
    },
    methods : {
        getMyQuestions(){
            axios({
                method : 'GET',
                url : `${config.port}/questions/my`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.questions = response.data.data
            })
            .catch(error=>{
                console.log(error)
            })
        },
        dismissDialog(val){
            this.dialog = val
        },
        showDialog(val){
            this.dialog = true
            this.question = val
        },
        dismissDialogAndSave(val){
            this.dialog = false
            let data = val

            axios({
                method : 'PUT',
                url : `${config.port}/questions/${this.question._id}`,
                headers : {
                    token : localStorage.getItem('token')
                },
                data
            })
            .then(response=>{
                this.alert = true
                this.alertType = 'info'
                this.alertMessage = `Question ${data.title} Updated`

                setTimeout(this.dismissAlert,2000)

                this.getMyQuestions()
            })
            .catch(error=>{
                this.alert = true
                this.alertType = 'error'
                this.alertMessage = `Update Error`

                setTimeout(this.dismissAlert,2000)
                
                this.getMyQuestions()
            })
        },
        dismissAlert(){
            this.alert = false,
            this.alertType = '',
            this.alertMessage = ''
        }
    },
    mounted(){
        if(this.isLogin===true){
            this.getMyQuestions()
        }else if(!this.isLogin){
            this.$router.push('/signin')
        }
    },
    watch : {
        isLogin : function(val){
            if(!this.isLogin){
                this.$router.push('/signin')
            }else if(this.isLogin){
                this.getMyQuestions()
            }
        }
    }
}
</script>

