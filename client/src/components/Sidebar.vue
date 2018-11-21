<template>
    <!-- SIDEBAR -->
    <div class="col-md-4">
        <div class="container">
            <div class="row ml-2 mt-2">
                <h3 class="text-center">Hot Questions</h3>
            </div>
            <hr class="mt-2">
            <div class=" bg-white mt-2 ml-2" v-for="question in questionList">
                <router-link :to="'/' + question._id">
                    <a >{{question.title}} </a>
                </router-link>
                <p class="text-muted ">asked by : {{question.owner.name}} </p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
            picked : []
        }
    },
    computed : mapState({
        questionList : state => state.questionList
    }),
    methods : {
        pickQuestion: function() {
        let limit = 0;
        if (this.questionList.length > 5) {
            limit = this.questionList.length / 2;
        }
        let arr = [];
        for(let i = this.questionList.length - 1; i > limit; i --) {
            arr.push(this.questionList[i])
        }
        this.picked = arr
        }
    },
    mounted () {
        this.pickQuestion()
    }
}
</script>
