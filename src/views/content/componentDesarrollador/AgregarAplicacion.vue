<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        md="6"
        sm="12"
      >
        <base-material-card
          icon="mdi-developer-board"
          title="Agregar aplicación"
          class="px-5 py-3"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            enctype="multipart/form-data"
            class="mt-2"
          >
            <v-select
              v-model="aplicacion.categoryId"
              label="Categoria"
              name="categoria"
              :items="filterCategory"
              :rules="[v => !!v || 'La categoria es requerida']"
            />
            <v-text-field
              v-model="aplicacion.name"
              label="Nombre"
              name="nombre"
              :rules="[ v => !!v || 'El nombre es requerido' ]"
            />
            <v-select
              v-model="valuePrice"
              label="Tipo de publicación"
              x
              name="typePayment"
              :items="typePrice"
              :rules="[v => !!v || 'La categoria es requerida']"
            />
            <v-text-field
              v-if="valuePrice === 2"
              v-model.number="aplicacion.price"
              type="number"
              label="Precio"
              :rules="[
                v => !!v || 'El precio es requerido',
              ]"
            />
            <v-file-input
              :rules="[
                v => !v || v.size < 3000000 || 'La imagen no debe superar los 3MB!',
                v => !!v || 'La imagen es requerida'
              ]"
              accept="image/*"
              placeholder="Inserte una imagen aquí"
              prepend-icon="mdi-camera"
              label="Imagen"
              @change="loadImage"
            />
            <v-textarea
              v-model="aplicacion.description"
              label="Descripción breve"
              :rules="[
                v => !!v || 'La descripción breve es requerida',
                v => (v || '').length <=70 || 'la descripción no debe superar los 30 caracteres'
              ]"
              :counter="70"
            />
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
              @click="agregarAplicacion()"
            >
              Agregar aplicación
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        typePrice: [
          { text: 'Gratis', value: 1 },
          { text: 'Paga', value: 2 },
        ],
        valuePrice: null,
        valid: false,
        aplicacion: {
          name: '',
          price: 0,
          categoryId: '',
          image: '',
          description: '',
        },
      }
    },
    computed: {
      ...mapGetters('category', ['categorysGetter']),

      filterCategory: function () {
        const cats = []
        var cat = {}
        this.categorysGetter.forEach(item => {
          cat = {}
          cat.text = item.name
          cat.value = item.id
          cats.push(cat)
        })
        return cats
      },
    },
    created () {
      this.getAllAction()
    },
    methods: {
      ...mapActions('app', ['createAction']),
      ...mapActions('category', ['getAllAction']),
      agregarAplicacion () {
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
              console.log(this.aplicacion)
              const formData = new FormData()
              formData.append('name', this.aplicacion.name)
              formData.append('categoryId', this.aplicacion.categoryId)
              formData.append('price', (this.valuePrice === 1) ? 0 : this.aplicacion.price)
              formData.append('image', this.aplicacion.image)
              formData.append('description', this.aplicacion.description)
              const serviceResponse = await this.createAction(formData)
              if (serviceResponse.ok) {
                this.$swal({
                  text: '¡Su aplicación se agregado exitosamente!',
                  icon: 'success',
                })
                this.$router.push('/me/apps/added')
              } else {
                console.log(serviceResponse)
                this.$swal({
                  title: '¡ERROR!',
                  html: serviceResponse.mensaje.text,
                  icon: 'error',
                })
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
      loadImage (e) {
        this.aplicacion.image = e
      },
    },
  }
</script>
