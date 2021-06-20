<template>
  <!-- <v-text-field
    v-model="text"
    class="mr-3"
    :label="$t('search')"
    placeholder="¿Qué desea buscar?"
    filled
    rounded
    dense
    hide-details
    style="max-width: 250px;"
    append-icon="mdi-magnify"
    @click:append.prevent="buscar()"
  /> -->
  <!-- <v-autocomplete
      v-model="model"
      :items="entries"
      :loading="isLoading"
      :search-input.sync="search"
      color="white"
      hide-no-data
      clearable
      hide-selected
      item-text="Description"
      item-value="API"
      label="Public APIs"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
      return-object
    >
        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-title>
                    Busque su
                    <strong>aplicación</strong> favorita
                </v-list-item-title>
            </v-list-item>
        </template>
        <template v-slot:item="{ item }">
            <v-list-item-avatar>
                <v-img :src="`${urlImgApi}/${item.image}`" />
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title v-text="item.name" />
                <v-list-item-subtitle v-text="`$ ${item.price}`" />
            </v-list-item-content>
        </template>
    </v-autocomplete> -->
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="search"
        v-bind="attrs"
        class=""
        :label="$t('search')"
        placeholder="¿Qué desea buscar?"
        filled
        :loading="isLoading"
        rounded
        dense
        hide-details
        append-icon="mdi-magnify"
        style="max-width: 500px;"
        v-on="on"
      />
    </template>
    <v-list
      v-if="entries.length <= 0"
      class="text-center"
    >
      <v-list-item>
        <v-list-item-title>
          Busque su
          <strong>aplicación</strong>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list else>
      <v-list-item
        v-for="(item, index) in entries"
        :key="index"
        link
        :to="`/a/app/${item.slug}`"
      >
        <v-list-item-avatar>
          <v-img :src="`${urlImgApi}/${item.image}`" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="`$ ${item.price}`" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
  import axios from 'axios'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Buscar',
    data () {
      return {
        entries: [],
        isLoading: false,
        model: null,
        search: null,
      }
    },
    computed: {
      ...mapGetters({
        urlImgApi: 'urlImgApiGetter',
      }),
    },
    watch: {
      async search (val) {
        this.isLoading = true
        if (val) {
          const serviceResponse = await axios.get(`http://localhost:3000/api/app/search?search=${val}`)
          if (serviceResponse.data.ok) {
            this.entries = serviceResponse.data.products
            this.isLoading = false
            console.log(this.entries)
          } else {
            console.log('ha ocurrido un error')
          }
        } else {
          this.isLoading = false
          this.entries = []
        }
      },
    },
    methods: {
      ...mapActions('app', {
        searchApp: 'searchAppAction',
      }),
    },
  }
</script>
