<template>
  <v-row v-if="!categorysGetter.length">
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
        No hay hay categorias disponibles
      </p>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col
      v-for="(categoria,index) in categorysGetter"
      :key="index"
      md="4"
      sm="6"
    >
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
      >
        <v-list-item
          class="text-center"
          three-line
        >
          <v-list-item-avatar
            tile
            size="80"
            color="grey"
          >
            <v-img
              src="@/assets/login.jpg"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ categoria.name }}
            </v-list-item-title>
            <v-list-item-title class="mb-2">
              Cantidad de aplicaciones:
            </v-list-item-title>
            <div class="overlay red--text mb-2">
              <h1>{{ categoria.products.length }}</h1>
            </div>
            <v-list-item-title>
              <v-btn
                color="red"
                rounded
                :to="`/a/${categoria.slug}`"
              >
                Ver
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        messages: 0,
        categorias: [
          {
            id: 1,
            nombre: 'Juegos',
            cantidadAplicaciones: 12,
          },
          {
            id: 1,
            nombre: 'Red social',
            cantidadAplicaciones: 12,
          },
          {
            id: 1,
            nombre: 'Diversión',
            cantidadAplicaciones: 12,
          },
        ],
      }
    },
    computed: {
      ...mapGetters('category', ['categorysGetter']),
    },
    created () {
      this.getAllAction()
    },
    methods: {
      ...mapActions('category', ['getAllAction']),
    },
  }
</script>
