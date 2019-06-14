import { GetCompanyInfoList, LoginWebStart,LoginWebBindCurrentDevice, Logout } from "../services";
import { debugExeption, timezone, doPlain, add_deviceprint ,getErrorMessage} from "../utils";
import i18n from "../../i18n";

export const auth = {
  namespaced: true,
  state: {
    companyInfoList: [],
    actionType: "",
    errors: [],
    data: {}
  },
  mutations: {
    SET_ACTION_TYPE(state, type){
      state.actionType = type
    },
    SET_INITIAL_STATE(state) {
      state.actionType ="default"
    },
    SET_LOGIN(
      state,
      {
        data: { actionResult, actionErrors, data }
      }
    ) {
      state.actionType = actionResult;
      state.errors = actionErrors;
      state.data = data;
    },
    SET_COMPANY_INFO_LIST(state, { items }) {
      state.companyInfoList = items;
    }
  },
  actions: {
    async fetchCompanyInfoList({ commit, getters: { getLocale } }) {
      try {
        let response = await GetCompanyInfoList(getLocale);
        if (response.data.actionResult === "success") {
          commit("SET_COMPANY_INFO_LIST", response.data.data);
        }
      } catch (err) {
        debugExeption(err);
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'auth'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async loginUser({ commit,dispatch }, { userLoginName, password }) {
      commit('SET_INITIAL_STATE')
      let time = timezone.name();
      let devicePrint = add_deviceprint();
      let data = {
        timezone: time,
        devicePrint,
        userLoginName,
        password
      };
      try {
        let response = await LoginWebStart(doPlain(data));
        response ? commit("SET_LOGIN", response) : null;
        let {data:{data:{centerURL}}} = response
        centerURL ? dispatch("i18n/changeLocale", centerURL.slice(-2), {root:true}): null
      } catch (err) {
        debugExeption(err);
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'auth'})
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async loginWebBindDevice({commit, getters: { getLocale }}, deviceName){
      try {
        let devicePrint = add_deviceprint();
        let response = await LoginWebBindCurrentDevice(doPlain({deviceName, devicePrint}), getLocale)
        if(response.data.actionResult === "success"){
          commit("SET_ACTION_TYPE", "dashboard")
        } else if(response.data.actionResult === "input"){
          let body = getErrorMessage(response)
          commit("SET_ACTION_NOTIFY", {title:"Error", body});
        }
      } catch (err) {
        debugExeption(err);
      }
    },
    async logOutUser({ getters: { getLocale } }) {
      try {
        await Logout(getLocale);
      } catch (err) {
        debugExeption(err);
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
