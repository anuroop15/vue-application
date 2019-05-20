import Vue from "vue";
import { mapActions, mapState } from "vuex";
import {es, en , pt} from './i18n';
import { ChallengeConstant as Constant } from "../../store/utils";

export default Vue.extend({
  name: "ChallengeManager",
  i18n:{
    messages:{
        en,
        es,
        pt
    }
  },
  data() {
    return {
      pickedMethod: "",
      code: ""
    };
  },
  props: {
    urlBase: {
      type: String
    },
    onSuccess: {
      type: Function
    },
    onError: {
      type: Function
    },
    parameters: {
      type: Object
    }
  },
  created() {
    this._challengeInit({ urlBase: this.urlBase, parameters: this.parameters });
  },
  methods: {
    startChallengerNow() {
      this._challengeStart({
        urlBase: this.urlBase,
        picked: this.pickedMethod
      });
    },
    cancelChallenger() {
      this.$vuedals.close();
    },
    changeToAlternatePhone() {
      this._setStage(Constant.challengeStage.SELECT_METHOD);
    },
    processOTPStart() {
      this._processOTP({ urlBase: this.urlBase, token: this.code });
      this.code ="";
    },
    challengeStageHandler(value) {
      switch (value) {
        case "CHALLENGE_SUCCESS":
          this.cancelChallenger();
          this.onSuccess();
          break;
        case "CHALLENGE_TOO_MANY_ATTEMPTS":
          this.code = "";
          break;
        case "CHALLENGE_RETRY":
          this.code = "";
          break;
        default:
          break;
      }
    },
    challengeStageActionHandler(value){
      if (value === "CHALLENGE_RETRY_CODE") {
        this.code = "";
      }
    },
    challengeErrorHandler({ exit, data }){
      if (exit) {
        this.$vuedals.close();
        this.onError(data);
      }
    },
    ...mapActions("challengeManager", [
      "_challengeInit",
      "_challengeStart",
      "_setStage",
      "_processOTP",
      "_setActionStage"
    ])
  },
  computed: {
    getMethods() {
      let methods = [];
      this.challengeManager.methods.forEach(method => {
        let { type, label } = method;
        let labelMethod = "CHALLENGE_METHOD_" + type;
        if (
          type == Constant.authenticationMethod.OOBPHONE ||
          type == Constant.authenticationMethod.OTPPHONE
        ) {
          methods.push({
            label: `${this.$t(labelMethod)}(${label})`,
            value: label
          });
        } else {
          methods.push({
            label: Constant.messages[labelMethod],
            value: label
          });
        }
      });
      return methods;
    },
    ...mapState(["challengeManager"])
  },
  watch: {
    "challengeManager.stage": "challengeStageHandler",
    "challengeManager.stageAction":"challengeStageActionHandler",
    "challengeManager.error": "challengeErrorHandler",
  }
});
