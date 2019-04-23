import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import Modal from '../../components/Modal/Modal.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignatureDocs',
  data() {
    return {
      documents: {}
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    AgGridComponent,
    Modal
  },
  methods: {
    getDocuments(docStatus) {
      if(docStatus) {
        this.fetchPending()
      } else {
        this.fetchSigned()
      }
    },
    ...mapActions({ fetchData: "signatureDocs/fetchData",
                    fetchSigned: "signatureDocs/fetchSigned",
                    fetchPending: "signatureDocs/fetchPending"
                  })
  },
  computed: {
    displayedDocuments() {
      return this.signatureDocs.displayedDocuments
    },
    ...mapState(["signatureDocs"]),
  }
}
