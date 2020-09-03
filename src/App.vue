<template>
  <div id="app">
    <notifications group="foo" />
    <template v-if="this.$route.path == '/login' || this.$route.path == '/signup'">

    </template>
    <template v-else>
      <Navbar :isLoggedIn="isLoggedIn"/>
    </template>
    <main class="main">
      <router-view/>
    </main>
    <Footer v-if="!this.$route.path == '/login' || !this.$route.path == '/signup'"/>
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
  computed: {
    isLoggedIn () { return this.$store.getters.isLoggedIn }
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
    /* padding: 0 1.5rem; */
  }
</style>
