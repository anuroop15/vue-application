import { mapActions, mapState } from 'vuex'

export default {
    name: "PaperlessCommunications",
    data() {
      return {
      }
    },
    created() {
      this.fetchPaperlessDeliveries()
    },
    methods: {
      ...mapActions({ fetchPaperlessDeliveries: "paperlessCommunications/fetchPaperlessDeliveries"
                    })
    },
    computed: {
      deliveries() {
        return this.paperlessCommunications.deliveries
      },
      ...mapState(["paperlessCommunications"])
    }
}
