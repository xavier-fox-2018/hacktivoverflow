<template>
    <div id="app">
        <Header />
        <main role="main" class="container-fluid">
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

    export default {
        components: {
            Header, Footer,
        },
        created() {
            this.$store.dispatch('getData');
        },
    };
</script>