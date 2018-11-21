<template>
     <v-snackbar style="text-align:center" :color="warna" :top=true :timeout=2000 >
         <p>{{word}}</p>
       </v-snackbar>
</template>

<script>
export default {
    name: 'SnackBar',
    data(){
        return {
            show: false

        }
    },
    props: ['word','warna']
}
</script>

<style>

</style>
