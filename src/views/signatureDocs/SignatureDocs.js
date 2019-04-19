import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignatureDocs',
  data() {
    return {
      displayedDocuments: {}
    }
  },
  components: {
    AgGridComponent
  },
  methods: {
    getDocuments(docStatus) {
      if(docStatus) {
        this.$store.dispatch('fetchPending', this.documents)
        this.displayedDocuments = this.$store.state.signatureDocs.pendingDocuments.items
      } else {
        this.$store.dispatch('fetchSigned', this.documents)
        this.displayedDocuments = this.$store.state.signatureDocs.signedDocuments.items
      }
    }
  },
  computed: {
    ...mapGetters({
      documents: 'documents'
    })
  }
}
