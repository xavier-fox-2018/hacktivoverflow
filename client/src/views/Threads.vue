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

                <div class='list-group'>
                    <div v-for="thread in threads" :key="thread._id" class="goanim mb-0 list-group-item list-group-item-action">
                        <div @click="$router.push({name : 'threadDetail', params : {id : thread._id }})" class="d-flex justify-content-between  text-dark">
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
                            <div class='col-7 text-info hover'>
                                <h5 class="hover">{{thread.title}}</h5>
                                <span>
                                    <span v-for="(category,i) in thread.category" :key="i" class="badge badge-warning mx-1">Tag 1</span>
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

            }
        },
        mounted() {
            this.fetchThreads()
        },
        computed: {
            ...mapState([
                'threads',
            ])
        },
        methods: {
            ...mapActions([
                'fetchThreads'
            ])


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