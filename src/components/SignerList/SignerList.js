export default {
    name: "SignerList",
    props: {
      trackDetails: {
        type: Array
      },
      viewSignedDoc: {
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