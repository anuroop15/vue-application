import Vue from "vue";
import Vuex from "vuex";
import {signatureDocs, challengeManager, i18n } from '../../store/modules';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    signatureDocs,
    challengeManager,
    i18n
  }
 });

window.banking_signatureDocs = function(locale){
  const coolStore = store;
  coolStore.dispatch('i18n/changeLocale',locale)
};

export default store;
