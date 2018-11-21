<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h5>Update a question</h5> 
                    </div>
                    <div class="modal-body">
                        <label>Title</label>
                        <input class="form-control mb-4" type="text" placeholder="What's your programming question? Be specific." v-model="title" />
                        <label>Body</label>
                        <wysiwyg v-model="content" />
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary" @click="updateData">Update</button>
                        <button class="btn btn-outline-warning" @click="$emit('close')">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>  
    import axios from 'axios';
    
    export default {
        props: ['question'],
        data: function() {
            return {
                title: this.question.title,
                content: this.question.content
            };
        },
        methods: {
            updateData() {
                axios({
                    method: 'PUT',
                    url: `http://localhost:3000/questions/${this.question.QuestionId}`,
                    data: {
                        title: this.title,
                        content: this.content,
                    },
                })
                    .then(resolve => {
                        this.$store.dispatch('getData');
                        this.title = '';
                        this.body = '';
                        this.$emit('close');
                    })
                    .catch(reject => {
                        console.log(reject);
                    });
            },
        },
    };
</script>


<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
    
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        width: 60%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        max-height: 80%;
        overflow-y: auto;
    }
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    .modal-body {
        margin: 20px 0;
    }
    .modal-default-button {
        float: right;
    }
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>