<template>
  <div class="py-6 px-6">
    <h1 class="title">Ajustes</h1>
    <section v-if="errored">
      <b-notification type="is-danger is-light" v-model="errored">
        Ha habido un problema al cargar tus ajustes. Recarga la página e intenta nuevamente.
      </b-notification>
    </section>

    <section v-else>
      <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="true"></b-loading>
      <div>
        <!-- Profile -->
        <form @submit.prevent="modifyProfile">
          <div>
            <h3 class="subtitle"><strong>Datos Personales</strong></h3>
            <div class="columns">
              <div class="column is-two-thirds">
                <b-field label="Nombre Completo">
                  <b-input v-model="name" placeholder="John Doe"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-one-third">
                <b-field label="Número de Teléfono">
                  <b-input v-model="phone" placeholder="9 1234 5678" type="number"></b-input>
                </b-field>
              </div>
              <div class="column is-one-third">
                <b-field label="¿Cuándo es tu compleaños?">
                  <b-datepicker v-model="birthday" placeholder="Selecciona tu fecha de cumpleaños" icon="calendar-today"
                    trap-focus>
                  </b-datepicker>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-two-thirds">
                <label class="label">Correo Electrónico</label>
                <b-field>
                  <b-input placeholder="Ingrese su correo" v-model="email" type="email" icon="email"
                    icon-right="close-circle" icon-right-clickable>
                  </b-input>
                </b-field>
              </div>
            </div>

            <div class="field py-3">
              <b-checkbox v-model="criticalRole" :true-value="true" :false-value="false">
                ¿Tu trabajo es de primera necesidad?
              </b-checkbox>
            </div>
          </div>
          <div class="buttons py-5">
            <b-button type="is-primary" native-type="submit">Modificar Perfil</b-button>
          </div>
        </form>
        <hr />
        <!-- Password -->
        <form class="pt-4" @submit.prevent="modifyPassword">
          <div>
            <h3 class="subtitle"><strong>Contraseña</strong></h3>
            <div class="columns">
              <div class="column is-two-thirds">
                <b-field label="Ingresa tu contraseña">
                  <b-input type="password" v-model="password" password-reveal>
                  </b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-two-thirds">
                <b-field label="Vuelve a ingresar tu contraseña">
                  <b-input type="password" password-reveal>
                  </b-input>
                </b-field>
              </div>
            </div>
          </div>
          <div class="buttons py-5">
            <b-button type="is-primary" native-type="submit">Modificar Contraseña</b-button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'
import router from '../../router'

export default {
  name: 'HomePage',
  data () {
    return {
      password: null,
      editName: null,
      editEmail: null,
      editPhone: null,
      editBirthday: null,
      editCriticalRole: null,
      checkbox: false,
      loading: false,
      errored: false,
      isFullPage: true
    }
  },
  computed: {
    user: {
      // getter
      get () {
        return this.$store.state.user
      }
    },
    name: {
      // getter
      get () {
        return this.user.name
      },
      // setter
      set (newValue) {
        this.editName = newValue
      }
    },
    email: {
      // getter
      get () {
        return this.user.email
      },
      // setter
      set (newValue) {
        this.editEmail = newValue
      }
    },
    phone: {
      // getter
      get () {
        return Number(this.user.phone)
      },
      // setter
      set (newValue) {
        this.editPhone = newValue
      }
    },
    birthday: {
      // getter
      get () {
        const birthday = new Date(this.user.birthday)
        return birthday
      },
      // setter
      set (newValue) {
        this.editBirthday = newValue
      }
    },
    criticalRole: {
      // getter
      get () {
        return this.user.critical_role
      },
      // setter
      set (newValue) {
        this.editCriticalRole = newValue
      }
    }
  },
  methods: {
    modifyProfile () {
      let $vm = this
      const userId = this.$store.state.user.id
      const role = this.$store.state.user.role

      axios.put(`${process.env.ROOT_API}/users/${userId}`, {
        user: {
          email: this.editEmail || this.mail,
          name: this.editName || this.name,
          phone: this.editPhone || this.phone,
          role: role,
          birthday: this.editBirthday || this.birthday,
          critical_role: this.editCriticalRole || this.criticalRole
        }
      })
        .then(function (response) {
          console.log(response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
          $vm.$store.commit('get_user', response.data)
          router.push('/')
          $vm.$notify({
            group: 'foo',
            title: 'Perfil Actualizado',
            text: 'Tu perfil fue modificado correctamente'
          })
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }
}

</script>

<style scoped>
  .is-clickable {
    cursor: pointer;
  }

  .text-center {
    text-align: center;
  }

  .is-wrap {
    flex-wrap: wrap;
  }

</style>
