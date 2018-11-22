<template>
    <div class="container">

        <featuredArticle
            v-if="$route.name == 'articles'"
            :articles='articles'
        ></featuredArticle>

        <div class="row">
            <div class="col-3">
                <sidebar
                    :user='user'
                    :articles='articles'
                ></sidebar>
            </div>
            
            <div class="col-9">
                <div v-if="$route.name == 'articles'">

                    <div class="col px-5 pt-3">
                        <span>Items per Page : </span>
                        <select class="dropdown btn btn-info dropdown-toggle" v-model.number="itemPerPage">
                            <option>3</option>
                            <option>5</option>
                            <option>10</option>
                        </select>
                    </div>

                    <div v-for="article in articles.slice(pageStart,pageEnd)" :key="article._id">
                        <articleCard 
                            :logNotification='logNotification' 
                            :user='user' 
                            :article='article'
                            :fetchArticles='fetchArticles'
                        ></articleCard>
                    </div>

                    <div class="row p-2">
                        <div class="col-4 ">
                            <button v-if="start > 0" type="button" class="btn btn-info" @click="newerPost()">Newer Post</button>
                        </div>
                        <div class="col-4 text-center">
                            Page {{currentPage}} / {{Math.ceil(articlesDataLength / itemPerPage)}}
                        </div>
                        <div class="col-4 text-right">
                            <button v-if="end <= articlesDataLength" type="button" class="btn btn-info" @click="olderPost()">Older Post</button>
                        </div>
                    </div>
                </div>
                <transition name="fade" mode="out-in">
                    <router-view
                        v-if="$route.name == 'articleDetail'" 
                        :key="$route.params.id"
                        :logNotification='logNotification' 
                        :user='user'  
                        :articles='articles'
                        :fetchArticles='fetchArticles'
                    ></router-view>
                </transition>
            </div>
        </div>

        <chatcomponent :user='user'></chatcomponent>

    </div>
</template>

<script>


export default {
    props: ['logNotification','user'],
    components: {
        sidebar : () => import('../components/Sidebar.vue'),
        articleCard : () => import('../components/ArticleCard.vue'),
        chatcomponent : () => import('../components/Chat.vue'),
        featuredArticle : () => import('../components/FeaturedArticle.vue'),
    },
    data () {
        return {
            articles : [],

            itemPerPage : 10,
            currentPage : 1,
            start : 0,
            end : 3
        }
    },
    computed: {
        articlesDataLength : {
            get: function () {
                return [...this.articles].length
            },
            set : function(val) {
                return this.get = val
            }
        },

        pageStart : {
            get: function () {
                return this.start
            },
            set : function(val) {
                return this.start = val
            }
        },

        pageEnd : {
            get: function () {
                return this.end
            },
            set : function(val) {
                return this.end = val
            }
        },

    },
    created () {
    
    },
    mounted () {
        this.fetchArticles()
        this.end = this.itemPerPage
    },
    methods: {

        fetchArticles(){

            this.$server.get('/articles')
                .then((result) => {
                    this.articles = result.data
                }).catch((err) => {
                    console.log(err.response);
                });

        },

        olderPost() {
            this.pageStart += this.itemPerPage
            this.pageEnd += this.itemPerPage
            this.currentPage +=1
        },

        newerPost() {
            this.pageStart -= this.itemPerPage
            this.pageEnd -= this.itemPerPage
            this.currentPage -=1
        }        

    },
    watch: {
        itemPerPage : function(val) {
            this.end = Number(val)
            this.start = 0,
            this.end = val
        }
    }
}
</script>

<style>

</style>
