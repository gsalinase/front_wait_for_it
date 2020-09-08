<template>
  <div>
    <h1 class="title">Mis Tickets</h1>
    <section v-if="errored">
      <b-notification type="is-danger is-light" v-model="errored">
        Ha habido un problema al cargar tus tickets recarga la página e intenta nuevamente.
      </b-notification>
    </section>

    <section v-else>
      <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="true"></b-loading>

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
              <small><strong>Estado:</strong> {{ ticketState(ticket.state) }}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal v-model="isComponentModalActive" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog"
      aria-modal>
      <template v-if="ticketItems">
        <div class="modal-card" style="width: 60vw;">
          <header class="modal-card-head">
            <p class="modal-card-title">
              <strong>{{ ticketItems.ticket.ticket_number }}</strong>
              {{ ticketItems.company.industry }}: {{ ticketItems.company.name }}
            </p>
            <button type="button" class="delete" @click="isComponentModalActive = false" />
          </header>
          <section class="modal-card-body">
            <h3 class="pb-3"><strong>Información Empresa:</strong></h3>
            <p><strong>Nombre:</strong> {{ ticketItems.company.name }}</p>
            <p><strong>Dirección:</strong> {{ ticketItems.company.address }}</p>
            <p><strong>Teléfono:</strong> {{ ticketItems.company.phone }}</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" @click="isComponentModalActive = false">Volver</button>
          </footer>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'

export default {
  data () {
    return {
      ticketResponse: [],
      ticketItems: null,
      loading: true,
      errored: false,
      isFullPage: true,
      isComponentModalActive: false
    }
  },
  methods: {
    showTicket (id) {
      this.getTicket(id)
      setTimeout(() => {
        this.isComponentModalActive = true
      }, 200)
    },
    getTicket (id) {
      let $vm = this

      axios.get(`${process.env.ROOT_API}/tickets/${id}`)
        .then(function (response) {
          $vm.ticketItems = response.data
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    ticketState (state) {
      const labels = ['En espera', 'Finalizado']
      return labels[state]
    }
  },
  mounted () {
    let $vm = this
    const userId = this.$store.state.user.id

    axios.get(`${process.env.ROOT_API}/tickets?user_id=${userId}`)
      .then(function (response) {
        $vm.ticketResponse = response.data
      })
      .catch(function (error) {
        console.error(error)
        $vm.errored = true
      })
    /* eslint-disable */
      .finally(() => this.loading = false)
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
