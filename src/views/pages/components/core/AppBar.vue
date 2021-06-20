<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="grey darken-4"
    height="75"
    dark
  >
    <!-- <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn> -->

    <!-- <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    /> -->
    <!-- <v-app-bar-nav-icon @click="setDrawer(!drawer)" /> -->
    <v-app-bar-nav-icon>
      <router-link to="/">
        <v-img
          class="mr-3"
          src="@/assets/logo.png"
          width="40"
          height="30"
        />
      </router-link>
    </v-app-bar-nav-icon>
    <v-spacer />
    <buscar />
    <v-spacer />
    <!--<v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>-->

    <div class="mx-3" />

    <v-btn
      icon
      rounded
      large
      class="ma-4"
      offset-y
      to="/me/list-heats"
    >
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn
      icon
      rounded
      large
      class="ma-4"
      offset-y
    >
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <div
      class="d-flex justify-center  align-center"
    >
      <v-menu
        rounded
        offset-y
        :close-on-content-click="false"
        :nudge-width="200"
        content-class="my-menu"
        bottom
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-if="countItems > 0"
            v-bind="attrs"
            min-width="0"
            text
            large
            class="ma-4"
            icon
            v-on="on"
          >
            <v-badge
              color="red"
              overlap
              bordered
            >
              <template v-slot:badge>
                <span>{{ countItems }}</span>
              </template>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
          <v-btn
            v-else
            class="ma-4"
            v-bind="attrs"
            min-width="0"
            text
            large
            icon
            v-on="on"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </template>
        <carrito />
      </v-menu>
    </div>

    <v-btn
      v-if="!token"
      class="ml-2"
      min-width="0"
      to="/login"
      dark
      large
      rounded
    >
      Identificate
      <v-icon class="ml-2">
        mdi-account
      </v-icon>
    </v-btn>
    <v-menu
      v-else
      rounded
      bottom
      offset-y
      content-class="my-menu"
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          text
          rounded
          v-bind="attrs"
          large
          v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
          <span>
            {{ user.username }}
          </span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <!-- <v-list rounded>
        <v-list-item-group>
          <v-chip
            class="ma-2"
            default
            color="blue"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-developer-mode</v-icon>
            </v-avatar>
            {{ user.rols.name }}
          </v-chip>
          <v-list-item @click="logoutAction()">
            <v-list-item-icon>
              <v-icon>
                mdi-exit-to-app
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-text v-text="'Salir'" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
      <v-list two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="`${urlImgApi}/user-default.jpg`" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              v-text="`Bienvenido ${user.username}`"
            />
            <v-list-item-subtitle v-text="`${user.rols.name}`" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list>
      <v-list rounded>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            link
            to="/me/apps/buys"
          >
            <v-list-item-icon>
              <v-icon v-text="`mdi-shopping`" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`Mis compras`" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="user.rols.id === 2"
            link
            to="/me/apps/added"
          >
            <v-list-item-icon>
              <v-icon v-text="`mdi-apps`" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`Mis pubicaciones`" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            @click="logout($route.path)"
          >
            <v-list-item-icon>
              <v-icon>
                mdi-exit-to-app
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Salir'" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  // import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',
    components: {
      Carrito: () => import('@/views/content/componentCompartidos/Carrito'),
      Buscar: () => import('@/views/content/componentCompartidos/Buscar'),
    },
    /* components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    }, */

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      text: '',
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
    }),
    computed: {
      ...mapState(['drawer']),
      ...mapGetters('authentication', {
        user: 'userGetter',
        token: 'tokenGetter',
        authenticated: 'authenticatedGetter',
      }),
      ...mapGetters('cart', {
        countItems: 'countItemsGetter',
      }),
      ...mapGetters({
        urlImgApi: 'urlImgApiGetter',
      }),
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions('authentication', {
        logout: 'logoutAction',
      }),
    },
  }
</script>
<style>
.my-menu {
  margin-top: 10px;
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  position: absolute;
  content: "";
  top: 0;
  right: 10px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
</style>
