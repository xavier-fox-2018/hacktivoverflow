<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8" >
      
        <ThreadList></ThreadList>
      
    </div>
    <div class="col-md-2"></div>
</div>
</template>

<script>
// @ is an alias to /src
import ThreadList from '@/components/ThreadList'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'home',
  components: {
    ThreadList
  },
  data(){
    return {

    }
  },
  methods: {
    ...mapActions(['getThreads'])
  },
  computed: {
    ...mapState(['user'])
  },
  created(){
    this.getThreads()
  }
}
</script>
