<template>
  <div id="chat" class="my-5">
    <Navbar></Navbar>
    <div class="ui segment container" style="text-align:left">
        <div class="ui form">
          <div class="field">
            From : {{username}}<br />
            <label>Message</label>
            <textarea rows="2" placeholder="New Message" v-on:keyup.enter="sendMessage"></textarea>
          </div>
        </div>
    </div>
    <div v-show="messages.length == 0" class="ui segment container">
      <img src="https://www.emerson.co.jp/wcsstore/EmersonNorthstarSAS/images/colors/color1/loading.gif" style="width:250;height:250" alt="">
    </div>
    <div class="ui segment container">
      <div v-for="(message,index) in messages" :key="index" class="ui container" style="margin:10px;">
        <div style="text-align:left;padding:10px" v-if="message.username == username">
          <div class="container my-2" style="border: 1px solid grey;padding:10px">
            <p>me : <br> {{message.text}}</p>
            <span class="time-right">{{message.createdAt}}</span>
          </div>
        </div>  
        <div style="text-align:right;" v-else class="ui container">
          <div class="container darker my-2" style="padding:10px">
            <p class="mx-3 my-3">{{message.username}} said : <br> {{message.text}}</p>
            <span class="time-left">{{message.createdAt}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebaseApp from '../../config.js'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
export default {
    name: 'chat',
    data() {
        return {
            username: localStorage.getItem('email'),
            messages: [],
            db: firebaseApp.database()
        }
    },
    methods: {
      sendMessage(e) {
        e.preventDefault();
        if(e.target.value){
            const message = {
                username: this.username,
                text: e.target.value,
                createdAt: String(new Date())
            }
            console.log(message)
            // To-Do: Push message to firebase
            this.db.ref('messages').push(message);
            e.target.value = ''
        }
      },
      addZero(i) {
          if (i < 10) {
              i = "0" + i;
          }
          return i;
      }
    },
    mounted(){
      axios.get(`http://localhost:3000/verify`,{
        headers:{
          token : localStorage.getItem("token")
        }
      })
      .then(() => {
        console.log('masuk')
        let self = this;
        // this.db.ref('me').on('value', snapshot => {
        //   console.log(snapshot.val())
        // })
        const itemsRef = this.db.ref('messages');
        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            let messages = [];
            Object.keys(data).forEach(key => {
                messages.push({
                    id: key,
                    username: data[key].username,
                    text: data[key].text,
                    createdAt: `${new Date(data[key].createdAt).getHours()}:${this.addZero(new Date(data[key].createdAt).getMinutes())}`
                });
            });
            self.messages = messages;
        });
      })
      .catch(()=>{
        this.$router.replace('/')
      })
    },
    components:{
      Navbar
    }
}
</script>
<style>

  .darker {
      border-color: #ccc;
      background-color: #ddd;
  }

  .container::after {
      content: "";
      clear: both;
      display: table;
  }
  .time-right {
      float: right;
      color: #aaa;
      text-align: right;
  }
  .time-left {
      float: left;
      color: #999;
      text-align: left;
  }
</style>
