<template>
    <div class="container">
        <div class="rounded p-2 mb-3" style="background-color: #e3f2fd;">
            <div>
                <small>modified: {{ dataDetail.updatedAt }}</small>
            </div>
            <div><h3>{{ dataDetail.title }}</h3></div>
            <div v-html="dataDetail.content"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            dataDetail: {},
        };
    },
    created: function() {
        axios({
            method: 'GET',
            url: `http://localhost:3000/questions/${this.$route.params.QuestionId}`
        })
            .then(resolve => {
                this.dataDetail = resolve.data;
            })
            .catch(reject => {
                console.log(reject);
            });
    },
};
</script>
