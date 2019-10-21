<template>
    <div class="modal fade bd-example-modal-lg" id="editModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Question</h5>
                    <button class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group d-flex flex-column">
                            <label for="title" class="text-left">Title</label>
                            <input type="text" class="form-control" v-model="currentQuestion.title" value="currentQuestion.title">
                        </div>
                        <div class="form-group d-flex flex-column mb-5 mt-0">
                            <label for="description" class="text-left">Description</label>
                            <vue-editor class="mb-4 pb-2 pt-1" v-model="currentQuestion.description"></vue-editor>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="editQuestion">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js';
import { mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
    name: 'EditModal',
    props: ['questionId', 'getonequestion'],
    data() {
        return {
            currentQuestion: {
                title: '',
                description: ''
            }
        }
    },
    components: {
        VueEditor
    },
    methods: {
        ...mapActions([
            'getQuestions'
        ]),
        getCurrentQuestion: function() {
            axios({
                method: 'GET',
                url: `${config.port}/questions/${this.questionId}`
            })
                .then((question) => {
                    this.currentQuestion.title = question.data.title;
                    this.currentQuestion.description = question.data.description;
                })
                .catch((err) => {
                    console.log('Get Current Question Error: ', err);
                });
        },
        editQuestion: function() {
            axios({
                method: 'PUT',
                url: `${config.port}/questions/${this.questionId}`,
                data: {
                    title: this.currentQuestion.title,
                    description: this.currentQuestion.description
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getCurrentQuestion();
                    this.getonequestion();
                    this.getQuestions();
                })
                .catch((err) => {
                    console.log('Edit Question Error: ', err);
                });
        }
    },
    created() {
        this.getCurrentQuestion();
        this.getonequestion();
    },
    watch: {
        questionId() {
            axios({
                method: 'GET',
                url: `${config.port}/questions/${this.questionId}`
            })
                .then((question) => {
                    this.currentQuestion.title = question.data.title;
                    this.currentQuestion.description = question.data.description;
                })
                .catch((err) => {
                    console.log('Populate Question Watch Error: ', err);
                });
        }
    }
}
</script>

<style>

</style>