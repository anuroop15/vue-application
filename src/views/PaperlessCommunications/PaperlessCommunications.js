export default {
    name: "PaperlessCommunications",

}






import AgGridComponent from '../../components/AgGridComponent/AgGridComponent.vue'
import ChallengeManager from '../../components/ChallegeManager/ChallengeManager.vue'
import DocumentView from '../../components/DocumentView/DocumentView.vue'
import SignerList from '../../components/SignerList/SignerList.vue'


import { mapActions, mapState } from 'vuex'
import { Component as Vuedal } from "vuedals";
import moment from 'moment';
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
      showModal: false
      currentActive: 0,
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
    this.fetchGetDocumentsToAccept();
  },
  components: {},
  methods: {
  },
  computed: {}
}