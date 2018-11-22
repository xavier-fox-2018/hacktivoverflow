<template>
    <div class="container-fluid p-5 bg-light">
        <div class="row">
            <div class="col mx-auto" style="max-width: 890px;">
                <form>
                    <div class="form-group">
                        <input type="text" maxlength="50" class="form-control" v-model="newThreadModel.title" id="newThreadTitle" placeholder="Thread Title" required=1>
                    </div>
                    <div class="form-group">
                        <div v-if="newThreadModel.content" v-html="newThreadModel.content" class="bg-light p-3 mb-2"></div>
                        <vue-editor v-model="newThreadModel.content" id="newThreadContent"></vue-editor>
                    </div>
                    <div class="form-group">
                        <input type="string" v-model.number="newThreadModel.categories"  class="form-control" placeholder="Tags" >
                            <small> <i> tags : comma separated for multiple input </i> </small>
                        </div>
                    <input @click.prevent="submitThread" id="newthreadBtn" class="btn btn-warning pull-right mx-2" type="submit" value="Create">
                    <button @click.prevent="$router.push('/threads')" class="btn btn-success pull-right mx-2" >Back</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapActions } from "vuex";

export default {
    props: ['logNotification'],
    components: {
        VueEditor
    },
    data () {
        return {
            newThreadModel : {
                title : '',
                content : '',
                categories : ''
            },

        }
    },
    methods: {
        ...mapActions(['fetchThreads']),

        submitThread() {

            let categories = this.newThreadModel.categories.split(",").map(item => item.trim());
            this.newThreadModel.categories = categories
            
            this.$server.post('/threads', this.newThreadModel, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.logNotification(`Create Thread Success, Title : ${result.data.title}`, 'success', 4500)
                this.fetchThreads()
                this.$router.push(`/threads`)
            }).catch(() => {
                this.logNotification('Error when Creating Thread','danger')
            });

        },

    }

}
</script>

<style>

</style>
