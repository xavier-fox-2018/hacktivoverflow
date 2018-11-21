<template>
    <div class="media mb-4 mt-5">
            <div class="media-body">
              <h5 class="mt-0">{{ comment.user.name }}</h5>
                   <span  v-html="comment.comment"></span>
            </div>
                <p class="btn btn-sm btn-success" @click="upVote(comment._id)">Vote <span>{{ comment.upVote.length }}</span></p>   
                <p class="btn btn-sm btn-warning ml-3" @click="downVote(comment._id)">Down Vote <span>{{ comment.downVote.length }}</span></p>   
          </div>
</template>

<script>
export default {
    props: ['comment'],
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

