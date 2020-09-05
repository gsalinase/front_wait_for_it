import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Pages
import HomePage from '@/pages/HomePage.vue'

// Authentication
import Signup from '@/components/authentication/Signup.vue'
import Login from '@/components/authentication/Login.vue'
import NewTicket from '@/components/tickets/NewTicket.vue'

// User
import Settings from '@/components/user/Settings.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/ticket/new',
      name: 'new-ticket',
      component: NewTicket
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
