<template>
  <div class="py-6 px-4">
    <h1 class="title">Mis Empresas</h1>
    <p>Selecciona una empresa para más información</p>
    <section class="pt-5">
      <b-loading :is-full-page="isFullPage" v-model="loading" :can-cancel="true"></b-loading>

      <div class="columns is-wrap">
        <div class="column is-one-third is-clickable py-4" :key="company.id" v-for="company in companies"
          @click="showCompany(company.id)">
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
    <b-modal v-model="isComponentModalActive" has-modal-card trap-focus :destroy-on-hide="true" aria-role="dialog"
      aria-modal>
      <template v-if="companyItems">
        <div class="modal-card" style="width: 60vw;">
          <header class="modal-card-head">
            <p class="modal-card-title">
              <strong>{{ companyItems.name }}</strong> -
              {{ companyItems.industry }}
            </p>
            <button type="button" class="delete" @click="isComponentModalActive = false" />
          </header>
          <section class="modal-card-body">
            <div v-if="companyConfig">
              <template>
                <CompanyConfigurations :companyId="getCompanyId" @modal="closeModal()" />
              </template>
            </div>
            <div v-else>
              <h3 class="pb-3"><strong>Información Empresa:</strong></h3>
              <p><strong>Nombre:</strong> {{ companyItems.name }}</p>
              <p><strong>Dirección:</strong> {{ companyItems.address }}</p>
              <p><strong>Teléfono:</strong> {{ companyItems.phone }}</p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <template v-if="companyConfig">
              <button class="button is-primary" @click="companyConfig = false">Volver</button>
            </template>
            <template v-else>
              <button class="button is-primary" @click="companyConfig = true">Configurar Empresa</button>
            </template>
          </footer>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
// Libraries
import axios from 'axios'

// Components
import CompanyConfigurations from '@/components/companies/CompanyConfigurations.vue'

export default {
  data () {
    return {
      companies: [],
      companyItems: [],
      getCompanyId: '',
      loading: true,
      errored: false,
      isFullPage: true,
      companyConfig: false,
      isComponentModalActive: false
    }
  },
  components: {
    CompanyConfigurations
  },
  methods: {
    closeModal () {
      this.isComponentModalActive = false
    },
    showCompany (id) {
      this.getCompany(id)
      setTimeout(() => {
        this.isComponentModalActive = true
      }, 200)
    },
    getCompany (companyId) {
      let $vm = this

      axios.get(`${process.env.ROOT_API}/companies/${companyId}`)
        .then(function (response) {
          $vm.getCompanyId = companyId
          $vm.companyItems = response.data
        })
        .catch(function (error) {
          console.error(error)
        })
      /* eslint-disable */
          .finally(() => this.loading = false)
      }
    },
    created() {
      let $vm = this
      const userId = this.$store.state.user.id

      axios.get(`${process.env.ROOT_API}/companies?user_id=${userId}`)
        .then(function (response) {
          $vm.companies = response.data
        })
        .catch(function (error) {
          console.error(error)
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
