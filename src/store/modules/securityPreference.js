import {
  GetSecurityPreferences,
  GetPhoneCountryPrefixList,
  ChangeOwnUserLoginName,
  ChangeOwnDisplayName,
  UnbindDevice
} from "../services";

import {debugExeption} from '../utils';

export const securityPreference = {
  namespaced: true,
  state: {
    displayName: "",
    phones: [],
    securityInfo: {},
    userLoginName: "",
    userName: "",
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
      state.phones = phones;
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
          commit("COUNTRYPREFIXLIST_SUCCESS", response.data.data);
        }
      } catch (err) {
        debugExeption(err)
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
        debugExeption(err)
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateUserLoginName({ commit, state }) {
      try {
        let response = await ChangeOwnUserLoginName(state.userLoginName);
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
        debugExeption(err)
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async updateOwnDisplayName({ commit, state }) {
      try {
        let response = await ChangeOwnDisplayName(state.displayName);
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
        debugExeption(err)
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
        debugExeption(err)
        let error = {
          title: "Error",
          body: err.toString().replace("Error: ", "")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    }
  }
};
