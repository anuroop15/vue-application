import Vue from 'vue'
import Vuex from 'vuex'
import { signatureDocs } from './modules'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signatureDocs
  }
})
