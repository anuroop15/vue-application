import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import router from '../../router'
import store from '../../store/store'
import App from './DemoWidget.vue'

Vue.config.productionTip = false

Vue.use(vueCustomElement);

const requireComponent = require.context(
  '../../components/common',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

App.store = store;
App.router = router;

Vue.customElement('demo-widget', App)