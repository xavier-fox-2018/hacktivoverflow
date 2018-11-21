<template>
    <div class="container">
        <div class="rounded p-2 mb-3" style="background-color: #e3f2fd;">
            <div>
                <small>modified: {{ question.updatedAt }}</small>
            </div>
            <div><h3>{{ question.title }}</h3></div>
            <div style="height: 60px;">
                
                <span style="font-size: 48px; color: red;" class="vote mr-1 align-middle" title="Upvote: 0">
                    <i class="fas fa-laugh-squint"></i>
                </span>
                <span style="font-size: 48px; color: Dodgerblue;" class="vote mr-1 align-middle" title="Downvote: 0">
                    <i class="fas fa-grin-alt"></i>
                </span>
                
                <button
                    class="btn btn-outline-primary mr-1"
                    @click="showModalEdit = true"
                    title="Edit"
                ><i class="fa fa-edit"></i></button>
                <ModalEdit
                    v-if="showModalEdit"
                    :question="question"
                    @close="showModalEdit = false"
                />

                <button
                    class="btn btn-outline-danger mr-1"
                    @click="showModalDelete = true"
                    title="Delete"
                ><i class="fa fa-trash"></i></button>
                <ModalDelete
                    v-if="showModalDelete"
                    :QuestionId="question.QuestionId"
                    @close="showModalDelete = false"
                />

                <router-link :to="`/${question.QuestionId}`" class="btn btn-outline-warning mr-1">
                    <i class="fa fa-id-card"></i> Readmore
                </router-link>

            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    import ModalEdit from '@/components/ModalEdit.vue';
    import ModalDelete from '@/components/ModalDelete.vue';

    export default {
        data: function() {
            return {
                showModalEdit: false,
                showModalDelete: false,
            };
        },
        props: ['question'],
        components: {
            ModalEdit, ModalDelete,
        },
    }
</script>

<style scoped>
    .vote{
        cursor: -webkit-grab; cursor: grab;
    }
</style>
