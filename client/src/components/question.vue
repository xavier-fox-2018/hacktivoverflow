<template>
    <div>
    <div>
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Vote</th>
      <th scope="col">View</th>
      <th scope="col">Answer</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(question, index) in listQuestions" :key="index">
        <router-link :to="`/${question._id}`">
        <td scope="row"><a href="http://" class="text-primary">{{question.title}}</a>
        </td>
        </router-link>
      <td>12</td>
      <td><td scope="row"><a href="http://" class="text-primary">{{question.answer.length}}</a></td>
    </tr>
  </tbody>
  </table>
  </div>
  </div>
</template>
<script>
export default {
    mounted() {
        this.getAll()
    },
    data(){
        return{
            listQuestions : []
        }
    },
    methods : {
        getAll : function(){
            axios.get('http://localhost:1313/questions')
                .then(data=>{console.log(data.data.data)
                    this.listQuestions = data.data.data
                })
                .catch(err=>{console.log(err)})
        }
    }
}
</script>




