import {
  GetEnrollmentInformation,
  GetPhoneCountryPrefixList,
  ChangeOwnUserLoginName,
  ChangeOwnDisplayName,
  UnbindDevice,
  ValidatePhones,
  ChangeSiteAuthentication
} from "../services";

import i18n from "../../i18n";
import { debugExeption, doPlain, add_deviceprint } from "../utils";

export const securityPreferenceOld = {
  namespaced: true,
  state: {
    displayName: "",
    phones: [],
    phonesChallenge: {},
    securityInfo: {},
    userLoginName: "",
    imagesInfo: null,
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
        phonesInfo,
        questionsInfo,
        devicesInfo,
        siteToUserInfo,
        imagesInfo,
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
      state.displayName = displayName;
      phonesInfo.forEach(phone => {
        phone.countryCode = `+${phone.countryCode}`;
        state.phones.push(phone);
      });
      state.securityInfo = {
        siteToUserInfo,
        questionsInfo,
        devicesInfo
      };
      state.imagesInfo = imagesInfo;
      state.userLoginName = userLoginName;
      state.userName = userName;
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
    async fetchSecurityPre({ commit, getters: { getLocale } }) {
      commit("SECURITY_PRE_STARTED");
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
          body: i18n.t("networkError")
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
          body: i18n.t("networkError")
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
        let response = await ChangeSiteAuthentication(data, getLocale);
        if (response.data.actionResult === "success") {
          let payload = {
            title: "Success",
            body: response.data.actionMessages
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
          body: i18n.t("networkError")
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
          body: i18n.t("networkError")
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
          body: i18n.t("networkError")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async deleteDevice(
      {
        commit,
        getters: { getLocale }
      },
      label
    ) {
      try {
        let devicePrint = add_deviceprint();
        let response = await UnbindDevice({ label, devicePrint }, getLocale);
        if (response.data.actionResult === "success") {
          let payload = {
            title: "Success",
            body: response.data.actionMessages
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
        debugExeption(err, "modules/securityPreferences:222");
        let error = {
          title: "Error",
          body: i18n.t("networkError")
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
          body: i18n.t("networkError")
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
