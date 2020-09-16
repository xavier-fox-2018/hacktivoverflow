<template>
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
    computed : mapState({
        questionList : state => state.questionList
    })
}
</script>
