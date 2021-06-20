<template>
  <v-row>
    <v-col
      cols="4"
      sm="3"
    >
      <v-select
        v-model="pageSize"
        :items="pageSizes"
        label="Items pr página"
        @change="handlePageSizeChange"
      />
    </v-col>
    <v-col
      cols="12"
      sm="9"
    >
      <v-pagination
        v-model="page"
        :length="totalPage"
        circle
        :total-visible="4"
        color="black"
        @input="handlePageChange"
      />
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'ListaAplicacionesPaginacion',
    props: {
      totalPage: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        page: 1,
        pageSize: 2,
        pageSizes: [3, 6, 9],
        apps: [],
      }
    },
    created () {
      this.retrieveApps()
    },
    methods: {
      handlePageChange (event) {
        this.page = event
        this.retrieveApps()
      },
      handlePageSizeChange (size) {
        this.pageSize = size
        this.page = 1
        this.retrieveApps()
      },
      async retrieveApps () {
        const params = this.getRequestParams(
          this.page,
          this.pageSize,
        )
        this.$emit('event', params)
      },
      getRequestParams (page, pageSize) {
        const params = {}
        if (page) {
          params.page = page - 1
        }
        if (pageSize) {
          params.size = pageSize
        }
        return params
      },
    },
  }
</script>
