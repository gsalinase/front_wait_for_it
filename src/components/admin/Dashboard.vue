<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <h3 class="subtitle py-5">Empresas Creadas</h3>
    <div class="columns">
      <div class="column is-three-fifths">
        <area-chart :data="lineChart"></area-chart>
      </div>
      <div class="column">
        <h3 class="subtitle py-5">Últimos Tickets</h3>
      </div>
    </div>
    <div>
      <h3 class="subtitle py-5">Llamar un número</h3>
    </div>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'

export default {
  data () {
    return {
      lineChart: null
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
  }
}

</script>

<style scoped>

</style>
