<template>
  <v-container
    fluid
  >
    <base-material-card
      color="grey darken-3"
      title="Compras realizadas"
    >
      <v-data-table
        :headers="headers"
        :items="desserts"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.createdAt="{item}">
          {{ item.createdAt | moment('dddd, MMMM Do YYYY') }}
        </template>
        <template v-slot:item.quatity="{item}">
          {{ item.products.length }}
        </template>
        <template v-slot:item.price="{item}">
          <v-chip
            color="green"
            dark
          >
            $ {{ item.price }}
          </v-chip>
        </template>
        <template v-slot:item.accion="{item}">
          <v-icon
            small
            class="mr-2"
            @click="detailBuy(item)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          color="grey darken-1"
          :length="pageCount"
        />
        <v-text-field
          :value="itemsPerPage"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
        />
      </div>
    </base-material-card>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>{{ `Detalle de la compra #${viewItem.id}` }}</v-card-title>
        <v-divider />
        <v-card-text style="height: 300px;">
          <v-list
            two-line
            subheader
          >
            <v-subheader inset>
              Aplicaciones
            </v-subheader>
            <v-list-item
              v-for="(item, index) in viewItem.products"
              :key="index"
            >
              <v-list-item-avatar tile>
                <v-img :src="`${urlImgApi}/${item.image}`" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
                <v-list-item-subtitle v-text="item.Buy_Product.price == 0 ? 'Gratis' : `$ ${item.Buy_Product.price}`" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            right
            color="secondary"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        headers: [
          {
            text: 'Id',
            align: 'center',
            value: 'id',
          },
          {
            text: 'Fecha de compra',
            value: 'createdAt',
            align: 'center',
          },
          {
            text: 'Cantidad de aplicacines',
            align: 'center',
            value: 'quatity',
          },
          {
            text: 'Precio total',
            value: 'price',
            align: 'center',
          },
          {
            text: 'Acción',
            value: 'accion',
            align: 'center',
            sortable: false,
          },
        ],
        desserts: [],
        dialog: false,
        viewIndex: -1,
        viewItem: {},
      }
    },
    computed: {
      ...mapGetters({
        urlImgApi: 'urlImgApiGetter',
      }),
    },
    created () {
      this.getAll()
    },
    methods: {
      ...mapActions('buy', {
        getAllAction: 'getAllAction',
      }),
      async getAll () {
        const serviceResponse = await this.getAllAction()
        this.desserts = serviceResponse.buys
      },
      detailBuy (item) {
        this.viewIndex = this.desserts.indexOf(item)
        this.viewItem = Object.assign({}, item)
        console.log(this.viewItem)
        this.dialog = true
      },
      // editarAplicacion (item) {
      //   this.editIndex = this.desserts.indexOf(item)
      //   this.$router.push('/desarrollador/editar-aplicacion')
      // },
      // eliminarAplicacion (item) {
      //   const index = this.desserts.indexOf(item)
      //   this.$swal({
      //     title: '¿Estás seguro de que desea dar de baja esta aplicación?',
      //     text:
      //       'Será eliminada de forma permanente',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Confirmar',
      //     cancelButtonText: 'Cancelar',
      //   }).then(result => {
      //     if (result.value) {
      //       this.desserts.splice(index, 1)
      //       this.$swal({
      //         text: 'Su apicación ha sido eliminada exitosamente',
      //         icon: 'success',

      //       })
      //     }
      //   })
      // },
    },
  }
</script>
