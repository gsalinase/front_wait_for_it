<template>
  <div>
    <h1 class="title">Dashboard</h1>
    <h3 class="subtitle py-5">Empresas Creadas</h3>
    <area-chart :data="lineChart"></area-chart>
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
