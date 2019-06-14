import { GetDeliveries } from '../services';
import i18n from "../../i18n";
import {debugExeption} from "../utils";

export const paperlessCommunications = {
  namespaced: true,
  state: {
    data: {},
    deliveries: {}
  },
  getters: {
    getLocale: (state, getters, rootState) => {
      return rootState.i18n.locale;
    }
  },
  mutations: {
    SET_DELIVERIES(state, payload) {
      console.log(payload)
      state.data = payload.data
      state.deliveries = payload.data.deliveries
    },
    SET_CURRENT(state, payload) {
      state.current = payload;
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload === state.isLoading;
    },
    SET_ACTION_NOTIFY(state,{ body, title }){
      state.message = {
        title: title,
        body: body
      };
    }
  },
  actions: {
    async fetchPaperlessDeliveries({ commit, getters:{getLocale} }) {
      // let response = await getDeliveries()
      // commit('SET_DELIVERIES', response.data)
      commit('SET_IS_LOADING');
      try {
        let response = await GetDeliveries(getLocale);
        if (response.data.actionResult === "success") {
          commit('SET_IS_LOADING');
          commit('SET_DELIVERIES', response.data);
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
          commit('SET_ACTION_NOTIFY', err);
        }
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'Paperless Communications'})
        };
        commit('SET_ACTION_NOTIFY', error);
      }
    }
  }
}
