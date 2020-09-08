<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <h1 class="title">
              ¡Deja de hacer filas!
            </h1>
            <h2 class="subtitle">
              Simplifica tus trámites usando nuestra aplicación. Obtén un ticket de atención desde la comodidad de tu
              casa.
            </h2>
            <div class="buttons is-center">
              <b-button type="is-primary" inverted @click="goSignup">Crear una Cuenta</b-button>
              <b-button type="is-primary" inverted outlined @click="goLogin">Iniciar Sesión</b-button>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  methods: {
    goSignup () {
      this.$router.push('/signup')
    },
    goLogin () {
      this.$router.push('/login')
    }
  }
}

</script>

<style scoped>
  .is-center {
    text-align: center;
    justify-content: center;
  }

</style>
