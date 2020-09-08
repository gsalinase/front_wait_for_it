<template>
  <div>
    <div class="columns is-gapless is-centered h-100">
      <form @submit.prevent="register">
        <div class="column">
          <div class="px-6 py-6">
            <div class="pb-5">
              <router-link :to="{ name: 'home' }">
                <img width="50" src="../../assets/logo.svg" alt="Logo Wait for It">
              </router-link>
            </div>
            <div class="signup--wrapper">
              <h1 class="title" v-if="isCompany">Crea una cuenta Empresa en W4IT</h1>
              <h1 class="title" v-else>Crea una cuenta en W4IT</h1>
              <div class="columns">
                <div class="column">
                  <b-field label="Nombre Completo">
                    <b-input v-model="name" placeholder="John Doe"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="Número de Teléfono">
                    <b-input v-model="phone" placeholder="9 1234 5678" type="number"></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="¿Cuándo es tu compleaños?">
                    <b-datepicker v-model="birthday" placeholder="Selecciona tu fecha de cumpleaños"
                      icon="calendar-today" trap-focus>
                    </b-datepicker>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="label">Correo Electrónico</label>
                  <b-field>
                    <b-input placeholder="Ingrese su correo" v-model="email" type="email" icon="email"
                      icon-right="close-circle" icon-right-clickable>
                    </b-input>
                  </b-field>
                </div>
                <div class="column">
                  <label class="label">Contraseña</label>
                  <b-field>
                    <b-input v-model="password" type="password" placeholder="Escriba su contraseña" password-reveal>
                    </b-input>
                  </b-field>
                </div>
              </div>

              <div class="field py-3" v-if="!isCompany">
                <b-checkbox v-model="checkbox" true-value="Sí" false-value="No">
                  ¿Tu trabajo es de primera necesidad?
                </b-checkbox>
              </div>
            </div>
            <div class="buttons py-5">
              <b-button type="is-primary" native-type="submit" expanded>Crear Cuenta</b-button>
              <!-- <b-button type="is-primary" native-type="submit" expanded>
                <b-icon icon="facebook" size="is-small" class="pr-3 is-facebook" @click.stop="a"></b-icon>
                Crear Cuenta con Facebook
              </b-button> -->
            </div>
          </div>
        </div>
      </form>
      <div class="column signup--bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      name: '',
      phone: '',
      birthday: new Date(),
      email: '',
      password: '',
      checkbox: false
    }
  },
  computed: {
    isCompany () {
      return (this.$route.params.type === 'company')
    }
  },
  methods: {
    register () {
      let data = {
        user: {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          role: this.isCompany ? 1 : 0,
          birthday: this.birthday,
          critical_role: this.checkbox
        }
      }
      console.log(data.role)
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .h-100 {
    height: 100vh;
  }

  .buttons .is-primary:nth-child(2) {
    background-color: #3b5998;
  }

  .signup--bg {
    background-image: url('../../assets/signup.jpg');
  }

</style>
