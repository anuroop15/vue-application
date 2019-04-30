import { createDecipher } from "crypto";

/**
 * @vue-data {boolean} show modal
 */
export default {
    name: "DocumentView",
    props: {
        urlBase: {
            type: String
        }
    },
    data: function (){
       return {
           showModal: false
        }
    },
    methods: {
        getPdfUrl() {
            return this.urlBase
        }
    }
}