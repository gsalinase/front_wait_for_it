<template>
  <div class="py-6 px-6">
    <h1 class="title">Ajustes</h1>
    <section v-if="errored">
      <b-notification type="is-danger is-light" v-model="errored">
        Ha habido un problema al ingresar tu compañia. Recarga la página e intenta nuevamente.
      </b-notification>
    </section>

    <section v-else>
      <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="true"></b-loading>
      <div>
        <!-- Create Company -->
        <form @submit.prevent="createCompany">
          <div>
            <div class="columns">
              <div class="column is-two-thirds">
                <b-field label="Nombre Empresa">
                  <b-input v-model="name" placeholder="Completos Pedrito"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-two-thirds">
                <b-field label="Rubro de tu empresa">
                  <b-input v-model="industry" placeholder="Restaurante de Comida Rápida"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-one-third">
                <b-field label="Número de Teléfono">
                  <b-input v-model="phone" placeholder="9 1234 5678" type="number"></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-two-thirds">
                <b-field label="Dirección Comercial">
                  <b-input v-model="address" placeholder="Av. Recoleta 4553, Recoleta"></b-input>
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
          </div>
          <div class="buttons py-5">
            <b-button type="is-primary" native-type="submit">Agregar Empresa</b-button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import router from '../../router'

// Libraries
import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {
      name: '',
      email: '',
      phone: null,
      industry: '',
      address: '',
      checkbox: false,
      loading: false,
      errored: false,
      isFullPage: true
    }
  },
  methods: {
    createCompany () {
      axios.post(`${process.env.ROOT_API}/companies`, {
        'company': {
          'name': this.name,
          'industry': this.industry,
          'address': this.address,
          'phone': this.phone,
          'email': this.email
        }
      })
        .then(function (response) {
          console.log(response.data)
          router.push('/')
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
