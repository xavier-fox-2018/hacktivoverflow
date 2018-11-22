<template>
  <div id="app">
    <navbar></navbar>
    
    <b-container>
      <b-alert :variant="varAlert"
            dismissible
            :show="showAlert"
            @dismissed="showDismissibleAlert=false">
          {{alertMessage}}
      </b-alert>
      <div class="row">
        <div class="col-md-3">
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
                <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                </span>
                </div>
            </div>
          </div>
         
        </div>
        <div class="col-md-9">
          <router-view/>

        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import {mapState} from 'vuex'
import AlertDismiss from '@/components/dismissable-alert.vue'
export default {
  components: {
    Navbar,
    AlertDismiss
  },
  computed: {
    ...mapState(['showAlert', 'varAlert', 'alertMessage', 'loginStatus'])
  },
  data(){
    return {
      showDismissibleAlert: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
