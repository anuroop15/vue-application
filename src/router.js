import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './views/HelloWorld'
import About from './views/about'
import SignatureDocs from './views/signatureDocs/SignatureDocs.vue'

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
    },
    {
      path: '/signatures',
      name: 'signatures',
      component: SignatureDocs
    }
  ]
})
export default router
