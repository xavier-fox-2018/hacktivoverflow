<template>
    <div>
        <Card
            v-for="(data, index) in dataQuestion" :key="index"
            :question="{
                QuestionId: data._id,
                title: data.title,
                content: data.content,
                updatedAt: data.updatedAt,
            }"
        />
        <img src="@/assets/loading.gif" v-if="loadingGif" />
    </div>

</template>

<script>
    import Card from '@/components/Card.vue';
    import { mapState } from 'vuex';

    export default {
        components: {
            Card
        },
        computed: {
            ...mapState({
                dataQuestion: state => state.dataQuestion,
                loadingGif: state => state.loadingGif,
            }),
        },
    };
</script>