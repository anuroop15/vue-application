export default {
    name: "SignerList",
    props: {
      trackDetails: {
        type: Array
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