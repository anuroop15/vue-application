<template>
  <section class="banking-security-pre_section">
    <div class="banking-security-pre_section-name">
      <h3>{{$t('securityQuestions')}}</h3>
    </div>
    <form @submit.prevent="initSQChange">
      <div class="banking-security-pre_section-content p-3">
        <template v-for="(questionsInfo, index) in securityPreference.securityInfo.questionsInfo">
          <div class="row mb-2" :key="questionsInfo[0].id">
            <div class="col">
              <label for="Username">{{$t('question')}}</label>
            </div>
            <div class="col-12 col-md-6">
              <BaseSelect
                :options="questionsInfo"
                identifier="id"
                text="text"
                v-model="securityInfo.question[index]"
                :defaultValue="questionsInfo[0].id"
              />
            </div>
          </div>
          <div class="row mb-2" :key="questionsInfo.id">
            <div class="col-12 col-md-6">
              <label for="Display Name">{{$t('answer')}}</label>
            </div>
            <div class="col-12 col-md-6">
              <BaseInput
                @blur="$v.securityInfo.answer.$touch()"
                v-model.trim="securityInfo.answer[index]"
              />
            </div>
          </div>
        </template>
        <div class="banking-security-pre_alert">
          <p v-if="securityInfo.submitError">{{$t('securityQuestionsError')}}</p>
        </div>
        <div
          v-if="securityPreference.challengeType === 'RSA'"
          class="d-flex justify-content-between mt-2"
        >
          <div class="banking-security-pre_see-answers">
          <BaseButton
            variant="primary"
            @click.prevent="seeSecurityQuestionsChallenger"
          >{{$t('showSecurityAnswers')}}</BaseButton>
          <img  v-tooltip.right="{ content: $t('showAnswers')}" src="../../../assets/help14x14.gif">
          </div>
          <BaseButton variant="primary" :disabled="!enableSaveSQ">{{$t('save')}}</BaseButton>
        </div>
        <div v-else class="row justify-content-end mb-2">
          <div class="col-sm-2 align-self-end">
            <BaseButton variant="primary">{{$t('save')}}</BaseButton>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import ChallegeManagerPhone from "../../../components/ChallegeManagerPhone/ChallegeManagerPhone.vue";
import ChallengeManager from "../../../components/ChallegeManager/ChallengeManager.vue";
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import { en, es, pt } from "../i18n";
export default {
  name: "SecurityQuestions",
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  data() {
    return {
      enableSaveSQ:false,
      securityInfo: {
        answer: [],
        question: [],
        submitError: false,
        devicePrint: true
      }
    };
  },
  validations() {
    if (this.securityInfo.answer) {
      return {
        securityInfo: {
          answer: {
            $each: {
              required
            }
          }
        }
      };
    }
  },
  methods: {
    initSQChange() {
      if (this.$store.state.securityPreference.challengeType === "RSA") {
        this.changeSecurityQ();
      } else {
        this.startOTPSQ();
      }
    },
    startOTPSQ() {
      this.$v.securityInfo.$touch();
      if (this.$v.securityInfo.answer.$invalid) {
        this.securityInfo.submitError = true;
      } else {
        this.securityInfo.submitError = false;
        this.$vuedals.open({
          title: this.$t("additionalAuthenticationRequired"),
          size: "md",
          component: ChallengeManager,
          props: {
            urlBase: "preferences/json/ChallengeOTPForSecurityQuestionsChange",
            parameters: this.securityInfo,
            onSuccess: this.otpOnSuccess,
            onError: this.otpOnError
          },
          dismissable: false,
          escapable: true
        });
      }
    },
    otpOnSuccess() {
      this.$v.$reset();
      this.$vuedals.open({
        size: "xs",
        component: {
          name: "success-password",
          render: h => {
            return h("h6", this.$t("securityQuestionsSuccess"));
          }
        }
      });
    },
    otpOnError(data) {
      this.$v.$reset();
      if (data.actionMessages != null && data.actionMessages.length > 0) {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-security-questions",
            render: h => {
              return h("h6", data.actionMessages.join("\n"));
            }
          }
        });
      } else {
        this.$vuedals.open({
          size: "xs",
          component: {
            name: "error-security-questions",
            render: h => {
              return h("h6", this.$t("errorChangingSQ"));
            }
          }
        });
      }
    },
    seeSecurityQuestionsChallenger() {
      this.$vuedals.open({
        title: this.$t("additionalAuthenticationRequired"),
        size: "md",
        component: {
          name: "see-security-questions",
          render: h => {
            return h("div", { style: "padding:0!important" }, [
              h(ChallegeManagerPhone, {
                style: "padding:20px!important",
                props: {
                  urlBase: "preferences/json/SeeSecurityQuestions",
                  parameters: { devicePrint: true }
                },
                on: {
                  onSuccess: this.seeSqHandlerOnSuccess,
                  onError: this.seeSqHandlerOnError
                }
              })
            ]);
          }
        },
        dismissable: false,
        escapable: true
      });
    },
    seeSqHandlerOnError(data) {
      this.$vuedals.close();
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
    seeSqHandlerOnSuccess() {
      this.$vuedals.close();
      this.setAnswersVisible();
    },
    changeSecurityQ() {
      this.$v.securityInfo.$touch();
      if (this.$v.securityInfo.answer.$invalid) {
        this.securityInfo.submitError = true;
      } else {
        this.securityInfo.submitError = false;
        let { answer, question } = this.securityInfo;
        this.updateSecurityQuestions({ answer, question });
      }
    },
    fetchQuestionsInfo() {
      let question = this.$store.getters["securityPreference/getStateProp"](
        "securityInfo"
      );
      question.questionsInfo.forEach((question, index) => {
        this.securityInfo.question[index] = this.securityInfo.question[index]
          ? this.securityInfo.question[index]
          : question[0].id;
        this.securityInfo.answer[index] = this.securityInfo.answer[index]
          ? this.securityInfo.answer[index]
          : "";
      });
    },
    fetchAnswersInfo() {
      let tempAnswer = [];
      let tempQuestion = [];
      let answersInfo = this.$store.getters[
        "securityPreference/getStateProp"
      ]("answersInfo");
      let answersInfoOrdered = {};
      Object.keys(answersInfo)
        .sort()
        .forEach(key => {
          answersInfoOrdered[key] = answersInfo[key];
        });
      for (let answer in answersInfoOrdered) {
        tempAnswer.push(answersInfoOrdered[answer]);
        tempQuestion.push(answer);
      }
      this.securityInfo.answer = tempAnswer;
      this.securityInfo.question = tempQuestion;
      this.enableSaveSQ = true;
    },
    ...mapActions("securityPreference", ["updateSecurityQuestions","setAnswersVisible"])
  },
  computed: {
    ...mapState(["securityPreference"])
  },
  watch: {
    "securityPreference.securityInfo.questionsInfo": "fetchQuestionsInfo",
    "securityPreference.answersInfo": "fetchAnswersInfo"
  }
};
</script>
