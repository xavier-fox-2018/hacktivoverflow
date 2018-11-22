<template>
  <div class="pageContent">
    <h1>Have Something in Your Thoughts?</h1>
    <form>
    <div class="form-group">
      <label for="question_title">Question Title</label>
      <input type="text" class="form-control" v-model="addQ_title" id="question_title" placeholder="What Should I Name My Question?">
    </div>
    <div class="form-group">
      <label for="question_description">Question Description</label>
      <input type="text" class="form-control" v-model="addQ_description" id="question_description" placeholder="Description . . .">
    </div>

    <button v-if="token" type="submit" class="btn btn-primary" @click.prevent="addQuestion()">Submit</button>
    <div v-else>
      <button disabled class="btn btn-primary">Submit</button>
      <p>Only registered user may submit a Question!</p>
    </div>
  </form>
  </div>
</template>



<script>

export default {

  data () {
    return {
      token: localStorage.getItem('token'),
      addQ_title: "",
      addQ_description: "",
      error_status: false,
      error_msg: "",
    }
  },
  methods: {
    addQuestion: function() {
      let data = {
        title: this.addQ_title,
        description: this.addQ_description,
        userId: this.$store.state.decoded._id
      }
      this.$store.dispatch('addQuestion_Action', data)
    }
  }
}
</script>

<style scoped>
.separator {
  border: 1px solid lightgray;
  margin: 10px
}
.pageContent {
  margin-left: 180px;
  padding: 50px
}

</style>
