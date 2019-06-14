import { mapActions, mapState } from "vuex";
import {en, es, pt} from './i18n'
import Sections from "./sections"

export default {
  name: "SecurityPreferences",
  components: {
    Sections
  },
  i18n:{
    messages:{
        en,
        es,
        pt
    }
  },  
  created() {
    this.fetchSecurityPre();
    this.fetchPhoneCountryPrefixList();
  },
  methods: {
    showModal(val) {
      if (val) {
        this.$vuedals.open({
          title: this.securityPreference.message.title,
          size: "xs",
          component: {
            name: "inside-modal",

            render: h => {
              return h("h6", {
                domProps: { innerHTML: this.securityPreference.message.body }
              });
            }
          }
        });
        this.securityPreference.showModal = false;
      }
    },
    ...mapActions("securityPreference", [
      "fetchSecurityPre",
      "fetchPhoneCountryPrefixList",
    ])
  },
  computed: {
    ...mapState(["securityPreference"])
  },
  watch: {
    "securityPreference.showModal": "showModal",
  }
};
