import { mapActions, mapState } from "vuex";
import { Component as Vuedal } from "vuedals";
import ChallengeManager from '../../components/ChallegeManager/ChallengeManager.vue'

export default {
  name: "SecurityPreferences",
  components: {
    Vuedal,
    ChallengeManager,
  },
  data() {
    return {
      unbindSelected: "",
      enablePhoneEdit: true,
      startChallenge: false,
    };
  },
  created() {
    this.fetchSecurityPre();
    this.fetchPhoneCountryPrefixList();
  },
  methods: {
    startChallengeDemo(){
      this.startChallenge = true;
      this.$vuedals.open({
        title: "Additional authentication required",
        size: "md",
        component: ChallengeManager,
          urlBase:"preferences/json/SeeSecurityQuestions",
          start: true,
          handler:this.challegeHandlerTest,
        }
      });
    },
    challegeHandlerTest(){
      // eslint-disable-next-line
      this.startChallenge= false;
      console.log('callback on challenge success')
    },
    phoneAddInputs(){
      let key = "n" + Math.random()*10;
      this.securityPreference.phones.push({
        phoneCountryCode:"",
        phoneNumber:"",
        key: key,
      })
    },
    phoneDelete(key) {
      this.securityPreference.phones.forEach((value, index) => {
        if (value.key === key) {
          this.securityPreference.phones.splice(index, 1);
        }
      });
    },
    phonesEditHandle() {
      this.enablePhoneEdit = false;
    },
    unbindDeviceProcess() {
      this.$vuedals.close();
      this.deleteDevice(this.unbindSelected);
      this.unbindSelected = "";
    },
    unbindDeviceCancel() {
      this.$vuedals.close();
      this.unbindSelected = "";
    },
    unbindDeviceStart(label) {
      this.unbindSelected = label;
      this.$vuedals.open({
        title: "Confirmation",
        size: "sm",
        component: {
          name: "prompt-modal-security",

          render: h => {
            return h("div", [
              h("p", `Are you sure you want to unbind ${label}?`),
              h(
                "BaseButton",
                { on: { click: this.unbindDeviceProcess } },
                "OK"
              ),
              h(
                "BaseButton",
                { on: { click: this.unbindDeviceCancel } },
                "Cancel"
              )
            ]);
          }
        }
      });
    },
    ...mapActions("securityPreference", [
      "fetchSecurityPre",
      "fetchPhoneCountryPrefixList",
      "updateUserLoginName",
      "updateOwnDisplayName",
      "deleteDevice"
    ])
  },
  computed: {
    ...mapState(["securityPreference"])
  },
  watch: {
    "securityPreference.showModal": function(val) {
      if (val) {
        this.$vuedals.open({
          title: this.securityPreference.message.title,
          size: "xs",
          component: {
            name: "inside-modal",

            render: h => {
              return h("h6", this.securityPreference.message.body);
            }
          }
        });
        this.securityPreference.showModal = false;
      }
    }
  }
};

