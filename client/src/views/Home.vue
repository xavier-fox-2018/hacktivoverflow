<template>
    <div>
        <section id="welcome" class="jumbotron" style="max-height:700px">
            <div class="container text-center">
                <h1 style="font-size: 200px;">H8ike.id</h1>
                <p>Epriting about bike.</p>
                <p><a class="btn btn-a btn-lg" href="#services" role="button">Learn more</a></p>
            </div>
        </section>

        <section id="services" class="section-services">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2>Services</h2>
                        <h3 class="text-muted">Here are our specialties. </h3>
                    </div>
                </div>
                <br>
                <div class="row text-center">
                    <div class="col-md-4 hover" @click="$router.push('/threads')">
                        <i class="fa fa-users fa-10x"></i>
                        <h4>Community</h4>
                        <p class="text-muted">Where u can discuss about bike with people around the word.</p>
                    </div>
                    <div class="col-md-4 hover" @click="$router.push('/articles')">
                        <i class="fa fa-book fa-10x"></i>
                        <h4>Blog</h4>
                        <p class="text-muted">Wanna share Article ? h8ikeblog comes in pretty.</p>
                    </div>
                    <div class="col-md-4 hover" @click="$router.push('/products')">
                        <i class="fa fa-cart-plus fa-10x"></i>
                        <h4>Store</h4>
                        <p class="text-muted">Buy bike from official h8ike store and get the latest bike Engine.</p>
                    </div>
                </div>
            
            </div>
        </section>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .hover {
        cursor: pointer;
    }

    .gi-2x {
        font-size: 2em;
    }

    .gi-3x {
        font-size: 3em;
    }

    .gi-4x {
        font-size: 4em;
    }

    .gi-5x {
        font-size: 5em;
    }

    .btn {
        border-width: 0;
        border-radius: 3px;
        color: #2B3335;
    }

    .btn-a {
        background-color: #CFBBA9;
    }

    .btn-b {
        background-color: #AC9785;
    }

    .btn-c {
        background-color: #4E5356;
    }

    .btn-c span,
    .btn-c {
        color: #C5B1A7;
        font-weight: normal;
        font-size: 1em;
        line-height: 1em;
        display: inline-block;
        vertical-align: middle;
    }

    section {
        padding: 150px 0;
        color: #2B3335;
    }

    .section-services {
        background: #EBEDEC;
    }

    .section-contact {
        background: #C5B1A7;
    }

    .section-contact a {
        color: #2B3335;
        font-size: 1.5em;
    }

    .font-weight-normal {
        font-weight: normal;
    }

    .font-weight-bold {
        font-weight: bold;
    }

    section.jumbotron {
        background-image: url('../assets/wallpaperbike.jpg');
        background-size: cover;
        background-position: center center;
        color: white;
        position: relative;
        margin: 0;
    }

    section.jumbotron .container {
        /* padding: 30px 0; */
    }

    section.jumbotron:before {
        content: "";
        position: absolute;
        opacity: .5;
        background: #000;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    section.jumbotron .container {
        position: relative;
    }
</style>