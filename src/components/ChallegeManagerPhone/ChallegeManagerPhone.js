import { es, en, pt } from "./i18n";
import {
  ChallengeInitiate,
  ChallengeStart,
  ChallengeCheckQuestionsChallenge,
  CheckAuthStatus,
  logClientSideInfo
} from "../../store/services";
import {
  ChallengeConstant as Constant,
  add_deviceprint,
  doPlain,
  debugExeption,
  randomString,
  delay
} from "../../store/utils";

export default {
  name: "ChallegeManagerPhone",
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  data() {
    return {
      pickedMethod: "",
      answers: [],
      _poolingTime: 5000,
      info: {
        methods:[],
        selectedMethod: {
          type: ""
        }
      },
      messages:{},
      step: "SELECT_METHOD",
      logs:[],
      isLoading: true,
    };
  },
  props: {
    urlBase: {
      type: String
    },
    parameters: {
      type: Object
    }
  },
  created() {
    this._challengeInit();
  },
  methods: {
    _log(s){
      this.logs.push(`${randomString(8)} ${new Date().toISOString()} ${s}`)
    },
    _sendLog(){
      logClientSideInfo(doPlain(this.logs, "data"))
    },
    _handleResMessages({actionErrors, actionMessages}){
      this.messages = {actionErrors, actionMessages}
    },
    upDate({ data: { challengeInfo } }) {
      this.info = Object.assign({}, this.info, challengeInfo);
      this.isLoading = false;
    },
    _handelOnSuccess(data) {
      this._log('onSuccess start')
      this.$emit("onSuccess", data);
      this._log("onSuccess end")
      this._sendLog()
      this.isLoading = false;
    },
    _handelError(data) {
      this._log('onError start')
      this.$emit("onError", data);
      this._log('onError end')
      this._sendLog()
      this.isLoading = false;
    },
    async _challengeInit() {
      try {
        this._log('start start')
        let parameters = this.parameters;
        parameters.devicePrint = add_deviceprint();
        this._log('start xhrPost Initiate')
        let response = await ChallengeInitiate(
          this.urlBase,
          doPlain(parameters),
          this.getLocale
        );
        this._handleResMessages(response.data)
        if (response.data.actionResult === Constant.common.CHALLENGE) {
          this._log('start 1.1 challenge')
          this.upDate(response.data);
        } else if (response.data.actionResult === Constant.common.ERROR) {
          this._log('start 1.2 on error')
          this._handelError(response.data);
        } else {
          this._handelOnSuccess(response.data);
        }
        this._sendLog()
      } catch (err) {
        debugExeption(err);
        this._handelError(err.response.data)
      }
    },
    async startChallengerNow() {
      try {
        this._log(`start Challenger Now ${this.pickedMethod}`)
        let label = this.info.methods.find(
          method =>
            method.label === this.pickedMethod ||
            method.type === this.pickedMethod
        );
        this._log('start xhr post request ChallengeStart')
        let response = await ChallengeStart(
          this.urlBase,
          doPlain(label, "challengeMethod"),
          this.getLocale
        );
        this._handleResMessages(response.data)
        if (response.data.actionResult === Constant.common.CHALLENGE) {
          this._log('challenge Start response state update')
          this.upDate(response.data);
        } else if (response.data.actionResult === Constant.common.ERROR) {
          this._handelError(response.data);
        } else {
          this._handelOnSuccess(response.data);
        }
        this._sendLog()
      } catch (err) {
        debugExeption(err);
        this._handelError(err.response.data)
      }
    },
    async checkSqChallengerNow() {
      try {
        this._log('check security questions start')
        let data = {
          answersToChallenge: this.answers,
          devicePrint: add_deviceprint()
        };
        this._log('start xhr post check security questions')
        let response = await ChallengeCheckQuestionsChallenge(
          this.urlBase,
          doPlain(data),
          this.getLocale
        );
        this._handleResMessages(response.data)
        if (response.data.actionResult === Constant.common.CHALLENGE) {
          this._log('check security questions response and updata state')
          this.upDate(response.data);
        } else if (response.data.actionResult === Constant.common.SUCCESS) {
          this._handelOnSuccess(response.data);
        } else if (
          response.data.actionResult === Constant.challengeStage.RSA_LOCKOUT
        ) {
          this._log('check security user_lockout')
          response.data.actionMessages.push(this.$t("user_lockout"))
          this._handelError(response.data);
        } else if (response.data.actionResult === Constant.common.ERROR) {
          this._handelError(response.data);
        } else {
          this._handelOnSuccess(response.data);
        }
        this._sendLog()
      } catch (err) {
        debugExeption(err);
        this._handelError(err.response.data)
      }
    },
    async _checkAuthStatus(time) {
      try {
        this._log('check auth status start')
        if(time){
          await delay(time)
        }
        this._log('xhr post check auth status start')
        let response = await CheckAuthStatus(this.urlBase, this.getLocale);
        this._handleResMessages(response.data)
        if (response.data.actionResult === "challenge") {
          this._log('check auth status response')
          this.upDate(response.data)
          if(response.data.data.challengeInfo.stage ===Constant.challengeStage.IN_PROCESS){
            this._checkAuthStatus(this._poolingTime)
          }
        }
           else if (response.data.actionResult === "error") {
            this._handelError(response.data);
          } else if (
            response.data.actionResult === "CHALLENGE_STAGE_RSA_LOCKOUT"
          ) {
            this._log('check auth status user_lockout')
            this.$vuedals.open({
              size: "xs",
              component: {
                name: "user_lockout",
                render: h => {
                  
                    return h("h6",this.$t("user_lockout"));
                }
              }
            })
            response.data.actionMessages.push(this.$t("user_lockout"))
            this._handelError(response.data);
          } else {
            this._handelOnSuccess(response.data);
          }
          this._sendLog();
      } catch (err) {
        debugExeption(err);
        this._handelError(err.response.data)
      }
    },
    onStageChange(stage, oldStage) {
      switch (stage) {
        case Constant.challengeStage.STAGE:
          this.step = this.info.selectedMethod.type;
          break;
        case Constant.challengeStage.SELECT_METHOD:
          this.step = 'SELECT_METHOD';
          break;
        case Constant.challengeStage.RETRY:
              this.answers = [];
              oldStage === Constant.challengeStage.RETRY ? this.answers = [] : null
          break;
        case Constant.challengeStage.FAIL:
             this.info.status.userStatus === Constant.common.VERIFIED?
             this.$vuedals.open({
              size: "xs",
              component: {
                name: "fail-challenger",
                render: h => {
                  this.messages.forEach(m =>{
                    return h("h6",m);
                  })
                }
              }
            }): null
             this.info.status.userStatus === Constant.common.LOCKOUT
             ?this.$vuedals.open({
              size: "xs",
              component: {
                name: "user_lockout",
                render: h => {
                  
                    return h("h6",this.$t("user_lockout"));
                }
              }
            }): null
          break;
        case Constant.challengeStage.ERROR :
             this._handelError(this.messages);
          break;
        case Constant.challengeStage.SUCCESS:
             this._handelOnSuccess("stage")
          break;
      
        default:
          break;
      }
    }, 
    onMethodSelected(type) {
      if (
        type === Constant.authenticationMethod.OOBPHONE ||
        (this.info.stage === Constant.challengeStage.RETRY &&
          type === Constant.authenticationMethod.OOBPHONE)
      ) {
        this._checkAuthStatus()
      }
    }
  },
  computed: {
    getLocale() {
      return this.$i18n.locale;
    },
    getMethods() {
      let methods = [];
      this.info.methods.forEach(method => {
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
            value: type
          });
        }
      });
      return methods;
    }
  },
  watch: {
    "info.stage": "onStageChange",
    "info.selectedMethod.type": "onMethodSelected"
  }
};
