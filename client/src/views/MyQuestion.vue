<template>
    <v-container grid-list-md fluid class="grey lighten-4">
        <v-layout row wrap v-if="isLogin">
            <my-question-card :question="question" v-for="question in questions" :key="question._id"></my-question-card>
        </v-layout>
    </v-container>
</template>
<script>
import config from '@/config.js'
import MyQuestionCard from '@/components/MyQuestionCard.vue'

export default {
    components : {
        MyQuestionCard
    },
    data (){
        return {
            questions : ''
        }
    },
    computed : {
        isLogin (){
            return this.$store.state.isLogin
        }
    },
    methods : {
        getMyQuestion(){
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
        }
    },
    mounted(){
        this.getMyQuestion()
    },
    watch : {
        isLogin : function(val){
            if(!this.isLogin){
                console.log('change in isLogin')
                this.$router.push('/')
            }
        }
    }
}
</script>

