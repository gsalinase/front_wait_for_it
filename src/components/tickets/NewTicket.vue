<template>
  <div class="py-6 px-4">
    <h1 class="title">Pedir un número</h1>
    <p>Selecciona la empresa con la que quieres pedir un ticket</p>
    <section class="pt-5">
      <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="true"></b-loading>

      <div class="columns is-wrap">
        <div class="column is-one-third is-clickable py-4" :key="company.id" v-for="company in companies" @click="createTicket(company.id)">
          <div class="card">
            <div class="card-content">
              <p class="title">
                {{ company.name }}
              </p>
              <p class="subtitle">
                {{ company.industry }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import router from '../../router'

// Libraries
import axios from 'axios'

export default {
  data () {
    return {
      companies: [],
      loading: true,
      errored: false,
      isFullPage: true
    }
  },
  methods: {
    showTicket (id) {
      this.getTicket(id)
      setTimeout(() => {
        this.isComponentModalActive = true
      }, 200)
    },
    createTicket (companyId) {
      const userId = this.$store.state.user.id

      axios.post(`${process.env.ROOT_API}/tickets`, {
        'ticket': {
          'company_id': companyId,
          'user_id': userId,
          'ticket_number': Math.random() * 100,
          'priority': false,
          'state': 1
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
  },
  created () {
    let $vm = this

    axios.get(`${process.env.ROOT_API}/companies`)
      .then(function (response) {
        console.log(response.data)
        $vm.companies = response.data
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
.is-wrap {
  flex-wrap: wrap;
}

.is-clickable {
  cursor: pointer;
}
</style>
