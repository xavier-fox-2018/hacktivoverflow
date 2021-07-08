<template>
    <div class="container">
        <div class="rounded p-2 mb-3" style="background-color: #e3f2fd;">
            <div>
                <small>modified: {{ question.updatedAt }}</small>
            </div>
            <div class="mb-4"><h3>{{ question.title }}</h3></div>
            <div style="height: 60px;">
                
                <span style="font-size: 30px;" class="vote mr-1 align-middle" title="Comments">
                    <i class="fas fa-comments"></i>
                </span>
                <span class="btn btn-outline-dark mr-3">
                    0
                </span>
                <span style="font-size: 30px;" class="vote mr-1 align-middle" title="Upvote">
                    <i class="fas fa-thumbs-up"></i>
                </span>
                <span class="btn btn-outline-dark mr-3">
                    0
                </span>
                <span style="font-size: 30px;" class="vote mr-1 align-middle" title="Downvote">
                    <i class="fas fa-thumbs-down"></i>
                </span>
                <span class="btn btn-outline-dark mr-3">
                    0
                </span>
                <router-link :to="`/${question.QuestionId}`" class="btn btn-outline-warning mr-1">
                    <i class="fa fa-id-card"></i> Readmore
                </router-link>
                
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
