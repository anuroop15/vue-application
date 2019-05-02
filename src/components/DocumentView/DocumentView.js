import { createDecipher } from "crypto";

/**
 * @vue-data {boolean} show modal
 */
export default {
    name: "DocumentView",
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
      }
    }
}
