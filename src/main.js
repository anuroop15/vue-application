import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import {default as Vuedals} from 'vuedals';
import {ClientTable, Event} from 'vue-tables-2';
import 'vue-nav-tabs/themes/vue-tabs.css'
import router from './router'
import store from './store/store'
import App from './App.vue'
import Vuelidate from 'vuelidate'



import 'bootstrap/dist/css/bootstrap.css';
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";


Vue.config.productionTip = false

//vue-notifications
Vue.use(Vuedals);
Vue.use(Vuelidate)
Vue.use(ClientTable, {theme :'bootstrap4'});

const requireComponent = require.context(
  './components/common',
  true,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
