<template>
  <div class="py-6 px-4">
    <Tickets/>
    <Dashboard v-if="this.$store.state.user.role == 1"/>
  </div>
</template>

<script>
// Components
import Tickets from '@/components/tickets/Tickets.vue'
import Dashboard from '@/components/admin/Dashboard.vue'

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
  components: {
    Tickets,
    Dashboard
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
          console.log(response.data)
          $vm.ticketItems = response.data
        })
        .catch(function (error) {
          console.error(error)
        })
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

</style>
