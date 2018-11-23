<template>
    <div class="card" >
            <div class="card-header title">
                My Question
            </div>
            <div class="card-body">
                <div class="card text-center ml-2 mr-2 mb-2" v-for="question in myquestions" :key="question._id">
                <div class="card-body" mt-1 mr-1>
                    <h5 class="card-title"> {{ question.title }} </h5>
                    <p class="card-text" v-html="question.description">  </p>
                    <button type="button" class="btn btn-outline-secondary btn-sm">readmore</button>  
                    <button type="button" class="btn btn-outline-secondary btn-sm mr-1 ml-1">edit</button>
                    <!-- <button class="btn btn-sm btn-outline-primary" v-if="user._id == question.owner._id" @click="editData(question)">Edit</button> -->
                    <button @click="deleteMyquestion(question._id)" class="btn btn-sm btn-outline-danger ml-1" v-if="user._id == question.userId._id">Delete</button>
                    <!-- <button type="button" class="btn btn-outline-secondary btn-sm" @click="delete(question._id)">delete</button> -->
                </div>
                    <div class="card-footer text-muted mb">
                        <small class="form-text text">createdby: {{ question.userId.name }} | comment: {{ question.answerId.length }}</small>
                        {{ question.likes.length }} &nbsp; <i class="fas fa-thumbs-up"></i> &nbsp; &nbsp; &nbsp; &nbsp; {{ question.dislikes.length }} &nbsp; <i class="fas fa-thumbs-down"></i>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'myQuestions',
    computed:{
        ...mapState(['isLogin', 'user', 'myquestions'])
    },

    created() {
        this.$store.dispatch('myQuestion')
    },

    methods: {
        ...mapActions(['deleteQuestion']),
        deleteMyquestion (id) {
            swal({
                title: "Are you sure?",
                text: "remove this Question?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.deleteQuestion(id)
                    swal("Your question has been removed!", {
                        icon: "success",
                    });
                } else {
                    swal("Your question is safe!");
                }
            });
            
        },
    }
}
</script>

<style>

</style>
