<template>
    <div class="container">
        <div class="row">
            <div>
                <button type="button" @click="$router.go(-1)" class="btn btn-success">Back</button>
            </div>
            <div class="col">
                <ThreadCard 
                    :thread='thread'
                    :user='user'
                    :logNotification='logNotification'
                ></ThreadCard>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';


export default {
    name : 'ThreadDetail',
    props: ['user','logNotification'],
    components: {
        ThreadCard : () => import('../components/ThreadCard.vue'),        
    },
    computed: {
        ...mapState([
            'thread'
        ])  
    },
    created () {
        this.fetchThread(this.$route.params.id)
    },
    methods: {
        ...mapActions([
            'fetchThread',
            'fetchThreads'
        ])

    },
    watch: {

        '$route.params.id': {
            handler: function(newVal) {
                let threadId = newVal
                this.$server.get(`/threads/updateViewer/${threadId}`)
                .then(() => {
                    this.fetchThread(threadId)
                    this.fetchThreads()
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            deep: true,
            immediate: true
        },

    },
}
</script>

<style>

</style>
