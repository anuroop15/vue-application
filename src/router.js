import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './views/HelloWorld'
import About from './views/about'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
export default router
