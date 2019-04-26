import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import Modal from '../../components/Modal/Modal.vue'
import { mapActions, mapState } from 'vuex'
import { GridColumnDefsPending, GridColumnDefsSigned } from './constants/constants'
import { Component as Vuedal } from "vuedals";
import ChallengeManager from '../../components/ChallegeManager/ChallengeManager.vue'
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

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
    Modal,
    VueTabs,
    VTab,
    Vuedal,
    ChallengeManager,
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
    startChallengeDemo(){
      this.startChallenge = true;
      this.$vuedals.open({
        title: "Additional authentication required",
        size: "md",
        component: ChallengeManager,
        props: {
          urlBase:"preferences/json/ChallengeOTPForPasswordChange",
          parameters: this.password,
          handler:this.challegeHandlerTest,
        },
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
