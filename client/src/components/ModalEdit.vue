<template>
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="editFunc">
                  <div class="form-group">
                      <label for="exampleInputEmail1">Title</label>
                      <input type="text" class="form-control" placeholder="Enter a title" v-model="data.title">
                  </div>

                  <VueEditor v-model="data.description"/>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editFunc">Submit</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
import config from '@/config.js'

export default {
  props:['data'],

  data(){
    return{
     
    }
  },
  components: {
    VueEditor
  },
  methods: {
    editFunc(){
      console.log(this.data)
      axios({
        method: 'PUT',
        url: config+'/questions/'+this.data._id,
        data: {
          title: this.data.title,
          description: this.data.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log('success')
          this.$emit('onupdate')
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }
}
</script>

