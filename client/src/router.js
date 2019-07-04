import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        }, {
            path: '/threads',
            name: 'threads',
            component: () => import('./views/Threads.vue'),
            children: [{
                path: ':id',
                name: 'threadDetail',
                component: () => import('./views/ThreadDetail.vue'),
            }]
        }, {
            path: '/articles',
            name: 'articles',
            component: () => import('./views/Articles.vue'),
            children: [{
                path: 'articles/:id',
                name: 'articleDetail',
                component: () => import('./views/ArticleDetail.vue'),
            }]
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/createArticle',
            name: 'crerateArticle',
            component: () => import('./views/CreateArticle.vue')
        },
        {
            path: '/createThread',
            name: 'crerateThread',
            component: () => import('./views/CreateThread.vue')
        }, 
        {
            path: '/userAccount',
            name: 'userAccount',
            component: () => import('./views/UserAccount.vue')
        },
        {
            path: '/storeApp',
            name: 'StoreApp',
            component: () => import('./views/StoreApp.vue')
        },
    ]
})