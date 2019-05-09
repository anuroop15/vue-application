import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import ChallengeManager from '../../components/ChallegeManager/ChallengeManager.vue'
import DocumentView from '../../components/DocumentView/DocumentView.vue'
import SignerList from '../../components/SignerList/SignerList.vue'
import Modal from '../../components/Modal/Modal.vue'


import { mapActions, mapState } from 'vuex'
import { GridColumnDefsPending, GridColumnDefsSigned } from './constants/constants'
import { Component as Vuedal } from "vuedals";
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

import _ from 'lodash'
import {en, es, pt} from './i18n';

export default {
  name: 'SignatureDocs',
  data() {
    return {
      selectedRowInfo: [],
      documentDetails: {},
      signedDocDetails: {},
      selectedAllViewed: false,
      documentListToSign: [],
      documentsToSign: true,
      downloadUrl: '',
      documentSeleced: false,
      challengeAuth: false,
      acceptToSign: false,
      showModal: false,
      gridColumnDefsPending: GridColumnDefsPending,
      gridColumnDefsSigned: GridColumnDefsSigned
    }
  },
  i18n:{
    messages:{
        en,
        es,
        pt
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    AgGridComponent,
    Modal,
    DocumentView,
    SignerList,
    VueTabs,
    VTab,
    Vuedal,
    ChallengeManager,
  },
  methods: {
    getDocuments(selectedTab) {
      if(selectedTab === 0) {
        this.documentsToSign = true
        this.fetchPending()
      } else if (selectedTab === 1){
        this.documentsToSign = false
        this.fetchSigned()
      } else {
        this.documentsToSign = false
        this.fetchPendingByOthers()
      }
    },
    selectedRow(data) {
      this.selectedRowInfo = data
    },
    signSelected() {
      if (this.selectedRowInfo && this.selectedRowInfo.length > 0) {
        this.$vuedals.open({
          title: this.$t('docsToSign'),
          size: "md",
          component: {
            render: h => {
              return h("div", [
                h("p", this.$t('You are going to sign selected documents')),
                h(
                  "BaseButton",
                  { on: { click: this.startChallengeDemo } },
                  "Accept"
                ),
                h(
                  "BaseButton",
                  { on: { click: this.closeModal } },
                  "Cancel"
                )
              ]);
            }
          },
        });
      } else {
        this.$vuedals.open({
          title: this.$t('error'),
          size: "md",
          component: {
            render: h => {
              return h("p", this.$t('selectToSign'));
            }
          },
        });
      }
    },
    downloadSelected(){
      if (this.downloadUrl && this.selectedRowInfo.length > 0) {
        if (this.selectedRowInfo.length === 1) {
          var a = document.createElement('a');
          a.style = "display: none";
          // var blob = new Blob(data, {type: "application/octet-stream"});
          // var url = window.URL.createObjectURL(blob);
          a.href = this.downloadUrl;
          a.setAttribute("download", "document to sign.pdf");
          document.body.appendChild(a);
          a.click();
          setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        } else {
          const concatData = _.map(this.selectedRowInfo, (docDetails) => {
            return docDetails.idDocTrack
          })
          this.fetchPDFsConcatenated(concatData).then(data => {
            const blobContent = new Blob([data], {type: 'application/pdf'})
            const fileUrl = window.URL.createObjectURL(blobContent)
            var a = document.createElement('a');
            a.style = "display: none";
            // var blob = new Blob(data, {type: "application/octet-stream"});
            // var url = window.URL.createObjectURL(blob);
            a.href = fileUrl;
            a.setAttribute("download", "document to sign.pdf");
            document.body.appendChild(a);
            a.click();
            setTimeout(function(){
              document.body.removeChild(a);
              window.URL.revokeObjectURL(fileUrl);
            }, 100);
          })
        }
      } else {
        this.$vuedals.open({
          title: this.$t('error'),
          size: "md",
          component: {
            render: h => {
              return h("p", this.$t('selectToDownload'));
            }
          },
        });
      }
    },
    startChallengeDemo(){
      this.$vuedals.close()
      this.startChallenge = true;
      this.$vuedals.open({
        title: this.$t('authenticationRequired'),
        size: "md",
        component: ChallengeManager,
        props: {
          urlBase:"security/json/ChallengeOTPForDocumentSignature",
          parameters: {
            idDocumentTracks: this.documentListToSign
          },
          onSuccess:this.signedSuccessful,
          onError: this.signedError
        },
        escapable: true,

      });
    },
    signedSuccessful() {
      this.fetchData()
      this.$vuedals.open({
        title: 'Successfully Signed',
        size: "lg",
        component: {
          render: h => {
            return h("p", this.$t('successfullySignedDoc'));
          }
        },
        props: {},
        escapable: true,
      });
    },
    signedError() {
      console.log('error')
    },
    viewPDFDocument(documentDetails, resolve, reject) {
      this.getPdfDocument(documentDetails, resolve, reject, false)
    },
    getPdfDocument(documentDetails, resolve, reject, forSigned) {
      this.documentDetails = documentDetails
      this.documentListToSign.push(documentDetails.idDocTrack)
      const documetDetailsObj = {
        documentDetailsArg: documentDetails,
        forSignedArg: forSigned
      }
      this.fetchDocumentExistence(documentDetails, forSigned).then(data => {
        if (data.actionResult === 'success') {
          this.fetchDocumentPDF(documetDetailsObj).then(data => {
            const blobContent = new Blob([data], {type: 'application/pdf'})
            const fileUrl = window.URL.createObjectURL(blobContent)
            this.openPdfWindow(documentDetails, fileUrl, resolve, reject)
          })
        } else {
          this.showErrorModal()
        }
      })
    },
    viewSignedDoc(docId) {
      if (this.signedDocDetails) {
        this.signedDocDetails.idDocument = docId
        this.getPdfDocument(this.signedDocDetails, null, null, true)
      } else {
        return null
      }
    },
    selectAll() {
      this.selectedAllViewed = !this.selectedAllViewed
    },
    customerSelected(trackDetails) {
      this.signedDocDetails = trackDetails
      this.fetchDocTrackDetails(trackDetails).then(data => {
        this.$vuedals.open({
          title: 'Signers List',
          size: "lg",
          component: SignerList,
          props: {
            trackDetails: data.data,
            viewSignedDoc: this.viewSignedDoc,
            closeModal: this.closeModal
          },
          escapable: true,
        });
      })
    },

    openPdfWindow(documentDetails, url, resolve, reject) {
      this.downloadUrl = url
      const selectDocument = () => {
        this.$vuedals.close()
        resolve('selected')
      }
      const cancelDocument = () => {
        this.$vuedals.close()
        resolve('viewed')
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
            documentDetails: documentDetails,
            documentsToSign: this.documentsToSign
          },
          onDownload: downloadDocument,
          onSelect: selectDocument,
          onCancel: cancelDocument
        },
        onDismiss() {
          cancelDocument()
        },
        dismissable: false,
        escapable: true
      });
    },
    showErrorModal() {
      this.$vuedals.open({
        title: 'Error',
        size: "md",
        component: {
          render: h => {
            return h("div", [
              h("p", this.$t('docNotAvailable')),
              h(
                "BaseButton",
                { on: { click: this.closeModal } },
                "Accept"
              )
            ]);
          }
        },
        escapable: true,
      });
    },
    closeModal() {
      this.$vuedals.close()
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
                    fetchDocumentExistence: "signatureDocs/fetchDocumentExistence",
                    fetchDocTrackDetails: "signatureDocs/fetchDocTrackDetails",
                    fetchPDFsConcatenated: "signatureDocs/fetchPDFsConcatenated"
                  })
  },
  computed: {
    
    i18nColumnDefs(columnArray) {
      _.map(columnArray, (obj) => {
        if(obj.headerName) {
          obj['headerName'] = this.$t(obj.headerName)
        }
        return obj
      })
    },
    displayedDocuments() {
      return this.signatureDocs.displayedDocuments
    },
    ...mapState(["signatureDocs"]),
  }
}