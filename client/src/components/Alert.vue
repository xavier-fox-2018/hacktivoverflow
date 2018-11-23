<template>
    <div class="alert" :class="alert" role="alert">
        {{ message }}
    </div>
</template>

<script>
export default {
    props:['message', 'alert']
}
</script>

