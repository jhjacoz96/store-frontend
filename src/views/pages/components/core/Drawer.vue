<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    absolute
    bottom
    temporary
    mobile-breakpoint="960"
    :right="$vuetify.rtl"
    app
    width="300"
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <v-list-item-title>Foo</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Bar</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Fizz</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Buzz</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <!-- <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    class="grey darken-4"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    dark
    elevation="4"
    absolute
    temporary
    width="300"
  >
    <v-list>
      <v-list-item
        two-line
        to="/a/apps"
      >
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-regular display-2"
          >
            <p class="logo-normal">
              <img
                src="logo.png"
                width="50"
                max-width=""
              >
              <span>APPstore</span>
            </p>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-for="item in itemsFilter"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-list-item-icon :v-if="item.id === 2">
          <v-icon>{{ item.icon }}</v-icon>x
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer> -->
</template>
<script>
  import {
    mapState, mapGetters, mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        group: null,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'drawer']),
      ...mapGetters('authentication', {
        user: 'userGetter',
        authenticated: 'authenticatedGetter',
      }),
    },
    watch: {
      group () {
        this.SET_DAWER(false)
      },
    },
    methods: {
      ...mapMutations(['SET_DAWER']),
    },
  }
</script>
