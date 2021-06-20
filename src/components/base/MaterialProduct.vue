<template>
  <v-hover
    v-slot:default="{ hover }"
  >
    <v-card
      class="mx-4"
      max-height="500"
      max-width="250"
    >
      <template v-if="$slots.headerActions">
        <v-card-actions>
          <slot name="headerActions" />
        </v-card-actions>
      </template>
      <v-img
        :src="image"
        max-width="250"
        max-height="200"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal display-3 white--text"
            style="height:100%"
          >
            <slot name="hoverButton" />
          </div>
        </v-expand-transition>
      </v-img>
      <slot />
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: 'MaterialProduct',
    props: {
      image: {
        type: String,
        default: '',
      },
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
