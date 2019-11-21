import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { default as Vuedals } from "vuedals";
import store from "./security-prederences-store";
import Vuelidate from "vuelidate";
import VueSelect from "vue-cool-select";
import Tooltip from 'vue-directive-tooltip'
import i18n from '../../i18n'
import {isAuthF2} from '../../store/services';
import bankingSecurityPre from "./security-preferences.vue";

// import "bootstrap/dist/css/bootstrap.css";
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

const requireComponent = require.context(
  "../../components/common",
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

/* F2 init */
let isF2Ready = false;
const f2handler = () =>{
  isF2Ready = true;
}
/* eslint-disable */
F2.Events.on('banking-f2-apps-ready', f2handler)

const checkToMount = () => {
  if (isF2Ready && isAuthF2()) {
    i18n.locale = isAuthF2().lang;
    new Vue({
      store,
      i18n,
      render: h => h(bankingSecurityPre)
    }).$mount("#bankingSecurityPre");
  } else {
    setTimeout(checkToMount, 500);
  }
}
checkToMount()

