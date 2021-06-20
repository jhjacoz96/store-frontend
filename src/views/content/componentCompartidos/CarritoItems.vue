<template>
  <div>
    <v-virtual-scroll
      :items="cart"
      :item-height="60"
      height="146"
      cart-height="26"
    >
      <template v-slot:default="{ item }">
        <v-list-item class="mb-2">
          <v-list-item-avatar tile>
            <v-img :src="`${urlImgApiGetter}/${item.image}`" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
            <v-list-item-subtitle v-text="item.price == 0 ? 'Gratis' : `$ ${app.price}`" />
          </v-list-item-content>
          <v-btn
            fab
            small
            right
            @click="removeFromCart(cart)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Carritocarts',
    props: {
      cart: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        apps: [],
      }
    },
    computed: {
      ...mapGetters(['urlImgApiGetter']),
    },
    methods: {
      ...mapActions('cart', ['removeFromCartAction']),
      removeFromCart (cart) {
        this.removeFromCartAction(cart)
      },
    },
  }
</script>
