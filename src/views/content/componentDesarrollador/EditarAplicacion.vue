<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        md="6"
        sm="12"
      >
        <base-material-card
          icon="mdi-developer-board"
          title="Editar aplicación"
          class="px-5 py-3"
        >
          <v-form
            ref="form"
            v-model="valid"
            class="mt-2"
            lazy-validation
            enctype="multipart/form-data"
          >
            <v-select
              v-model="valuePrice"
              label="Tipo de publicación"
              name="typePayment"
              :items="typePrice"
              :rules="[v => !!v || 'La categoria es requerida']"
            />
            <v-text-field
              v-if="valuePrice === 2"
              v-model.number="app.price"
              type="number"
              label="Precio"
              :rules="[
                v => !!v || 'El precio es requerido',
              ]"
            />
            <v-textarea
              v-model="app.description"
              label="Descripción breve"
              :rules="[
                v => !!v || 'La descripción breve es requerida',
                v => (v || '').length <=70 || 'la descripción no debe superar los 30 caracteres'
              ]"
              :counter="70"
            />
            <v-file-input
              :rules="[
                v => !v || v.size < 3000000 || 'La imagen no debe superar los 3MB!'
              ]"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Inserte una imagen aquí"
              prepend-icon="mdi-camera"
              label="Modificar imagen"
              @change="loadImage"
            />
            {{ app.image }}
          </v-form>
          <v-btn
            rounded
            absolute
            right
            fab
            top
            large
            @click="$router.go(-1)"
          >
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
          <v-card-actions class="pl-0">
            <v-btn
              color="red"
              min-width="100"
              rounded
              @click="editarApp()"
            >
              Editar aplicación
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { putAppApi } from '@/api/modules'
  import { mapActions } from 'vuex'

  export default {
    props: {
      slug: {
        type: String,
        default: '',
        required: true,
      },
    },
    data () {
      return {
        typePrice: [
          { text: 'Gratis', value: 1 },
          { text: 'Paga', value: 2 },
        ],
        valuePrice: null,
        valid: false,
        app: {},
        categorias: [
          {
            id: 1,
            text: 'Juegos',
            value: 'juegos',
          },
          {
            id: 1,
            text: 'Red social',
            value: 'red-social',
          },
          {
            id: 1,
            text: 'Diversión',
            value: 'diversion',
          },
        ],
      }
    },
    async created () {
      const serviceResponse = await this.getAppAction(this.slug)
      if (serviceResponse.ok) {
        this.app = serviceResponse.product
      } else {
        this.$swal(
          '¡Disculpe!',
          'Ha ocurrido un error',
          'warning',
        )
      }
    },
    methods: {
      ...mapActions('app', ['getAppAction']),
      editarApp () {
        if (this.$refs.form.validate()) {
          this.$swal({
            title: '¿Estás seguro de que deseas continuar?',
            text: 'Al confirmar estás aceptando los términos y servicio de esta aplicación',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then(async (result) => {
            if (result.value) {
              const formData = new FormData()
              formData.append('price', (this.valuePrice === 1) ? 0 : this.app.price)
              formData.append('description', this.app.description)
              formData.append('image', this.app.image)
              const serviceResponse = await putAppApi(this.slug, formData)
              if (serviceResponse.ok) {
                this.$router.push('/me/apps/added')
                this.$swal({
                  text: '¡Los datos de su aplicación han sido modificada exitosamente!',
                  icon: 'success',
                })
              } else {
                this.$swal({
                  text: 'Ha ocurrido un error',
                  icon: 'error',
                },
                )
              }
            }
          })
        } else {
          this.$swal(
            '¡Disculpe!',
            'No puede dejar los campos requeridos vacios',
            'warning',
          )
        }
      },
      loadImage (value) {
        this.app.image = value
      },
    },
  }
</script>
