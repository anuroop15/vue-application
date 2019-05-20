/**
 * @vue-data {boolean} show modal
 */
import {en, es, pt } from './i18n'
export default {
    name: "DocumentView",
    i18n:{
      messages:{
          en,
          es,
          pt
      }
    },
    props: {
      urlBase: {
          type: String
      },
      parameters: {
        type: Object
      },
      onDownload: {
        type: Function
      },
      onSelect: {
        type: Function
      },
      onCancel: {
        type: Function
      }
    },
    data: function (){
       return {
           showModal: false
        }
    }
}