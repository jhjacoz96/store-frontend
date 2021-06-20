<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <v-col
          md="4"
          sm="12"
        >
          <v-list-item>
            <v-list-item-content>
              <v-img
                :src="`${urlImgApi}/${app.image}`"
                max-width="300"
                max-height="250"
              />
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col
          md="6"
          sm="12"
        >
          <v-list>
            <v-list-item
              two-line
            >
              <v-list-item-content>
                <div>
                  <h1 class="font-weight-regular  red--text">
                    {{ app.name }}
                  </h1>
                </div>
                <div>
                  <h4 class="my-1 display-4">
                    {{ app.price == 0 ? 'Gratis' : `$ ${app.price}` }}
                  </h4>
                </div>
                <div class="mb-2">
                  <v-chip
                    class="ma-2"
                    outlined
                    text
                    color="pink"
                  >
                    <v-icon left>
                      category
                    </v-icon>
                    {{ app.categories.name }}
                  </v-chip>
                </div>
                <div>{{ app.description }}</div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item-action>
              <v-btn
                v-if="authenticated"
                text
                left
                rounded
                :color="colorWish ? 'primary' : 'secondary'"
                :disabled="disabledWish"
                @click="add(app.id)"
              >
                <v-icon>mdi-heart</v-icon>
                Añadir a la lista de deseos
              </v-btn>
              <v-btn
                v-if="authenticated"
                right
                rounded
                absolute
                large
                color="red"
                :disabled="disabledCart"
                @click="addToCart(app)"
              >
                {{ buy ? 'Comprada' : 'Agregar' }}
                <v-icon class="ml-1">
                  {{ buy ? 'mdi-check' : 'mdi-cart' }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <div class="text-center">
        <h1>Aplicaciones relacionadas</h1>
      </div>
      <articulos-relacionados :apps="relatedProducts" />
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'DetalleAplicacion',
    components: {
      ArticulosRelacionados: () => import('../componentCompartidos/ArticulosRelacionados'),
    },
    props: {
      slug: {
        type: String,
        default: '',
        required: true,
      },
    },
    data () {
      return {
        app: {},
        buys: [],
        relatedProducts: [],
        colorWish: false,
        buy: false,
      }
    },
    computed: {
      ...mapGetters('authentication', {
        user: 'userGetter',
        authenticated: 'authenticatedGetter',
      }),
      ...mapGetters('listWish', {
        listWish: 'listWishGetter',
      }),
      ...mapGetters({
        urlImgApi: 'urlImgApiGetter',
      }),
      disabledCart () {
        if (this.authenticated) {
          if ((this.user.id === this.app.users.id) || this.buy) return true
          else return false
        } else {
          return false
        }
      },
      disabledWish () {
        if (this.authenticated) {
          if (this.user.id === this.app.users.id) return true
          else return false
        } else {
          return true
        }
      },
    },
    created () {
      this.get()
      if (this.authenticated) {
        this.getAllBuy()
      }
    },
    methods: {
      ...mapActions('app', {
        getApp: 'getAppAction',
      }),
      ...mapActions('buy', {
        getAllBuyAction: 'getAllAction',
      }),
      ...mapActions('listWish', {
        getAllWish: 'getAllWishAction',
        addWish: 'addWishAction',
      }),
      ...mapActions('cart', {
        addToCart: 'addToCartAction',
      }),
      async get () {
        if (this.authenticated) {
          this.getAllWish()
        }
        const serviceResponse = await this.getApp(this.slug)
        if (serviceResponse.ok) {
          this.app = serviceResponse.product
          this.relatedProducts = serviceResponse.relatedProducts
        } else {
          this.$swal(
            '¡Disculpe!',
            'Ha ocurrido un error',
            'warning',
          )
        }
        if (this.authenticated) {
          this.getColorWish()
        }
      },
      async getAllBuy () {
        const serviceResponse = await this.getAllBuyAction()
        this.buys = serviceResponse.buys
        if (this.buys.some(buy => {
          return buy.products.some(product => {
            return product.id === this.app.id
          })
        })) this.buy = true
      },
      getColorWish () {
        var existe = this.listWish.find(item => {
          return item.Products.id === this.app.id
        })
        if (existe) {
          this.colorWish = true
        } else {
          this.colorWish = false
        }
      },
      add (id) {
        this.addWish(id)
        this.colorWish = !this.colorWish
      },
    },
  }
</script>
