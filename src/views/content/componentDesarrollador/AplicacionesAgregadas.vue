<template>
  <v-container
    fluid
  >
    <base-material-card
      color="grey darken-3"
      title="Aplicaciones agregadas"
    >
      <v-data-table
        :headers="headers"
        :items="desserts"
        :page.sync="page"
        loading="false"
        loading-text="Loading... Please wait"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.image="{ item }">
          <div class="my-4">
            <v-img
              :src="`${urlImgApiGetter}/${item.image}`"
              width="100"
              height="100"
            />
          </div>
        </template>
        <template v-slot:item.category="{ item }">
          {{ item.categories.name }}
        </template>
        <template v-slot:item.price="{item}">
          <v-chip
            :color="item.price == 0 ? 'blue' : 'green'"
            dark
          >
            {{ item.price == 0 ? 'Gratis' : `$ ${item.price}` }}
          </v-chip>
        </template>
        <template v-slot:item.accion="{item}">
          <v-icon
            small
            class="mr-2"
            @click="editarAplicacion(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="eliminarAplicacion(item)"
          >
            mdi-delete
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
        editIndex: -1,
        headers: [
          {
            text: 'Id',
            align: 'start',
            value: 'id',
          },
          {
            text: 'Imagen',
            value: 'image',
            align: 'start',
            sortable: false,
          },
          {
            text: 'Nombre',
            align: 'start',
            value: 'name',
          },
          {
            text: 'Categoria',
            value: 'category',
            sortable: false,
          },
          { text: 'Precio', value: 'price' },
          {
            text: 'Acción',
            value: 'accion',
            sortable: false,
          },
        ],
      }
    },
    computed: {
      ...mapGetters('app', ['appsDevGetter']),
      ...mapGetters(['urlImgApiGetter']),
      desserts () {
        return this.appsDevGetter
      },
    },
    created () {
      this.getAllDevAction()
    },
    methods: {
      ...mapActions('app', ['getAllDevAction']),
      editarAplicacion (item) {
        // this.editIndex = this.desserts.indexOf(item)
        this.$router.push({
          path: `/me/app/edit/${item.slug}`,
        })
      },
      eliminarAplicacion (item) {
        const index = this.desserts.indexOf(item)
        this.$swal({
          title: '¿Estás seguro de que desea dar de baja esta aplicación?',
          text:
            'Será eliminada de forma permanente',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then(result => {
          if (result.value) {
            this.desserts.splice(index, 1)
            this.$swal({
              text: 'Su apicación ha sido eliminada exitosamente',
              icon: 'success',

            })
          }
        })
      },
    },
  }
</script>
