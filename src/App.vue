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
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn> 
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
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle>@username</v-list-item-subtitle>
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
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
      drawer: false,
      items:[
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
        title: 'Paper trading',
        routeName:'watchlist',
        icon:''
      },
      {
        title: 'Brokers',
        routeName:'brokers',
        icon:'  '
      },
      
      ]
  }),
};
</script>

<style  >
.mainTitle {
    text-decoration: none;
    color: black !important; 
}
</style>
