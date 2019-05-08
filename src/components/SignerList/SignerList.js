import moment from 'moment'

export default {
    name: "SignerList",
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
        date !== '' ? moment(date).format('DD-MMM-YY') : ""
      }
    }
}