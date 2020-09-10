<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <div class="columns">
      <div class="column">
        <h3 class="subtitle py-5">Últimos Números</h3>
        <div class="columns is-wrap">
        <div class="column is-one-third is-clickable py-4" :key="ticket.id" v-for="(ticket, index) in ticketResponse.tickets" @click="showTicket(ticket.id)">
          <div class="card">
            <div class="card-content">
              <p class="title has-text-danger">
                {{ ticket.ticket_number }}
              </p>
              <p class="subtitle mb-0">
                <strong>Empresa: </strong>
                {{ ticketResponse.companies[index].name }}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="columns">
      <div class="buttons pl-3 pt-5">
        <b-button type="is-primary" @click="updateTicket">Llamar Número</b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h3 class="subtitle py-5">Empresas Creadas</h3>
        <area-chart :data="lineChart"></area-chart>
      </div>
    </div>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'

export default {
  data () {
    return {
      lineChart: null,
      ticketResponse: [],
      ticketItems: null
    }
  },
  methods: {
    getAllCompanies () {
      let $vm = this

      axios.get(`${process.env.ROOT_API}/total_tickets`)
        .then(function (response) {
          $vm.lineChart = response.data
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    updateTicket () {
      let $vm = this

      axios.put(`${process.env.ROOT_API}/call_ticket`)
        .then(function (response) {
          console.log(response.data)
          $vm.$notify({
            group: 'foo',
            title: 'El ticket fue llamado correctamente',
            text: 'Se ha enviado al usuario una notificación para pasar'
          })
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  },
  created () {
    let $vm = this

    axios.get(`${process.env.ROOT_API}/total_user_companies`)
      .then(function (response) {
        $vm.lineChart = response.data
      })
      .catch(function (error) {
        console.error(error)
      })

    axios.get(`${process.env.ROOT_API}/last_tickets`)
      .then(function (response) {
        $vm.ticketResponse = response.data
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

</script>

<style scoped>

</style>
