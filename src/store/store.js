import Vue from "vue";
import Vuex from "vuex";

import {
  demo,
  fundsTransfers,
  signatureDocs,
  signatureDocsNonMillennium,
  securityPreference,
  challengeManager,
  paperlessCommunications,
  i18n,
  auth
} from "./modules";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    demo,
    signatureDocs,
    fundsTransfers,
    signatureDocsNonMillennium,
    securityPreference,
    challengeManager,
    paperlessCommunications,
    i18n,
    auth
  }
});

window.banking_f2_apps_i18nChange = function(locale) {
  store.dispatch("i18n/changeLocale", locale);
};

export default store;
