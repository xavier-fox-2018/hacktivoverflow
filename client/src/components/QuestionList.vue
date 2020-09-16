<template>
    <div class="col-md-8 mt-0 rounded">
            <!-- header top question sama tombol tanya -->
        <div class="row">
            <div class="col">
                <h3>
                    Top Question
                </h3> 
            </div>
            <div class="col text-right">
                <ask-button v-if="isLogin" />
            </div>
        </div>    
        <hr>     
        <!-- disni pertanyaan -->
        <question-card v-for="question in questionList" v-bind:key="question._id" :question="question" />
    </div>
</template>

<script>
import AskButton from '@/components/AskButton.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import {mapState} from 'vuex'

export default {
    components : {
        AskButton,
        QuestionCard
    },
    computed : { ...mapState([
        'isLogin',
        'questionList'
    ])
    }
    
}
</script>
