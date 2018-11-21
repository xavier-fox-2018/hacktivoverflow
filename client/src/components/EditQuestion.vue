<template>
     <div class="card" v-if="isLogin">
            <div class="card-header title">
                Add Question
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" v-model="title" aria-describedby="emailHelp" placeholder="please type here">
                    </div>
                    <wysiwyg v-model="description"/>
                    <br>
                    <button type="submit" @click.prevent="publish" class="btn btn-secondary">publish</button>
                </form>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
