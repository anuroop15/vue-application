import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import Modal from '../../components/Modal/Modal.vue'
import { mapActions, mapState } from 'vuex'
import { GridColumnDefsPending, GridColumnDefsSigned } from './constants/constants'
import { Component as Vuedal } from "vuedals";
import ChallengeManager from '../../components/ChallegeManager/ChallengeManager.vue'
import DocumentView from '../../components/DocumentView/DocumentView.vue'
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
  name: 'SignatureDocs',
  data() {
    return {
      selectedRowInfo: {},
      documentDetails: {},
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
    Modal,
    DocumentView,
    VueTabs,
    VTab,
    Vuedal,
    ChallengeManager,
  },
  methods: {
    getDocuments(selectedTab) {
      if(selectedTab === 0) {
        this.fetchPending()
      } else if (selectedTab === 1){
        this.fetchSigned()
      } else {
        this.fetchPendingByOthers()
      }
    },
    selectedRow(data) {
      this.selectedRowInfo = data
    },
    signSelected() {
      if (this.selectedRowInfo && this.selectedRowInfo.description) {
        this.showModal = true
        this.acceptToSign = true
      } else {
        this.$vuedals.open({
          title: "Error",
          size: "md",
          component: {
            render: h => {
              return h("p", "Please select a document to sign");
            }
          },
        });
      }
    },
    downloadSelected(){
      // download Pdf doc
    },
    startChallengeDemo(){
      this.startChallenge = true;
      this.$vuedals.open({
        title: "Additional authentication required",
        size: "md",
        component: ChallengeManager,
        props: {
          urlBase:"security/json/ChallengeOTPForDocumentSignature",
          parameters: {
            idDocumentTracks: this.documentDetails.idDocTrack
          },
          onSuccess:this.signedSuccessful,
          onError: this.signedError
        },
        dismissable:false,
        escapable: true,

      });
    },
    signedSuccessful() {
      this.fetchData()
    },
    signedError() {
      console.log('error')
    },
    viewDocument(documentDetails, resolve, reject) {
      this.documentDetails = documentDetails
      this.fetchDocumentExistence(documentDetails).then(data => {
        if (data.actionResult === 'success') {
          this.fetchDocumentPDF(documentDetails).then(data => {
            const blobContent = new Blob([data], {type: 'application/pdf'})
            const fileUrl = window.URL.createObjectURL(blobContent)
            this.openPdfWindow(documentDetails, fileUrl, resolve, reject)
          })
        } else {
          this.showErrorModal()
        }
      })
    },
    openPdfWindow(documentDetails, url, resolve, reject) {
      const selectDocument = () => {
        this.$vuedals.close()
        resolve('selected')
      }
      const downloadDocument = () => {
        var a = document.createElement('a');
        a.style = "display: none";
        // var blob = new Blob(data, {type: "application/octet-stream"});
        // var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.setAttribute("download", documentDetails.idDocTrack + ".pdf");
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
      }, 100);
      }
      this.$vuedals.open({
        title: documentDetails.description,
        size: "xl",
        component: DocumentView,
        props: {
          urlBase: url + '#toolbar=1',
          parameters: {
            documentDetails: documentDetails
          },
          onDownload: downloadDocument,
          onSelect: selectDocument
        },
        dismissable:false,
        escapable: true,
      });
    },
    showErrorModal() {
      this.$vuedals.open({
        title: 'Error',
        size: "md",
        component: '',
        dismissable:false,
        escapable: true,
      });
    },
    showModalWindow(value) {
      if (value === 'Accept') {
        this.showModal = false
        this.startChallengeDemo()
      } else {
        this.showModal = !this.showModal
      }
    },
    ...mapActions({ fetchData: "signatureDocs/fetchData",
                    fetchSigned: "signatureDocs/fetchSigned",
                    fetchPending: "signatureDocs/fetchPending",
                    fetchPendingByOthers: "signatureDocs/fetchPendingByOthers",
                    fetchDocumentPDF: "signatureDocs/fetchDocumentPDF",
                    fetchDocumentExistence: "signatureDocs/fetchDocumentExistence"
                  })
  },
  computed: {
    displayedDocuments() {
      return this.signatureDocs.displayedDocuments
    },
    ...mapState(["signatureDocs"]),
  }
}