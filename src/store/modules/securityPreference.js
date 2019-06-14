import {
  GetEnrollmentInformation,
  GetSecurityPreferences,
  GetPhoneCountryPrefixList,
  GetPreferencesSections,
  GetUserInformation,
  ChangeSiteAuthentication,
  ChangeSecurityQuestions,
  ChangeOwnPassword,
  ChangeOwnUserLoginName,
  ChangeOwnDisplayName,
  UnbindDevice,
  ModifyPhoneOperate,
  ValidatePhones,
  SeeSecurityQuestionsSetAnswersVisible
} from "../services";

import i18n from "../../i18n";
import { debugExeption, doPlain, add_deviceprint } from "../utils";

export const securityPreference = {
  namespaced: true,
  state: {
    challengeType: "",
    sections: [],
    imagesInfo: null,
    displayName: "",
    phones: [],
    answersInfo: {},
    phonesChallenge: {},
    securityInfo: {},
    userLoginName: "",
    userName: "",
    preferred: "",
    showModal: false,
    message: {
      title: "",
      body: ""
    },
    countryPrefixList: [],
    isLoading: false
  },
  mutations: {
    SET_SECTIONS(state, { challengeType, sections }) {
      state.challengeType = challengeType;
      state.sections = sections;
    },
    SECURITY_PRE_STARTED(state) {
      state.showModal = false;
      state.isLoading = true;
      state.phones = [];
      state.message = {
        title: "",
        body: ""
      };
    },
    SET_ACTION_NOTIFY(state, { body, title }) {
      state.showModal = true;
      state.isLoading = false;
      state.message = {
        title: title,
        body: body
      };
    },
    SET_PHONES_CHALLENGE(state, payload) {
      state.phonesChallenge = payload;
    },
    SECURITY_PRE_SUCCESS(
      state,
      {
        displayName,
        phones,
        phonesInfo,
        siteToUserInfo,
        questionsInfo,
        devicesInfo,
        imagesInfo,
        securityInfo,
        userLoginName,
        userName
      }
    ) {
      state.showModal = false;
      state.isLoading = false;
      state.message = {
        title: "",
        body: ""
      };
      displayName?state.displayName = displayName:null;
      if (phones) {
        phones.forEach(phone => {
          phone.phoneNumber = phone.phoneNumber.replace(/\s/g, '')
          if (phone.phoneNumber.includes("x")) {
            phone.extension = phone.phoneNumber.substring(
              phone.phoneNumber.indexOf("x") + 1,
              phone.phoneNumber.length
            );
            phone.phoneNumber = phone.phoneNumber.substring(
              0,
              phone.phoneNumber.indexOf("x") - 1
            );
          }
          let preferred = phone.preferred ? phone.preferred : false;
          state.preferred = preferred ? phone.phoneNumber : "";
          state.phones.push({
            preferred,
            ...phone
          });
        });
      } else if (phonesInfo) {
        state.phones = phonesInfo;
      }
      if (securityInfo) {
        state.securityInfo = securityInfo;
      } else {
        state.securityInfo = {
          siteToUserInfo,
          questionsInfo,
          devicesInfo
        };
      }
      if (imagesInfo) {
        state.imagesInfo = imagesInfo;
      }
      userLoginName? state.userLoginName = userLoginName :null;
      userName?state.userName = userName:null;
    },
    SET_ANSWERS_INFO(state, { answersInfo }) {
      state.answersInfo = answersInfo;
    },
    SET_USER_INFO(state,{userLoginName,displayName}){
      state.userLoginName = userLoginName;
      state.displayName = displayName;
    },
    SET_USER_IMAGES(state, imageSelected) {
      let obj = Object.assign({}, state.securityInfo.siteToUserInfo);
      obj.image.fakeName = imageSelected;
      state.securityInfo.siteToUserInfo = obj;
    },
    SECURITY_PRE_LOAD_IMGS(state, { imagesInfo }) {
      state.imagesInfo = imagesInfo;
    },
    COUNTRYPREFIXLIST_SUCCESS(state, payload) {
      state.showModal = false;
      state.countryPrefixList = payload;
    },
    SET_ACTION_SUCCESS(state, { dataUpdated, dataValue, title, body }) {
      if (dataUpdated) {
        state[dataUpdated] = dataValue;
      }
      state.message = {
        title: title,
        body: body
      };
      state.showModal = true;
      state.isLoading = false;
    }
  },
  actions: {
    async fetchPhoneCountryPrefixList({ commit, getters }) {
      try {
        let response = await GetPhoneCountryPrefixList(getters.getLocale);
        if (response.data.actionResult === "success") {
          response.data.data.items.reverse();
          commit("COUNTRYPREFIXLIST_SUCCESS", response.data.data);
        }
      } catch (err) {
        debugExeption(err);
        commit("SET_ACTION_NOTIFY", err);
      }
    },
    async fetchOTPSecurityPreferences({ commit, getters: { getLocale } }) {
      commit("SECURITY_PRE_STARTED");
      try {
        let response = await GetSecurityPreferences(getLocale);
        if (response.data.actionResult === "success") {
          commit("SECURITY_PRE_SUCCESS", response.data.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:127");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async getUserInfo({ commit, getters: { getLocale } }){
      try {
        let response = await GetUserInformation(getLocale);
        if (response.data.actionResult === "success") {
          commit("SET_USER_INFO", response.data.data);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:127");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async fetchRSASecurityPreferences({ commit,dispatch, getters: { getLocale } }) {
      commit("SECURITY_PRE_STARTED");
      dispatch('getUserInfo');
      try {
        let data = {
          devicePrint: add_deviceprint(),
          informationType: [
            "IMAGES",
            "SITE2USER",
            "DEVICES",
            "PHONES",
            "QUESTIONS"
          ],
          sendImageData: false
        };
        let response = await GetEnrollmentInformation(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          commit("SECURITY_PRE_SUCCESS", response.data.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:127");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async fetchSecurityPre({ commit, dispatch, getters: { getLocale } }) {
      try {
        commit("SECURITY_PRE_STARTED");
        let {
          data: { data }
        } = await GetPreferencesSections(getLocale);
        if (data) {
          commit("SET_SECTIONS", data);
          if (data.challengeType === "RSA") {
            dispatch("fetchRSASecurityPreferences");
          } else {
            dispatch("fetchOTPSecurityPreferences");
          }
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:127");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async fetchSecurityQuestionsAnswer({ commit, getters: { getLocale } }) {
      try {
        let data = {
          devicePrint: add_deviceprint(),
          informationType: ["ANSWERS"],
          sendImageData: false
        };
        let response = await GetEnrollmentInformation(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          commit("SET_ANSWERS_INFO", response.data.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:162");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async setAnswersVisible({ commit, dispatch, getters: { getLocale } }) {
      try {
        let data = {
          devicePrint: add_deviceprint()
        };
        let response = await SeeSecurityQuestionsSetAnswersVisible(
          doPlain(data),
          getLocale
        );
        if (response.data.actionResult === "success") {
          dispatch("fetchSecurityQuestionsAnswer");
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:162");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async fetchMoreImages({ commit, getters: { getLocale } }) {
      try {
        let data = {
          devicePrint: add_deviceprint(),
          informationType: ["IMAGES"],
          sendImageData: false
        };
        let response = await GetEnrollmentInformation(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          commit("SECURITY_PRE_LOAD_IMGS", response.data.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:162");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateSecurityQuestions(
      {
        commit,
        getters: { getLocale }
      },
      payload
    ) {
      try {
        let data = {
          devicePrint: add_deviceprint(),
          ...payload
        };
        let response = await ChangeSecurityQuestions(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Success",
            body: message
          };
          commit("SET_ACTION_NOTIFY", err);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async ModifyPhoneOperate({ commit, getters: { getLocale } }) {
      try {
        let data = {
          devicePrint: add_deviceprint()
        };
        let err = {};
        let response = await ModifyPhoneOperate(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          err.title = "Success";
          err.body =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (err.body = response.data.actionErrors.join("\n"));
          let {
            data: {
              data: { userPhones }
            }
          } = response;
          (err.dataUpdated = "phones"), (err.dataValue = userPhones);
          commit("SET_ACTION_SUCCESS", err);
        } else if (response.data.actionResult === "input") {
          err.title = "Input error";
          for (let i in response.data.fieldErrors) {
            err.body += response.data.fieldErrors[i];
          }
          commit("SET_ACTION_NOTIFY", err);
        } else {
          err.title = "Error";
          err.body =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (err.body = response.data.actionErrors.join("\n"));
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'},{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateSiteAuthentication(
      {
        commit,
        getters: { getLocale }
      },
      payload
    ) {
      try {
        let data = {
          devicePrint: add_deviceprint(),
          ...payload
        };
        let response = await ChangeSiteAuthentication(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          let notify = {
            title: "Success",
            body: response.data.actionMessages[0]
          };
          if (payload.imageSelected != null) {
            commit("SET_USER_IMAGES", payload.imageSelected);
          }
          commit("SET_ACTION_SUCCESS", notify);
        } else if (response.data.actionResult === "input") {
          let message = "";
          for (let i in response.data.fieldErrors) {
            message += response.data.fieldErrors[i];
          }

          let err = {
            title: "Error",
            body: message ? message : "Input Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:159");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateOwnPassword(
      {
        commit,
        getters: { getLocale }
      },
      { oldPassword, newPassword }
    ) {
      try {
        let response = await ChangeOwnPassword(
          doPlain({ oldPassword, newPassword }, "event"),
          getLocale
        );
        if (response.data.actionResult === "success") {
          let payload = {
            title: "Success",
            body: response.data.actionMessages
          };
          commit("SET_ACTION_SUCCESS", payload);
        } else if (response.data.actionResult === "input") {
          let message = "";
          for (let i in response.data.fieldErrors) {
            message += response.data.fieldErrors[i].join("\n");
          }

          let err = {
            title: "Error",
            body: message ? message : "Input Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:318");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateUserLoginName(
      {
        commit,
        getters: { getLocale }
      },
      user
    ) {
      try {
        let response = await ChangeOwnUserLoginName(user, getLocale);
        if (response.data.actionResult === "success") {
          let payload = {
            title: "Success",
            body: response.data.actionMessages,
            dataUpdated: "userLoginName",
            dataValue: response.data.data.userLoginName
          };
          commit("SET_ACTION_SUCCESS", payload);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:159");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateOwnDisplayName(
      {
        commit,
        getters: { getLocale }
      },
      displayName
    ) {
      try {
        let response = await ChangeOwnDisplayName(displayName, getLocale);
        if (response.data.actionResult === "success") {
          let payload = {
            title: "Success",
            body: response.data.actionMessages,
            dataUpdated: "displayName",
            dataValue: response.data.data.displayName
          };
          commit("SET_ACTION_SUCCESS", payload);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:191");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async deleteDevice(
      {
        commit,
        state,
        getters: { getLocale }
      },
      { label, index }
    ) {
      try {
        let data = {
          deviceLabel: label,
          devicePrint: add_deviceprint()
        };
        let response = await UnbindDevice(doPlain(data), getLocale);
        if (response.data.actionResult === "success") {
          let payload = {
            title: "Success",
            body: response.data.actionMessages
          };
          let deviceInfo = state.securityInfo.devicesInfo.splice(index,1);
          payload.dataUpdated = "securityInfo.devicesInfo";
          payload.dataValue = deviceInfo;
          commit("SET_ACTION_SUCCESS", payload);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:222");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async validatePhonesNumbers(
      {
        commit,
        getters: { getLocale }
      },
      { data, prefSelected }
    ) {
      try {
        let phones = [];
        let pref = null;
        let indices = true;
        data.forEach(phone => {
          let { phoneNumber, extension, phoneCountryCode, preferred } = phone;
          pref =
            prefSelected === phoneNumber
              ? `${phoneCountryCode} ${phoneNumber}`
              : "";
          preferred = prefSelected === phoneNumber ? "on" : "false";
          pref = extension ? `${pref} x${extension}` : pref;
          phones.push({
            phoneNumber,
            extension,
            preferred,
            countryCode: phoneCountryCode.slice(1),
            number: phoneNumber
          });
        });
        let response = await ValidatePhones(
          doPlain({ phones, preferred: pref, indices }),
          getLocale
        );
        if (response.data.actionResult === "success") {
          let phones = [];
          var warns = "";
          response.data.actionMessages.forEach(p => {
            if (p.startsWith("+")) {
              var parts = p.split(" ");
              var countryCode = parts[0].replace("+", "");
              var number = parts[1];
              var extension =
                parts.length > 2 && parts[2].includes("x") ? parts[2] : "";
              var phone = {
                countryCode,
                number,
                extension: extension.replace("x", "")
              };

              phones.push(phone);
            } else if (p.includes("WARN")) {
              if (p.includes("001")) warns += i18n.t("noMobileAdded") + "\n";
              if (p.includes("002")) warns += i18n.t("phonesUsIndicia") + "\n";
              if (p.includes("003"))
                warns += i18n.t("preferredNoMobile") + "\n";
            }
          });
          if (warns != "") {
            warns += i18n.t("sureToContinue");
            if (confirm(warns)) {
              commit("SET_PHONES_CHALLENGE", { phones, preferred: pref });
            } else {
              return;
            }
          }
          let payload = { phones, indices: true };
          payload = pref ? { preferred: pref, ...payload } : payload;
          commit("SET_PHONES_CHALLENGE", payload);
        } else {
          let message = "";
          for (let fieldErrors in response.data.fieldErrors) {
            for (let fields of response.data.fieldErrors[fieldErrors]) {
              message += fields + "<br/>";
            }
          }
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err, "modules/securityPreferences:299");
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'security preference'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    }
  },
  getters: {
    getStateProp: state => prop => {
      return state[prop];
    },
    getLocale: (state, getters, rootState) => {
      return rootState.i18n.locale;
    }
  }
};
