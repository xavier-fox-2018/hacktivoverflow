<template>
    <div>
        <p>{{detail.content}}</p>
            <div v-if="token" class="form-group">
                <label for="exampleFormControlTextarea1">Give a answer </label>
                
                <input type="text" v-model="answer">
                <button @click="giveAnswer" class="btn btn-primary" type="submit"> Post</button>
            </div>
            <div>
                <router-view></router-view>
            </div>
            <div>
                <table class="table table-stripped">
                    <tr v-for="(item, index) in listAnswer" :key="index">
                        <td>
                            {{item.content}}
                        </td>
                        <td v-if="token">
                           <button @click="edit" type="submit">edit answer</button>
                        </td>
                        <td v-if="token"> 
                            <button @click="deleted" type="submit"> delete answer</button>
                        </td>
                    </tr>
                </table>
            </div>
            
    </div>
</template>
<script>
export default {
    props:['token'],
    data(){
        return{
            id : '',
            listAnswer : [],
            answer : '',
            detail : '',
        }
    },
    methods : {
        giveAnswer : function(){
            axios.patch(`http://localhost:1313/questions/${this.id}/answer`,{
                answer : this.answer
            })
                .then(data=>{
                    console.log(data.data.answer)
                    this.getAllDetail()
                    this.listAnswer = []
                })
                .catch(err=>{console.log('ndak dapet')})

        },
        getAllDetail : function(){
            this.id = this.$route.params.id
            axios.get(`http://localhost:1313/questions/${this.id}`)
            .then(data=>{console.log(data)
                this.detail = data.data.data
                this.listAnswer = data.data.data.answer
            })
            .catch(err=>{console.log(err)})
        },
        edit : function(){
            axios.patch(`http://localhost:1313/questions/${this.id}/edit`)
             .then(data=>{console.log(data)
                this.detail = data.data.data
                this.listAnswer = data.data.data.answer
            })
            .catch(err=>{console.log(err)})
        },
        deleted : function(){
            axios.delete(`http://localhost:1313/questions/${this.id}/delete`)
            .then(data=>{console.log(data)
                this.detail = data.data.data
                this.listAnswer = data.data.data.answer
            })
            .catch(err=>{console.log(err)})
        }
    },
    created() {
        this.getAllDetail()
    }
}
</script>
