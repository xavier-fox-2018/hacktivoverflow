<template>
    <div>
        <div v-for="(tanya, index) in pertanyaan" :key="index" class="container">
        <div :id="tanya._id">
            <profilepenanya :user_id="user_id" :jtoken="jtoken" :tanya="tanya" :index="index"></profilepenanya>
            <bestanswer></bestanswer>
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import profilepenanya from '@/components/profile-penanya.vue'
import bestanswer from '@/components/best-answer.vue'
export default {
    props : ['jtoken','user_id'],
    components : { profilepenanya, bestanswer},
    methods : {
        ...mapActions(['initializePertanyaan'])
    },
    computed : {
     ...mapState(['pertanyaan'])
    },
    created() {
        this.initializePertanyaan()
    }
}
</script>
