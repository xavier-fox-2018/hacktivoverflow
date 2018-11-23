<template>
    <div class="container mt-5">

        <question/>
        <myquestion/>
    </div>
</template>

<script>
import question from '@/components/AddQuestion.vue'
import myquestion from '@/components/MyQuestion.vue'
import { mapActions, mapState} from 'vuex'
export default {
    // name: 'question',
    components: {
        question, myquestion
    },
    computed:{
        ...mapState(['isLogin', 'user'])
    },

    
}
</script>

<style>

</style>
