<template>
  <section class="santander-security-pre_section">
    <form @submit.prevent="startPhoneChanges">
      <div class="santander-security-pre_section-name">
        <h3>{{$t('registeredPhones')}}</h3>
      </div>
      <div class="santander-security-pre_section-content p-3">
        <p v-if="securityPreference.challengeType === 'OTP'">{{$t('phonesDescription')}}</p>
        <template v-if="securityPreference.challengeType === 'RSA'">
          <div>
            <BaseButton
              class="float-left mb-3"
              @click="loadPhoneFrom"
              variant="primary"
            >{{$t('addPhone')}}</BaseButton>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">{{$t('phoneAlias')}}</th>
                  <th scope="col">{{$t('phoneCountryCode')}}</th>
                  <th scope="col">{{$t('phoneAreaCode')}}</th>
                  <th scope="col">{{$t('phoneNumber')}}</th>
                  <th scope="col">{{$t('phoneUpdate')}}</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(phone,i) in phones">
                  <tr :key="phone.label">
                    <td>{{phone.label}}</td>
                    <td>{{phone.countryCode}}</td>
                    <td>{{phone.areaCode}}</td>
                    <td>{{phone.phoneNumber}}</td>
                    <td>{{getLocalDateFormat(phone.lastModified)}}</td>
                    <td>
                      <BaseButton
                        class="santander-security-pre_phone-delete"
                        @click="loadPhoneFromEdit(i)"
                      ><img src="../../../assets/edit.gif"></BaseButton>
                      <!-- <BaseButton
                        @click.prevent="deletePhoneRSA(phone.label)"
                        class="santander-security-pre_phone-delete"
                      >
                        <img src="../../../assets/delete.gif">
                      </BaseButton> -->
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else v-for="(phone, i) in $v.phones.$each.$iter">
          <div class="santander-security-pre_phone" :key="phone.$model.key">
            <div class="row mt-4">
              <div class="col-2 col-md-1 order-1 order-md-1 santander-security-pre_phone-item">
                <input
                  type="radio"
                  :value="phone.$model.phoneNumber"
                  v-model="preferred"
                  :disabled="enablePhoneEdit"
                >
              </div>
              <div class="col-10 col-md-4 order-2 order-md-2 santander-security-pre_phone-item">
                <cool-select
                  v-model="phone.phoneCountryCode.$model"
                  :items="securityPreference.countryPrefixList.items || []"
                  item-value="countryPrefix"
                  item-text="countryName"
                  :disabled="enablePhoneEdit"
                >
                  <p slot="item" slot-scope="{ item }">{{item.countryName}}</p>
                </cool-select>
                <div
                  class="santander-security-pre_alert"
                  role="alert"
                  v-if="!phone.phoneCountryCode.required"
                >
                  <p>{{$t('areaCodeError')}}</p>
                </div>
              </div>
              <div
                class="col-6 col-md-4 offset-2 offset-md-0 order-4 order-md-3 santander-security-pre_phone-item"
              >
                <BaseInput
                  :disabled="enablePhoneEdit"
                  placeholder="Phone Number"
                  v-model.trim="phone.$model.phoneNumber"
                />
                <div
                  class="santander-security-pre_alert"
                  role="alert"
                  v-if="!phone.phoneNumber.required"
                >
                  <p>{{$t('phoneNumberError')}}</p>
                </div>
                <div
                  class="santander-security-pre_alert"
                  role="alert"
                  v-if="!phone.phoneNumber.numeric"
                >
                  <p>{{$t('numberOnlyError')}}</p>
                </div>
                <div
                  class="santander-security-pre_alert"
                  role="alert"
                  v-if="!phone.phoneNumber.maxLength"
                >
                  <p>{{$t('invalidPhone')}}</p>
                </div>
              </div>
              <div class="col-4 col-md-3 order-5 order-md-4 santander-security-pre_phone-item">
                <BaseInput
                  :disabled="enablePhoneEdit"
                  v-model="phones[i].extension"
                  placeholder="Ext."
                />
              </div>
              <!-- <div class="col-2 col-md-1 order-3 order-md-4 santander-security-pre_phone-item">
                <BaseButton
                  class="santander-security-pre_phone-delete"
                  :disabled="enablePhoneEdit"
                  @click="phoneDelete(i)"
                >
                  <img src="../../../assets/delete.gif">
                </BaseButton>
              </div> -->
            </div>
          </div>
        </template>
        <div
          v-if="securityPreference.challengeType === 'OTP'"
          class="mt-5 d-flex justify-content-around"
        >
          <BaseButton variant="outline" @click.prevent="phonesEditHandle">{{$t('edit')}}</BaseButton>

          <BaseButton type="submit" variant="primary" :disabled="enablePhoneEdit">{{$t('save')}}</BaseButton>

          <BaseButton @click.prevent="phoneAddInputs" :disabled="enablePhoneEdit">Add</BaseButton>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import ChallegeManagerPhone from "../../../components/ChallegeManagerPhone/ChallegeManagerPhone.vue";
