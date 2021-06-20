<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-center font-weight-bold"
          v-text="`Carrito de compra`"
        />
        <v-list>
          <v-list-item-content>
            <v-list-item-subtitle
              v-if="cart.length <= 0"
              class="text-center"
              v-text="'Carrito vacío'"
            />
            <carrito-items
              v-else
              :cart="cart"
            />
          </v-list-item-content>
        </v-list>
        <v-divider />
        <v-list>
          <v-list-item>
            <v-list-item-title v-text="`Total: $ ${priceTotal}`" />
            <v-list-item-action>
              <v-btn
                :disabled="cart.length > 0 ? false : true"
                text
                left
                color="primary"
              >
                Eliminar carrito
              </v-btn>
              <v-btn
                v-if="authenticated"
                :disabled="cart.length > 0 ? false : true"
                right
                rounded
                color="red"
                @click.prevent="create(cart)"
              >
                Realize compra
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  import {
    mapGetters,
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    name: 'Carrito',
    components: {
      CarritoItems: () => import('../componentCompartidos/CarritoItems'),
    },
    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapGetters('cart', {
        cart: 'cartGetter',
        countItems: 'countItemsGetter',
        priceTotal: 'priceTotalGetter',
      }),
      ...mapGetters('authentication', {
        authenticated: 'authenticatedGetter',
      }),
    },
    created () {
      if (localStorage.getItem('cart')) {
        this.getCart()
      }
    },
    methods: {
      ...mapMutations('cart', {
        removeCart: 'removeCart',
      }),
      ...mapActions('cart', {
        getCart: 'getCartAction',
      }),
      ...mapActions('buy', {
        createBuy: 'createBuyAction',
      }),
      async create (cart) {
        var payload = {
          cart,
          price: this.priceTotal,
        }
        const serviceResponse = await this.createBuy(payload)
        if (serviceResponse.ok) {
          this.removeCart()
        }
      },
    },
  }
</script>
