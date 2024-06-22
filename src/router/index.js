import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  
  routes: [
    {
      path: '/login',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/create_account',
      name: 'create_account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Create_accountView.vue')
    },
    {
      path: '/',
      component: () => import('../views/Navbar.vue'),
      children: [
          {
            path: '',
            name: 'home',
            component: () => import('../views/LandingView.vue')
          },
          {
            path: 'movie/:id',
            name: 'MovieView',
            component: () => import('../views/MovieView.vue')
          },
        ]
      }
  ]
})

export default router
