import { mapActions, mapState, mapGetters } from "vuex";
import { Component as Vuedal } from "vuedals";
import { required, sameAs } from "vuelidate/lib/validators";
import ChallengeManager from "../../components/ChallegeManager/ChallengeManager.vue";

export default {
  name: "SecurityPreferences",
  components: {
    Vuedal,
    ChallengeManager
  },
  data() {
    return {
      unbindSelected: "",
      enablePhoneEdit: true,
      startChallenge: false,
      password: {
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
      },
      securityInfo: {
        answer: [],
        question: []
      }
    };
  },
  validations: {
    password: {
      oldPassword: {
        required
      },
      newPassword: {
        required
      },
      verifyPassword: {
        required,
        same: sameAs("newPassword")
      }
    },
    validationGroup: ["password"]
  },
  created() {
    this.fetchSecurityPre();
    this.fetchPhoneCountryPrefixList();
  },
  methods: {
    startPhoneChanges(){
      //step 1 verify phones
      this.validatePhonesNumbers();
      //if success start challenger
      //else show error
    },
    startChallengeChangePassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.startChallenge = true;
        this.$vuedals.open({
          title: "Additional authentication required",
          size: "md",
          component: ChallengeManager,
          props: {
            urlBase: "preferences/json/ChallengeOTPForPasswordChange",
            parameters: this.password,
            onSuccess: this.passwordHandlerOnSuccess,
            onError: this.passwordHandlerOnError
          },
          dismissable: false,
          escapable: true
        });
      }
    },
    startChallengeSQ() {
      this.$v.$touch();
      this.$vuedals.open({
        title: "Additional authentication required",
        size: "md",
        component: ChallengeManager,
        props: {
          urlBase: "preferences/json/ChallengeOTPForSecurityQuestionsChange",
          parameters: this.securityInfo,
          onSuccess: this.sqHandlerOnSuccess,
          onError: this.sqHandlerOnError
        },
        dismissable: false,
        escapable: true
      });
    },
    sqHandlerOnSuccess(){
      this.$v.$reset();
      this.$vuedals.open({
        size: "xs",
        component: {
          name: "success-password",

          render: h => {
            return h("h6", "Your security questions has been changed successfully");
          }
        }
      });
    },
    sqHandlerOnError(data){
      this.$v.$reset();
      if (data.actionMessages != null && data.actionMessages.length > 0) {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-password",

            render: h => {
              return h("h6", data.actionMessages.join("\n"));
            }
          }
        });
      } else {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-password",

            render: h => {
              return h("h6", "There has been an error changing the security questions, please try again later");
            }
          }
        });
      }
    },
    passwordHandlerOnError(data) {
      this.password = {
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
      };
      this.$v.$reset();
      if (data.actionMessages != null && data.actionMessages.length > 0) {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-password",

            render: h => {
              return h("h6", data.actionMessages.join("\n"));
            }
          }
        });
      } else {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-password",

            render: h => {
              return h("h6", "There has been an error changing the password, please try again later or validate that your old password is correct");
            }
          }
        });
      }
    },
    passwordHandlerOnSuccess() {
      this.$v.$reset();
      this.$vuedals.open({
        size: "xs",
        component: {
          name: "success-password",

          render: h => {
            return h("h6", "Your password has been changed successfully");
          }
        }
      });
    },
    phoneAddInputs() {
      let key = "n" + Math.random() * 10;
      this.securityPreference.phones.push({
        phoneCountryCode: "",
        phoneNumber: "",
        key: key
      });
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
      "deleteDevice",
      "validatePhonesNumbers"
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
