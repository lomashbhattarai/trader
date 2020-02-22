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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
