import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import App from './SignatureDocs.vue'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import router from '../../router'
Vue.use(VueCustomElement)

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

App.router = router

Vue.customElement('signature-docs', App)