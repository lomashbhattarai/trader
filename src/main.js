import Vue from "vue";
import App from "./App.vue";
import store from './store'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import routes from './routes'
Vue.use(VueRouter);
const router = new VueRouter({
  routes 
})

const axios = require('axios');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect || location.href
      const tokens = redirect.split('#id_token=')[1]
      let [id_token,assess_token] =tokens.split('&access_token=')
      assess_token = assess_token.split('&expires_in=')[0]
      this.$store.commit('addToken',{id_token,assess_token})
      
      axios.get('https://stockfly.auth.us-east-2.amazoncognito.com/oauth2/userInfo', 
      {
        headers: 
        { 
          Authorization: `Bearer ${assess_token}` 
        }
      }).then(({data})=> {
        this.$store.commit('setUser',data)
        console.log(data.email)
        if(data.email){
          this.$store.dispatch('getUserDetails',{email: data.email})
        }
      })
  }
    
  }

    
}).$mount("#app");
