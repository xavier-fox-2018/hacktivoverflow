<template>
    <div>
        <div class="row mt-2">
            <div class="col-md-4 mr-0 pl-0">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <p class="my-0 border border-danger rounded px-0 mx-4 py-2">{{countVotes()}}</p>
                        <p class="text-muted my-0 py-2">Votes</p>
                    </div>
                    <div class="col-md-6 text-center">
                        <p class="my-0 border rounded px-0 border-success mx-4 py-2">{{votes}}</p>
                        <p class="text-muted my-0 py-2">Answers</p>
                    </div>
                </div>
            </div>
            <div class="col-md-8 ml-0 pl-0">
                <div class="container">
                <router-link :to="{path : `${question._id}`}">
                <a>{{question.title}} </a>
                </router-link>
                <p class="text-muted">asked by : {{question.owner.name}} </p>
                <div class="row">
                    <div class="col-md-2 mb-2">
                        <button data-toggle="modal" :data-target="`#no${question._id.substr(10, 16)}`" class="btn btn-info text-white" style="min-width: 70px;" @click="edit(question)">edit</button>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger text-white" @click="deletePost(question._id)">delete</button>
                    </div>
                </div>
                </div>
            </div>
        </div>     
        <hr class="mt-0"> 
        <!-- Modal -->
        <div class="text-left">   
            <div class="modal fade" :id="'no'+question._id.substr(10, 16)" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Question</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <div class="form-group">
                     Title
                    <input  v-model="editData.title" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label >Content</label>
                    <label for="comment">Your Answer:</label>
                    <textarea v-model="editData.content" class="form-control" rows="5" id="comment"></textarea> 
                </div>
                    <button type="button" class="btn btn-primary" @click="updateQuestion(editData)" data-dismiss="modal">Submit</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'OwnQuestion',
    props:['question'],
    data() {
        return {
            editData: {},
            votes: 0
        }
    },
    computed : mapState({
        isLogin : state => state.isLogin,
        questionList : state => state.questionList
    }),
    methods: {
        countVotes () {
            return (this.question.upvotes.length - this.question.downvotes.length)
        },
        deletePost (id) {
            if (confirm('are you sure to delete this post?')) {
                axios({
                    method: 'DELETE',
                    url: 'https://servtest.dhimas-hary.online/questions/' + id,
                    headers: {
                        'token' : localStorage.getItem('token')
                    }
                })
                .then(data => {
                    console.log(data)
                    this.$store.dispatch('getMyPost')
                })
                .catch(err=> {
                    console.log(err)
                })
            }
        },
        updateQuestion (data) {
            axios({
                method: 'PUT',
                url: 'https://servtest.dhimas-hary.online/questions/' + data._id,
                headers: {
                    'token' : localStorage.getItem('token')
                },
                data: {
                    'title': data.title,
                    'content': data.content
                }
            })
            .then(data=> {
                console.log(data)
                this.$store.dispatch('getMyPost')
            })
            .catch(err => {
                console.log(err)
            })
        },
        edit(question) {
            this.editData = {...question}
        },
        countAnswer(id) {
            axios({
                method: 'GET',
                url: 'https://servtest.dhimas-hary.online/answers/' + id
            })
            .then(data => {
                this.votes = data.data.answer.length
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.countAnswer(this.question._id)
    }
}
</script>

