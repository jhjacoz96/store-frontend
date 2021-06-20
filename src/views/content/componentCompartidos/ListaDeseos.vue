<template>
  <v-container fluid>
    <v-row v-if="!listWish.length">
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
          No ha agregado aplicaciones
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        md="12"
        lg="4"
      >
        <template
          v-for="(item, index) in listWish"
        >
          <base-material-card-app
            :key="index"
            :app="item.Products"
          >
            <template v-slot:hoverButton>
              <v-btn
                outlined
                rounded
                color="white"
                :to="`/a/app/${item.Products.slug}`"
              >
                Detalle
              </v-btn>
            </template>
            <template v-slot:btnCart>
              <v-btn
                color="red"
                rounded
                @click="setItem(item.Products)"
              >
                <v-icon>
                  mdi-cart
                </v-icon>
              </v-btn>
            </template>
            <template v-slot:btnRemove>
              <v-btn
                fab
                small
                absolute
                right
                top
                color="grey darken-1"
                @click="removeWish(item.id)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </base-material-card-app>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'ListaDeseos',
    computed: {
      ...mapGetters('listWish', {
        listWish: 'listWishGetter',
      }),
    },
    created () {
      this.getAllWish()
    },
    methods: {
      ...mapMutations('cart', {
        setItem: 'setItem',
      }),
      ...mapActions('listWish', {
        getAllWish: 'getAllWishAction',
        removeWish: 'removeWishAction',
      }),
    },
  }
</script>
