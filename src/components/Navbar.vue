<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.svg" alt="Lightweight UI components for Vue.js based on Bulma">
      </b-navbar-item>
    </template>
    <template slot="start" v-if="isLoggedIn">
      <b-navbar-item v-if="$store.state.user.role == 0">
        <router-link :to="{ name: 'new-ticket' }">
          Pedir un número
        </router-link>
      </b-navbar-item>
      <template v-if="$store.state.user.role == 1">
        <b-navbar-item>
          <router-link :to="{ name: 'new-company' }">
            Crear Empresa
          </router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link :to="{ name: 'companies' }">
            Mis Empresas
          </router-link>
        </b-navbar-item>
      </template>
    </template>
    <template slot="start" v-else-if="!isLoggedIn">
      <b-navbar-dropdown label="Empresas" tag="div">
        <b-navbar-item>
          <router-link :to="{ name: 'signup', params: { type: 'company'} }">
            Crear Cuenta Empresa
          </router-link>
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-dropdown :label="`Hola ${$store.state.user.name}`" tag="div" v-if="isLoggedIn" class="px-4">
        <b-navbar-item>
          <router-link :to="{ name: 'settings' }">
            Ajustes
          </router-link>
        </b-navbar-item>
        <b-navbar-item>
          <div @click="logout">
            <strong>Cerrar Sesión</strong>
          </div>
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="div" v-else>
        <div class="buttons">
          <router-link :to="{ name: 'login' }" class="button is-light">
            <strong>Iniciar Sesión</strong>
          </router-link>
          <router-link :to="{ name: 'signup' }" class="button is-primary">
            <strong>Crear una Cuenta</strong>
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  props: {
    isLoggedIn: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}

</script>
