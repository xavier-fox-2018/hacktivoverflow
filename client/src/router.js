import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/main',
            name: 'main',
            component: () =>
                import ('./views/Main.vue'),
            children: [{
                    path: '/',
                    name: 'main_content',
                    component: () =>
                        import ('./views/Main_Content.vue')

                }, {
                    name: 'detail',
                    path: ':id',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ './views/DetailQuestion.vue'),
                    props: true
                }, {
                    name: 'editquestion',
                    path: 'editquestion/:id',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ './components/EditQuestion.vue'),
                    props: true
                },
                {
                    name: 'editquestion',
                    path: 'editanswer/:id',
                    component: () =>
                        import ( /* webpackChunkName: "about" */ './components/EditAnswers.vue'),
                    props: true
                }
            ]
        },
        {
            path: '/livechat',
            name: 'livechat',
            component: () =>
                import ('./components/Chat.vue')
        }
    ]
})