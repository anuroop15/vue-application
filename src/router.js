import Vue from 'vue'
import Router from 'vue-router'
import SignatureDocs from './views/signatureDocs/SignatureDocs.vue'
import DemoRoutes from './views/DemoRoutes/DemoRoutes.vue'
import FundsTransfers from './views/FundsTransfers/FundsTransfers.vue'
import SecurityPreferences from './views/SecurityPreferences/SecurityPreferences.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Main',
        component: DemoRoutes
      },
      {
        path: '/signatures',
        name: 'signatures',
        component: SignatureDocs
      },
      {
        path: '/funds-transfers',
        name: 'Funds Transfers',
        component: FundsTransfers
      },
      {
        path: '/security-preferences',
        name: 'Security Preferences',
        component: SecurityPreferences
      }
    ]
})