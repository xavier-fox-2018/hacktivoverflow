<template>
    <div>
        <div class="wrapper">

            <div class="container">
                <Navbar></Navbar>
                <QuestionsSection v-bind:user="user"></QuestionsSection>
            </div>

        </div>
    </div>  
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import QuestionsSection from '@/components/QuestionsSection.vue'

export default {
    components: {
        Navbar,
        QuestionsSection
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            user: {
                name: '',
                email: '',
                password: '',
                image: '',
                question_list: [],
                comment_list: []
            },
            question: {
                title: '',
                description: '',
                author: '',
                like: '',
                comment_list: []
            },
            comment: {
                user_comment: '',
                user_id: '',
                question_id: ''
            }
        }
        
    },
    methods: {
        getUserData() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/data',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(data => {
                    this.user._id = data.data.data._id
                    this.user.name = data.data.data.name
                    this.user.email = data.data.data.email
                    this.user.image = data.data.data.image

                    console.log('ini data dari homepage ' + JSON.stringify(data));
                    console.log(this.user);
                    
                    this.$emit('getuserdata', data)
                
                })
                .catch(err => {
                    console.log(err);
                
                })
            }
    },
    created() {
        if(this.token == null) {
            this.$router.push({name: 'Loginpage'})
        } else {
            this.getUserData()
        }

    },
    watch: {
        token(val) {
            if(val == null) {
                localStorage.removeItem('token')
                this.$router.push({name: 'Loginpage'})
            }
        }
    }
}
</script>
