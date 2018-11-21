<template>
<div class="container">
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">interesting</button>
        <button type="button" class="btn btn-secondary">featured</button>
        <button type="button" class="btn btn-secondary">hot</button>
        <button type="button" class="btn btn-secondary">week</button>
        <button type="button" class="btn btn-secondary">month</button>
    </div>
        <hr>
    <div class="card" mt-10>
        <div class="card text-center ml-2 mr-2 mb-2" v-for="question in questions" :key="question._id">
            <div class="card-body" mt-1 mr-1>
                <h5 class="card-title"> {{ question.title }} </h5>
                <p class="card-text" v-html="question.description"> </p>
                <a href="#" class="btn btn-secondary">readmore</a>
            </div>
            <div class="card-footer text-muted mb">
                <small class="form-text text">askedby: {{ question.userId.name }} | comment: {{ question.answerId.length }}</small>
                {{ question.likes.length }} &nbsp; <a href="" @click.prevent="likes(question._id)"><i class="fas fa-thumbs-up"></i> </a>
                &nbsp; &nbsp; &nbsp; &nbsp; {{ question.dislikes.length }} &nbsp; <a href="" @click.prevent="dislikes(question._id)"><i class="fas fa-thumbs-down"></i></a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'allQuestion',
    computed:{
        ...mapState(['isLogin', 'user', 'questions', ])
    },
    methods: {
        // ...mapActions(['likers']),
        likes(id){
			axios({
				url: `http://localhost:3000/questions/like/${id}`,
				method: 'PUT',
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response =>{
                this.$store.dispatch('getQuestion')
			})
			.catch(err =>{
				console.log(`data no found`);
			})
        },

        dislikes(id){
            axios({
                url: `http://localhost:3000/questions/unlike/${id}`,
				method: 'PUT',
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response =>{
                this.$store.dispatch('getQuestion')
			})
			.catch(err =>{
				console.log(`data no found`);
			})
            
        }
        


    },

    created() {
        this.$store.dispatch('getQuestion')
    },
}
</script>

<style>
.card{
    margin-top: 3%;

  /* left: 30px;
  border: 3px solid #543535; */
}
.btn-group {
    margin-top: 5%;
    /* position: relative; */
    left: 65%
}


</style>
