import Vue from "vue";
import Vuex from "vuex";
import { demo, fundsTransfers,signatureDocs, securityPreference, challengeManager } from './modules';
Vue.use(Vuex);

export default new Vuex.Store({
 modules:{
   demo,
   signatureDocs,
   fundsTransfers,
   securityPreference,
   challengeManager,
 }
});
