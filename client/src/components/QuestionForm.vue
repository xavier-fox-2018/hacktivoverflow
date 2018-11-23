<template>
    <div class="container">
        <h1>New Question</h1>
        <hr>
        <form>
            <div class="alert alert-primary" role="alert" v-if="alert">
                {{ message }}
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Write title here" v-model="question.title">
            </div>
            <div class="form-group">
                <label>Content: </label>
                <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="question.detail"></textarea>
            </div>
            <button type="submit" class="btn btn-dark" @click.prevent="postQuestion">Submit</button>
        </form>

        {{ err }}
    </div> 
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            question: {
                title: "",
                detail: ""
            },
            alert: false,
            message: "",
            err: ""
        }
    },

    computed: {
    ...mapState(['allQuestions']) 
    },

    methods: {
        postQuestion: function() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/question',
                data: {
                    title: this.question.title,
                    detail: this.question.detail
                },
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.alert = true
                this.message = 'You have successfully created a new question'
                // console.log(response);
                console.log(this.allQuestions, 'questt');
                
                this.allQuestions.push(response)
                // this.$store.dispatch('getAllQuestions')
            })
            .catch( err => {
                console.log(err);
                this.alert = true
                this.message = err.response.data.msg
            })
        }
    }
}
</script>
