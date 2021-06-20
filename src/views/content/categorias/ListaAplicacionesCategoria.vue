<template>
  <v-container fluid>
    <base-v-component
      :heading=" category.name "
      :text="`${lengthApps} resultado(s) encontrado(s)`"
    />
    <lista-aplicaciones :apps="apps" />
    <lista-aplicaciones-paginacion
      :total-page="totalPage"
      @event="getAllEvent($event)"
    />
  </v-container>
</template>
<script>
  import { getCategoryApi } from '@/api/modules'
  export default {
    name: 'ListaAplicionesCategoria',
    components: {
      ListaAplicaciones: () => import('../componentCompartidos/ListaAplicaciones'),
      ListaAplicacionesPaginacion: () => import('../componentCompartidos/ListaAplicacionesPaginacion'),
    },
    props: {
      slugCategory: {
        type: String,
        default: '',
        required: true,
      },
    },
    data () {
      return {
        apps: [],
        category: '',
        totalPage: 2,
        lengthApps: 0,
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
      getAllEvent (params) {
        this.params.page = params.page
        this.params.size = params.size
        this.getAll()
      },
      async getAll () {
        const serviceResponse = await getCategoryApi(this.slugCategory, this.params)
        if (serviceResponse.ok) {
          console.log(serviceResponse)
          this.apps = serviceResponse.apps.apps
          this.totalPage = serviceResponse.apps.totalPages
          this.lengthApps = serviceResponse.apps.totalItems
          this.category = serviceResponse.category
        } else {
          const params = { text: serviceResponse.message }
          window.getApp.$emit('SHOW_ERROR', params)
        }
      },
    },
  }
</script>
