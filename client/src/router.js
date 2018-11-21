import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: "link_active",
    linkExactActiveClass: "myLink",
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/questions',
            name: 'questions',
            component: () => import('./views/Question.vue'),
            children: [{
                path: '/questions/:id',
                name: 'currentQuestion',
                component: () => import('./components/OneQuestion.vue'),
                props: true
            },
            {
                path: '/',
                name: 'allquestions',
                component: () => import('./components/AllQuestions.vue'),
            }]
        },
        {
            path: '/**',
            name: 'notfound', 
            component: () => import('./views/NotFound.vue')
        }
    ]
});