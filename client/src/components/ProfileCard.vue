<template>
    <div v-if="user" class="mb-3">
        <div class=" bg-light card text-center">
            <img v-if="user.avatar" class="card-img-top" width="100%" height="150px" style="object-fit: cover;"  :src="user.avatar" alt="">
            <div class="card-body p-2">
                <i class="hover fa fa-edit fa-lg pull-right" @click="$router.push('/userAccount')"></i>
                <h5 class="">{{user.name}}</h5>
                <h6 class="">{{user.email}}</h6>
            </div>
            <div class="card-footer p-1">
                <!-- <button type="button" class="btn btn-sm btn-info mx-1 ">{{user.subscribers.length}} Subscibers</button> -->
                <button v-if="articles" type="button" class="btn btn-sm btn-danger mx-1 ">{{userArticles.length}} Articles</button>
                <button v-if="threads" type="button" class="btn btn-sm btn-info mx-1 ">{{userThreads.length}} Threads</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ['user','articles'],
    data () {
        return {
            userArticles : [],
            userThreads : []
        }
    },
    computed: {
        ...mapState(['threads'])
    },
    methods: {
        getUserArticles() {
            let inArtilces = [...this.articles]
            let result = inArtilces.filter( val => {
                return val.author._id == this.user._id
            })
            this.userArticles = result
        },

        getUserThreads() {
            let inThreads = [...this.threads]
            let result = inThreads.filter( val => {
                return val.author._id == this.user._id
            })
            this.userThreads = result
        }
    },
    watch: {
        articles : function() {
            if(this.user) {
                this.getUserArticles()
            }
        },

        threads : {
            handler : function() {
                if(this.user) {
                    this.getUserThreads()
                }
            },
            immediate : true
        }
    }

}
</script>

<style>

</style>
