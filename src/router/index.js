import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {auth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        sessionStorage.getItem('isAuthed') ? next('/') : next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (!requireAuth) {
    next()
  } else {
    const isAuthed = sessionStorage.getItem('isAuthed')
    if (!isAuthed) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
