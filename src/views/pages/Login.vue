<template>
  <v-app>
    <span class="bg" />
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="8"
          >
            <v-card>
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      class="red"
                    >
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Bienvenido a AppStore
                        </h1>
                        <h5 class="text-center">
                          ¿Aún no se ha registrado?
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          rounded
                          outlined
                          dark
                          @click.prevent="resetForm1()"
                        >
                          Registarse
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="8"
                    >
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 red--text">
                          Iniciar sesión
                        </h1>
                        <h4 class="text-center">
                          Ingrese sus credenciales
                        </h4>
                      </v-card-text>
                      <v-card-text>
                        <v-form
                          ref="form1"
                          v-model="valid1"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="usuario.username"
                            label="Usuario"
                            filled
                            rounded
                            dense
                            name="username"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            :rules="[v => !!v || 'El nombre de usuario es requerido',
                            ]"
                          />
                          <v-text-field
                            id="password"
                            v-model="usuario.password"
                            filled
                            rounded
                            dense
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            :type="show ? 'text' : 'password'"
                            color="teal accent-3"
                            :rules="[v => !!v || 'La contraseña es requerido',
                                     v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres',
                            ]"
                            :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="show = !show"
                          />
                        </v-form>
                        <h3 class="text-center mt-3">
                          Desea recuperar su contraseña?
                        </h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          rounded
                          dark
                          type="submit"
                          @click="login()"
                        >
                          Iniciar sesión
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col
                      cols="12"
                      md="4"
                      class="red"
                    >
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Bienvenido a StoreApps
                        </h1>
                        <h5 class="text-center mt-2">
                          Para mantenerse conectado con nosotros, inicie sesión con su información personal
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          rounded
                          outlined
                          dark
                          @click="resetForm()"
                        >
                          Iniciar sesión
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="8"
                    >
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 red--text">
                          Crear una cuenta
                        </h1>
                        <h4 class="text-center mt-4">
                          Ingrese sus datos para registrarse
                        </h4>
                      </v-card-text>
                      <v-card-text>
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="usuarioRegister.username"
                            filled
                            rounded
                            dense
                            label="Username"
                            name="usernameRegister"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            :rules="[v => !!v || 'El usuario es requerido']"
                            required
                          />
                          <v-text-field
                            v-model="usuarioRegister.email"
                            filled
                            rounded
                            dense
                            label="Correo"
                            name="emailRegister"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            :rules="[v => !!v || 'El email es requerido',
                                     v => /.+@.+/.test(v) || 'email no es valido',
                            ]"
                            required
                          />
                          <v-select
                            v-model="usuarioRegister.rolId"
                            filled
                            rounded
                            dense
                            label="Rol"
                            name="rolRegister"
                            :items="roles"
                            color="teal accent-3"
                            :rules="[v => !!v || 'El rol es requerido']"
                            required
                          />
                          <v-text-field
                            id="passwordResgister"
                            v-model="usuarioRegister.password"
                            filled
                            rounded
                            dense
                            label="Contraseña"
                            name="passwordRegister"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            :rules="[
                              v => !!v || 'La contraseña es requerida',
                              v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres'
                            ]"
                            counter
                            required
                          />
                          <v-text-field
                            id="passwordconfirmResgister"
                            v-model="usuarioRegister.confirmarPassword"
                            filled
                            rounded
                            dense
                            label="Confirmar contraseña"
                            name="confirmPasswordRegister"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            :rules="[
                              v => !!v || 'La contraseña es requerida', confirmacionPassword,
                              v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres']"
                            required
                            counter
                          />
                        </v-form>
                        <div class="text-center mt-5">
                          <v-btn
                            rounded
                            dark
                            type="submit"
                            @click="crearUsuario()"
                          >
                            Registrase
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        step: 1,
        usuarioRegister: {
          email: '',
          rolId: '',
          username: '',
          password: '',
          confirmarPassword: '',
        },
        usuario: {
          username: '',
          password: '',
        },
        valid: false,
        valid1: false,
        show: false,
        roles: [
          { text: 'Comprador', value: 1 },
          { text: 'Desarrollador', value: 2 },
        ],
        usernameRules: [v => !!v || 'El username es requerido'],
        apellidoRules: [v => !!v || 'El apellido es requerido'],
        emailRules: [
          v => !!v || 'El correo es requerido',
          v => /.+@.+/.test(v) || 'El correo no es valido',
        ],
        rules: {
          required: v => !!v || 'La contraseña es requerida',
          min: v => (v || '').length >= 8 || 'Mínimo debe ser de 8 caracteres',
        },
      }
    },
    computed: {
      confirmacionPassword () {
        return (
          this.usuarioRegister.password === this.usuarioRegister.confirmarPassword ||
          'La contraseña no coinciden'
        )
      },
    },
    methods: {
      ...mapActions('authentication', ['loginAction']),
      ...mapActions('authentication', ['registerAction']),
      resetForm1 () {
        this.step++
        this.$refs.from1.reset()
      },
      resetForm () {
        this.step--
        this.$refs.from.reset()
      },
      async crearUsuario () {
        if (this.$refs.form.validate()) {
          const serviceResponse = await this.registerAction(this.usuarioRegister)
          if (serviceResponse.ok) {
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: false,
            })

            Toast.fire({
              icon: 'success',
              title: 'Sesión iniciada',
            })
          } else {
            this.$swal(
              '¡ERROR!',
              serviceResponse.message.text,
              'error',
            )
          }
        } else {
          this.$swal('¡ERROR!', 'Faltan campos por llenar', 'error')
        }
      },
      async login () {
        if (this.$refs.form1.validate()) {
          const serviceResponse = await this.loginAction(this.usuario)
          if (serviceResponse.ok) {
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: false,
            })

            Toast.fire({
              icon: 'success',
              title: 'Sesión iniciada',
            })
          } else {
            this.$swal(
              '¡ERROR!',
              serviceResponse.message.text,
              'error',
            )
          }
        } else {
          this.$swal('¡ERROR!', 'Faltan campos por llenar', 'error')
        }
      },
    },
  }
</script>
<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../../assets/fondo.jpg');
    background-size: cover;
  }
</style>
