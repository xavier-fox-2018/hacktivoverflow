import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    navMessage:''
  },
  mutations: {
    signOut() {
      let self=this;
      firebase.auth().signOut().then(function() {
        self.state.navMessage = "success! Redirecting...";
        // Sign-out successful.
      }).catch(function(error) {
        console.log(error)
        // An error happened.
      });
    }
  },
  actions: {
    signOut(context) {
      let self=this;
      self.state.navMessage= "logging out...";
      setTimeout(function() {
        context.commit("signOut");
      }, 1000)
    }
  }
})
