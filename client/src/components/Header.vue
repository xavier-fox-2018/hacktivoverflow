<template>
    <div class="navbar navbar-light fixed-top" style="background-color: #e3f2fd;">
        <router-link to="/">
            <span class="navbar-brand">
                <img src="logo.png" style="height: 35px; width: auto;" />
            </span>
        </router-link>
        <div class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-1" type="text" placeholder="Search" aria-label="Search">
            <span v-if="token">
                <button class="btn btn-outline-primary mr-1" @click="showModal = true">
                    <i class="fa fa-question-circle"></i> Ask Question
                </button>
                <router-link to="/my-question" class="btn btn-outline-primary mr-1">
                    <i class="fa fa-address-card"></i> My Question
                </router-link>
                <button class="btn btn-outline-primary" @click="logout">
                    <i class="fa fa-user-alt-slash"></i> Logout
                </button>
            </span>
            <span v-else>
                <router-link to="/login" class="btn btn-outline-primary mr-1">
                    <i class="fa fa-sign-in-alt"></i> Login
                </router-link>
                <router-link to="/register" class="btn btn-outline-primary mr-1">
                    <i class="fa fa-id-card"></i> Register
                </router-link>
            </span>
        </div>
        <Modal v-if="showModal" @close="showModal = false" />
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { mapState } from 'vuex';

export default {
    components: {
        Modal
    },
    data: function() {
        return {
            showModal: false,
        };
    },
    computed: {
        ...mapState({
            token: state => state.token,
        }),
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$store.dispatch('setNullToken');
            this.$router.push('/');
        },
    },
};
</script>
