import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignatureDocs',
  data() {
    return {
      displayedDocuments: {},
      documents: {}
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    AgGridComponent
  },
  methods: {
    getDocuments(docStatus) {
      if(docStatus) {
        this.displayedDocuments = this.signatureDocs.data.data.PENDING.items
      } else {
        this.displayedDocuments = this.signatureDocs.data.data.SIGNED.items
      }
    },
    ...mapActions({ fetchData: "signatureDocs/fetchData" })
  },
  computed: {
    ...mapState(["signatureDocs"])
  }
}
