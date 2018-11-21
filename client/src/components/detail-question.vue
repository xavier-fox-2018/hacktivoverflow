<template>
     <div class="container bg-light">
    <!-- card of question -->
    <div class="bg-light">
        <profilepenanya :user_id="user_id" :jtoken="jtoken" :tanya="tanya"></profilepenanya>
        <div class="container">
          <div class="panel mx-auto border border-dark p-2" style="width : 80%">
            <p>{{ tanya.description}}</p>
          </div>
        </div>
    </div>

    <!-- Answer -->
    <div  class="container mt-2" id="answer">
       <div class="bg-light mb-2">
        <div class="bg-success rounded p-3">
        
          <h4 class="font-weight-bold"> Answer :</h4>

          <!--List of jawaban-->
          <div v-for="(jawab, index) in tanya.jawaban" :key="index" class="container">
            <profilepenjawab @deleteAnswer="findData" :jtoken="jtoken" :user_id="user_id" :jawab="jawab"></profilepenjawab>
          </div>
          
        </div>
       </div>
       
      </div>

      <div>
        <div class="form-group">
           <p v-if="form_add_answer.succes" class="alert alert-success">
              <strong> Succes registered! </strong>
              <button class="close" type="button" data-dismiss="alert">
                  <span @click="clear">&times;</span>
              </button>
          </p>
          <p  v-if="form_add_answer.error" class="alert alert-danger">{{ form_add_answer.error}}
              <button class="close" type="button" data-dismiss="alert">
                  <span @click="clear">&times;</span>
              </button>
          </p>
          <label for="exampleInputEmail1">Answer : </label>
          <textarea v-model="form_add_answer.isi" rows="4" class="form-control" placeholder="Your Answer ....">
          </textarea>
        </div>
        <button @click="add_answer" type="submit" class="btn btn-primary">Answer This Question</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import profilepenanya from '@/components/profile-penanya.vue'
import profilepenjawab from '@/components/profile-penjawab.vue'
export default {
  props : ['jtoken','user_id'],
  components : { profilepenanya, profilepenjawab },
    data(){
      return {
        tanya : {
          user: {
            name: '',
          },
          upvote :[],
          downvote:[],
          jawaban : [],
        },
        form_add_answer : {
          succes : '',
          error : '',
          isi :''
        }
      }
    },
    methods :{
      ...mapActions(['initializePertanyaan','findById']),
      findData: function( id ){
        axios({
        method : 'GET',
        url : `http://localhost:3000/pertanyaan/${id}`,
        headers : { jtoken : this.jtoken},
      })
      .then( ({ data }) => {
        this.tanya = data
      })
      .catch( ({ response}) => {
        console.log( response.data)
      })
      },
      clear : function(){
        this.form_add_answer.isi = ''
        this.form_add_answer.succes = ''
         this.form_add_answer.error = ''
      },
      add_answer : function(){
       
        axios({
          method : 'PUT',
          url : `http://localhost:3000/pertanyaan/add-jawaban/${this.$route.params.id}`,
          headers : { jtoken : this.jtoken},
          data : { isi : this.form_add_answer.isi}
        })
        .then( ({ data }) => {
            this.clear()
            this.form_add_answer.succes = 'Success Add Answer!'
            this.initializePertanyaan()
            this.findData(this.$route.params.id)
        })
        .catch( ({ response }) => {
          this.form_add_answer.error = response.data.message
        })
      }      

    },
    mounted() {
      this.clear()
      let pertanyaan_id = this.$route.params.id
      this.findData( pertanyaan_id )
      // this.findById(pertanyaan_id)
    },
    computed : {  
      jumlahVote : function(){
        if(this.tanya.upvote ){
          let vote = this.tanya.upvote.length - this.tanya.downvote.length
          if( vote <0) {
            return 0
          }
          return  vote
        }
      }
    }
}
</script>

