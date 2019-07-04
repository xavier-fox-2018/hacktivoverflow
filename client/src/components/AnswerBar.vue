<template>
    <div class="">
        <ul class="list-group">
            <li v-for="answer in answers" :key="answer._id" class="list-group-item p-0">
                <div class="d-flex justify-content-between pl-0">

                    <div  style="width:80px;flex-direction:column; " class="text-center justify-content-between d-flex pl-0 py-3" >
                        <span>
                            <span v-if=" user && answer.user._id != user._id" style="cursor: pointer;" @click="upvote(answer._id)">
                                <i v-if=" user && answer.upVotes.indexOf(user._id) != -1" class="fa fa-thumbs-up fa-lg"></i>
                                <i v-else class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i>
                            </span>
                            <span>
                                <h4 class="mb-0 text-secondary">
                                    {{answer.upVotes.length - answer.downVotes.length}}
                                </h4>
                            </span>
                            <span v-if=" user && answer.user._id != user._id" style="cursor: pointer;" @click="downvote(answer._id)">
                                <i v-if=" user && answer.downVotes.indexOf(user._id) != -1" class="fa fa-thumbs-down fa-lg"></i>
                                <i v-else class="fa fa-thumbs-o-down fa-lg" aria-hidden="true"></i>
                            </span>
                        </span>
                        <span v-if=" user && answer.user._id == user._id" style="cursor: pointer;" @click="editAnswer(answer)" >
                            <i class="fa fa-pencil-square fa-lg"></i>
                        </span>
                    </div>

                    <span class="col p-3">
                        <div v-if="editAnswerModel._id != answer._id" v-html="answer.answer"></div>
                        <form v-if="editAnswerModel.answer && editAnswerModel._id == answer._id">
                            <div class="form-group">
                                <vue-editor v-model="editAnswerModel.answer" id="answerInput"></vue-editor>
                                <input type="submit" class="btn btn-sm btn-warning m-2 pull-right " @click.prevent="updateAnswer()" value="Update">
                                <input type="submit" class="btn btn-sm btn-info m-2 pull-right " @click.prevent="editAnswerModel = {}" value="Cancel">
                            </div>
                        </form>                      
                        <br>
                        <small  v-if="!editAnswerModel.answer"  class="pull-right text-right"> 
                            <h6 class="text-info">
                            - {{answer.user.name}}
                            </h6>
                            <i>at {{answer.createdAt.slice(0,10)}} </i> 
                        </small>
                    </span>
                    
                    
                </div>
            </li>
            
            <li v-if="user" class="list-group-item active">
                <form>
                    <div class="form-group bg-white">
                        <vue-editor  v-model="answerInput" placeholder="Type Your Answer..." id="answerInput"></vue-editor>
                        <input type="submit" class="btn btn-sm btn-warning mt-2 pull-right " @click.prevent="postAnswer()" value="Post Answer">
                    </div>
                </form>
            </li>

        </ul>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { VueEditor } from 'vue2-editor'

export default {
    props: ['thread','logNotification','user'],
    components: {
        VueEditor
    },
    data () {
        return {
            answerInput : '',
            editAnswerModel : {},

            answers : []
        }
    },
    created () {
        
    },
    methods: {
        ...mapActions([
            'fetchThread',
            'fetchThreads'
        ]),
        
        postAnswer() {

            if(this.answerInput.trim() == '') {
                return this.logNotification('Please Write your Answer','warning', 3000)
            }

            this.$server.post(`/answers/${this.thread._id}`, {
                answer : this.answerInput
            }, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(() => {
                this.answerInput = ''
                this.fetchThread(this.$route.params.id)
                this.fetchThreads()
            }).catch((err) => {
                this.logNotification(err.response, 'danger', 5000)
            });

        },

        upvote(answerId) {

            this.$server.post(`/answers/upvotes/${answerId}`, {}, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.logNotification(result.data.message, 'info', 3000)
                this.fetchThread(this.thread._id)
            }).catch((err) => {
                this.logNotification(err.response.data.message, 'danger', 3000)
            });

        },

        downvote(answerId) {

            this.$server.post(`/answers/downvotes/${answerId}`, {}, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.logNotification(result.data.message, 'info', 3000)
                this.fetchThread(this.thread._id)
            }).catch((err) => {
                this.logNotification(err.response.data.message, 'danger', 3000)
            });

        },

        editAnswer(answerObj) {

            this.editAnswerModel = {
                _id : answerObj._id,
                answer : answerObj.answer
            }

        },

        updateAnswer() {

            this.$server.put(`/answers/${this.editAnswerModel._id}`, this.editAnswerModel, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.logNotification(result.data.message, 'info', 3000)
                this.fetchThread(this.thread._id)
                this.editAnswerModel = {}
            }).catch((err) => {
                this.logNotification(err.response.data.message, 'danger', 3000)
            });

        }


        
    },
    watch: {
        thread : {
            handler : function(newVal) {
                this.answers = [...newVal.answers].sort((a,b) => {
                    return (b.upVotes.length-b.downVotes.length) - (a.upVotes.length-a.downVotes.length)
                })
            },
            deep: true,
            immediate: true
        } 
        
    }
}
</script>

<style>

</style>