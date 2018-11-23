<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-success text-dark">
    <div class="container">
        <a v-if="user && user.role == 'admin'" class="nav-link" href="" @click.prevent="changeViewMode('adminView','main')">
            <div class="text-light">
                <i v-if="viewMode == 'adminView'" class="fa fa-unlock-alt fa-lg mx-1"></i>
                <i v-if="viewMode != 'adminView'" class="fa fa-lock fa-lg mx-1"></i>
                Admin Mode
            </div>
        </a>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li @click.prevent="changeViewMode('main','main')" class="nav-item active">
                    <a class="nav-link" href="">
                        <i class="fa fa-bicycle fa-lg"></i>
                        Products
                    </a>
                </li>
                <li v-if="user && user.role != 'admin'" @click.prevent="toggleDisplayCart() ; changeViewMode('main')" class="nav-item active">
                    <a class="nav-link" href="">
                        <i class="fa fa-lg fa-cart-plus"></i>
                        Cart
                        <span class="badge badge-pill badge-light"> {{ totalQtyOfCart }} </span>
                    </a>
                </li>
                <li v-if="user" class="nav-item active">
                    <a class="nav-link" href="" @click.prevent="changeViewMode('transactions','main')">
                        <i class="fa fa-lg fa-history"></i>
                        Transactions
                    </a>
                </li>
                <li v-if="user && user.role=='admin' " class="nav-item active">
                    <a class="nav-link" href="" @click.prevent="changeViewMode('report','main') ">
                        <i class="fa fa-sticky-note fa-lg"></i>
                        Report
                    </a>
                </li>
   
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    name : 'StoreNavBar',
    props: ['user','viewMode','totalQtyOfCart','toggleDisplayCart','changeViewMode','logout','toggleLoginRegister','getReport'],
    data () {
        return {
            websitename : 'H8ike'
        }
    }
}
</script>

<style>

</style>
