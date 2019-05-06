import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { default as Vuedals } from "vuedals";
import { ClientTable } from "vue-tables-2";
import { Tabs, Tab } from "vue-tabs-component";
import router from "./router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import VueSelect from "vue-cool-select";
import VueI18n from 'vue-i18n'
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";

Vue.config.productionTip = false;

//vue-notifications
Vue.use(Vuedals);
//vue-forms-validation
Vue.use(Vuelidate);
//vue autocomplete select
Vue.use(VueSelect, { theme: "bootstrap" });
//i18n
Vue.use(VueI18n)

Vue.use(ClientTable, { theme: "bootstrap4" });

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);

const i18n = new VueI18n({
  locale: 'es',
})


const requireComponent = require.context(
  "./components/common",
  true,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
