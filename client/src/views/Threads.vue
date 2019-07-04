<template>
    <div class="container my-4">
        <div v-if="$route.name == 'threads'" class="row">
            <div class="col-3">
                <ProfileCard
                    :user='user'
                ></ProfileCard>
                <div v-if="user" @click="$router.push('/createThread')" class="d-flex justify-content-between goanim mb-3 list-group-item list-group-item-action bg-info text-dark" style="cursor : pointer;">
                    <h5 class="mb-1">  
                        <i class="fa fa-plus fa-lg "></i>
                        New Thread
                    </h5>
                </div>
            </div>
            <div class="col-9">
                <div class="col px-2 pb-2">
                    <span>Items per Page : </span>
                    <select class="dropdown btn btn-info dropdown-toggle" v-model.number="itemPerPage">
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                    </select>
                </div>

                <div class='list-group'>
                    <div v-for="thread in threads.slice(pageStart,pageEnd)" :key="thread._id" class="goanim mb-0 list-group-item list-group-item-action">
                        <div class="d-flex justify-content-between  text-dark">
                            <div class='col-3 d-flex justify-content-between text-secondary'>
                                <div class="text-center">
                                    <h5>{{thread.upVotes.length - thread.downVotes.length}}</h5>
                                    votes
                                </div>
                                <div class="text-center">
                                    <h5>{{thread.answers.length}}</h5>
                                    answers
                                </div>
                                <div class="text-center">
                                    <h5>{{thread.viewCount}}</h5>
                                    Views
                                </div>
                            </div>
                            <div class='col-7 text-info'>
                                <h5 @click="$router.push({name : 'threadDetail', params : {id : thread._id }})"  class="hover">{{thread.title}}</h5>
                                <span>
                                    <span v-for="(category,i) in thread.categories" :key="i" class="badge badge-warning mx-1">{{category}}</span>
                                </span>
                            </div>
                            <div class='col-2'>
                                <small class="text-secondary">{{thread.createdAt.slice(0,10)}}</small>
                                <br>
                                <span class="text-info">
                                    {{thread.author.name}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row p-2">
                        <div class="col-4 ">
                            <button v-if="start > 0" type="button" class="btn btn-info" @click="newerPost()">Newer Post</button>
                        </div>
                        <div class="col-4 text-center">
                            Page {{currentPage}} / {{Math.ceil(threadsDataLength / itemPerPage)}}
                        </div>
                        <div class="col-4 text-right">
                            <button v-if="end <= threadsDataLength" type="button" class="btn btn-info" @click="olderPost()">Older Post</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div v-if="$route.name == 'threadDetail'" class="row">
            <router-view
                :user='user'
                :logNotification='logNotification'
            ></router-view>
        </div>

        <chatcomponent :user='user'></chatcomponent>

    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'Threads',
        props: ['user','logNotification'],
        components: {
            ProfileCard : () => import('../components/ProfileCard.vue'),
            chatcomponent : () => import('../components/Chat.vue')
        },
        data() {
            return {
                itemPerPage : 5,
                currentPage : 1,
                start : 0,
                end : 3
            }
        },
        created () {
            this.end = this.itemPerPage
        },
        mounted() {
            this.fetchThreads()
        },
        computed: {
            threadsDataLength : {
                get: function () {
                    return [...this.threads].length
                },
                set : function(val) {
                    return this.get = val
                }
            },

            pageStart : {
                get: function () {
                    return this.start
                },
                set : function(val) {
                    return this.start = val
                }
            },

            pageEnd : {
                get: function () {
                    return this.end
                },
                set : function(val) {
                    return this.end = val
                }
            },

            ...mapState([
                'threads',
            ]),

        },
        methods: {
            ...mapActions([
                'fetchThreads'
            ]),

            olderPost() {
                this.pageStart += this.itemPerPage
                this.pageEnd += this.itemPerPage
                this.currentPage +=1
            },

            newerPost() {
                this.pageStart -= this.itemPerPage
                this.pageEnd -= this.itemPerPage
                this.currentPage -=1
            }
        },
        watch: {
            itemPerPage : function(val) {
                this.end = Number(val)
                this.start = 0,
                this.end = val
            }
        }
    }
</script>

<style scoped>
    .goanim {
        transition: .16s;
        margin-bottom: 5px;
    }

    .hover {
        cursor: pointer;
    }

    .goanim:hover {
        margin-left: -1%;
        margin-right: -1%;
        width: 102%;
    }
</style>