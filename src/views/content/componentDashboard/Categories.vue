<template>
  <v-container
    fluid
  >
    <lista-categorias />
  </v-container>
</template>

<script>
  export default {
    name: 'Categories',
    components: {
      ListaCategorias: () => import('../categorias/ListaCategorias'),
    },
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
  }
</script>
