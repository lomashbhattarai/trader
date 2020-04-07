<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
      :hide-on-scroll='true'
    >
      <div class="d-flex align-center">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <router-link :to="{name:'home'}" class="mainTitle">
           <h3>stockFly</h3>
          </router-link>
      </div>
      <v-spacer></v-spacer>
            <v-btn
              v-if="!user" 
              @click="goToLogin"
            text
            >
            <span class="mr-2">Login</span>
            <v-icon>mdi-account</v-icon>
          </v-btn> 
          <v-btn text v-else> Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        :right="false"
        absolute
        dark
        temporary
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user ? user.username : ''}}</v-list-item-title>
              <v-list-item-subtitle>@{{ user ? user.username : ''}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="{ name:item.routeName}">
                {{ item.title }}
                </router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-content>
      <keep-alive exclude="singlePage">
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
      drawer: false,
      items:[
      {
        title: "Today's Price",
        routeName:'home',
        icon:''
      },
      {
        title: 'Your Portfolio',
        routeName:'watchlist',
        icon:''
      },
      {
        title: 'Watch list',
        routeName:'watchlist',
        icon:''
      },
      {
        title: 'Chat groups',
        routeName:'brokers',
        icon:'  '
      },
      {
        title: 'Brokers',
        routeName:'brokers',
        icon:'  '
      },
      
      ]
  }),
  computed:{
    ...mapState(['user']),
  },
  methods:{
    goToLogin(){
      let client_id = '6145srbi3mf6bhqejrkr1p9r8a'
      let redirect_uri= 'https://lomashbhattarai.github.io/stocknepal/home'
      //redirect_uri = 'http://localhost:8080'
      window.location.href = `https://stockfly.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`
    }
  },
};
</script>

<style  >
.mainTitle {
    text-decoration: none;
    color: black !important; 
}
</style>
