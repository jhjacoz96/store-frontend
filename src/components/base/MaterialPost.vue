<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey" />
          <v-list-item-content>
            <div class="overline">
              OVERLINE
            </div>
            <v-list-item-subtitle>Hace 10 horas</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        />
        <v-list-item two>
          <v-list-item-content>
            <span>20 Me gustas</span>
          </v-list-item-content>
          <v-row
            class="mr-1"
            align="center"
            justify="end"
          >
            <span>100 Comentarios</span>
          </v-row>
        </v-list-item>
        <v-spacer />
        <v-divider class="mx-1" />
        <v-card-actions
          class="justify-center"
        >
          <v-btn
            text
            color="deep-orange"
          >
            <v-icon class="mr-1">
              mdi-heart
            </v-icon>
            Me gusta
          </v-btn>
          <v-btn text>
            <v-icon class="mr-1">
              >mdi-chat
            </v-icon>
            <span>Comentar</span>
          </v-btn>
        </v-card-actions>
        <v-spacer />
        <v-divider class="mx-1" />
        <v-card-title>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-title>
        <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>
      </v-card>
    </v-col>
    <v-row />
  </v-row>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>

</style>
