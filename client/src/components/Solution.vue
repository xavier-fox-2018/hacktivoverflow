<template>
    <div class="media mb-4 mt-5">
            <div class="media-body">
              <h5 class="mt-0">{{ comment.user.name }}</h5>
                   <span  v-html="comment.comment"></span>
            </div>
            <div class="col" v-if="false">
                 <div class="row mt-4">
                     <alert></alert>
                </div>
                <div class="row">
                    <p class="btn btn-sm btn-success" @click="upVote(comment._id)">Vote <span>{{ comment.upVote.length }}</span></p>   
                    <p class="btn btn-sm btn-warning ml-3" @click="downVote(comment._id)">Down Vote <span>{{ comment.downVote.length }}</span></p> 
                
                </div>
            </div>
                
          </div>
</template>

<script>
export default {
    components: {
        Alert: () => import('@/components/Alert')
    },
    props: ['comment', 'message', 'alert'],
    data(){
        return{
           
        }
    },
    methods: {
        upVote(id){
            this.$emit('voteup', id)
        },
        downVote(id){
             this.$emit('votedown', id)
        }
    }
}
</script>

