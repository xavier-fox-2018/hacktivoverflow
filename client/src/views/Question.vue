<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>
                <v-card>
                    <v-card-text>
                        <h6 class="title">{{question.title}}</h6>
                    <v-divider></v-divider>
                    <p class="subheaders">{{question.description}}</p>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card>
                    <v-card-text>
                        {{question.author.name}}
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import config from '@/config.js'

export default {
    data (){
        return {
            question : ''
        }
    },
    methods : {
        getQuestion (){
            axios({
                method : 'GET',
                url : `${config.port}/questions/${this.$route.params.questionId}`
            })
            .then(response=>{
                this.question = response.data.data
            })
            .catch(error=>{
                console.log(error)
            })
        }
    },
    mounted(){
        this.getQuestion()
    }
}
</script>

