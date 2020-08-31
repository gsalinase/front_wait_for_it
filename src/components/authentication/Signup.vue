<template>
  <div>
    <div class="signup--wrapper">
      <h1 class="title">Crean una cuenta en W4IT</h1>
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
            <b-input v-model="phone" placeholder="9 1234 5678" type="number" max="9"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="¿Cuándo es tu compleaños?">
            <b-datepicker v-model="birthday" placeholder="Selecciona tu fecha de cumpleaños" icon="calendar-today"
              trap-focus>
            </b-datepicker>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <label class="label">Correo Electrónico</label>
          <b-field>
            <b-input placeholder="Ingrese su correo" v-model="email" type="email" icon="email" icon-right="close-circle"
              icon-right-clickable>
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

      <div class="field py-3">
        <b-checkbox v-model="checkbox" true-value="Sí" false-value="No">
          ¿Tu trabajo es de primera necesidad?
        </b-checkbox>
      </div>
    </div>

    <div class="buttons py-5">
      <b-button type="is-primary" @click="sendSignup">Crear Cuenta</b-button>
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
  methods: {
    register () {
      let data = {
        user: {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          role: 1,
          birthday: this.birthday,
          critical_role: this.checkbox
        }
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
