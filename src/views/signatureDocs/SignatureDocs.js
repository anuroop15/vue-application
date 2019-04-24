import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import Modal from '../../components/Modal/Modal.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignatureDocs',
  data() {
    return {
      documents: {},
      canSign: false,
      selectedRowInfo: {},
      showModal: false
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
    getDocuments(selectedTab) {
      if(selectedTab.tab.name === 'Documents to Sign') {
        this.fetchPending()
      } else {
        this.fetchSigned()
      }
      this.canSign = !this.canSign
    },
    selectedRow(data) {
      this.selectedRowInfo = data
    },
    signSelected() {
      this.showModal = true
    },
    downloadSelected(){
      // download Pdf doc
    },
    showModalWindow(value) {
      if (value === 'Accept') {
        //
      } else {
        this.showModal = !this.showModal
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
