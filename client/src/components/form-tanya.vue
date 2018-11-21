<template>
    <div class="container p-2 mt-2">
         <p v-if="form_add_question.succes" class="alert alert-success">
            <strong> Succes registered! </strong>
            <button class="close" type="button" data-dismiss="alert">
                <span @click="clear">&times;</span>
            </button>
        </p>
        <p  v-if="form_add_question.error" class="alert alert-danger">{{ form_add_question.error}}
            <button class="close" type="button" data-dismiss="alert">
                <span @click="clear">&times;</span>
            </button>
        </p>
        <div class="form-group">
            <label >Title : </label>
            <input v-model="form_add_question.title" type="text" class="form-control" placeholder="title pertanyaan...">
        </div>
        <div class="form-group">
            <textarea style="width: 100%" v-model="form_add_question.description" placeholder="description pertanyaan..."></textarea>
        </div>
        <button @click="add_question" type="submit" class="btn btn-primary">Submit</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props : ['jtoken'],
    data(){
        return{
            form_add_question : {
                succes : '',
                error : '',
                title : '',
                description : ''
            }
        }
    },
    methods : {
        ...mapActions(['initializePertanyaan']),
        clear : function(){
            this.form_add_question.succes = ''
            this.form_add_question.error= ''
            this.form_add_question.title = ''
            this.form_add_question.description = ''
        },
        add_question : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/pertanyaan',
                headers : { jtoken : this.jtoken},
                data : { title : this.form_add_question.title, description : this.form_add_question.description}
            })
            .then( ({ data }) => {
                this.clear()
                this.form_add_question.succes = 'Succes Add Question'
                this.initializePertanyaan()
            })
            .catch( ({response}) =>{
                this.form_add_question.error = response.data.message
            })
        }
    },
    created() {
        this.clear()
    },
    
}
</script>
