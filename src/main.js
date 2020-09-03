// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import Axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Notifications from 'vue-notification'

// Vue Register
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.prototype.$http = Axios
Vue.use(Vuex)
Vue.use(Notifications)

// Get Session storage token
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
