<template>
    <transition name="fade" mode="out-in">
        <div v-if="thread.upVotes && thread.downVotes" class="col px-0 cardarticle">
            <div class="card">
            <div class="row no-gutters">

                <div  style="width:80px;flex-direction:column; " class="text-center bg-secondary py-3 justify-content-between d-flex  text-light" >
                    <span class="text-center list-item">
                        <h5>{{thread.upVotes.length - thread.downVotes.length}}</h5>
                        votes
                    </span>
                    <span class="text-center">
                        <h5>{{thread.answers.length}}</h5>
                        answer
                    </span>
                    <span class="text-center">
                        <h5>{{thread.viewCount}}</h5>
                        views
                    </span>
                </div>

                <div class="col">
                    <div class="card-block">
                        <div class="card-header">
                            <input v-if="editMode" type="text" maxlength="150" class="form-control" v-model="editThreadModel.title" id="editThreadTitle" placeholder="Thread Title" required=1>                        
                            <h4 v-if="!editMode" >{{thread.title}}</h4>
                             <span>
                                <span v-for="(category,i) in thread.categories" :key="i" class="badge badge-warning mx-1">{{category}}</span>
                            </span>
                        </div>
                        <div class="card-body">
                            <span v-if="!editMode">
                                <div v-if="$route.name == 'threadDetail'" v-html="thread.content"></div>
                            </span>
                            <vue-editor  v-if="editMode" v-model="editThreadModel.content" id="editThreadContent"></vue-editor>
                            <span v-if="editMode" class="text-centered row pull-right p-3 mx-auto">
                                <button type="button" class="btn btn-secondary m-3" @click="editMode = false">Cancel</button>
                                <button type="button" class="btn btn-warning m-3" @click="updateThread">Update</button>
                            </span>
                            
                        </div>
                        <div class="card-footer">
                            <small class="pull-right"><b>{{thread.author.name}}</b></small> <br>
                            <small class="pull-right"><i>{{thread.createdAt}}</i></small> <br>
                        </div>
                   
                    </div>
                </div>
                
            </div>
            <div v-if="$route.params.id === thread._id" class="card-footer">
                <div class=" d-flex justify-content-between p-2 px-5">
                    <span v-if=" user && thread.author._id != user._id" style="cursor: pointer;" @click="upvote()">
                        <i v-if=" user && thread.upVotes.indexOf(user._id) != -1" class="fa fa-thumbs-up fa-lg"></i>
                        <i v-else class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i>
                        <span class="badge badge-pill badge-danger">{{thread.upVotes.length}}</span>
                    </span>
                    <span v-if=" user && thread.author._id != user._id" style="cursor: pointer;" @click="downvote()">
                        <i v-if=" user && thread.downVotes.indexOf(user._id) != -1" class="fa fa-thumbs-down fa-lg"></i>
                        <i v-else class="fa fa-thumbs-o-down fa-lg" aria-hidden="true"></i>
                        <span class="badge badge-pill badge-danger">{{thread.downVotes.length}}</span>
                    </span>
                    <span>
                        <i class="fa fa-comments fa-lg"></i>
                        <span class="badge badge-pill badge-warning">{{thread.answers.length}}</span>
                    </span>
                    <span>
                        <i class="fa fa-eye fa-lg"></i>
                        <span class="badge badge-pill badge-success">{{thread.viewCount}}</span>
                    </span>
                    <span v-if=" user && thread.author._id == user._id" style="cursor: pointer;" @click="editThread()">
                        <i class="fa fa-pencil-square fa-lg"></i>
                    </span>
                    <span v-if=" user && thread.author._id == user._id" style="cursor: pointer;" @click="deleteThread()">
                        <i class="fa fa-remove fa-lg"></i>
                    </span>

                </div>
            </div>

            <div class="card-footer bg-light">
                <AnswerBar
                    :user='user'
                    :thread='thread'
                    :logNotification='logNotification'
                ></AnswerBar>
            </div>


        </div>
        
        

        </div>
    </transition>
</template>

<script>
import { mapActions } from "vuex";
import { VueEditor } from 'vue2-editor';


export default {
    props: ['user','thread','logNotification'],
    components: {
        AnswerBar : () => import('../components/AnswerBar.vue'),
        VueEditor
    },
    data () {
        return {
            editMode : false,

            editThreadModel : {
                title : this.thread.title,
                content : this.thread.content
            }
        }
    },
    computed: {
        
    },
    created () {

    },
    methods: {
        ...mapActions([
            'fetchThread',
            'fetchThreads'
        ]),
        
        upvote() {

            this.$server.post(`/threads/upvotes/${this.thread._id}`, {}, {
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

        downvote() {

            this.$server.post(`/threads/downvotes/${this.thread._id}`, {}, {
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

        editThread() {
            this.editMode = true
            this.editThreadModel = {
                title : this.thread.title,
                content : this.thread.content
            }
        },

        updateThread() {
            this.$server.put(`/threads/${this.thread._id}`, this.editThreadModel, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.logNotification(result.data.message, 'info', 3000)
                    this.fetchThreads()
                    this.fetchThread(this.thread._id)
                    this.editMode = false
                }).catch((err) => {
                    this.logNotification(err.response.data.message, 'danger', 3000)
                });
        },

        deleteThread() {

            this.$server.delete(`/threads/${this.thread._id}`, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(() => {
                this.logNotification(`Thread Deleted`, 'info', 3000)
                this.fetchThreads()
                this.$router.push('/threads')
            }).catch((err) => {
                this.logNotification(err.response.data.message, 'danger', 3000)
            });

        },

    },
    
}
</script>

<style>

</style>