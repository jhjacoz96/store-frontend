<template>
  <v-row v-if="!apps.length">
    <v-col class="text-center">
      <v-avatar size="100">
        <v-icon
          color="blue"
          x-large
        >
          mdi-magnify
        </v-icon>
      </v-avatar>
      <p class="font-weight-bold">
        No hay apliaciones disponibles
      </p>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col
      v-for="(app,index) in apps"
      :key="index"
      class="xs"
      sm="6"
      md="4"
    >
      <base-material-product
        :image="`${urlImgApiGetter}/${app.image}`"
      >
        <template v-slot:hoverButton>
          <v-btn
            outlined
            rounded
            color="white"
            :to="`/a/app/${app.slug}`"
          >
            Detalle
          </v-btn>
        </template>
        <v-card-text
          class="pt-6"
          style="position: relative;"
        >
          <div class="font-weight-light grey--text mb-2">
            {{ app.categories.name }}
          </div>
          <h3 class="display-2 font-weight red--text mb-2">
            {{ app.name }}
          </h3>
          <h4 class="my-2 display-4">
            {{ app.price == 0 ? 'Gratis' : `$ ${app.price}` }}
          </h4>
          <div class="font-weight-light mb-2">
            {{ app.description | filterDescription }}
          </div>
          <v-divider />
          <div class="font-weight-light my-2">
            Desarrollado por {{ app.users.username }}
          </div>
          <v-btn
            v-if="authenticated"
            :disabled="(user.id === app.users.id) || verifyBuy(app.id)"
            absolute
            color="red"
            class="white--text"
            fab
            large
            right
            top
            @click="addToCart(app)"
          >
            <v-icon>{{ verifyBuy(app.id) ? 'mdi-check' : 'mdi-cart' }}</v-icon>
          </v-btn>
        </v-card-text>
      </base-material-product>
    </v-col>
  </v-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ListaAplicaciones',
    filters: {
      filterDescription: function (value) {
        var description = value.length > 45 ? value.slice(0, 45) + '...' : value
        return description
      },
    },
    props: {
      apps: {
        type: Array,
        default: () => [],
        required: true,
      },
    },
    data () {
      return {
        buys: [],
      }
    },
    computed: {
      ...mapGetters(['urlImgApiGetter']),
      ...mapGetters('authentication', {
        user: 'userGetter',
        authenticated: 'authenticatedGetter',
      }),
    },
    created () {
      this.getBuys()
    },
    methods: {
      ...mapActions('cart', {
        addToCart: 'addToCartAction',
      }),
      ...mapActions('buy', {
        getAllBuy: 'getAllAction',
      }),
      async getBuys () {
        const serviceReponse = await this.getAllBuy()
        this.buys = serviceReponse.buys
      },
      verifyBuy (id) {
        if (this.buys.some(buy => {
          return buy.products.some(product => {
            return product.id === id
          })
        })) return true
        else return false
      },
    },
  }
</script>
