<template>
    <section id="authors" class="my-5">
    <div class="container">
      <div class="row">
        <div class="col">
            <div class="info-header mb-5 mt-5 pr-0 mx-auto">
            <h1 class="text-primary pb-3 text-center">Post a Question</h1>
            </div>         
        </div>    
      </div>
      <div class="row">
          <div class="col">
               <form @submit.prevent="postQuestion" class="">
                  <div class="form-group">
                      <label for="exampleInputEmail1">Title</label>
                      <input type="text" class="form-control" placeholder="Enter a title" v-model="title">
                  </div>

                  <VueEditor v-model="description"/>
                  <button type="submit" class="btn btn-primary">Submit</button>
              </form>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import config from "@/config.js";
import { VueEditor } from 'vue2-editor'


export default {
  props:['checkToken'],

  data() {
    return {
      title: "",
      description: ""
    };
  },
  components: {
    VueEditor
  },

  methods: {
    postQuestion() {
      if (this.title.length > 0 && this.description.length > 0) {
        axios({
          method: "POST",
          url: config + "/questions",
          data: {
            title: this.title,
            description: this.description
          },
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            console.log(data);
            this.title = ''
            this.description = ''
            this.$router.push('/myquestions')
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created(){
    this.checkToken()
  }
};
</script>

