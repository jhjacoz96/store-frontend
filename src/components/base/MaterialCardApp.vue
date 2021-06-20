<template>
  <v-hover
    v-slot:default="{ hover }"
  >
    <v-card
      class="mx-auto"
      max-width="444"
    >
      <v-list-item two-line>
        <v-list-item-avatar
          tile
          size="150"
        >
          <img
            :src="`${urlImgApi}/${app.image}`"
            width="150"
            max-width="200"
          >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal display-3 white--title"
              style="height:100%"
            >
              <slot name="hoverButton" />
            </div>
          </v-expand-transition>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-light display-3 mt-2">
            {{ app.name }}
          </v-list-item-title>
          <v-list-item-title class="font-weight-light display-1">
            {{ app.ncategory }}
          </v-list-item-title>
          <v-list-item-title class="font-weight-light mt-3 display-1">
            {{ app.description }}
          </v-list-item-title>
          <v-list>
            <v-list-item>
              <v-list-item-title class="font-weight-bold display-1 ">
                $ {{ app.price }}
              </v-list-item-title>
              <slot name="btnCart" />
            </v-list-item>
          </v-list>
        </v-list-item-content>
      </v-list-item>
      <slot name="btnRemove" />
    </v-card>
  </v-hover>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      app: {
        type: Object,
        default: () => {},
      },
    },
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        urlImgApi: 'urlImgApiGetter',
      }),
    },
  }
</script>

<style>
    .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
