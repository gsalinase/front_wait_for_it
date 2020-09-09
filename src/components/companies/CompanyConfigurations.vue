<template>
  <div class="">
    <h1 class="title">Configurar Empresa</h1>
    <section v-if="errored">
      <b-notification type="is-danger is-light" v-model="errored">
        Ha habido un problema al cargar tus ajustes. Recarga la página e intenta nuevamente.
      </b-notification>
    </section>

    <section v-else-if="Array.isArray(this.companyConfig) && this.companyConfig.length">
      <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="true"></b-loading>
      <div>
        <!-- Profile -->
        <form @submit.prevent="modifyCompanyConfig">
          <div :key="config.id" v-for="(config) in companyConfig">
            <div class="columns">
              <div class="column">
                <b-field label="Horario de ingreso">
                  <b-timepicker v-model="editWorkStart" placeholder="5:04" icon="clock" :locale="locale">
                  </b-timepicker>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Horario de Salida">
                  <b-timepicker v-model="editWorkEnd" placeholder="5:04" icon="clock" :locale="locale">
                  </b-timepicker>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Días de Trabajo">
                  <b-taginput v-model="config.working_day.days" ellipsis icon="label" placeholder="Agrega los días de trabajo">
                  </b-taginput>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Servicios">
                  <b-taginput v-model="config.service_type.service" ellipsis icon="label" placeholder="Agrega los días de trabajo">
                  </b-taginput>
                </b-field>
              </div>
            </div>
          </div>
          <div class="buttons py-5">
            <b-button type="is-primary" native-type="submit">Modificar Registros</b-button>
          </div>
        </form>
        <hr />
        <!-- Delete -->
<!--         <div>
          <h3 class="subtitle"><strong>Cuenta</strong></h3>
          <div class="buttons py-5">
            <b-button type="is-danger" native-type="submit" @click="">Eliminar Empresa</b-button>
          </div>
        </div> -->
      </div>
    </section>

    <section v-else>
      <b-notification type="is-danger is-light">
        No hemos podido encontrar ningún registro.
      </b-notification>
    </section>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {
      locale: 'es-MX',
      companyConfig: null,
      editWorkingDays: [],
      editServices: [],
      editWorkStart: undefined,
      editWorkEnd: undefined,
      loading: false,
      errored: false,
      isFullPage: true
    }
  },
  props: ['companyId'],
  created () {
    let $vm = this

    axios.get(`${process.env.ROOT_API}/company_configurations?company_id=${this.companyId}`)
      .then(function (response) {
        $vm.companyConfig = response.data
      })
      .catch(function (error) {
        console.error(error)
      })
    /* eslint-disable */
        .finally(() => this.loading = false)
  },
  methods: {
    toDate(str) {
      const date = new Date(str)
    },
    modifyCompanyConfig () {
      let $vm = this
      const configId = this.companyConfig[0].id
      axios.put(`${process.env.ROOT_API}/company_configurations/${configId}`, {
        company_configuration: {
          work_start: this.editWorkStart,
          work_end: this.editWorkEnd,
          working_day: this.companyConfig[0].working_day,
          service_type: this.companyConfig[0].service_type,
          company_id: this.companyId
        }
      })
        .then(function (response) {
          console.log(response.data)
          $vm.$emit('modal', '')
          $vm.$notify({
            group: 'foo',
            title: 'Empresa Actualizada',
            text: 'Tu empresa fue modificada correctamente'
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
