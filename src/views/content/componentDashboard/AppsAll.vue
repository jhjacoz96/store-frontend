<template>
  <v-container fluid>
    <base-v-component
      :heading=" heading "
      :text="`Cantidad de aplicaciones encontradas (${ text })`"
    />
    <v-divider />
    <lista-aplicaciones :apps="apps" />
    <lista-aplicaciones-paginacion
      :total-page="totalPage"
      @event="getAllEvent($event)"
    />
  </v-container>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'AppAll',
    components: {
      ListaAplicaciones: () => import('../componentCompartidos/ListaAplicaciones'),
      ListaAplicacionesPaginacion: () => import('../componentCompartidos/ListaAplicacionesPaginacion'),
    },
    data () {
      return {
        heading: 'Aplicaciones',
        text: 22,
        apps: [],
        totalPage: 2,
        params: {
          page: 0,
          size: 2,
        },
      }
    },
    created () {
      this.getAll()
    },
    methods: {
      ...mapActions('app', ['getAllAction']),
      getAllEvent (params) {
        this.params.page = params.page
        this.params.size = params.size
        this.getAll()
      },
      async getAll () {
        var serviceResponse = await this.getAllAction(this.params)
        this.apps = serviceResponse.apps
        this.totalPage = serviceResponse.totalPages
      },
    },
  }
</script>