import ChallengeManager from "../../../components/ChallegeManager/ChallengeManager.vue";
import AddPhoneForm from "./addPhoneForm";
import { CoolSelect } from "vue-cool-select";
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { required, numeric, maxLength } from "vuelidate/lib/validators";
import { en, es, pt } from "../i18n";
export default {
  name: "Phones",
  components: {
    CoolSelect
  },
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  data() {
    return {
      phones: [],
      enablePhoneEdit: true,
      preferred: "",
      deletePhoneLabel: ""
    };
  },
  created() {
    this.fetchPhones();
  },
  validations: {
    phones: {
      $each: {
        phoneNumber: {
          required,
          numeric,
          maxLength: maxLength(25)
        },
        phoneCountryCode: {
          required
        }
      }
    }
  },
  methods: {
    startPhoneChanges() {
      this.$v.phones.$touch();
      if (this.$v.phones.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        let payload = {
          data: this.phones,
          prefSelected: this.preferred
        };
        this.validatePhonesNumbers(payload);
      }
    },
    startChallengePhone(data) {
      if (data) {
        this.$vuedals.open({
          title: this.$t("additionalAuthenticationRequired"),
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
    phoneSaveHandlerOnSuccess() {
      this.$v.$reset();
      this.$vuedals.open({
        size: "xs",
        component: {
          name: "success-phones-update",
          render: h => {
            return h("h6", this.$t("phonesSaved"));
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
              return h("h6", this.$t("errorSavingPhone"));
            }
          }
        });
      }
    },
    loadPhoneFromEdit(i) {
      this.$vuedals.open({
        size: "xs",
        title: this.$t("addPhone"),
        component: {
          name: "load-phone-edit",
          render: h => {
            return h(
              AddPhoneForm,
              {
                on: {
                  onSave: this.rsaChallengerStart
                },
                props: {
                  phone: this.phones[i]
                }
              }
            );
          }
        }
      });
    },
    loadPhoneFrom() {
      this.$vuedals.open({
        size: "xs",
        title: this.$t("addPhone"),
        component: {
          name: "load-phone-form",
          render: h => {
            return h(AddPhoneForm, {
              on: {
                onSave: this.rsaChallengerStart
              }
            });
          }
        }
      });
    },
    rsaChallengerStart(data) {
      this.$vuedals.open({
        title: this.$t("additionalAuthenticationRequired"),
        size: "md",
        component: {
          name: "security-questions-add-phone",
          render: h => {
            return h("div", { style: "padding:0!important" }, [
              h(ChallegeManagerPhone, {
                style: "padding:20px!important",
                props: {
                  urlBase: "/preferences/json/ModifyPhone",
                  parameters: {
                    operation: "ADD",
                    phone: {
                      ...data
                    }
                  }
                },
                on: {
                  onSuccess: this.onRSASuccess,
                  onError: this.onRSAError
                }
              })
            ]);
          }
        },
        dismissable: false,
        escapable: true
      });
    },
    deletePhoneRSA(label) {
      this.deletePhoneLabel = label;
      this.$vuedals.open({
        title: "Confirmation",
        size: "sm",
        component: {
          name: "prompt-modal-security-phone-rsa-remove",

          render: h => {
            return h("div", { style: "padding:0!important" }, [
              h(
                "p",
                { style: "padding:20px" },
                this.$t("phoneDeleteConfirmation")
              ),
              h("div", { class: "santander-security-pre_footer" }, [
                h(
                  "BaseButton",
                  {
                    on: { click: this.deletePhoneCancelRSA },
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
                    on: { click: this.startPhoneDeleteRSA },
                    props: { variant: "outline", className: "ml-3" }
                  },
                  "OK"
                )
              ])
            ]);
          }
        }
      });
    },
    startPhoneDeleteRSA() {
      this.$vuedals.close();
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
                  urlBase: "/preferences/json/ModifyPhone",
                  parameters: {
                    operation: "REMOVE",
                    phone: {
                      label: this.deletePhoneLabel
                    }
                  }
                },
                on: {
                  onSuccess: this.onRSASuccess,
                  onError: this.onRSAError
                }
              })
            ]);
          }
        },
        dismissable: false,
        escapable: true
      });
    },
    onRSASuccess() {
      this.$vuedals.close();
      this.ModifyPhoneOperate();
    },
    onRSAError(data) {
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
              return h("h6", this.$t("errorChangingSQ"));
            }
          }
        });
      }
    },
    deletePhoneCancelRSA() {
      this.$vuedals.close();
    },
    getLocalDateFormat(date) {
      return date ? moment(date).format("DD-MMM-YY") : date;
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
    fetchPhones() {
      this.phones = this.$store.getters["securityPreference/getStateProp"](
        "phones"
      );
    },
    fetchPreferred() {
      this.preferred = this.$store.getters["securityPreference/getStateProp"](
        "preferred"
      );
    },
    ...mapActions("securityPreference", [
      "validatePhonesNumbers",
      "ModifyPhoneOperate"
    ])
  },
  computed: {
    ...mapState(["securityPreference"])
  },
  watch: {
    "securityPreference.phonesChallenge": "startChallengePhone",
    "securityPreference.phones": "fetchPhones",
    "securityPreference.preferred": "fetchPreferred"
  }
};
</script>