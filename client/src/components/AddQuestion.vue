<template>
    <!-- <div class="container mt-5"> -->
        <div class="card" v-if="isLogin">
            <div class="card-header title">
                Add Question
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" v-model="title" aria-describedby="emailHelp" placeholder="please type here">
                    </div>
                    <wysiwyg v-model="description"/>
                    <br>
                    <button type="submit" @click.prevent="publish" class="btn btn-secondary">publish</button>
                </form>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>

import { mapActions, mapState} from 'vuex'
export default {
    name: 'AddQuestion',
    data(){
        return{
            title: '',
            description: ''
        }
    },

    computed:{
        ...mapState(['isLogin', 'user'])
    },
    
    methods: {
        ...mapActions(['addQuestion']),

        publish(){
            let data = {title: this.title, description: this.description}
            this.addQuestion(data)
            this.title = ''
            this.description = ''
        }
    }


}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.title {
    text-align: center;
}

.btn-secondary {
    text-align: center;
}
</style>
