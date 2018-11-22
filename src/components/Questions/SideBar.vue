<template>
<div id="mySidenav" class="sidenav">
    <ul id="left">
        <li><router-link to="/questions">Questions</router-link></li>
        <ul>
            <li v-for="(list, index) in questionList" :key="index" @click="sendQuestiontoParent(list)">
                <router-link :to="`/questions/${list._id}`" style="font-size:12px">{{list.title}}</router-link>
            </li>
        </ul>
    </ul>
</div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'

export default {
    name: 'SideBar',
    data() {
        return {
            
        }
    },
    methods: {
        sendQuestiontoParent: function (question) {
            this.$emit('sendQuestionId', question)
        },
        getQuestion () {
            this.$store.dispatch('storeQuestions_Action')
        }
    },
    computed: mapState ({
        questionList: state => state.questionList
    }),
    mounted: function() {
        this.getQuestion()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidenav {
    padding-top: 10px;
    height: 100%;
    width: 180px;
    position: absolute;
    left: 0;
    transition: 0.5s;
    border-right: 2px solid lightgray
}
ul#left {
    list-style: none;
    padding-left: 10px;
    text-align: left;
    color: #2c3e50
}
.sidenav li{
    margin-bottom: 10px;
}
a {
  font-weight: bold;
  color: black;
  font-size: 18px;
}

</style>
