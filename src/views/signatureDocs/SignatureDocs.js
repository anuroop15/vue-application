import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import Modal from '../../components/Modal/Modal.vue'
import { mapActions, mapState } from 'vuex'
import { GridColumnDefsPending, GridColumnDefsSigned } from './constants/constants'

export default {
  name: 'SignatureDocs',
  data() {
    return {
      documents: {},
      canSign: false,
      selectedRowInfo: {},
      challengeAuth: false,
      acceptToSign: false,
      showModal: false,
      gridColumnDefsPending: GridColumnDefsPending,
      gridColumnDefsSigned: GridColumnDefsSigned
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
      if (this.selectedRowInfo && this.selectedRowInfo.description) {
        this.showModal = true
        this.acceptToSign = true
      }
    },
    downloadSelected(){
      // download Pdf doc
    },
    showModalWindow(value) {
      if (value === 'Accept') {
        this.acceptToSign = false
        this.challengeAuth = true
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