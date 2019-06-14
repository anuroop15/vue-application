import Vue from 'vue'
import Router from 'vue-router'
import SignatureDocs from './views/signatureDocs/SignatureDocs.vue'
import SignatureDocsNonMillennium from './views/signatureDocsNonMillennium/SignatureDocsNonMillennium.vue'
import Main from './views/Main/Main.vue'
import FundsTransfers from './views/FundsTransfers/FundsTransfers.vue'
import SecurityPreferences from './views/SecurityPreferences/SecurityPreferences.vue'
import Login from './views/Login/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Main',
        component: Main
      },
      {
        path: '/Login',
        name: 'Login',
        component: Login
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
      },
      {
        path: '/signature-non-millennium',
        name: 'Signature Non Millennium',
        component: SignatureDocsNonMillennium
      },
    ]
})