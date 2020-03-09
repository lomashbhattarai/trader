<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
      
    >
      <div class="d-flex align-center">
        <router-link :to="{name:'home'}" tag="div">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
          </router-link>
          <h3> Stock Nepal </h3>
        
      </div>

      <v-spacer></v-spacer>
      <router-link :to="{name:'brokers'}">
        <v-btn
        text
      >
        <span class="mr-2">Brokers</span>
      </v-btn>
      </router-link>
    
      <router-link :to="{name:'watchlist'}">
        <v-btn
          text
        >
          <span class="mr-2">Watch list</span>
        </v-btn>
      </router-link>
            <v-btn
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      
    </v-app-bar>

    <v-content>
      <keep-alive>
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
    //
  }),
};
</script>
