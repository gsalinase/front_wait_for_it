<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.svg"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start" v-if="!isLoggedIn">
            <!-- <b-navbar-dropdown label="Empresas">
                <b-navbar-item>
                    Crear Cuenta
                </b-navbar-item>
            </b-navbar-dropdown> -->
            <b-navbar-item>
                <router-link :to="{ name: 'company/ticket/new' }" class="button is-light">
                    <strong>Pedi</strong>
                </router-link>
            </b-navbar-item>

        </template>

        <template slot="end">
            <b-navbar-item tag="div" v-if="isLoggedIn">
                <div class="buttons">
                    <button @click="logout" class="button is-light">
                        <strong>Cerrar Sesión</strong>
                    </button>
                </div>
            </b-navbar-item>
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
          this.$router.push('/login')
        })
    }
  }
}
</script>
