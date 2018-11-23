<template>
    <div id="card">
        <div class="card-body">
            <p class="card-text">{{question.body}} </p>
        </div>
        <div class="card-footer text-muted">
            posted by {{question.author.name}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['question']
}
</script>

<style>
#card-body{
    margin:10px;
}
</style>


