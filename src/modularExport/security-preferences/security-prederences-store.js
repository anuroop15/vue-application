import Vue from "vue";
import Vuex from "vuex";
import {securityPreference, challengeManager, i18n } from '../../store/modules';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    securityPreference,
    challengeManager,
    i18n
  }
 });

 window.santander_f2_apps_i18nChange = function(locale){
  const xStore = store;
  xStore.dispatch('i18n/changeLocale',locale)
};

export default store;
