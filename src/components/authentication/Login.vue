<template>
  <div class="login-bg">
    <form class="login--wrapper container" @submit.prevent="login">
      <div class="text-center">
        <img width="50" src="../../assets/logo.svg" alt="Logo Wait for It">
      </div>
      <h1 class="title pt-3 pb-3 text-center">Inicia Sesión</h1>
      <div class="w-100">
        <label class="label">Correo Electrónico</label>
          <b-field>
            <b-input placeholder="Ingrese su correo" v-model="email" type="email" icon="email" icon-right="close-circle"
              icon-right-clickable expanded>
            </b-input>
          </b-field>
          <label class="label">Contraseña</label>
          <b-field>
            <b-input v-model="password" type="password" placeholder="Escriba su contraseña" password-reveal expanded>
            </b-input>
          </b-field>
      </div>
      <div class="buttons mt-5 w-100">
        <b-button type="is-primary" native-type="submit" expanded>Iniciar Sesión</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = {
        'user': {
          'email': this.email,
          'password': this.password
        }
      }
      this.$store.dispatch('login', data)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
}

</script>

<style scoped>
  /* Helpers */
  .text-center {
    text-align: center;
  }

  .w-100 {
    width: 100%;
  }

  .login-bg {
    background-color: #F5F6F3;
  }

  .login--wrapper {
    height: 100vh;
    padding: 5rem 2rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  @media screen and (min-width: 568px) {
    .login--wrapper {
      width: 400px;
      padding-top: 8rem;
      margin: 0 auto;
    }
  }

</style>
