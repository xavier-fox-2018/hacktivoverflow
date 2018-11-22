<template>
    <div class="card" style="width: 100%"> 
        <div class="card-body">
            <h5 class="card-title text-center">{{ data.title }}</h5>
            <p class="card-text" v-html="data.description "></p> 
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from '@/config.js'

export default {
    props: ['updatedetail'],
   data(){
       return {
           data: {}
       }
   },
   methods: {
       getDetail(){
           axios({
               method: 'GET',
               url: config+'/questions/'+this.$route.params.id,
               headers: {
                   token: localStorage.getItem('token')
               }               
           })
           .then(({data}) => {
               console.log(data.data)
               this.data = data.data
           })
           .catch(err => {
               console.log(err)
           })
       }
   },
    created(){
        this.getDetail()
    },

    watch: {
        $route(){
            this.getDetail()
        },

        updatedetail(){
            this.getDetail()
            this.updatedetail = false
        }
    }
}
</script>

