import Vue from 'vue'
import VueRouter from 'vue-router'
import DemoTable from './views/demoTable/DemoTable.vue'
import SignatureDocs from './views/signatureDocs/SignatureDocs.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'demo',
      component: DemoTable
    },
    {
      path: '/signatures',
      name: 'signatures',
      component: SignatureDocs
    }
  ]
})
export default router
