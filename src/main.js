import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { default as Vuedals } from "vuedals";
import Tooltip from 'vue-directive-tooltip';
import { ClientTable } from "vue-tables-2";
import { Tabs, Tab } from "vue-tabs-component";
import router from "./router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import VueSelect from "vue-cool-select";
import i18n from './i18n';
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
import 'vue-directive-tooltip/css/index.css';

Vue.config.productionTip = false;

//vue-notifications
Vue.use(Vuedals);
//vue-forms-validation
Vue.use(Vuelidate);
//vue autocomplete select
Vue.use(VueSelect, { theme: "bootstrap" });
//tooltip
Vue.use(Tooltip, {class:'banking-tooltip'});

Vue.use(ClientTable, { theme: "bootstrap4" });

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);


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
