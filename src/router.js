import Vue from 'vue'
import VueRouter from 'vue-router'
import SignatureDocs from './views/signatureDocs/SignatureDocs.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signatures',
      component: SignatureDocs
    }
  ]
})
export default router
