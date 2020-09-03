import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: 'http://localhost:3000/login',
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const token = resp.headers.authorization
            const user = resp.data.email
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            switch (err.response.status) {
              case 400:
                console.error(err.response.status, err.message)
                Vue.notify({
                  group: 'foo',
                  title: 'No encontrado',
                  text: err.response.data
                })
                break

              case 401:
                Vue.notify({
                  group: 'foo',
                  type: 'warn',
                  title: 'No autorizado',
                  text: err.response.data
                })
                localStorage.removeItem('token')
                this.router.push('/logout')
                break

              default:
                console.error(err.response.status, err.message)
                Vue.notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Error de Servidor',
                  text: err.response.data
                })
            }
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register ({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: 'http://localhost:3000/signup',
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const token = resp.headers.authorization
            const user = resp.data.email
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            switch (err.response.status) {
              case 400:
                console.error(err.response.status, err.message)
                Vue.notify({
                  group: 'foo',
                  title: 'No encontrado',
                  text: err.response.data
                })
                break

              case 401:
                Vue.notify({
                  group: 'foo',
                  type: 'warn',
                  title: 'No autorizado',
                  text: err.response.data
                })
                localStorage.removeItem('token')
                this.router.push('/logout')
                break

              default:
                console.error(err.response.status, err.message)
                Vue.notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Error de Servidor',
                  text: err.response.data
                })
            }
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({
      commit
    }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
