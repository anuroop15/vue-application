<template>
  <section class="banking-security-pre_section">
    <div class="banking-security-pre_section-name">
      <h3>{{$t('changePassword')}}</h3>
    </div>
    <form @submit.prevent="initPasswordChange">
      <div class="banking-security-pre_section-content p-3">
        <div class="row mb-2">
          <div class="col-12 col-md-6">
            <label for="oldPassword">{{$t('oldPassword')}}</label>
          </div>
          <div class="col-12 col-md-6">
            <BaseInput
              v-model="$v.password.oldPassword.$model"
              @blur="$v.password.oldPassword.$touch()"
              type="password"
            />
            <div
              v-if="$v.password.oldPassword.$error"
              class="banking-security-pre_alert"
              role="alert"
            >
              <p>{{$t('oldPasswordError')}}</p>
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12 col-md-6">
            <label for="New Password">{{$t('newPassword')}}</label>
          </div>
          <div class="col-12 col-md-6">
            <BaseInput
              v-model="$v.password.newPassword.$model"
              @blur="$v.password.newPassword.$touch()"
              type="password"
            />
            <div
              v-if="$v.password.newPassword.$error"
              class="banking-security-pre_alert"
              role="alert"
            >
              <p>{{$t('newPasswordError')}}</p>
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12 col-md-6">
            <label for="Verify password">{{$t('repeatNewPassword')}}</label>
            <div
              v-if="!$v.password.verifyPassword.same && $v.password.verifyPassword.$error"
              class="banking-security-pre_alert"
              role="alert"
            >
              <p>{{$t('passwordsDontMatch')}}</p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <BaseInput
              v-model="$v.password.verifyPassword.$model"
              @blur="$v.password.verifyPassword.$touch()"
              type="password"
            />
            <div
              v-if="$v.password.verifyPassword.$error"
              class="banking-security-pre_alert"
              role="alert"
            >
              <p>{{$t('repeatNewPasswordError')}}</p>
            </div>
          </div>
        </div>
        <div class="row justify-content-end mb-2">
          <div class="col-sm-2 align-self-end">
            <BaseButton variant="primary">{{$t('save')}}</BaseButton>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import ChallengeManager from "../../../components/ChallegeManager/ChallengeManager.vue";
import { required, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { en, es, pt } from "../i18n";
export default {
  name: "ChangePassword",
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  data() {
    return {
      password: {
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
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
    }
  },
  methods: {
    initPasswordChange(){
      if(this.$store.state.securityPreference.challengeType === 'RSA'){
        this.startRSA();
      } else {
        this.startOTP();
      }
    },
    startOTP() {
      this.$v.password.$touch();
      if (this.$v.password.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.startChallenge = true;
        this.$vuedals.open({
          title: this.$t("additionalAuthenticationRequired"),
          size: "md",
          component: ChallengeManager,
          props: {
            urlBase: "preferences/json/ChallengeOTPForPasswordChange",
            parameters: this.password,
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
            return h("h6", this.$t("passwordChanged"));
          }
        }
      });
    },
    otpOnError(data) {
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
              return h("h6", this.$t("errorChangingPassword"));
            }
          }
        });
      }
    },
    startRSA() {
      this.$v.password.$touch();
      if (this.$v.password.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.startChallenge = true;
        this.$vuedals.open({
          title: "Confirmation",
          size: "sm",
          component: {
            name: "prompt-modal-security",

            render: h => {
              return h("div", { style: "padding:0!important" }, [
                h(
                  "p",
                  { style: "padding:20px" },
                  this.$t("passwordConfirmation")
                ),
                h("div", { class: "banking-security-pre_footer" }, [
                  h(
                    "BaseButton",
                    {
                      on: { click: this.rsaCancel },
                      props: {
                        variant: "outline",
                        className: "ml-3"
                      }
                    },
                    this.$t("cancel")
                  ),
                  h(
                    "BaseButton",
                    {
                      on: { click: this.rsaChangePassword },
                      props: { variant: "outline", className: "ml-3" }
                    },
                    "OK"
                  )
                ])
              ]);
            }
          }
        });
      }
    },
    rsaCancel() {
      this.password = {
        oldPassword: "",
        newPassword: "",
        verifyPassword: ""
      };
      this.$vuedals.close();
      this.$v.$reset();
    },
    rsaChangePassword() {
      this.updateOwnPassword(this.password);
      this.rsaCancel();
    },
    ...mapActions("securityPreference", ["updateOwnPassword"])
  }
};
</script>
