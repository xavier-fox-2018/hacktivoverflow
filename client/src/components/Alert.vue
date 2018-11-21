<template>
    <v-alert
      v-if="alert"
      v-model="alert"
      :type="alertType"
    >
      {{alertMessage}}
    </v-alert>
</template>

<script>
export default {
    props : ['alert','alertType','alertMessage']
}
</script>

