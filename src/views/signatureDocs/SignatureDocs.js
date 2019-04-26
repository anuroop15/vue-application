import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import Modal from '../../components/Modal/Modal.vue'
import { mapActions, mapState } from 'vuex'
import { Component as Vuedal } from "vuedals";
import ChallengeManager from '../../components/ChallegeManager/ChallengeManager.vue'
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
      gridColumnDefsSigned: GridColumnDefsSigned,
      startChallenge: false,
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    AgGridComponent,
    Modal,
    Vuedal,
    ChallengeManager
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
    startChallengeDemo(){
      this.startChallenge = true;
      this.$vuedals.open({
        title: "Additional authentication required",
        size: "md",
        component: ChallengeManager,
          urlBase:"preferences/json/SeeSecurityQuestions",
          start: true,
          handler:this.challegeHandlerTest,
        });
    },
    challegeHandlerTest(){
      // eslint-disable-next-line
      this.startChallenge= false;
      // console.log('callback on challenge success')
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
        this.startChallengeDemo()
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
