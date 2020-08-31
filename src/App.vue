<template>
  <div id="app">
    <Navbar/>
    <main class="container main">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
// Components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  created () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>
<style scoped>
  .main {
    padding: 1.5rem;
  }
</style>
