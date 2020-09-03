<template>
  <div>
    <Home v-if="isLoggedIn" />
    <Landing v-else/>
  </div>
</template>

<script>
// Pages
import Home from '@/components/views/Home'
import Landing from '@/components/views/Landing'

export default {
  name: 'HomePage',
  components: {
    Home,
    Landing
  },
  data () {
    return {

    }
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
