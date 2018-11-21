<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn slot="activator" color="primary" dark>Detail</v-btn>
      <v-card>
        <v-toolbar dark color="dark">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Detail</v-toolbar-title>
        </v-toolbar>
        <v-container>
        <v-layout row>
            <v-flex style="text-align:center" >
           <h1>{{questionDetail.title}}</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex style="text-align:center" >
       
           <p>
{{questionDetail.body}}
           </p>
            </v-flex>
        </v-layout>
        <v-container>
            <v-layout>
            <h4>add answer</h4>
            </v-layout>
            <v-layout style="padding-bottom:20px" >
            <v-flex md12 class="d-flex">
            <textarea v-model="word" style="background:#eee;" name="" id="" cols="30" rows="10"></textarea>
            </v-flex>
            <v-flex md12>
                <v-btn @click="submitAnswer">
                    submit
                </v-btn>
            </v-flex>
            </v-layout>
        </v-container>
        <h2>Answers</h2>
        <v-card v-for="element in filterComment()" :key="element._id" style="padding-bottom:20px; margin-bottom:20px">
            <v-layout row>
                <v-flex md2 class="d-flex" style="border-right:1px solid #eee">
            <v-avatar
          >
          <img  :src="element.userId.picture" alt="">
            </v-avatar>
                    <v-card-title>
                    {{element.userId.name}}
            </v-card-title>
                </v-flex>
                <v-flex>
                    {{element.word}}
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
<i @click="upvoteAnswer(element)" class="fa fa-caret-up" aria-hidden="true"></i>
<p>{{element.upvote.length - element.downvote.length}}</p>
<i @click="downvoteAnswer(element)" class="fa fa-caret-down" aria-hidden="true"></i>

            </v-flex>
            </v-layout>
            <i v-if="userAuth === element.userId.email" @click="deleteAnswer(element)" class="fa fa-trash" aria-hidden="true"></i>
        </v-card>
        </v-container>
      </v-card>
    </v-dialog>
    <div>
         <v-snackbar style="text-align:center" :color="warna" :top=true :timeout=2000 v-model="show">
         <p>{{msg}}</p>
       </v-snackbar>
    </div>
  </v-layout>
  
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";
import registerForm from "./registerForm.vue";

export default {
  name: "detailModal",
  props: ["questionDetail"],
  components: {},
  methods: {
    filterComment() {
      let data = this.allAnswer.filter(val => {
        return val.questionId._id == this.questionDetail._id;
      });
      return data;
    },
    submitAnswer() {
      let input = {
        word: this.word,
        token: localStorage.getItem("token"),
        id: this.questionDetail._id
      };
      this.$store.dispatch("addAnswer", input);
    },
    upvoteAnswer(input) {
      if (input.userId.email === localStorage.getItem("user")) {
        (this.show = true), (this.msg = "you can not vote yourself");
      } else {
        axios.post("http://localhost:3000/answer/upvote", {
          token: localStorage.getItem("token"),
          answerId: input._id
        })
        .then(data => {
            this.warna = 'success'
            this.msg ='succes upvote please reload page since there is some issue'
            this.show = true
        })
        
      }
    },
    downvoteAnswer(input) {
      if (input.userId.email === localStorage.getItem("user")) {
        (this.show = true), (this.msg = "you can not vote yourself");
      } else {
        axios.post("http://localhost:3000/answer/downvote", {
          token: localStorage.getItem("token"),
          answerId: input._id
        })
        .then(data => {
             this.warna = 'success'
            this.msg ='succes downvote please reload page since there is some issue'
            this.show = true
        })
      }
    },
    deleteAnswer(input){
        axios.delete('http://localhost:3000/answer/delete', {
            data: {
                answerId: input._id

            }
        })
        .then(data => {
            console.log(data)
             this.warna = 'success'
            this.msg ='succes DELETE please reload page since there is some issue'
            this.show = true
        })
    }
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      word: "",
      show: false,
      msg: "",
      warna: 'F44336',
      userAuth: localStorage.getItem('user')
    };
  },
  computed: {
    ...mapState(["allAnswer"]),
    ...mapGetters(["filterAnswer"])
  },
  created() {},
  mounted() {
    //   console.log(this.questionDetail)
  }
};
</script>
<style>
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
</style>
