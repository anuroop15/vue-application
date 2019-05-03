export default {
    name: "SignerList",
    props: {
      trackDetails: {
        type: Object
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
