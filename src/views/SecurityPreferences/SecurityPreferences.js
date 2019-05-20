import { mapActions, mapState } from "vuex";
import { Component as Vuedal } from "vuedals";
import { CoolSelect } from 'vue-cool-select'
import {en, es, pt} from './i18n'
import { required, sameAs, numeric, maxLength } from "vuelidate/lib/validators";
import ChallengeManager from "../../components/ChallegeManager/ChallengeManager.vue";

export default {
  name: "SecurityPreferences",
  components: {
    Vuedal,
    CoolSelect,
    ChallengeManager
  },
  i18n:{
    messages:{
        en,
        es,
        pt
    }
  },
  data() {
    return {
      userLoginName: "",
      displayName: "",
      phones: [],
      unbindSelected: "",
      enablePhoneEdit: true,
      startChallenge: false,
      preferred:"",
      password: {
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
      },
      securityInfo: {
        answer: [],
        question: [],
        submitError: false,
        devicePrint: true
      }
    };
  },
  validations(){
    let val ={
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
        phones:{
          $each:{
            phoneNumber:{
              required,
              numeric,
              maxLength: maxLength(25),
            },
            phoneCountryCode:{
              required
            }
          }
        }
      }
      if(this.securityInfo.answer){
        return Object.assign({},val ,{securityInfo:{
          answer:{
            $each:{
              required
            }
          },
        },})
      }
      return val;
    },
  created() {
    this.fetchSecurityPre();
    this.fetchPhoneCountryPrefixList();
  },
  methods: {
    startPhoneChanges() {
      this.$v.phones.$touch();
      if (this.$v.phones.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
      let payload ={
        data: this.phones,
        prefSelected: this.preferred,
      }
      this.validatePhonesNumbers(payload);
    }
    },
    startChallengeChangePassword() {
      this.$v.password.$touch();
      if (this.$v.password.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.startChallenge = true;
        this.$vuedals.open({
          title: this.$t('additionalAuthenticationRequired'),
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
      this.$v.securityInfo.$touch();
      if(this.$v.securityInfo.answer.$invalid){
        this.securityInfo.submitError = true;
      } else {
        this.securityInfo.submitError = false;
        this.$vuedals.open({
          title: this.$t('additionalAuthenticationRequired'),
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
      }
    },
    sqHandlerOnSuccess() {
      this.$v.$reset();
      this.$vuedals.open({
        size: "xs",
        component: {
          name: "success-password",

          render: h => {
            return h(
              "h6",
              this.$t('securityQuestionsSuccess')
            );
          }
        }
      });
    },
    phoneSaveHandlerOnSuccess() {
      this.$v.$reset();
      this.$vuedals.open({
        size: "xs",
        component: {
          name: "success-phones-update",
          render: h => {
            return h("h6", this.$t('phonesSaved'));
          }
        }
      });
    },
    phoneSaveHandlerOnError(data) {
      this.$v.$reset();
      if (data.actionMessages != null && data.actionMessages.length > 0) {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-phone",

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
              return h(
                "h6",
                this.$t('errorSavingPhone')
              );
            }
          }
        });
      }
    },
    sqHandlerOnError(data) {
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
              return h(
                "h6",
                this.$t('errorChangingSQ')
              );
            }
          }
        });
      }
    },
    startChallengePhone(data){
      if (data) {
        this.$vuedals.open({
          title: this.$t('additionalAuthenticationRequired'),
          size: "md",
          component: ChallengeManager,
          props: {
            urlBase: "preferences/json/ChallengeOTPForPhonesOperation",
            parameters: data,
            onSuccess: this.phoneSaveHandlerOnSuccess,
            onError: this.phoneSaveHandlerOnError
          },
          dismissable: false,
          escapable: true
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
              return h(
                "h6",
                this.$t('errorChangingPassword')
              );
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
            return h("h6", this.$t('passwordChanged'));
          }
        }
      });
    },
    phoneAddInputs() {
      let key = "n" + Math.random() * 10;
      this.phones.push({
        phoneCountryCode: "",
        phoneNumber: "",
        key: key
      });
    },
    phoneDelete(index) {
      this.phones.splice(index, 1);
    },
    phonesEditHandle() {
      this.enablePhoneEdit = this.enablePhoneEdit ? false : true;
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
              h("p", this.$t('confirmDeleteDevice',{label: label})),
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
    fetchUserLoginName() {
      this.userLoginName = this.$store.getters[
        "securityPreference/getStateProp"
      ]("userLoginName");
    },
    fetchDisplayName() {
      this.displayName = this.$store.getters["securityPreference/getStateProp"](
        "displayName"
      );
    },
    fetchPhones() {
      this.phones = this.$store.getters["securityPreference/getStateProp"](
        "phones"
      );
    },
    fetchPreferred(){
      this.preferred = this.$store.getters["securityPreference/getStateProp"](
        "preferred"
      );
    },
    fetchQuestionsInfo(){
      let question = this.$store.getters["securityPreference/getStateProp"](
        "securityInfo"
      );
      question.questionsInfo.forEach((question, index)=>{
        this.securityInfo.question[index]= this.securityInfo.question[index] ? this.securityInfo.question[index] : question[0].id;
        this.securityInfo.answer[index]= this.securityInfo.answer[index] ? this.securityInfo.answer[index] : '';
      })
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
    "securityPreference.userLoginName": "fetchUserLoginName",
    "securityPreference.displayName": "fetchDisplayName",
    "securityPreference.phones": "fetchPhones",
    "securityPreference.showModal": "showModal",
    "securityPreference.phonesChallenge": "startChallengePhone",
    "securityPreference.preferred":"fetchPreferred",
    "securityPreference.securityInfo.questionsInfo":"fetchQuestionsInfo"
  }
};
