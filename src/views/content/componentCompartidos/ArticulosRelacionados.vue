<template>
  <v-row>
    <v-col>
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item
          v-for="(app, index) in apps"
          :key="index"
        >
          <base-material-product
            :image="`${urlImgApiGetter}/${app.image}`"
          >
            <template v-slot:hoverButton>
              <v-btn
                outlined
                rounded
                color="white"
                :to="`/a/app/${app.slug}`"
              >
                Detalle
              </v-btn>
            </template>
            <v-card-text
              class="pt-6"
            >
              <div class="font-weight-light grey--text mb-2">
                {{ app.categories.name }}
              </div>
              <h3 class="display-2 font-weight red--text mb-2">
                {{ app.name }}
              </h3>
              <h4 class="my-2 display-4">
                $ {{ app.price }}
              </h4>
              <div class="font-weight-light mb-2">
                {{ app.description }}
              </div>
            </v-card-text>
          </base-material-product>
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ArticulosRelacionados',
    props: {
      apps: {
        type: Array,
        default: () => [],
        required: true,
      },
    },
    data: () => ({
      model: null,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),
    computed: {
      ...mapGetters(['urlImgApiGetter']),
    },
  }
</script>
