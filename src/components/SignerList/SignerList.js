import moment from 'moment'
import { es, en, pt } from "./i18n";

export default {
    name: "SignerList",
    i18n: {
      messages: {
        en,
        es,
        pt
      }
    },
    props: {
      trackDetails: {
        type: Array
      },
      viewSignedDoc: {
        type: Function
      },
      closeModal: {
        type: Function
      }	      
    },
    data: function (){
       return {
           showModal: false
        }
    },
    methods: {
      onClose() {
        this.$vuedals.close()
      },
      getLocalDateFormat(date) {
        return date ? moment(date).format('DD-MMM-YY') : date
      }
    }
}