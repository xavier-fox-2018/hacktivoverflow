<template>
    <div class="navbar navbar-light fixed-top" style="background-color: #e3f2fd;">
        <span class="navbar-brand">HacktivOverflowKu</span>
        <div class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-1" type="text" placeholder="Search" aria-label="Search">
            <router-link to="/login" class="btn btn-outline-primary mr-1">
                <i class="fa fa-sign-in-alt"></i> Login
            </router-link>
            <router-link to="/register" class="btn btn-outline-primary mr-1">
                <i class="fa fa-id-card"></i> Register
            </router-link>
            <button class="btn btn-outline-primary mr-1" @click="showModal = true">
                <i class="fa fa-question-circle"></i> Ask Question
            </button>
            <button class="btn btn-outline-primary">
                <i class="fa fa-user-alt-slash"></i> Logout
            </button>
        </div>
        <Modal v-if="showModal" @close="showModal = false" />
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
    components: {
        Modal
    },
    data: function() {
        return {
            showModal: false,
        };
    },
};
</script>
