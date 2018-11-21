<template>
<div>
    <!-- <question-list/> -->
    <!-- {{allQuestions}} -->

    <router-view/>
   
</div>
    
</template>

<script>
import navbar from '../components/navbar.vue'
// import questionList from '../components/questionList.vue'
import {mapState} from 'vuex'
export default {
    name: 'Main',
    components: {
        navbar,
        // questionList
    },
    data(){
        return{
          
        }
    },
    mounted (){
        this.$store.dispatch('getAllQuestion')
        if(localStorage.getItem('token') === null){
            this.$router.push('/')
        }
    },
    computed: {
        ...mapState([
            'allQuestions'
        ])
    }
}
</script>

<style>

</style>
