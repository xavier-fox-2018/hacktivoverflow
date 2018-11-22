<template>
  <div class="container">
    <!-- navbar -->
    <Nav/>

    <div class="row">
      <div class=col-8>
        <div class="card-question" >
          <div class="card-header text-white bg-danger">Question
            <span>Person: {{}}</span>
            <span>Date: {{}}</span>
          </div>
          <div class="card-body text-grey">
            <h5 class="card-title">
              What is the real value of Facebook?
            </h5>
            <a class="btn btn-primary text-white btn-sm" @click="toggleEditor"  >add answer</a>
          </div>
        <div class="card  mb-2" >
          <div class="card-header text-white bg-success">
            Answer
            <a href="#">
              <span class="oi oi-thumb-up" title="person" aria-hidden="true"></span>
            </a>
            <a href="#">
              <span class="oi oi-thumb-down" title="person" aria-hidden="true"></span>
            </a>
          </div>
          <div class="card-body text-grey">
            <span class="oi oi-check" title="person" aria-hidden="true"></span>
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div>
          <div ref="editor" v-show="showEditor" id="froala-editor"></div>
          <div class="card" style="border: 1px solid #f1f1f1fsdfsd">
            <div id="preview" class="fr-view"></div>
          </div>
          <button id="submit" title="Submit Answer" @click="getEditorHTML">Submit</button>
        </div>

      </div>
      <div class=col-4>

      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import Nav from '../components/Nav.vue'
  export default {
    name: 'Home',
    props: {
      msg: String,
    },
    components: {
      Nav
    },
    data(){
      return {
        allQuestions:[],
        currentQuestion: {},
        answers:[],
        showEditor:true,
        editorHTML:'',
        questionId:'',
      }
    },
    beforeCreate() {
     $(function() { $('div#froala-editor').froalaEditor({iframe: true}) });
    },
    created() {
      let self= this;
      firebase.auth().onAuthStateChanged(function(user){
      console.log('created',user)
        user ? self.$store.state.user = user.providerData : null;
        if(!user) {
          self.$router.push('/')
        }
      });
      // db.ref('questions').get()
      // .orderBy('upvotes', 'desc')
      // .then( results => {
      //   results.forEach(result => this.allQuestions.push(result));
      // })
      // .catch(err => console.log(err))
    },
    questionDetails(questionId) {
      db.ref('answers').where('questionId','==',questionId)
      .then(results => {

      })
      .catch(err => console.log(err))
    },
    methods:{
      signOut(){
        console.log('si')
        let self = this;
        firebase.auth().signOut().then(function() {
          var user = firebase.auth().currentUser;
          console.log('====')
          console.log(user)

          self.$router.push('/')
        }).catch(function(error) {
          console.log(error)
        });
      },
      toggleEditor() {
        this.showEditor= !this.showEditor;
        this.$refs["editor"].display="block";
        this.$refs["editor"].opacity=1;
      },
      getEditorHTML() {
        // console.log($('div#froala-editor').froalaEditor('html.get'));
        this.editorHTML=$('div#froala-editor').froalaEditor('html.get');
         $(function() {
          $('div#froala-editor').froalaEditor()
          .on('froalaEditor.contentChanged', function (e, editor) {
            $('#preview').html(editor.html.get());
          })
        });
      },
      postAnswer() {
        let self= this;
        let answersRef= db.collection('answers')
        answersRef.add({
          body:self.editorHTML,
          lastEdit:Date.now(),
          userId: 'x'
,          questionId: self.currentQuestion.id  
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card-question {
  margin-top: 100px;
  max-width: 800px;
}
#froala-editor{
  display: block;
  transition: opacity 1s ease-out;
  opacity: 1; 
}

</style>

