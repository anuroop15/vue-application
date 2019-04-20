import { GetSecurityPre, GetPhoneCountryPrefixList } from "../services";

export const securityPreference = {
  namespaced: true,
  state: {
    data: {
        displayName:'',
        phones:[],
        securityInfo:{},
        userLoginName:'',
        userName:'',

    },
    countryPrefixList:[],
    isLoading: false
  },
  mutations: {
    SET_SECURITY_PRE(state, payload) {
      state.data = payload;
    },
    SET_COUNTRYPREFIXLIST(state, payload) {
      state.countryPrefixList = payload;
    },
    SET_IS_LOADING(state) {
      state.isLoading = state.isLoading ? false : true;
    }
  },
  actions: {
    async fetchPhoneCountryPrefixList({commit}){
      try {
        let response = await GetPhoneCountryPrefixList();
        if (response.data.actionResult === "success") {
          commit("SET_COUNTRYPREFIXLIST", response.data.data);
        }
      }catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    },
    async fetchSecurityPre({ commit }) {
      commit("SET_IS_LOADING");
      try {
        let response = await GetSecurityPre();
        if (response.data.actionResult === "success") {
          commit("SET_IS_LOADING");
          commit("SET_SECURITY_PRE", response.data.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = message ? message : "Internal Error";
          throw `Error: ${err}`;
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    },
  }
};
