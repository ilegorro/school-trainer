import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: function() {
      return import('../views/Home.vue')
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: function() {
      return import('../views/Settings.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
