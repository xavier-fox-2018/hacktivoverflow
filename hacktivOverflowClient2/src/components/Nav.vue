 <!-- Navigation -->
<template>
  <div class="nav-container">
    <!-- modal -->
    <!-- <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >create new task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="createTask"  @submit.prevent="createTask">
              Title: <input v-model="$store.state.newTask.title" type="text"> <br><br>
              Description: <br>
              <textarea rows="10" cols="15" v-model="$store.state.newTask.description" placeholder="describe the task..." /> <br><br>
              Points: <input v-model="$store.state.newTask.points" type="text" > <br><br>
              Assigned To: <input v-model="$store.state.newTask.assigned" type="text" > <br><br>
              <input  class=" btn btn-primary" type="submit"/>
            </form>
          </div>
        </div>
      </div>
    </div> -->
    <!--nav -->
    <nav class="navbar navbar-expand-lg fixed-top">
      <h3>Hacktiv Overflow</h3>
      <img src="../assets/hacktiv8_logo.png">
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <!-- modal toggler-->
          <li class="nav-item active" data-toggle="modal" data-target="#taskModal">
            <a class="btn btn-primary btn-sm" href="/"> Logout </a>
          </li>
        </ul>
      </div>
    </nav> 
  </div>
</template>  
<style>
 .navbar {
   background-color: rgba(0,0,0,0.9);
   color:whitesmoke;
 }
</style>
<script>
  export default {
    name: 'Nav',
    props:[],
    methods:{
      createTask() {
        let resetNewTask= {
          title:'',
          description:'',
          points: 0,
          assigned:'',
          status:'backlog'
        };
        this.$store.commit('createTask');
        this.$store.state.newTask = resetNewTask;
        $('#taskModal').modal('hide');
      }
    },
    watch: {
      loggedIn: function() {setTimeout(()=>{
        }, 2500)
      }
    }
  }
</script>
   
