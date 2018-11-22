<template>
    <div id="notification" style="display:block" class="alert alert-danger alert-dismissible fade show" role="alert">  
        {{error}}
        <button id="notifclose" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    
    
</template>

<script>
export default {
  name: "error",
  props: ["error"],
};

$("#notifclose").click(function() {
    $("#notification").hide()
})
</script>

<style>

</style>
