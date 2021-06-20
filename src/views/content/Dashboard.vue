<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-parallax
      dark
      height="300"
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1 class="display-1 font-weight-thin mb-4">
            Vuetify
          </h1>
          <h4 class="subheading">
            Build your application today!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-tabs
      v-model="tab"
      background-color="grey darken-3"
      center-active
      dark
      centered
    >
      <v-tab
        v-for="item in items1"
        :key="item.id"
      >
        <router-link
          style="text-decoration: none; color: inherit;"
          :to="item.to"
        >
          {{ item.nombre }}
        </router-link>
      </v-tab>
    </v-tabs>
    <router-view name="apps" />
    <router-view name="categorys" />
    <v-fab-transition>
      <v-btn
        v-if="user ? user.rols.id === 2 : ''"
        fab
        dark
        fixed
        color="black"
        bottom
        right
        large
        to="/me/app/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'DashboardDashboard',
    data () {
      return {
        tab: null,
        items1: [
          {
            id: 1,
            nombre: 'Todas las aplicaciones',
            to: '/a/apps',
          },
          {
            id: 2,
            nombre: 'Categorias',
            to: '/a/categories',
          },
        ],
      }
    },
    computed: {
      ...mapGetters('authentication', {
        user: 'userGetter',
      }),
    },
  }
</script>
<style scoped>
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>>
