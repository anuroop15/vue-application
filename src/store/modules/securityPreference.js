import {
  GetSecurityPreferences,
  GetPhoneCountryPrefixList,
  ChangeOwnUserLoginName,
  ChangeOwnDisplayName,
  UnbindDevice,
  ValidatePhones
} from "../services";

import { en } from "../../views/SecurityPreferences/i18n";
import { debugExeption, doPlain } from "../utils";

export const securityPreference = {
  namespaced: true,
  state: {
    displayName: "",
    phones: [],
    phonesChallenge: {},
    securityInfo: {},
    userLoginName: "",
    userName: "",
    preferred:"",
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
      { displayName, phones, securityInfo, userLoginName, userName }
    ) {
      state.showModal = false;
      state.isLoading = false;
      state.message = {
        title: "",
        body: ""
      };
      state.displayName = displayName;
      phones.forEach(phone => {
        if(phone.phoneNumber.includes('x')){
          phone.extension = phone.phoneNumber.substring(phone.phoneNumber.indexOf("x")+1, phone.phoneNumber.length);
          phone.phoneNumber = phone.phoneNumber.substring(0,phone.phoneNumber.indexOf("x")-1);
        }
        let preferred = phone.preferred ? phone.preferred : false;
        state.preferred = preferred ? phone.phoneNumber: "";
        state.phones.push({
          preferred,
          ...phone
        });
      });
      state.securityInfo = securityInfo;
      state.userLoginName = userLoginName;
      state.userName = userName;
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
    async fetchPhoneCountryPrefixList({ commit }) {
      try {
        let response = await GetPhoneCountryPrefixList();
        if (response.data.actionResult === "success") {
          response.data.data.items.reverse();
          commit("COUNTRYPREFIXLIST_SUCCESS", response.data.data);
        }
      } catch (err) {
        debugExeption(err);
        commit("SET_ACTION_NOTIFY", err);
      }
    },
    async fetchSecurityPre({ commit }) {
      commit("SECURITY_PRE_STARTED");
      try {
        let response = await GetSecurityPreferences();
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
        debugExeption(err);
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateUserLoginName({ commit }, user) {
      try {
        let response = await ChangeOwnUserLoginName(user);
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
        debugExeption(err);
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateOwnDisplayName({ commit }, displayName) {
      try {
        let response = await ChangeOwnDisplayName(displayName);
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
        debugExeption(err);
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async deleteDevice({ commit }, label) {
      try {
        let response = await UnbindDevice(label);
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
        debugExeption(err);
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async validatePhonesNumbers({ commit }, {data, prefSelected}) {
      try {
        let phones = [];
        let pref = null;
        let indices = true;
        data.forEach(phone => {
          let { phoneNumber, extension, phoneCountryCode, preferred } = phone;
          pref = prefSelected === phoneNumber ? `${phoneCountryCode} ${phoneNumber}` : "";
          preferred = prefSelected === phoneNumber ? 'on': 'false';
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
          doPlain({ phones, preferred: pref, indices })
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
              if (p.includes("001")) warns += en.noMobileAdded + "\n";
              if (p.includes("002")) warns += en.phonesUsIndicia + "\n";
              if (p.includes("003")) warns += en.preferredNoMobile + "\n";
            }
          });
          if (warns != "") {
            warns += en.sureToContinue;
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
        debugExeption(err);
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    }
  },
  getters: {
    getStateProp: state => prop => {
      return state[prop];
    }
  }
};
